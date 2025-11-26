
"use client";

import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingAssistant() {
  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              className="h-14 w-14 rounded-full shadow-lg"
              aria-label="Open assistant"
            >
              <a href="https://www.stack-ai.com/chat/692769ff00181065764b1de9-0oQUbHnOHf1fBGiWhffQZ6" target="_blank" rel="noopener noreferrer">
                <Truck className="h-6 w-6" />
              </a>
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
