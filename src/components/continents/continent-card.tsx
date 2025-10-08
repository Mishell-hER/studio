import type { FC, SVGProps } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type ContinentCardProps = {
  name: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
};

export function ContinentCard({ name, Icon }: ContinentCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link href={`/continent/${slug}`} className="group block">
      <Card className="h-full border-2 border-border bg-card/50 backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
          <div className="relative h-24 w-24 text-muted-foreground transition-colors group-hover:text-primary">
            <Icon className="h-full w-full" />
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-semibold text-card-foreground">
              {name}
            </h3>
            <ArrowRight className="h-6 w-6 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
