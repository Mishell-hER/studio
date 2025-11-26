
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, LogOut, Star } from 'lucide-react';
import { useLocalAuth } from '@/hooks/use-local-auth';
import { useLoginModal } from '@/hooks/use-login-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const LOCAL_STORAGE_GAME_KEY = 'localGameProgress';

export function Header() {
  const { user, logoutLocal } = useLocalAuth();
  const loginModal = useLoginModal();
  const [gameLevel, setGameLevel] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      const storedProgress = localStorage.getItem(`${LOCAL_STORAGE_GAME_KEY}_${user.uid}`);
      if (storedProgress) {
        const progress = JSON.parse(storedProgress);
        setGameLevel(progress.highestLevelCompleted + 1);
      } else {
        setGameLevel(1);
      }
    } else {
      setGameLevel(null);
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span className="font-bold sm:inline-block">
              LogisticX
            </span>
          </Link>
        </div>
       
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.nombre?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.nombre}</p>
                     {gameLevel !== null && (
                      <p className="text-xs leading-none text-muted-foreground flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400"/>
                        Nivel de Juego: {gameLevel}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutLocal}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={loginModal.onOpen}>
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
