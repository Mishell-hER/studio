import { ContinentDataTable } from '@/app/continent/[slug]/_components/continent-data-table';
import { logisticData } from '@/lib/data';
import { continents } from '@/lib/continents';
import { PeruTransportInfo } from '@/components/transport/peru-transport-info';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Calculator, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return continents.map((continent) => ({
    slug: continent.slug,
  }));
}

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
      </div>
      
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
            <Link href="/costs">
              <Calculator className="mr-2" />
              Calculadora de Costos
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/negotiation">
              <Lightbulb className="mr-2" />
              Tips para Negociar
            </Link>
          </Button>
        </div>
      </div>

      {continent.slug === 'south-america' && <PeruTransportInfo />}
      <ContinentDataTable data={data} />
    </div>
  );
}
