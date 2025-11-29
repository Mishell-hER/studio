
import { SuppliersTable } from './_components/suppliers-table';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SuppliersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </Button>
      <Card className="bg-card/50 backdrop-blur-sm mt-4">
        <CardHeader>
          <CardTitle>Criterios para Selección de Proveedores</CardTitle>
          <CardDescription>
            Análisis de fortalezas, debilidades, y marcos contractuales por país.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Utiliza la siguiente tabla para explorar los criterios de negociación y selección de proveedores en diferentes regiones del mundo. Puedes buscar por país o ciudad para filtrar los resultados.
          </p>
          <SuppliersTable />
        </CardContent>
      </Card>
    </div>
  );
}
