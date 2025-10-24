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
      { text: 'Formato DUA Excel - SUNAT', url: 'https://www.sunat.gob.pe/operatividadaduanera/fast/estructuras/Formato-OMA-DAM-Ingreso-v2.xlsx' },
      { text: 'Estructuras DUA Exportación', url: 'https://www.sunat.gob.pe/legislacion/nuevoSigad/2009/noviembre/pp251109/DuatransaccionCCL08B.xls' },
    ],
    Guías: [
      { text: 'Instructivo Llenado DUA', url: 'https://www.youtube.com/watch?v=d_PayZ6lWCk' },
    ],
    Observaciones:
      'El DUA consta de 8 ejemplares totales, pero solo se usan 3 para exportación. Se requiere para exportaciones mayores a $5,000 USD.',
  },
  {
    Documento: 'Carta de Porte CMR (Terrestre)',
    Formato: [
      { text: 'Formato CMR Internacional', url: 'https://drive.google.com/uc?export=download&id=16wH1jFpjN_Ns3vxk5faQth1aaK8YUJt5' },
    ],
    Guías: [
      { text: 'Guía Carta de Porte CMR', url: 'https://www.diariodelexportador.com/2018/05/documento-de-transporte-terrestre-carta.html' },
    ],
    Observaciones: 'Obligatorias 4 copias firmadas según Convenio CMR (Transporte Terrestre).',
  },
  {
    Documento: 'Factura Comercial',
    Formato: [
      { text: 'Plantilla Factura Exportación', url: 'https://drive.google.com/uc?export=download&id=1h39z9rMB_e0VQB6esInRPaDFvInmviJj' },
    ],
    Guías: [
      { text: 'Requisitos Documentación', url: 'https://www.youtube.com/watch?v=U6qxapAVtms' },
    ],
    Observaciones: 'Se requiere copia SUNAT o representación impresa de factura electrónica.',
  },
  {
    Documento: 'Lista de Empaque (Packing List)',
    Formato: [{ text: 'Plantilla Packing List', url: 'https://drive.google.com/uc?export=download&id=1h39z9rMB_e0VQB6esInRPaDFvInmviJj' }],
    Guías: [{ text: 'Guía Lista Empaque', url: 'https://www.youtube.com/watch?v=tbfiZt2ORHE' }],
    Observaciones: 'Obligatoria. Detalla contenido, peso, medidas de cada bulto.',
  },
  {
    Documento: 'Declaración Jurada de Flete',
    Formato: [
      { text: 'Formato Declaración Transporte', url: 'https://drive.google.com/uc?export=download&id=1pvrUGoi2dYLQ1EGSOOPOFXCUYcLdxfpP' },
    ],
    Guías: [
        { text: 'Orientación SUNAT', url: 'https://www.sunat.gob.pe/orientacionaduanera/exportacion/requisitosEx.html' },
    ],
    Observaciones: 'Cuando corresponda según tipo de operación.',
  },
  {
    Documento: 'Documentos de Control (Mercancías Restringidas)',
    Formato: [
        { text: 'Portal VUCE', url: 'https://www.vuce.gob.pe/' },
    ],
    Guías: [
        { text: 'Orientación VUCE', url: 'https://www.vuce.gob.pe/manual_vuce/insertos/como_usar_vuce.pdf' },
    ],
    Observaciones: 'Los documentos se emiten digitalmente a través de VUCE.',
  },
  {
    Documento: 'Mandato Electrónico',
    Formato: [
      { text: 'Requisitos para Portal SUNAT - Mandato Electrónico', url: 'https://www.sunat.gob.pe/orientacionaduanera/exportacion/requisitos.html' },
    ],
    Guías: [
      { text: 'Video Mandato Electrónico', url: 'https://www.youtube.com/watch?v=WYdJh-IeWdQ' },
    ],
    Observaciones: 'Válido por periodo máximo de 1 año o por documento de transporte específico.',
  },
  {
    Documento: 'Declaración Simplificada de Exportación (DSE)',
    Formato: [{ text: 'Requisitos para DSE en Intendencias de Aduana', url: 'https://www.gob.pe/1134-despacho-simplificado-de-exportacion-despacho-simplificado-de-exportacion-tramitado-por-el-exportador' }],
    Guías: [
        { text: 'Trámite DSE', url: 'https://www.sunat.gob.pe/orientacionaduanera/despsimpimportacion/tramiteAduanero.html' },
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
