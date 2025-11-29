
import { ContinentDataTable } from '@/app/continent/[slug]/_components/continent-data-table';
import { logisticData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, FileText, Calculator, Lightbulb, ListChecks } from 'lucide-react';
import Link from 'next/link';

// Find all unique countries in 'otros' to generate static params
const otherCountries = logisticData.otros.reduce((acc, current) => {
    if (current.capital && !acc.find((item) => item.country === current.country)) {
      acc.push(current);
    }
    return acc;
}, [] as any[]);

const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '');
}

export async function generateStaticParams() {
  const slugs = otherCountries.map((country) => generateSlug(country.country));

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

const exportOrigins: Record<string, string> = {
  'gran-bretana': 'Londres - Gran Bretaña',
  'escocia': 'Edimburgo - Escocia',
  'malta': 'La Valeta - Malta',
  'irlanda': 'Dublín - Irlanda',
  'chipre': 'Nicosia - Chipre',
  'japon': 'Tokio - Japón',
  'corea-del-sur': 'Seúl - Corea del Sur',
  'nueva-zelanda-isla-norte': 'Wellington - Nueva Zelanda (Isla Norte)',
  'nueva-zelanda-isla-sur': 'Christchurch - Nueva Zelanda (Isla Sur)',
  'bahrein': 'Manama - Bahréin',
  'indonesia': 'Yakarta - Indonesia',
  'sudafrica': 'Johannesburgo - Sudáfrica',
};

const getCountryNameFromSlug = (slug: string): string | undefined => {
  // Find a country in the 'otros' data that matches the slug
  const country = otherCountries.find(c => generateSlug(c.country) === slug);
  return country?.country;
}

export default function CountryPage({
  params,
}: {
  params: { slug: string };
}) {

  const countryName = getCountryNameFromSlug(params.slug);
  
  if (!countryName) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">País no encontrado</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/continent/otros">Volver a la selección</Link>
        </Button>
      </div>
    );
  }

  const data = logisticData.otros.filter(
    (c) => generateSlug(c.country) === params.slug
  );
  
  const exportOrigin = exportOrigins[params.slug];

  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="ghost" className="mb-4">
          <Link href="/continent/otros">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Otros Países
          </Link>
        </Button>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
            {countryName}
          </h1>
        </div>
        {exportOrigin && (
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">Exportando desde: {exportOrigin}</span>
          </div>
        )}
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
          </div>
        </div>
      
      <ContinentDataTable data={data} isCityLevel={true} />
    </div>
  );
}
