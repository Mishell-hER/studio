import { ContinentDataTable } from '@/app/continent/[slug]/_components/continent-data-table';
import { logisticData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

// Find all unique countries in 'otros' to generate static params
const otherCountries = logisticData.otros.reduce((acc, current) => {
    if (!acc.find((item) => item.country === current.country)) {
      acc.push(current);
    }
    return acc;
  }, [] as any[]);

export async function generateStaticParams() {
  return otherCountries.map((country) => ({
    slug: country.country.toLowerCase().replace(/ /g, '-'),
  }));
}

const exportOrigins: Record<string, string> = {
  'gran-bretaña': 'Londres - Gran Bretaña',
  'malta': 'La Valeta - Malta',
  'irlanda': 'Dublín - Irlanda',
  'chipre': 'Nicosia - Chipre',
  'japon': 'Tokio - Japón',
  'corea-del-sur': 'Seúl - Corea del Sur',
  'nueva-zelanda': 'Wellington - Nueva Zelanda',
  'bahrein': 'Manama - Bahréin',
  'indonesia': 'Yakarta - Indonesia',
};

export default function CountryPage({
  params,
}: {
  params: { slug: string };
}) {
  const countryName = Object.keys(exportOrigins).find(key => key === params.slug);
  
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

  const formattedCountryName = countryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const data = logisticData.otros.filter(
    (c) => c.country.toLowerCase().replace(/ /g, '-') === params.slug
  );
  
  const exportOrigin = exportOrigins[params.slug];
  const firstEntry = data[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/continent/otros">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Otros Países
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
            {formattedCountryName}
          </h1>
        </div>
        {exportOrigin && (
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">Exportando desde: {exportOrigin}</span>
          </div>
        )}
      </div>
      
      <ContinentDataTable data={data} isCityLevel={true} />
    </div>
  );
}
