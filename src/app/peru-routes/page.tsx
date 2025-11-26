
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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

type Ruta = {
  origen: string;
  departamento: string;
  destinos: {
    puerto: string;
    puertoLink: string;
    carreteraLink: string;
  }[];
};

const rutasPeruData: Ruta[] = [
    { origen: "Abancay", departamento: "Apurimac", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4400/4425" }] },
    { origen: "Amazonas", departamento: "Amazonas", destinos: [{ puerto: "TPE Paita", puertoLink: "https://www.puertopaita.com/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4401/4427" }] },
    { origen: "Arequipa", departamento: "Arequipa", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4402/4425" },
        { puerto: "Terminal Portuario de Matarani", puertoLink: "https://tisur.com.pe/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4402/4426" },
        { puerto: "Puerto de Paracas", puertoLink: "https://www.pdparacas.com.pe/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4402/4428" }
    ]},
    { origen: "Ayacucho", departamento: "Ayacucho", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4403/4425" }] },
    { origen: "Cajamarca", departamento: "Cajamarca", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4404/4425" },
        { puerto: "TPE Paita", puertoLink: "https://www.puertopaita.com/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4404/4427" }
    ]},
    { origen: "Casma", departamento: "Ancash", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4405/4425" },
        { puerto: "TPE Paita", puertoLink: "https://www.puertopaita.com/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4405/4427" }
    ]},
    { origen: "Chiclayo", departamento: "Lambayeque", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4406/4425" },
        { puerto: "TPE Paita", puertoLink: "https://www.puertopaita.com/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4406/4427" }
    ]},
    { origen: "Cusco", departamento: "Cusco", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4407/4425" }] },
    { origen: "Huancavelica", departamento: "Huancavelica", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4408/4425" }] },
    { origen: "Huancayo", departamento: "Huancayo", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4409/4425" }] },
    { origen: "Ica", departamento: "Ica", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4411/4425" },
        { puerto: "Puerto de Paracas", puertoLink: "https://www.pdparacas.com.pe/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4411/4428" }
    ]},
    { origen: "Junin", departamento: "Junin", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4412/4425" }] },
    { origen: "Moquegua", departamento: "Moquegua", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4414/4425" }] },
    { origen: "Moyobamba", departamento: "San Martin", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4415/4425" }] },
    { origen: "Pasco", departamento: "Pasco", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4416/4425" }] },
    { origen: "Piura", departamento: "Piura", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4417/4425" },
        { puerto: "TPE Paita", puertoLink: "https://www.puertopaita.com/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4417/4427" }
    ]},
    { origen: "Pucallpa", departamento: "Ucayali", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4418/4425" }] },
    { origen: "Puerto Maldonado", departamento: "Madre de Dios", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4419/4425" },
        { puerto: "Rio Branco (Brasil)", puertoLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4419/4432", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4419/4432" }
    ]},
    { origen: "Puno", departamento: "Puno", destinos: [
        { puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4420/4425" },
        { puerto: "Desaguadero (Bolivia)", puertoLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4420/4430", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4420/4430" }
    ]},
    { origen: "Tacna", departamento: "Tacna", destinos: [
        { puerto: "Terminal Portuario de Matarani", puertoLink: "https://tisur.com.pe/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4421/4426" },
        { puerto: "Puerto de Paracas", puertoLink: "https://www.pdparacas.com.pe/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4421/4428" },
        { puerto: "Arica (Chile)", puertoLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4421/4429", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4421/4429" }
    ]},
    { origen: "Trujillo", departamento: "La libertad", destinos: [{ puerto: "Puerto de Callao", puertoLink: "https://www.apmterminals.com/es/callao", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4423/4425" }] },
    { origen: "Tumbes", departamento: "Tumbes", destinos: [
        { puerto: "TPE Paita", puertoLink: "https://www.puertopaita.com/", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4424/4427" },
        { puerto: "Huaquillas (Ecuador)", puertoLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4424/4431", carreteraLink: "https://rutasterrestres.promperu.gob.pe/ruta/detalle/4424/4431" }
    ]},
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
                <CardDescription>Rutas de Transporte Terrestre Internas en Perú hacia Puertos y Fronteras</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-muted-foreground">
                Estas rutas muestran conexiones clave desde distintas ciudades hacia los principales puertos y fronteras para la exportación.
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
                        {rutasPeruData.flatMap((ruta, index) =>
                            ruta.destinos.map((destino, destinoIndex) => (
                                <TableRow key={`${index}-${destinoIndex}`}>
                                    {destinoIndex === 0 && (
                                        <>
                                            <TableCell rowSpan={ruta.destinos.length} className="font-medium align-top">{ruta.origen}</TableCell>
                                            <TableCell rowSpan={ruta.destinos.length} className="align-top">{ruta.departamento}</TableCell>
                                        </>
                                    )}
                                    <TableCell>
                                        <Button asChild variant="link" className="p-0 h-auto">
                                            <a href={destino.puertoLink} target="_blank" rel="noopener noreferrer">
                                                {destino.puerto} <ExternalLink className="ml-1 h-3 w-3" />
                                            </a>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button asChild variant="outline" size="sm">
                                            <a href={destino.carreteraLink} target="_blank" rel="noopener noreferrer">
                                                Ver Detalle
                                            </a>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
