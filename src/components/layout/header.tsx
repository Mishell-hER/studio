'use client';
import Link from 'next/link';
import { Globe, LogIn, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useLoginModal } from '@/hooks/use-login-modal';
import { useUser } from '@/firebase/auth/use-user';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

export function Header() {
  const loginModal = useLoginModal();
  const { user, userProfile, loading } = useUser();
  const auth = useAuth();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    } else {
      console.error("Firebase Auth no está disponible para cerrar sesión.");
    }
  };

  const renderUserMenu = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
        </div>
      )
    }

    if (user && userProfile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile.photoURL} alt={userProfile.nombre} />
                <AvatarFallback>{userProfile.nombre?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userProfile.nombre} {userProfile.apellido}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  @{userProfile.username}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <nav className="flex items-center space-x-2">
        <Button variant="ghost" onClick={loginModal.onOpen}><LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión</Button>
      </nav>
    );
  };

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
            {renderUserMenu()}
        </div>
      </div>
    </header>
  );
}
