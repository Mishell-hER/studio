
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
import { useAuth, useFirestore } from '@/firebase';
import { sendSignInLinkToEmail, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Separator } from '../ui/separator';
import { getFirebaseInstances } from '@/firebase/client';

export function LoginModal() {
  const loginModal = useLoginModal();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);

  async function call_login_google() {
    const { googleProvider } = getFirebaseInstances();
    if (!auth || !firestore || !googleProvider) {
      toast({ variant: 'destructive', title: "Error", description: "Firebase no está disponible." });
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const username = user.email?.split('@')[0] || `user${Date.now()}`;
        const nameParts = user.displayName?.split(' ') || [username];
        
        await setDoc(userDocRef, {
            uid: user.uid,
            nombre: nameParts[0],
            apellido: nameParts.slice(1).join(' ') || '',
            username: username,
            correo: user.email,
            photoURL: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
            esEmpresario: false,
            createdAt: serverTimestamp()
        });

         toast({
            title: '¡Bienvenido/a!',
            description: 'Hemos creado un perfil básico para ti.',
        });
      } else {
        toast({
            title: `¡Bienvenido/a de nuevo, ${user.displayName}!`,
            description: 'Has iniciado sesión correctamente.',
        });
      }
      
      loginModal.onClose();

    } catch (error: any) {
      console.error("Error durante el inicio de sesión con Google:", error);
      let description = "Ocurrió un error inesperado.";
       if (error.code === 'auth/popup-blocked') {
        description = "El navegador bloqueó la ventana emergente. Por favor, habilita las ventanas emergentes para este sitio e inténtalo de nuevo.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        description = "Has cancelado el inicio de sesión con Google.";
      }
       toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión',
        description,
      });
    } finally {
        setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !email) {
        toast({ variant: 'destructive', title: "Error", description: "Por favor, introduce un correo electrónico." });
        return;
    }

    setIsLoading(true);

    const actionCodeSettings = {
      url: `${window.location.origin}/finish-login`,
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
        } else if (error.code === 'auth/api-key-not-valid') {
          description = "Error de configuración. La clave de API de Firebase no es válida.";
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
                : "Inicia sesión con Google o usa tu correo para recibir un enlace de acceso."
            }
          </DialogDescription>
        </DialogHeader>

        {isLinkSent ? (
            <div className="py-8 text-center">
                <p className="text-lg">🎉 ¡Revisa tu bandeja de entrada!</p>
            </div>
        ) : (
            <div className="space-y-4">
                <Button onClick={call_login_google} className="w-full" disabled={isLoading}>
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 54.7l-73.2 67.7C309.6 99.8 280.7 84 248 84c-84.3 0-152.3 67.8-152.3 151.7S163.7 387.4 248 387.4c97.2 0 130.2-72.2 133.7-109.4H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                    Iniciar Sesión con Google
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                        O continúa con
                        </span>
                    </div>
                </div>

                <form onSubmit={handleEmailSignIn}>
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
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <DialogFooter className='mt-4'>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Enviando...' : 'Enviar Enlace de Acceso'}
                        </Button>
                    </DialogFooter>
                </form>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
