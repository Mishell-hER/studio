import { ContinentGrid } from '@/components/continents/continent-grid';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 text-center sm:px-6 lg:px-8 sm:py-16">
      <h1 className="mb-4 text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
        Global Logistics, Simplified.
      </h1>
      <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
        Navigate international trade with ease. Select a continent to explore
        detailed export data, customs information, and logistics.
      </p>
      <ContinentGrid />
    </div>
  );
}
