import type { FC, SVGProps } from 'react';
import { AfricaIcon } from '@/components/icons/AfricaIcon';
import { AsiaIcon } from '@/components/icons/AsiaIcon';
import { EuropeIcon } from '@/components/icons/EuropeIcon';
import { NorthAmericaIcon } from '@/components/icons/NorthAmericaIcon';
import { OceaniaIcon } from '@/components/icons/OceaniaIcon';
import { SouthAmericaIcon } from '@/components/icons/SouthAmericaIcon';

export type ContinentInfo = {
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
};

export const continents: ContinentInfo[] = [
  { name: 'North America', icon: NorthAmericaIcon },
  { name: 'South America', icon: SouthAmericaIcon },
  { name: 'Europe', icon: EuropeIcon },
  { name: 'Asia', icon: AsiaIcon },
  { name: 'Africa', icon: AfricaIcon },
  { name: 'Oceania', icon: OceaniaIcon },
];
