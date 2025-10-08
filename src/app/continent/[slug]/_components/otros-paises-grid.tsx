"use client";

import * as React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { CountryData } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export function OtrosPaisesGrid({ data }: { data: CountryData[] }) {
  const [selectedCountry, setSelectedCountry] = React.useState<CountryData | null>(null);

  if (!data || data.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Sin datos</CardTitle>
          <CardDescription>
            No hay información disponible para esta sección.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // TODO: Implement detail view when a country is selected.
  if (selectedCountry) {
     return (
        <div>
            <h2>{selectedCountry.country}</h2>
            <button onClick={() => setSelectedCountry(null)}>Volver</button>
        </div>
     )
  }

  return (
    <div>
        <Card className="bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
                <CardTitle>Explora por País</CardTitle>
                <CardDescription>
                Selecciona un país para ver la información detallada de logística y comercio.
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
                <Card 
                    key={item.id}
                    className="group transform cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:border-primary border-2 border-transparent"
                    onClick={() => setSelectedCountry(item)}
                >
                    <CardHeader className="p-0">
                        <div className="flex items-center gap-4 p-6">
                            <Image
                                src={`https://flagcdn.com/w40/${item.flagCode}.png`}
                                alt={`Bandera de ${item.country}`}
                                width={40}
                                height={26}
                                className="rounded-md"
                            />
                            <div>
                                <CardTitle className="text-xl font-semibold text-foreground">
                                    {item.country}
                                </CardTitle>
                                <CardDescription>{item.capital}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                        <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Ver detalles <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
