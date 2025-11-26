
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
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseInstances } from '@/firebase/client';

export function LoginModal() {
  const loginModal = useLoginModal();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  // Esta función maneja el flujo de inicio de sesión con Google.
  async function call_login_google() {
    const { googleProvider } = getFirebaseInstances();
    if (!auth || !firestore || !googleProvider) {
      toast({ variant: 'destructive', title: "Error de configuración", description: "La autenticación no está disponible en este momento." });
      return;
    }
    
    setIsLoading(true);

    try {
      // 1. Llama a la ventana emergente de Google usando signInWithPopup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2. Verificar si el usuario ya existe en Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // 3. Si el usuario es nuevo, crear su perfil en Firestore
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
        // 4. Si el usuario ya existe, solo mostrar un mensaje de bienvenida
        toast({
            title: `¡Bienvenido/a de nuevo, ${user.displayName}!`,
            description: 'Has iniciado sesión correctamente.',
        });
      }
      
      // 5. Cerrar el modal
      loginModal.onClose();

    } catch (error: any) {
      // 6. Manejo de errores de Firebase
      console.error("Error en el inicio de sesión con Google:", error);
      let description = "Ocurrió un error inesperado.";
      
      if (error.code === 'auth/popup-blocked') {
        description = "El navegador bloqueó la ventana emergente. Por favor, habilita las ventanas emergentes para este sitio e inténtalo de nuevo.";
      } else if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        description = "Has cancelado el inicio de sesión con Google.";
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        description = "Ya existe una cuenta con este correo electrónico pero con un método de acceso diferente.";
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

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bienvenido a LogisticX</DialogTitle>
           <DialogDescription>
            Usa tu cuenta de Google para acceder a la plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
            <Button onClick={call_login_google} className="w-full" disabled={isLoading}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 54.7l-73.2 67.7C309.6 99.8 280.7 84 248 84c-84.3 0-152.3 67.8-152.3 151.7S163.7 387.4 248 387.4c97.2 0 130.2-72.2 133.7-109.4H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión con Google'}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
