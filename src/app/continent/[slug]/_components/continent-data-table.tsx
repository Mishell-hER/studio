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
import { ExternalLink, Info } from 'lucide-react';
import type { CountryData } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type DataKey = keyof CountryData;

interface TableConfig {
  title: string;
  header: string;
  description: string;
  dataKey: DataKey;
  isLink: boolean;
}

const tableConfigs: TableConfig[] = [
  { title: "Ficha País", header: "Información General", description: "Enlace a la ficha del país con datos sobre idioma, moneda, y cultura.", dataKey: "fichaPaisLink", isLink: true },
  { title: "Acuerdo Comercial", header: "Acuerdo Vigente", description: "Acuerdo comercial de Perú con el país/bloque y su descripción.", dataKey: "tradeAgreement", isLink: false },
  { title: "Aduanas", header: "Autoridad Aduanera", description: "Enlace a la autoridad aduanera local o descripción de controles.", dataKey: "customsInfo", isLink: true },
  { title: "Link de Ruta", header: "Ruta Terrestre/Marítima", description: "Enlace a la ruta de transporte o detalles de la vía principal.", dataKey: "detailsLink", isLink: true },
  { title: "Cómo Negociar", header: "Tips de Negociación", description: "Estilo de negociación, puntualidad y vestimenta recomendada.", dataKey: "logisticalInfo", isLink: false },
  { title: "Indicadores de Desarrollo", header: "Datos Macroeconómicos", description: "Enlace a indicadores económicos clave (PBI, etc.).", dataKey: "indicadoresLink", isLink: true },
];

const renderCellContent = (item: CountryData, config: TableConfig) => {
  const value = item[config.dataKey] as string;

  if (!value || value === '#') {
    return <span className="text-muted-foreground/70">No disponible</span>;
  }
  
  if (config.isLink) {
     const isUrl = value.startsWith('http') || value.startsWith('www');
     if (isUrl) {
         return (
             <Button asChild variant="outline" size="sm">
                <a href={value} target="_blank" rel="noopener noreferrer">
                    Ver
                    <ExternalLink className="ml-2 h-3 w-3" />
                </a>
            </Button>
         )
     }
  }
  
  return value;
}

export function ContinentDataTable({ data }: { data: CountryData[] }) {
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

  return (
     <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Información Detallada por País</CardTitle>
          <CardDescription>
            Explora los datos específicos para cada país en las siguientes categorías.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue='item-0'>
                {tableConfigs.map((config, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg hover:no-underline">
                            {config.title}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-2 rounded-md bg-background/30 mb-4 flex items-start gap-2 text-sm text-muted-foreground">
                                <Info className="h-4 w-4 mt-1 flex-shrink-0" />
                                <p>{config.description}</p>
                            </div>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead className="w-[200px]">País</TableHead>
                                        <TableHead className="hidden sm:table-cell w-[200px]">Ciudad</TableHead>
                                        <TableHead>{config.header}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.map((item) => (
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
                                                    {item.country}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">{item.capital}</TableCell>
                                            <TableCell>{renderCellContent(item, config)}</TableCell>
                                        </TableRow>
                                        ))}
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
