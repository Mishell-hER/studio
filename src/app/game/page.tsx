
import { GameClient } from './_components/game-client';
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
import { Gamepad2 } from 'lucide-react';

export default function GamePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </Button>
      <Card className="bg-card/50 backdrop-blur-sm mt-4">
        <CardHeader className="text-center">
            <Gamepad2 className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl tracking-tighter">¿Sabes o Estás Perdido? El Juego de Logística</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
                Pon a prueba tus conocimientos de logística y comercio internacional. ¡Avanza de nivel y conviértete en un Maestro de Mercados!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <GameClient />
        </CardContent>
      </Card>
    </div>
  );
}
