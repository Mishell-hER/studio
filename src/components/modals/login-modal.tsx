"use client";

import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from '@/hooks/use-register-modal';
import { useToast } from '@/hooks/use-toast';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const auth = getAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!auth) {
        setError("El servicio de autenticación no está disponible.");
        setIsLoading(false);
        return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "¡Inicio de sesión exitoso!",
        description: "Has accedido a tu cuenta correctamente.",
      });
      loginModal.onClose();
      setEmail('');
      setPassword('');

    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setError('El correo o la contraseña son incorrectos.');
      } else {
        setError('No se pudo iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    if (!firestore || !auth) {
      toast({ variant: 'destructive', title: "Error", description: "El servicio no está disponible." });
      return;
    }
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          nombre: user.displayName?.split(' ')[0] || '',
          apellido: user.displayName?.split(' ').slice(1).join(' ') || '',
          username: user.email?.split('@')[0] || `user${Math.floor(Math.random() * 1000)}`,
          correo: user.email,
          photoURL: user.photoURL,
          esEmpresario: false,
        }, { merge: true });
      }
      
      toast({ title: "¡Sesión iniciada con éxito!" });
      loginModal.onClose();
    } catch (error: any) {
      console.error("Error durante el inicio de sesión con Google:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
          toast({ variant: 'destructive', title: "Error al iniciar sesión", description: "Hubo un problema al iniciar sesión con Google." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>Ingresa tus credenciales para acceder a tu cuenta.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEmailPasswordSignIn} className="space-y-4">
            <Input 
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
            />
            <Input 
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
        </form>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                O continuar con
                </span>
            </div>
        </div>

        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={isLoading}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" role="img" aria-label="Logo de Google"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A8 9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.591 44 30.134 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>
          Google
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Button variant="link" className="px-0" onClick={onToggle}>
            Regístrate aquí
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
