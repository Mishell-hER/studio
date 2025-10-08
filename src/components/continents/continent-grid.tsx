import { continents } from '@/lib/continents';
import { ContinentCard } from './continent-card';

export function ContinentGrid() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {continents.map((continent) => (
        <ContinentCard
          key={continent.name}
          name={continent.name}
          Icon={continent.icon}
        />
      ))}
    </div>
  );
}
