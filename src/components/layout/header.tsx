"use client";

import { useUser, useAuth } from '@/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import Link from 'next/link';
import { Globe, LogIn } from 'lucide-react';


const provider = new GoogleAuthProvider();

export function Header() {
  const { user, loading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const handleSignIn = async () => {
    if (!auth) return;
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user && firestore) {
        // Create user profile in Firestore if it doesn't exist
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'normal',
          verified: false,
          continent: 'Desconocido'
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleSignOut = () => {
    if (auth) {
      signOut(auth);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span className="font-bold sm:inline-block">
              LogisticX
            </span>
          </Link>
        </div>
       
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {loading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'Usuario'} />
                      <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleSignIn} variant="secondary" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
