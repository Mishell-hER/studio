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
import { SuppliersTable } from './_components/suppliers-table';

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
          <CardTitle>Criterios de Proveedores</CardTitle>
          <CardDescription>
            Análisis de proveedores agrícolas por país, incluyendo fortalezas,
            debilidades y marcos regulatorios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SuppliersTable />
        </CardContent>
      </Card>
    </div>
  );
}
