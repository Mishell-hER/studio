"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

export function LoginModal() {
  const loginModal = useLoginModal();
  const auth = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !email) {
        toast({ variant: 'destructive', title: "Error", description: "Por favor, introduce un correo electrónico." });
        return;
    }

    setIsLoading(true);

    const actionCodeSettings = {
      // URL a la que se redirigirá al usuario después de hacer clic en el enlace.
      // El dominio debe estar autorizado en la consola de Firebase.
      url: `${window.location.origin}/finish-login`,
      // Esto debe ser verdadero para que el flujo se complete en la app.
      handleCodeInApp: true,
    };
    
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        setIsLinkSent(true);
        toast({
            title: "Enlace enviado",
            description: "Revisa tu correo electrónico para el enlace de inicio de sesión.",
        });
    } catch (error: any) {
        console.error("Error al enviar el enlace de inicio de sesión:", error);
        let description = "Ocurrió un error. Por favor, inténtalo de nuevo.";
        if (error.code === 'auth/invalid-email') {
            description = "El correo electrónico no es válido.";
        }
        toast({
            variant: 'destructive',
            title: 'Error al enviar enlace',
            description,
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleClose = () => {
    loginModal.onClose();
    // Reiniciar estado cuando se cierra el modal
    setTimeout(() => {
        setIsLinkSent(false);
        setEmail('');
    }, 300);
  }

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bienvenido a LogisticX</DialogTitle>
           <DialogDescription>
            {isLinkSent 
                ? "Te hemos enviado un enlace mágico a tu correo. Haz clic en él para iniciar sesión."
                : "Introduce tu correo electrónico para recibir un enlace de inicio de sesión. No se necesita contraseña."
            }
          </DialogDescription>
        </DialogHeader>

        {isLinkSent ? (
            <div className="py-8 text-center">
                <p className="text-lg">🎉 ¡Revisa tu bandeja de entrada!</p>
            </div>
        ) : (
            <form onSubmit={handleEmailSignIn}>
                <div className="py-4">
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email-signin">Correo Electrónico</Label>
                            <Input 
                                id="email-signin" 
                                type="email"
                                placeholder="tu@correo.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Enviar Enlace de Acceso'}
                    </Button>
                </DialogFooter>
            </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
