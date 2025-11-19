import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/ui/sidebar';
import { LoginModal } from '@/components/auth/login-modal';
import { ModalProvider } from '@/providers/modal-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'LogisticX',
  description: 'Tu centro de información para la logística de exportación.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(inter.variable, 'min-h-screen bg-background font-sans antialiased')}>
        <FirebaseClientProvider>
          <ModalProvider />
          <div className="flex min-h-screen">
            <Sidebar>
              <AppSidebar />
            </Sidebar>
            <main className="flex-1 flex-col p-4 md:p-8 overflow-y-auto ml-16">
              {children}
            </main>
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
