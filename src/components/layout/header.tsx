"use client";
import Link from 'next/link';
import { Globe } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span className="font-bold sm:inline-block">
              LogisticX
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-6">
            <Link
              href="/forum"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Foro
            </Link>
          </nav>
        </div>
       
        <div className="flex flex-1 items-center justify-end space-x-4">
           {/* User authentication elements removed */}
        </div>
      </div>
    </header>
  );
}
