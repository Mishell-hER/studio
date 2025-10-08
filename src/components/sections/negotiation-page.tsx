import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const tips = {
    'América del Sur (General - Formal/Relacional)': "Las negociaciones son a menudo **formales** en la apertura, buscando rápidamente un **vínculo personal** (Argentina, Uruguay). La **puntualidad es flexible** en algunos países (Venezuela), mientras que en otros es importante (Uruguay). Se valora la **seguridad, la honestidad y la apertura al diálogo**.",
    'Asia (Formal/Jerárquica/Indirecta)': "Muy **formal, estructurada y jerárquica** (China, Uzbekistán). El estilo es **indirecto**, se evita el conflicto abierto y decir 'no' directamente. La **puntualidad es extremadamente estricta** (China, Vietnam). Las decisiones suelen ser colegiadas (Uzbekistán).",
    'Europa (Pragmática/Estructurada)': "Tiende a ser **formal y estructurada** (Suecia, Suiza). Se valora la **puntualidad estricta**, la **claridad** y el **pragmatismo**. Los argumentos deben estar bien preparados, basados en **cifras y datos**.",
    'Oceanía (Directa/Enfocada a Resultados)': "Negociación **práctica y enfocada en resultados** (Australia). El estilo es **directo y pragmático**. La **puntualidad es muy estricta**. Se valoran la **claridad y el cumplimiento de lo pactado**.",
    'América Centro-Norte (Relacional/Formal-Flexible)': "Negociación **relacional** (Centrada en la confianza). La formalidad puede variar, pero se espera **claridad y compromiso**. Fuerte control en fronteras puede ser un tema clave.",
};

export function NegotiationPage() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm mt-4">
      <CardHeader>
        <CardTitle>AI de Tips para Negociar (Consolidado) 🤝</CardTitle>
        <CardDescription>Guía de Negociación por Región</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Esta sección consolida las mejores prácticas de negociación de tus archivos, categorizadas por región:
        </p>
        <ul className="space-y-4">
            {Object.entries(tips).map(([region, tip]) => (
                <li key={region}>
                    <strong className='text-primary'>{region}:</strong>
                    <p className='text-muted-foreground text-sm' dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                </li>
            ))}
        </ul>
        <div className="mt-6 p-4 rounded-md bg-primary/10 border border-primary/50 text-primary-foreground">
          <strong>Recomendación:</strong> Siempre consulta el <strong>Tip de Negociación específico</strong> de cada país en la tabla de su continente, ya que hay variaciones culturales importantes.
        </div>
      </CardContent>
    </Card>
  );
}
