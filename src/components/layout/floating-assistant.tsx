
"use client";
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAssistant = () => setIsOpen(!isOpen);

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
        {!isOpen && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleAssistant}
                className="h-14 w-14 rounded-full shadow-lg"
                aria-label="Open assistant"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="mb-2">
              <p>¿Tienes dudas? Aquí está LauraTerraLogix</p>
            </TooltipContent>
          </Tooltip>
        )}

        {isOpen && (
          <Card className="w-80 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>LauraTerraLogix</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAssistant}
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Soy LauraTerraLogix, tu asistente de logística. ¡Pregúntame lo que necesites!
              </CardDescription>
              {/* Aquí podrías añadir una interfaz de chat en el futuro */}
            </CardContent>
            <CardFooter>
                 <Button asChild className="w-full">
                    <a href="https://www.stack-ai.com/chat/692769ff00181065764b1de9-0oQUbHnOHf1fBGiWhffQZ6" target="_blank" rel="noopener noreferrer">
                        Chatear con la IA
                    </a>
                </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
