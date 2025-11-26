"use client";

import { useState, useEffect } from 'react';
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
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, type UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useAuth } from '@/firebase';

export function LoginModal() {
  const loginModal = useLoginModal();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!auth) return;
    setIsLoading(true);
    getRedirectResult(auth)
      .then(async (result: UserCredential | null) => {
        if (result) {
          const user = result.user;
          toast({ title: "¡Sesión iniciada con Google!" });

          if (firestore) {
            const userDocRef = doc(firestore, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                const username = user.email?.split('@')[0] || `user${Date.now()}`;
                const nameParts = user.displayName?.split(' ') || [''];
                await setDoc(userDocRef, {
                    uid: user.uid,
                    nombre: nameParts[0] || 'Usuario',
                    apellido: nameParts.slice(1).join(' ') || 'Google',
                    username: username,
                    correo: user.email,
                    photoURL: user.photoURL || '',
                    esEmpresario: false,
                    createdAt: serverTimestamp()
                }, { merge: true });
            }
          }
          loginModal.onClose();
        }
      })
      .catch((error) => {
        if (error.code === 'auth/popup-blocked') {
            toast({ variant: 'destructive', title: "Ventana bloqueada", description: "El pop-up de Google fue bloqueado por el navegador. Por favor, habilita las ventanas emergentes." });
        } else if (error.code !== 'auth/web-storage-unsupported') {
          console.error("Error durante el resultado de la redirección de Google:", error);
          toast({ variant: 'destructive', title: "Error de Google", description: "No se pudo completar el inicio de sesión." });
        }
      }).finally(() => {
        setIsLoading(false);
      });
  }, [auth, firestore, toast, loginModal]);

  const handleGoogleSignIn = () => {
    if (!auth) {
      toast({ variant: 'destructive', title: "Error", description: "El servicio de autenticación no está disponible." });
      return;
    }
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    signInWithRedirect(auth, provider);
  };

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bienvenido a LogisticX</DialogTitle>
          <DialogDescription>Inicia sesión con tu cuenta de Google para continuar.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full h-12 text-base" disabled={isLoading}>
                {isLoading ? 'Cargando...' : (
                    <>
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48" role="img" aria-label="Logo de Google"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A8 9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.591 44 30.134 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>
                        Iniciar Sesión con Google
                    </>
                )}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
