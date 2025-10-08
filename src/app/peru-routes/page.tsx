import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const rutasPeruData = [
    { Ciudad: "Abancay", Departamento: "Apurimac", Destino: "Puerto de Callao", Link: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4400/4425" },
    { Ciudad: "Arequipa", Departamento: "Arequipa", Destino: "Terminal Portuario de Matarani", Link: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4402/4426" },
    { Ciudad: "Puno", Departamento: "Puno", Destino: "Desaguadero (Bolivia)", Link: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4420/4430" },
    { Ciudad: "Pucallpa", Departamento: "Ucayali", Destino: "Puerto de Callao", Link: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4418/4425" },
    { Ciudad: "Piura", Departamento: "Piura", Destino: "TPE Paita", Link: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4417/4427" },
];


export default function PeruRoutesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="ghost" className="mb-4">
          <Link href="/continent/south-america">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a América del Sur
          </Link>
        </Button>
        <Card className="bg-card/50 backdrop-blur-sm mt-4">
            <CardHeader>
                <CardTitle>Rutas Internas Perú 🇵🇪</CardTitle>
                <CardDescription>Rutas de Transporte Terrestre Internas en Perú (Fuente: Nacional - Perú.csv)</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-muted-foreground">
                Estas rutas muestran conexiones clave desde distintas ciudades hacia los principales puertos/fronteras para la exportación.
                </p>
                <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Ciudad de Origen</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Puerto/Frontera Destino</TableHead>
                        <TableHead>Información de la Carretera</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {rutasPeruData.map((ruta, index) => (
                        <TableRow key={index}>
                        <TableCell>{ruta.Ciudad}</TableCell>
                        <TableCell>{ruta.Departamento}</TableCell>
                        <TableCell>{ruta.Destino}</TableCell>
                        <TableCell>
                            <Button asChild variant="outline" size="sm">
                                <a href={ruta.Link} target="_blank" rel="noopener noreferrer">
                                    Ver Detalle de la Ruta
                                </a>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
