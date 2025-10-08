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
  { name: 'North America', icon: NorthAmericaIcon, slug: 'north-america' },
  { name: 'South America', icon: SouthAmericaIcon, slug: 'south-america' },
  { name: 'Europe', icon: EuropeIcon, slug: 'europe' },
  { name: 'Asia', icon: AsiaIcon, slug: 'asia' },
  { name: 'Africa', icon: AfricaIcon, slug: 'africa' },
  { name: 'Oceania', icon: OceaniaIcon, slug: 'oceania' },
  { name: 'Otros', icon: Globe, slug: 'otros' },
];
