import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

type LinkInfo = {
  text: string;
  url: string;
};

const documentosData: Array<{
  Documento: string;
  Formato: LinkInfo[];
  Guías: LinkInfo[];
  Observaciones: string;
}> = [
  {
    Documento: 'Declaración Única de Aduanas (DUA)',
    Formato: [
      { text: 'Formato DUA Excel - SUNAT', url: 'https://www.google.com/search?q=Formato+DUA+Excel+SUNAT' },
      { text: 'Estructuras DUA Exportación', url: 'https://www.google.com/search?q=Estructuras+DUA+Exportaci%C3%B3n' },
    ],
    Guías: [
      { text: 'Instructivo Llenado DUA', url: 'https://www.google.com/search?q=Instructivo+Llenado+DUA' },
      { text: 'Manual Declaración Aduanera', url: 'https://www.google.com/search?q=Manual+Declaraci%C3%B3n+Aduanera' },
    ],
    Observaciones:
      'El DUA consta de 8 ejemplares totales, pero solo se usan 3 para exportación. Se requiere para exportaciones mayores a $5,000 USD.',
  },
  {
    Documento: 'Carta de Porte CMR (Terrestre)',
    Formato: [
      { text: 'Formato CMR Internacional', url: 'https://www.google.com/search?q=Formato+CMR+Internacional' },
      { text: 'Plantilla CMR Excel', url: 'https://www.google.com/search?q=Plantilla+CMR+Excel' },
    ],
    Guías: [
      { text: 'Guía Carta de Porte CMR', url: 'https://www.google.com/search?q=Gu%C3%ADa+Carta+de+Porte+CMR' },
      { text: 'Manual CMR', url: 'https://www.google.com/search?q=Manual+CMR' },
    ],
    Observaciones: 'Obligatorias 4 copias firmadas según Convenio CMR (Transporte Terrestre).',
  },
  {
    Documento: 'Factura Comercial',
    Formato: [
      { text: 'Plantilla Factura Exportación', url: 'https://www.google.com/search?q=Plantilla+Factura+Exportaci%C3%B3n' },
      { text: 'Portal SUNAT - Factura Electrónica', url: 'https://www.sunat.gob.pe/sol.html' },
    ],
    Guías: [
      { text: 'Requisitos Documentación', url: 'https://www.google.com/search?q=Requisitos+Documentaci%C3%B3n+Factura+Comercial+Exportaci%C3%B3n' },
      { text: 'Orientación SUNAT', url: 'https://orientacion.sunat.gob.pe/index.php/empresas-menu/comprobantes-de-pago-empresas/comprobantes-de-pago-fisicos-empresas/factura' },
    ],
    Observaciones: 'Se requiere copia SUNAT o representación impresa de factura electrónica.',
  },
  {
    Documento: 'Lista de Empaque (Packing List)',
    Formato: [{ text: 'Plantilla Packing List Excel', url: 'https://www.google.com/search?q=Plantilla+Packing+List+Excel' }],
    Guías: [{ text: 'Instrucciones de llenado', url: 'https://www.google.com/search?q=Instrucciones+de+llenado+Packing+List' }],
    Observaciones: 'Obligatoria. Detalla contenido, peso, medidas de cada bulto.',
  },
  {
    Documento: 'Declaración Jurada de Flete',
    Formato: [
      { text: 'Formato Declaración Transporte', url: 'https://www.google.com/search?q=Formato+Declaraci%C3%B3n+Transporte' },
      { text: 'Formulario SUNAT', url: 'https://www.google.com/search?q=Formulario+SUNAT+Declaraci%C3%B3n+Jurada+de+Flete' },
    ],
    Guías: [
        { text: 'Orientación SUNAT', url: 'https://orientacion.sunat.gob.pe/' },
        { text: 'Instructivos SUNAT', url: 'https://www.sunat.gob.pe/legislacion/procedim/despacho/exportacion/definitiva/proc-general/despa-pg.02.htm' },
    ],
    Observaciones: 'Cuando corresponda según tipo de operación.',
  },
  {
    Documento: 'Documentos de Control (Mercancías Restringidas)',
    Formato: [
        { text: 'Portal VUCE', url: 'https://www.vuce.gob.pe/' },
        { text: 'Sistema VUCE', url: 'https://www.vuce.gob.pe/Paginas/Buscador.aspx' },
    ],
    Guías: [
        { text: 'Manual VUCE', url: 'https://www.vuce.gob.pe/manuales/Manual_SENASA_M04_VUCE.pdf' },
        { text: 'Guía VUCE', url: 'https://www.vuce.gob.pe/Paginas/Que-es-la-VUCE.aspx' },
    ],
    Observaciones: 'Los documentos se emiten digitalmente a través de VUCE.',
  },
  {
    Documento: 'Mandato Electrónico',
    Formato: [
      { text: 'Portal SUNAT - Mandato Electrónico', url: 'https://www.sunat.gob.pe/operatividadaduanera/aduanas/mandatoelectronico/' },
      { text: 'Sistema SUNAT en línea', url: 'https://www.sunat.gob.pe/sol.html' },
    ],
    Guías: [
      { text: 'Video Mandato Electrónico', url: 'https://www.youtube.com/watch?v=1bYR-mdeI9Y' },
      { text: 'Orientación Mandato', url: 'https://www.sunat.gob.pe/operatividadaduanera/aduanas/mandatoelectronico/index.html#iv' },
    ],
    Observaciones: 'Válido por periodo máximo de 1 año o por documento de transporte específico.',
  },
  {
    Documento: 'Declaración Simplificada de Exportación (DSE)',
    Formato: [{ text: 'Formato DSE en Intendencias de Aduana', url: 'https://www.google.com/search?q=Formato+DSE+en+Intendencias+de+Aduana' }],
    Guías: [
        { text: 'Orientación DSE', url: 'https://www.gob.pe/137-solicitar-la-declaracion-simplificada-de-exportacion-dse' },
        { text: 'Trámite DSE', url: 'https://www.gob.pe/137-solicitar-la-declaracion-simplificada-de-exportacion-dse' },
    ],
    Observaciones: 'Para exportaciones hasta $5,000 USD.',
  },
];

const renderLinks = (links: LinkInfo[]) => (
  <div className="flex flex-col space-y-2">
    {links.map((link, index) => (
      <Button key={index} asChild variant="link" className="p-0 h-auto justify-start text-left whitespace-normal">
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.text}
          <ExternalLink className="ml-1 h-3 w-3 shrink-0" />
        </a>
      </Button>
    ))}
  </div>
);

export function DocumentsPage() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm mt-4">
      <CardHeader>
        <CardTitle>Documentos para Exportar 📄</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">Documentos de Exportación (Fuente: Documentos para exportar.csv)</p>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Formato para Llenar</TableHead>
                <TableHead>Guías de Llenado</TableHead>
                <TableHead>Observaciones Relevantes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosData.map((doc) => (
                <TableRow key={doc.Documento}>
                  <TableCell className="font-medium">{doc.Documento}</TableCell>
                  <TableCell>{renderLinks(doc.Formato)}</TableCell>
                  <TableCell>{renderLinks(doc.Guías)}</TableCell>
                  <TableCell>{doc.Observaciones}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
