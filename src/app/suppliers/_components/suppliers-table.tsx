"use client";

import * as React from 'react';
import { suppliersData, type SupplierData } from '@/lib/suppliers-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const continents = [...new Set(suppliersData.map((item) => item.continent))];

export function SuppliersTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [openContinent, setOpenContinent] = React.useState<string | undefined>(continents[0]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Si hay un término de búsqueda, abre todos los acordeones
    if (event.target.value) {
      setOpenContinent(undefined); // undefined para permitir que múltiples se abran si `type` es `multiple`
    } else if (!openContinent) {
      setOpenContinent(continents[0]);
    }
  };
  
  const filteredDataByContinent = (continent: string) => {
    return suppliersData.filter(
      (item) =>
        item.continent === continent &&
        (item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div>
        <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            type="text"
            placeholder="Buscar por país o ciudad..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 w-full md:w-1/2 lg:w-1/3"
            />
        </div>

        <Accordion 
          type="single" 
          collapsible 
          className="w-full" 
          value={openContinent}
          onValueChange={setOpenContinent}
        >
        {continents.map((continent) => {
          const filteredData = filteredDataByContinent(continent);
          if (searchTerm && filteredData.length === 0) return null;

          return (
            <AccordionItem value={continent} key={continent}>
              <AccordionTrigger className="text-lg">{continent}</AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>País</TableHead>
                        <TableHead>Ciudad</TableHead>
                        <TableHead>Fortalezas</TableHead>
                        <TableHead>Debilidades</TableHead>
                        <TableHead>Proveedores</TableHead>
                        <TableHead>Tipo de Contrato</TableHead>
                        <TableHead>Calidad/Regulaciones</TableHead>
                        <TableHead>Arbitraje Internacional</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium whitespace-nowrap">{item.country}</TableCell>
                          <TableCell>{item.city}</TableCell>
                          <TableCell className="whitespace-pre-wrap max-w-xs">{item.strengths}</TableCell>
                          <TableCell className="whitespace-pre-wrap max-w-xs">{item.weaknesses}</TableCell>
                          <TableCell className="whitespace-pre-wrap max-w-xs">{item.suppliers}</TableCell>
                          <TableCell className="whitespace-pre-wrap max-w-xs">{item.contractType}</TableCell>
                          <TableCell className="whitespace-pre-wrap max-w-xs">{item.quality}</TableCell>
                          <TableCell className="whitespace-pre-wrap max-w-xs">{item.arbitration}</TableCell>
                        </TableRow>
                      ))}
                      {filteredData.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                                No hay datos para este continente.
                            </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
