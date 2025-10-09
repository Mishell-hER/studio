import { ContinentDataTable } from '@/app/continent/[slug]/_components/continent-data-table';
import { OtrosPaisesGrid } from '@/app/continent/[slug]/_components/otros-paises-grid';
import { logisticData } from '@/lib/data';
import { continents } from '@/lib/continents';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
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
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la selección
          </Link>
        </Button>
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
      
      {isOtrosPaises ? <OtrosPaisesGrid data={data} /> : <ContinentDataTable data={data} />}
    </div>
  );
}
