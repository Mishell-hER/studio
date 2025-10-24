"use client";

import * as React from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info, Search } from 'lucide-react';
import type { CountryData } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type DataKey = keyof CountryData;

interface HeaderConfig {
  label: string;
  dataKey: DataKey;
  isLink?: boolean;
  isTextarea?: boolean; 
}

interface TableConfig {
  title: string;
  description: string;
  headers: HeaderConfig[];
  cityLevelOnly?: boolean;
  countryLevelOnly?: boolean;
}

const tableConfigs: TableConfig[] = [
  { 
    title: "Información General", 
    description: "Datos generales, culturales y económicos de cada país.",
    headers: [
      { label: "Ficha País", dataKey: "fichaPaisLink", isLink: true },
      { label: "Idioma Oficial", dataKey: "language" },
      { label: "Moneda Local", dataKey: "currency" },
      { label: "Principales 10 Productos que Importan", dataKey: "topImports", isTextarea: true },
      { label: "Rasgos Culturales", dataKey: "culture", isTextarea: true },
    ]
  },
  { 
    title: "Acuerdo Comercial", 
    description: "Acuerdo comercial de Perú con el país/bloque y su descripción.",
    headers: [{ label: "Acuerdo Vigente", dataKey: "tradeAgreement" }],
    countryLevelOnly: true, // Only show for country level
  },
  { 
    title: "Aduanas", 
    description: "Enlace a la autoridad aduanera local y descripción de controles.",
    headers: [
      { label: "Autoridad Aduanera", dataKey: "customsInfo", isLink: true },
      { label: "Nivel de Rigurosidad", dataKey: "customsStrictness", isTextarea: true }
    ]
  },
  { 
    title: "Ruta Terrestre", 
    description: "Enlace a la ruta de transporte o detalles de la vía principal.",
    headers: [
        { label: "Países que Atraviesa", dataKey: "countriesCrossed" },
        { label: "Kilómetros", dataKey: "kilometers" },
        { label: "Ruta Terrestre", dataKey: "detailsLink", isLink: true },
    ]
  },
  { 
    title: "Cómo Negociar", 
    description: "Estilo de negociación, puntualidad y vestimenta recomendada.",
    headers: [{ label: "Tips de Negociación", dataKey: "logisticalInfo", isTextarea: true }]
  },
  { 
    title: "Indicadores de Desarrollo", 
    description: "Enlace a indicadores económicos clave (PBI, etc.).",
    headers: [{ label: "Datos Macroeconómicos", dataKey: "indicadoresLink", isLink: true }]
  },
];

const renderCellContent = (item: CountryData, header: HeaderConfig) => {
  const value = item[header.dataKey] as string | number;

  if (value === undefined || value === null || value === '#') {
    return <span className="text-muted-foreground/70">No disponible</span>;
  }
  
  if (header.dataKey === 'tradeAgreement' && item.tradeAgreementLink) {
    return (
      <Button asChild variant="outline" size="sm">
        <a href={item.tradeAgreementLink} target="_blank" rel="noopener noreferrer">
          {String(value)}
          <ExternalLink className="ml-2 h-3 w-3" />
        </a>
      </Button>
    )
  }

  if (header.isLink) {
     const isUrl = typeof value === 'string' && (value.startsWith('http') || value.startsWith('www'));
     if (isUrl) {
         const linkButton = (
            <Button asChild variant="outline" size="sm">
              <a href={value} target="_blank" rel="noopener noreferrer">
                  Ver
                  <ExternalLink className="ml-2 h-3 w-3" />
              </a>
          </Button>
         );
         
        if (header.dataKey === 'fichaPaisLink' && item.fichaPaisTooltip) {
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {linkButton}
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{item.fichaPaisTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

         return linkButton;
     }
  }

  if(header.isTextarea) {
    return <p className="whitespace-pre-wrap max-w-sm">{value}</p>;
  }

  if(header.dataKey === 'kilometers' && typeof value === 'number') {
    return value.toLocaleString('es-PE');
  }
  
  return String(value);
}

export function ContinentDataTable({ data, isCityLevel = false }: { data: CountryData[], isCityLevel?: boolean }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  if (!data || data.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Sin datos</CardTitle>
          <CardDescription>
            No hay información disponible para este continente.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const filteredData = data.filter(item => {
    const target = isCityLevel ? item.capital : item.country;
    return target.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredTableConfigs = tableConfigs.filter(config => {
    if (isCityLevel) {
      // For city level, hide "Acuerdo Comercial"
      return !config.countryLevelOnly && config.title !== "Acuerdo Comercial";
    }
    return !config.cityLevelOnly;
  });

  return (
     <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Información Detallada por {isCityLevel ? 'Ciudad' : 'País'}</CardTitle>
          <CardDescription>
            Explora los datos específicos para cada {isCityLevel ? 'ciudad' : 'país'} en las siguientes categorías.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Buscar ${isCityLevel ? 'ciudad' : 'país'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-1/2 lg:w-1/3"
              />
            </div>
            <Accordion type="single" collapsible className="w-full" defaultValue='item-0'>
                {filteredTableConfigs.map((config, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg hover:no-underline">
                            {config.title}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-2 rounded-md bg-background/30 mb-4 flex items-start gap-2 text-sm text-muted-foreground">
                                <Info className="h-4 w-4 mt-1 flex-shrink-0" />
                                <p>{config.description}</p>
                            </div>
                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                          <TableHead className="w-[200px] min-w-[200px]">{isCityLevel ? 'Ciudad a donde quieres llegar' : 'País'}</TableHead>
                                          <TableHead className="hidden sm:table-cell w-[150px]">{isCityLevel ? 'País' : 'Ciudad'}</TableHead>
                                          {config.headers.map(header => (
                                            <TableHead key={header.dataKey}>{header.label}</TableHead>
                                          ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredData.length > 0 ? (
                                          filteredData.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src={`https://flagcdn.com/w40/${item.flagCode}.png`}
                                                            alt={`Bandera de ${item.country}`}
                                                            width={24}
                                                            height={16}
                                                            className="rounded-sm"
                                                        />
                                                        {isCityLevel ? item.capital : item.country}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">{isCityLevel ? item.country : item.capital}</TableCell>
                                                {config.headers.map(header => (
                                                  <TableCell key={`${item.id}-${header.dataKey}`}>
                                                    {renderCellContent(item, header)}
                                                  </TableCell>
                                                ))}
                                            </TableRow>
                                          ))
                                        ) : (
                                          <TableRow>
                                            <TableCell colSpan={config.headers.length + 2} className="h-24 text-center text-muted-foreground">
                                              No se encontraron resultados para &quot;{searchTerm}&quot;.
                                            </TableCell>
                                          </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
     </Card>
  );
}
