import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function CostsPage() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm mt-4">
      <CardHeader>
        <CardTitle>Calculadora de Costos (Plantilla) 💰</CardTitle>
        <CardDescription>Estimación de Costos de Exportación (Fuente: Costos.csv)</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Esta sección simularía una calculadora de costos <strong>FCA</strong> (Free Carrier), que incluye:
        </p>
        <ul className="mb-4 list-disc pl-5 text-muted-foreground">
          <li><strong>Peso Facturable (Real o Volumétrico):</strong> Determina el costo del flete.</li>
          <li><strong>KM / Combustible / Tarifa flete terrestre (USD/kg):</strong> Componentes del costo del flete.</li>
          <li><strong>Costo Total FCA (USD/kg):</strong> Costo total de colocar la mercancía en el lugar de entrega convenido con el transportista.</li>
          <li><strong>Seguro (0.20% FOB):</strong> Costo de seguro base.</li>
        </ul>
        <div className="p-4 rounded-md bg-primary/10 border border-primary/50 text-primary-foreground mb-6">
          <strong>Nota:</strong> Para una implementación real, se requeriría un formulario de entrada de datos (Peso, Largo, Ancho, Alto, etc.) y la lógica de cálculo completa.
        </div>

        <h4 className="font-semibold text-lg mb-2">Estructura de Costos por País Destino (Ejemplo)</h4>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>País Destino</TableHead>
                <TableHead>Peso Facturable (kg)</TableHead>
                <TableHead>KM</TableHead>
                <TableHead>Tarifa Flete Terrestre (USD/kg)</TableHead>
                <TableHead>Costo Total FCA (USD/kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Argentina</TableCell>
                <TableCell>[Valor Calculado]</TableCell>
                <TableCell>4008.49</TableCell>
                <TableCell>[Tarifa Única]</TableCell>
                <TableCell>[Cálculo Completo]</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
