
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Factory, Home, Ship, Truck, User, Warehouse, XCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const incotermsData = [
  { incoterm: 'EXW', responsabilidadVendedor: 'Poner mercancía a disposición en sus instalaciones.', transferenciaRiesgo: 'En las instalaciones del vendedor.', seguro: false, transporte: false, comentarios: 'Máxima responsabilidad para el comprador. Ideal si el comprador tiene logística propia.' },
  { incoterm: 'FCA', responsabilidadVendedor: 'Entregar la mercancía al transportista designado por el comprador.', transferenciaRiesgo: 'Al entregar al transportista.', seguro: false, transporte: false, comentarios: 'Flexible y muy utilizado en transporte terrestre.' },
  { incoterm: 'CPT', responsabilidadVendedor: 'Pagar el transporte principal hasta el destino acordado.', transferenciaRiesgo: 'Al entregar al primer transportista.', seguro: false, transporte: true, comentarios: 'El vendedor contrata y paga el flete, pero el riesgo viaja por cuenta del comprador.' },
  { incoterm: 'CIP', responsabilidadVendedor: 'Pagar transporte y contratar un seguro de cobertura amplia (ICC A).', transferenciaRiesgo: 'Al entregar al primer transportista.', seguro: true, transporte: true, comentarios: 'Similar a CPT pero con seguro obligatorio a cargo del vendedor.' },
  { incoterm: 'DAP', responsabilidadVendedor: 'Entregar la mercancía en el lugar de destino, lista para la descarga.', transferenciaRiesgo: 'En el lugar de destino, antes de la descarga.', seguro: false, transporte: true, comentarios: 'El vendedor asume casi todos los riesgos y costos hasta el destino final.' },
  { incoterm: 'DPU', responsabilidadVendedor: 'Entregar la mercancía y descargarla en el lugar de destino acordado.', transferenciaRiesgo: 'Una vez la mercancía es descargada en destino.', seguro: false, transporte: true, comentarios: 'Único Incoterm donde el vendedor es responsable de la descarga.' },
  { incoterm: 'DDP', responsabilidadVendedor: 'Asumir todos los costos y riesgos, incluyendo trámites y pago de impuestos de importación.', transferenciaRiesgo: 'En el lugar de destino, lista para la entrega.', seguro: false, transporte: true, comentarios: 'Máxima responsabilidad para el vendedor. Riesgoso si no se conocen bien las aduanas del país de destino.' },
];

const processSteps = [
    { name: 'Fábrica del Vendedor', icon: Factory },
    { name: 'Transporte en Origen', icon: Truck },
    { name: 'Puerto/Terminal de Origen', icon: Ship },
    { name: 'Transporte Principal', icon: Truck },
    { name: 'Puerto/Terminal de Destino', icon: Warehouse },
    { name: 'Destino Final', icon: User },
];

const incotermResponsibilities: Record<string, number> = {
    'EXW': 0, // Vendedor solo en su fábrica
    'FCA': 1, // Vendedor hasta transporte en origen
    'CPT': 3, // Vendedor paga transporte principal, riesgo transfiere antes
    'CIP': 3, // Vendedor paga transporte principal + seguro, riesgo transfiere antes
    'DAP': 4, // Vendedor hasta destino, sin descargar
    'DPU': 5, // Vendedor hasta destino, descargado
    'DDP': 5, // Vendedor todo hasta destino
};


