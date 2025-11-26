

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useLoginModal } from '@/hooks/use-login-modal';
import { useToast } from '@/hooks/use-toast';
import { useLocalAuth } from '@/hooks/use-local-auth';

export function LoginModal() {
  const loginModal = useLoginModal();
  const { toast } = useToast();
  const { loginLocal } = useLocalAuth();
  
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (open: boolean) => {
    if (!open) {
      loginModal.onClose();
    }
  };

  const handleLocalLogin = async () => {
    const nombreTemporal = `Usuario-${Math.floor(Math.random() * 1000)}`;

    setIsLoading(true);
    try {
        loginLocal(nombreTemporal);
        
        toast({
            title: '¡Bienvenido/a!',
            description: `Has iniciado sesión como: ${nombreTemporal}`,
        });
        
        loginModal.onClose();

    } catch (error) {
        console.error("Error en el login local:", error);
        toast({
            variant: 'destructive',
            title: 'Error de inicio de sesión',
            description: "No se pudo crear el perfil local.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Crea un perfil temporal para acceder a todas las funciones.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button onClick={handleLocalLogin} className="w-full" disabled={isLoading}>
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión (Temporal)'}
          </Button>
          <p className="text-sm text-center text-muted-foreground px-4">
            El inicio de sesión temporal te permite usar la aplicación sin necesidad de una cuenta de Firebase, guardando tu progreso en este navegador.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
