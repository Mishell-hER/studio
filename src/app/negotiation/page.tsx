import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NegotiationPage() {
  // This page is not longer used directly, but we'll keep it for reference or future use.
  // The main negotiation link now points to an external site.
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Página de Negociación</h1>
        <p className="text-muted-foreground mb-6">
          El contenido principal sobre tips de negociación se ha movido a un recurso externo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
                <a href="https://www.stack-ai.com/chat/682b4dc30b7796295360567e-6QeSKcujmezlbXCeO4W9KF" target="_blank" rel="noopener noreferrer">
                    Ir al AI de Negociación
                </a>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
