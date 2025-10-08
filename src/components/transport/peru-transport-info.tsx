import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Truck } from 'lucide-react';

export function PeruTransportInfo() {
  return (
    <Card className="mb-8 border-primary/50 bg-primary/10">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="rounded-full bg-primary/20 p-3">
          <Truck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-primary">
            Special Focus: Peru Internal Transport
          </CardTitle>
          <CardDescription className="text-primary/80">
            Key routes for South American distribution.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          For exports within South America originating from or passing through
          Peru, leveraging the internal road network is critical. Key corridors
          include the Pan-American Highway for coastal distribution and the
          Interoceanic Highway connecting Peru to Brazil. These routes are
          essential for efficient overland transport to neighboring countries.
        </p>
      </CardContent>
    </Card>
  );
}
