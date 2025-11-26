
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-2 w-64 rounded-lg bg-card p-4 text-sm text-card-foreground shadow-lg md:w-80"
            >
              <p>
                Soy LauraTerraLogix, tu asistente de logística. ¡Pregúntame lo que necesites!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="h-14 w-14 rounded-full shadow-lg"
              aria-label="Toggle assistant"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={isOpen ? "x" : "truck"}
                  initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Truck className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="mb-2">
            <p>¿Tienes dudas? Aquí está LauraTerraLogix</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
