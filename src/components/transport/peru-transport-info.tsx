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
            Enfoque Especial: Transporte Interno en Perú
          </CardTitle>
          <CardDescription className="text-primary/80">
            Rutas clave para la distribución en América del Sur.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Para las exportaciones dentro de América del Sur que se originan o pasan
          por Perú, es fundamental aprovechar la red de carreteras internas. Los corredores
          clave incluyen la Carretera Panamericana para la distribución costera y la
          Carretera Interoceánica que conecta Perú con Brasil. Estas rutas son
          esenciales para un transporte terrestre eficiente a los países vecinos.
        </p>
      </CardContent>
    </Card>
  );
}
