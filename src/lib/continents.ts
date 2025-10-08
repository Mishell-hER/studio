import type { FC, SVGProps } from 'react';
import { AfricaIcon } from '@/components/icons/AfricaIcon';
import { AsiaIcon } from '@/components/icons/AsiaIcon';
import { EuropeIcon } from '@/components/icons/EuropeIcon';
import { NorthAmericaIcon } from '@/components/icons/NorthAmericaIcon';
import { OceaniaIcon } from '@/components/icons/OceaniaIcon';
import { SouthAmericaIcon } from '@/components/icons/SouthAmericaIcon';
import { Globe } from 'lucide-react';

export type ContinentInfo = {
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  slug: string;
};

export const continents: ContinentInfo[] = [
  { name: 'América Centro-Norte', icon: NorthAmericaIcon, slug: 'north-america' },
  { name: 'América del Sur', icon: SouthAmericaIcon, slug: 'south-america' },
  { name: 'Europa', icon: EuropeIcon, slug: 'europe' },
  { name: 'Asia', icon: AsiaIcon, slug: 'asia' },
  { name: 'África', icon: AfricaIcon, slug: 'africa' },
  { name: 'Oceanía', icon: OceaniaIcon, slug: 'oceania' },
  { name: 'Otros Países', icon: Globe, slug: 'otros' },
];
