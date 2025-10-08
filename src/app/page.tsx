import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { continents } from '@/lib/continents';

export default function Home() {
  // Exclude 'Otros' from the main grid
  const mainContinents = continents.filter(c => c.slug !== 'otros');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
          Logística global, simplificada.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Navegue fácilmente por el comercio internacional. Seleccione un
          continente para explorar datos detallados de exportación, información
          aduanera y logística.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {mainContinents.map((continent) => (
          <Link href={`/continent/${continent.slug}`} key={continent.slug} legacyBehavior>
            <a className="block transform transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg">
              <Card className="h-full bg-card/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary border-2 border-transparent transition-colors duration-300 group">
                <CardHeader className="flex flex-col items-center justify-center text-center p-8 h-full">
                  <continent.icon className="w-16 h-16 mb-4 text-primary transition-colors" />
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {continent.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explorar <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardHeader>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
