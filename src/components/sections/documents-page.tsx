import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const documentosData = [
    { Documento: "Declaración Única de Aduanas (DUA)", Formato: "Formato DUA Excel - SUNAT, Estructuras DUA Exportación", Guías: "Instructivo Llenado DUA, Manual Declaración Aduanera", Observaciones: "El DUA consta de 8 ejemplares totales, pero solo se usan 3 para exportación. Se requiere para exportaciones mayores a $5,000 USD." },
    { Documento: "Carta de Porte CMR (Terrestre)", Formato: "Formato CMR Internacional, Plantilla CMR Excel", Guías: "Guía Carta de Porte CMR, Manual CMR", Observaciones: "Obligatorias 4 copias firmadas según Convenio CMR (Transporte Terrestre)." },
    { Documento: "Factura Comercial", Formato: "Plantilla Factura Exportación, Portal SUNAT - Factura Electrónica", Guías: "Requisitos Documentación, Orientación SUNAT", Observaciones: "Se requiere copia SUNAT o representación impresa de factura electrónica." },
    { Documento: "Lista de Empaque (Packing List)", Formato: "Plantilla Packing List Excel", Guías: "Instrucciones de llenado", Observaciones: "Obligatoria. Detalla contenido, peso, medidas de cada bulto." },
    { Documento: "Declaración Jurada de Flete", Formato: "Formato Declaración Transporte, Formulario SUNAT", Guías: "Orientación SUNAT, Instructivos SUNAT", Observaciones: "Cuando corresponda según tipo de operación." },
    { Documento: "Documentos de Control (Mercancías Restringidas)", Formato: "Portal VUCE, Sistema VUCE", Guías: "Manual VUCE, Guía VUCE", Observaciones: "Los documentos se emiten digitalmente a través de VUCE." },
    { Documento: "Mandato Electrónico", Formato: "Portal SUNAT - Mandato Electrónico, Sistema SUNAT en línea", Guías: "Video Mandato Electrónico, Orientación Mandato", Observaciones: "Válido por periodo máximo de 1 año o por documento de transporte específico." },
    { Documento: "Declaración Simplificada de Exportación (DSE)", Formato: "Formato DSE en Intendencias de Aduana", Guías: "Orientación DSE, Trámite DSE", Observaciones: "Para exportaciones hasta $5,000 USD." }
];

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
                  <TableCell>{doc.Formato}</TableCell>
                  <TableCell>{doc.Guías}</TableCell>
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
