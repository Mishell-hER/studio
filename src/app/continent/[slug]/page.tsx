import { logisticData } from '@/lib/data';
import { continents } from '@/lib/continents';
import { ContinentDataTable } from './_components/continent-data-table';
import { PeruTransportInfo } from '@/components/transport/peru-transport-info';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ContinentPageProps = {
  params: {
    slug: string;
  };
};

export default function ContinentPage({ params }: ContinentPageProps) {
  const { slug } = params;
  const continentData = logisticData[slug] || [];
  const continentInfo = continents.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!continentInfo) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold">Continent not found</h1>
        <p className="mt-4 text-muted-foreground">
          The requested continent could not be found.
        </p>
        <Button asChild variant="link" className="mt-8 text-primary">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to home
          </Link>
        </Button>
      </div>
    );
  }

  const ContinentIcon = continentInfo.icon;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="h-16 w-16 flex-shrink-0 text-primary">
          <ContinentIcon className="h-full w-full" />
        </div>
        <div>
          <Button
            asChild
            variant="link"
            className="h-auto p-0 mb-2 text-muted-foreground hover:text-primary"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Continents
            </Link>
          </Button>
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
            {continentInfo.name} Logistics
          </h1>
        </div>
      </div>

      {slug === 'south-america' && <PeruTransportInfo />}

      <ContinentDataTable data={continentData} />
    </div>
  );
}
