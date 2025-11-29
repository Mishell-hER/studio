
"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Sidebar } from '@/components/ui/sidebar';
import { ModalProvider } from '@/providers/modal-provider';
import { LocalAuthContext, type LocalUserProfile, type LocalAuthContextType } from '@/hooks/use-local-auth';
import { FloatingAssistant } from '@/components/layout/floating-assistant';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const LOCAL_STORAGE_KEY = 'localUserAuth';

function LocalUserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<LocalUserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const loginLocal = (nombreElegido: string) => {
        // Primero, verifica si ya existe un usuario para evitar crear uno nuevo
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUser) {
            const existingUser = JSON.parse(storedUser);
            // Si el nombre es diferente, actualízalo
            if (existingUser.nombre !== nombreElegido) {
                existingUser.nombre = nombreElegido;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingUser));
            }
            setUser(existingUser);
            return existingUser;
        }

        const newUid = uuidv4();
        const newUser: LocalUserProfile = {
            uid: newUid,
            nombre: nombreElegido,
        };
        
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
    };

    const logoutLocal = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        // También borramos el progreso del juego al cerrar sesión
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('localGameProgress_')) {
                localStorage.removeItem(key);
            }
        });
        setUser(null);
    };

    const value: LocalAuthContextType = { user, isLoading, loginLocal, logoutLocal };

    return (
        <LocalAuthContext.Provider value={value}>
            {children}
        </LocalAuthContext.Provider>
    );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={cn(inter.variable, 'min-h-screen bg-background font-sans antialiased')}>
        <LocalUserProvider>
          <ModalProvider />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              <div className="flex min-h-screen">
                <Sidebar>
                  <AppSidebar />
                </Sidebar>
                <main className="flex-1 flex-col p-4 md:p-8 overflow-y-auto ml-16">
                  {children}
                </main>
              </div>
            </div>
          </div>
          <Toaster />
          <FloatingAssistant />
        </LocalUserProvider>
      </body>
    </html>
  );
}
