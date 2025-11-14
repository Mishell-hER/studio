import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', 'font-body')}>
        <FirebaseClientProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1 flex-col p-4 md:p-8 overflow-y-auto">
              {children}
            </main>
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
