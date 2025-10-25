import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { BackgroundAnimation } from '@/components/layout/background-animation';
import { FloatingAssistant } from '@/components/layout/floating-assistant';

export const metadata: Metadata = {
  title: 'LogisticX',
  description: 'Centro de información sobre logística y comercio global.',
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
      <body className={cn('font-body antialiased')}>
        <BackgroundAnimation />
        <div className="relative z-10 flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <FloatingAssistant />
      </body>
    </html>
  );
}
