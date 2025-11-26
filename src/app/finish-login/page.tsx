"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/provider';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function FinishLoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [message, setMessage] = useState("Validando enlace de inicio de sesión...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processSignIn = async () => {
      if (!auth || !window.location.href) {
        return;
      }

      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');

        if (!email) {
          // Si no encontramos el email, lo pedimos.
          // Esto previene ataques de "session fixation".
          email = window.prompt('Por favor, introduce tu correo electrónico para confirmar el inicio de sesión.');
        }

        if (!email) {
            setError("No se proporcionó un correo electrónico. No se puede completar el inicio de sesión.");
            setMessage("Error en el inicio de sesión.");
            return;
        }

        try {
          setMessage("Confirmando tu identidad...");
          await signInWithEmailLink(auth, email, window.location.href);
          
          window.localStorage.removeItem('emailForSignIn');

          toast({
            title: "¡Inicio de sesión exitoso!",
            description: "Has accedido a tu cuenta correctamente.",
          });
          
          setMessage("¡Todo listo! Redirigiendo...");
          
          // Redirige al usuario a la página de inicio.
          router.push('/');

        } catch (err: any) {
            console.error("Error al iniciar sesión con el enlace:", err);
            let userMessage = "Ocurrió un error. El enlace puede ser inválido o haber expirado.";
            if (err.code === 'auth/invalid-email') {
                userMessage = "El correo electrónico proporcionado no es válido.";
            } else if (err.code === 'auth/invalid-action-code') {
                userMessage = "El enlace de inicio de sesión ha expirado o ya fue utilizado. Por favor, solicita uno nuevo.";
            }
            setError(userMessage);
            setMessage("Error en el inicio de sesión.");
        }
      } else {
        setError("Este no es un enlace de inicio de sesión válido.");
        setMessage("Error en el enlace.");
      }
    };

    processSignIn();
  }, [auth, router, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Completando Inicio de Sesión</CardTitle>
          <CardDescription>
            Por favor, espera un momento mientras te damos acceso.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {error ? (
            <>
              <p className="text-center text-destructive">{error}</p>
              <button onClick={() => router.push('/')} className="text-sm text-primary underline">Volver al inicio</button>
            </>
          ) : (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">{message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
