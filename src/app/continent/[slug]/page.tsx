
import { ContinentDataTable } from '@/app/continent/[slug]/_components/continent-data-table';
import { OtrosPaisesGrid } from '@/app/continent/[slug]/_components/otros-paises-grid';
import { logisticData } from '@/lib/data';
import { continents } from '@/lib/continents';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, FileText, Calculator, Lightbulb, ListChecks, Route } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return continents.map((continent) => ({
    slug: continent.slug,
  }));
}

const exportOrigins: Record<string, string> = {
  'north-america': 'Ciudad de Panamá - Panamá',
  'south-america': 'Lima - Perú',
  'europe': 'Países Bajos',
  'asia': 'Pekín - China',
  'africa': 'Johannesburgo - Sudáfrica',
  'oceania': 'Sídney - Australia',
};


export default function ContinentPage({
  params,
}: {
  params: { slug: string };
}) {
  const continent = continents.find((c) => c.slug === params.slug);

  if (!continent) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Continente no encontrado</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  const data = logisticData[params.slug] || [];
  const exportOrigin = exportOrigins[params.slug];
  const isOtrosPaises = params.slug === 'otros';

  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      <div className="mb-8">
        <div className="flex items-center gap-4">
           <continent.icon className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
            {continent.name}
          </h1>
        </div>
        {exportOrigin && !isOtrosPaises && (
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">Exportando desde: {exportOrigin}</span>
          </div>
        )}
      </div>

      {!isOtrosPaises && (
        <div className="my-8 p-6 rounded-lg bg-card/50 backdrop-blur-sm border">
          <h3 className="text-xl font-semibold mb-4">Herramientas de Exportación</h3>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link href="/documents">
                <FileText className="mr-2" />
                Documentos para Exportar
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://docs.google.com/spreadsheets/d/1i3TokgiBS5yohfnpDl5w229np4c7QxKVyYxGr3l2z8k/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Calculator className="mr-2" />
                Calculadora de Costos
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.stack-ai.com/chat/682b4dc30b7796295360567e-6QeSKcujmezlbXCeO4W9KF" target="_blank" rel="noopener noreferrer">
                <Lightbulb className="mr-2" />
                Tips para Negociar
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/suppliers">
                <ListChecks className="mr-2" />
                Criterios de Proveedores
              </Link>
            </Button>
            {params.slug === 'south-america' && (
               <Button asChild variant="outline">
                <Link href="/peru-routes">
                  <Route className="mr-2" />
                  Rutas Internas
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
      
      {isOtrosPaises ? <OtrosPaisesGrid data={data} /> : <ContinentDataTable data={data} />}
    </div>
  );
}

