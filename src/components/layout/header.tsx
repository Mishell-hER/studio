"use client";
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {

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
            {/* Aquí podrían ir otros elementos como un botón de login */}
          </nav>
        </div>
      </div>
    </header>
  );
}
