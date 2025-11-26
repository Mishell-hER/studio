import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { continents } from '@/lib/continents';
import { CreatorsSection } from '@/components/sections/creators-section';
import { firebaseConfig } from '@/firebase/config';


function ConfigWarningBanner() {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_VALOR_AQUI") {
    return null;
  }

  return (
    <div className="w-full bg-yellow-500/20 border-l-4 border-yellow-500 text-yellow-200 p-4 fixed top-14 left-0 z-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm">
            <strong>Atención:</strong> La configuración de Firebase no es válida.
            Por favor, actualiza el archivo <strong>`src/firebase/config.ts`</strong> con tus credenciales de proyecto para habilitar el inicio de sesión y otras funciones.
          </p>
        </div>
      </div>
    </div>
  );
}


export default function Home() {
  const isConfigMissing = !firebaseConfig.apiKey || firebaseConfig.apiKey === "TU_VALOR_AQUI";
  return (
    <>
      <ConfigWarningBanner />
      <div className={`flex flex-col items-center justify-center min-h-screen p-4 md:p-8 ${isConfigMissing ? 'pt-24' : ''}`}>
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
          {continents.map((continent) => (
            <Link
              href={`/continent/${continent.slug}`}
              key={continent.slug}
              className="block transform transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg group"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary border-2 border-transparent transition-colors duration-300">
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
            </Link>
          ))}
        </div>
      </div>
      <CreatorsSection />
    </>
  );
}
