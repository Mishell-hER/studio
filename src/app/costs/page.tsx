import { CostsPage as CostsSection } from '@/components/sections/costs-page';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CostsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      <CostsSection />
    </div>
  );
}
