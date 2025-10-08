import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { BackgroundAnimation } from '@/components/layout/background-animation';

export const metadata: Metadata = {
  title: 'LogisticX',
  description: 'Global logistics and trade information hub.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
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
      </body>
    </html>
  );
}
