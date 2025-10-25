"use client";

import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:bottom-8 md:right-8">
      {/* Mensaje del asistente */}
      <div
        className={cn(
          "w-64 origin-bottom-right rounded-lg bg-card p-4 text-card-foreground shadow-lg transition-all duration-300 ease-in-out",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <p className="text-sm">
          Soy tu asistente, cualquier cosa que no entiendas, pregúntame.
        </p>
      </div>

      {/* Botón flotante */}
      <Button
        onClick={toggleAssistant}
        className={cn(
          "h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-primary/90 focus:scale-110 md:h-16 md:w-16",
          isOpen && "rotate-180"
        )}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
      >
        <div className={cn("absolute transition-opacity duration-200", isOpen ? "opacity-0" : "opacity-100")}>
            <MessageSquare className="h-6 w-6" />
        </div>
        <div className={cn("absolute transition-opacity duration-200", isOpen ? "opacity-100" : "opacity-0")}>
            <X className="h-6 w-6" />
        </div>
      </Button>
    </div>
  );
}
