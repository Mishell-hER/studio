"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLoginModal } from '@/hooks/use-login-modal';
import Link from 'next/link';

export function LoginModal() {
  const router = useRouter();
  const auth = useAuth();
  const { isOpen, onClose, onOpen } = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError('Servicio de autenticación no disponible.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      router.push('/forum'); // Redirigir al foro después del login
    } catch (err: any) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      console.error(err);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Ingresa tus credenciales para acceder a tu cuenta.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link 
              href="/register" 
              className="font-medium text-primary hover:underline"
              onClick={onClose}
            >
              Regístrate
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
