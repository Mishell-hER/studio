'use client';
import Link from 'next/link';
import { Globe, LogOut } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { useAuth } from '@/firebase/provider';
import { useLoginModal } from '@/hooks/use-login-modal';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { Button } from '../ui/button';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Header() {
  const { user, userProfile } = useUser();
  const auth = useAuth();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  
  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
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
           {auth && user ? (
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={user.photoURL || userProfile?.photoURL || ''} />
                  <AvatarFallback>{userProfile?.nombre?.charAt(0).toUpperCase() || user.displayName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <span className='text-sm font-medium hidden sm:inline'>{userProfile?.nombre || user.displayName}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Cerrar sesión">
                <LogOut className='h-5 w-5' />
              </Button>
            </div>
           ) : (
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => loginModal.onOpen()}>Iniciar Sesión</Button>
              <Button onClick={() => registerModal.onOpen()}>Registrarse</Button>
            </nav>
           )}
        </div>
      </div>
    </header>
  );
}
