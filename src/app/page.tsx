import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContinentDataTable } from '@/app/continent/[slug]/_components/continent-data-table';
import { logisticData } from '@/lib/data';
import { continents } from '@/lib/continents';
import { PeruTransportInfo } from '@/components/transport/peru-transport-info';
import { DocumentsPage } from '@/components/sections/documents-page';
import { CostsPage } from '@/components/sections/costs-page';
import { NegotiationPage } from '@/components/sections/negotiation-page';
import { Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
          <Globe className="h-7 w-7" />
          <h1>Plataforma de Exportación Global</h1>
        </div>
      <Tabs defaultValue="north-america" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 h-auto">
          {continents.map((continent) => (
            <TabsTrigger key={continent.slug} value={continent.slug}>
              {continent.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="costs">Costos</TabsTrigger>
          <TabsTrigger value="negotiation">Negociación</TabsTrigger>
        </TabsList>

        {continents.map((continent) => (
          <TabsContent key={continent.slug} value={continent.slug}>
            <div className="py-4">
              <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl mb-4">
                {continent.name} Logistics
              </h2>
              {continent.slug === 'south-america' && <PeruTransportInfo />}
              <ContinentDataTable data={logisticData[continent.slug] || []} />
            </div>
          </TabsContent>
        ))}
        
        <TabsContent value="documents">
          <DocumentsPage />
        </TabsContent>
        <TabsContent value="costs">
          <CostsPage />
        </TabsContent>
        <TabsContent value="negotiation">
          <NegotiationPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
