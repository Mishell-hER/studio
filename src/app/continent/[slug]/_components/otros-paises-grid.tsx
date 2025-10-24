"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { CountryData } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

// Helper to generate slugs consistently
const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '');
}

export function OtrosPaisesGrid({ data }: { data: CountryData[] }) {

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
  
  // Create a unique list of "countries" from the data that have at least one city (capital)
  const uniqueCountries = data.reduce((acc, current) => {
    // Only add the country if it's not already in the accumulator and has a city
    if (current.capital && !acc.find((item) => item.country === current.country)) {
      acc.push(current);
    }
    return acc;
  }, [] as CountryData[]);

  const countriesToHide = ["Gran Bretaña", "Bahréin", "Sudáfrica"];
  const visibleCountries = uniqueCountries.filter(
    (country) => !countriesToHide.includes(country.country)
  );

  return (
    <div>
        <Card className="bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
                <CardTitle>Explora por País</CardTitle>
                <CardDescription>
                Selecciona un país para ver la información detallada de logística y comercio para sus ciudades. Esta es una lista de países que son islas o no tienen acceso terrestre, por eso sus rutas son internas entre sus ciudades partiendo desde la capital.
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCountries.map((item) => (
              <Link href={`/country/${generateSlug(item.country)}`} key={item.country}>
                <Card 
                    className="group transform cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:border-primary border-2 border-transparent h-full"
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
                                {/* Show a representative city or a general description if needed */}
                                <CardDescription>Ver ciudades</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                        <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Ver ciudades <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </CardContent>
                </Card>
              </Link>
            ))}
        </div>
    </div>
  );
}
