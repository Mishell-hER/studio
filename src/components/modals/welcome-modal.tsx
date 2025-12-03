
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWelcomeModal } from '@/hooks/use-welcome-modal';

export function WelcomeModal() {
  const { isOpen, onClose } = useWelcomeModal();

  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleViewInstructions = () => {
    // Redirigir a la URL del instructivo. Por ahora, un placeholder.
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>¡Bienvenido/a a LogisticX!</DialogTitle>
          <DialogDescription>
            Es tu primera vez visitándonos, ¿te gustaría ver nuestro instructivo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleViewInstructions}>
            Ver Instructivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
