
"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { sendSignInLinkToEmail, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Separator } from '../ui/separator';
import { googleProvider } from '@/firebase/client';
import { Input } from '../ui/input';

export function LoginModal() {
  const loginModal = useLoginModal();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  
  async function call_login_google() {
    if (!auth || !firestore || !googleProvider) {
      toast({ variant: 'destructive', title: "Error de configuración", description: "La autenticación no está disponible. Asegúrate de que las credenciales de Firebase son correctas." });
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
            nombre: nameParts[0] || '',
            apellido: nameParts.slice(1).join(' ') || '',
            username: username,
            correo: user.email,
            photoURL: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
            esEmpresario: false,
            createdAt: serverTimestamp()
        });

         toast({
            title: '¡Bienvenido/a a LogisticX!',
            description: 'Hemos creado un perfil para ti.',
        });

      } else {
        toast({
            title: `¡Bienvenido/a de nuevo, ${user.displayName}!`,
            description: 'Has iniciado sesión correctamente.',
        });
      }
      
      loginModal.onClose();

    } catch (error: any) {
      console.error("Error en el inicio de sesión con Google:", error);
      let description = "Ocurrió un error inesperado.";
      
      if (error.code === 'auth/popup-blocked') {
        description = "El navegador bloqueó la ventana emergente. Por favor, habilita las ventanas emergentes para este sitio e inténtalo de nuevo.";
      } else if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
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
  }

  const handleSendLink = async () => {
    if (!auth || !email) {
      toast({ variant: 'destructive', title: "Error", description: "Por favor, ingresa un correo electrónico." });
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
      toast({
        title: '¡Enlace enviado!',
        description: 'Revisa tu correo electrónico para acceder.',
      });
      setEmail('');
      loginModal.onClose();
    } catch (error: any) {
      console.error("Error al enviar el enlace:", error);
      toast({
        variant: 'destructive',
        title: 'Error al enviar enlace',
        description: error.message || "No se pudo enviar el enlace. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accede a LogisticX</DialogTitle>
           <DialogDescription>
            Usa un método de acceso rápido para continuar.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
            <Button onClick={call_login_google} className="w-full" disabled={isLoading}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 54.7l-73.2 67.7C309.6 99.8 280.7 84 248 84c-84.3 0-152.3 67.8-152.3 151.7S163.7 387.4 248 387.4c97.2 0 130.2-72.2 133.7-109.4H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                {isLoading ? 'Iniciando...' : 'Continuar con Google'}
            </Button>

            <div className="relative">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 top-[-10px] bg-background px-2 text-sm text-muted-foreground">O</span>
            </div>

            <div className="space-y-2">
                <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <Button onClick={handleSendLink} variant="secondary" className="w-full" disabled={isLoading || !email}>
                    {isLoading ? 'Enviando...' : 'Continuar con Correo'}
                </Button>
            </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