export default function IncotermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </Button>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tighter">¿Hay un Incoterm perfecto para el transporte terrestre?</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            En el comercio internacional, los INCOTERMS (Términos Internacionales de Comercio) definen las responsabilidades, costos y riesgos entre vendedores y compradores.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            No existe un incoterm perfecto para todas las situaciones, especialmente en el transporte terrestre, ya que la elección depende de factores como el tipo de mercancía, la relación comercial, la capacidad logística y los riesgos que ambas partes estén dispuestas a asumir.
          </p>

          <div>
            <h3 className="text-xl font-semibold mb-3">Incoterms Aplicables para Transporte Terrestre</h3>
            <p className="text-muted-foreground mb-4">
              Los principales Incoterms que se usan en transporte terrestre (camión y ferrocarril) son los siguientes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-primary">EXW (Ex Works):</strong> El vendedor solo pone la mercancía a disposición en su local; todo lo demás corre por cuenta del comprador.</li>
              <li><strong className="text-primary">FCA (Free Carrier):</strong> El vendedor entrega la mercancía al transportista o lugar convenido, asumiendo los costos hasta esa entrega.</li>
              <li><strong className="text-primary">CPT (Carriage Paid To):</strong> El vendedor paga el transporte principal hasta el destino acordado, pero el riesgo se transfiere cuando entrega al transportista.</li>
              <li><strong className="text-primary">CIP (Carriage and Insurance Paid To):</strong> Igual que CPT, pero el vendedor además contrata seguro con cobertura amplia.</li>
              <li><strong className="text-primary">DAP (Delivered at Place):</strong> El vendedor asume costos y riesgos hasta entregar la mercancía en el lugar convenido, pero no la descarga.</li>
              <li><strong className="text-primary">DPU (Delivered at Place Unloaded):</strong> Similar a DAP, pero incluye la descarga a cargo del vendedor.</li>
              <li><strong className="text-primary">DDP (Delivered Duty Paid):</strong> El vendedor asume todos los costos y riesgos, incluyendo impuestos y derechos de importación, hasta entregar la mercancía lista para recibir.</li>
            </ul>
          </div>
            
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-center mt-8">Gráfico de Responsabilidades (Vendedor vs Comprador)</h3>
            <div className="space-y-4">
            {Object.entries(incotermResponsibilities).map(([incoterm, sellerResponsibilityEnd]) => (
                <div key={incoterm} className="p-4 rounded-lg border bg-background/50">
                    <h4 className="font-bold text-lg text-primary mb-3">{incoterm}</h4>
                    <div className="relative w-full h-1 bg-muted rounded-full">
                        <div className="flex justify-between absolute w-full -top-3">
                            {processSteps.map((step, index) => (
                                <div key={index} className="relative flex flex-col items-center">
                                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", index <= sellerResponsibilityEnd ? "bg-primary" : "bg-secondary")}>
                                        <step.icon className="w-4 h-4 text-primary-foreground" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-8 text-xs text-center">
                        {processSteps.map((step, index) => (
                            <span key={index} className="w-1/6">{step.name}</span>
                        ))}
                    </div>
                     <div className="flex mt-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-primary"></div>
                            <span>Responsabilidad del Vendedor</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-secondary"></div>
                            <span>Responsabilidad del Comprador</span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>


          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center mt-8">Tabla Comparativa de Incoterms Terrestres</h3>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Incoterm</TableHead>
                    <TableHead>Responsabilidad del Vendedor</TableHead>
                    <TableHead>Transferencia del Riesgo</TableHead>
                    <TableHead className="text-center">Seguro Incluido</TableHead>
                    <TableHead className="text-center">Transporte Pagado</TableHead>
                    <TableHead>Comentarios</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incotermsData.map((item) => (
                    <TableRow key={item.incoterm}>
                      <TableCell className="font-bold text-primary">{item.incoterm}</TableCell>
                      <TableCell>{item.responsabilidadVendedor}</TableCell>
                      <TableCell>{item.transferenciaRiesgo}</TableCell>
                      <TableCell className="text-center">
                        {item.seguro ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-destructive mx-auto" />}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.transporte ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-destructive mx-auto" />}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.comentarios}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 mt-8">Consideraciones para Elegir el Incoterm</h3>
            <p className="text-muted-foreground">
              No existe un incoterm ideal, sino el que mejor se adapte a la operación comercial. Por ejemplo, EXW suele ser usado cuando el comprador tiene estructura para gestionar transporte completo, mientras que DDP es más riesgoso para el vendedor al asumir toda la responsabilidad y costos. INCOTERMS como CIP y CPT son mixtos y equilibran responsabilidades con la contratación de seguro o flete.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
