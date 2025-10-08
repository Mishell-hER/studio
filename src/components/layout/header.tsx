import Link from 'next/link';
import { Globe } from 'lucide-react';

export function Header() {
  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          <Globe className="h-7 w-7" />
          <h1>LogisticX</h1>
        </Link>
      </div>
    </header>
  );
}
