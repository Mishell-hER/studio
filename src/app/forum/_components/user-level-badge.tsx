
'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const levelTitles = [
  "Novato Navegante", "Aprendiz Aterrizado", "Comerciante Curioso", "Exportador Ensayista",
  "Navegante Novato", "Vendedor Viajero", "Agente Agudo", "Comerciante Comedido",
  "Exportador Experimentado", "Tigre de Tráficas", "Piloto de Puertos", "Capitán de Carga",
  "Estratega de Exportación", "General de Aduanas", "Magnate Marítimo", "Maestro de Mercados",
  "Rey del Comercio", "Señor de la Logística", "Emperador Exportador", "Dios del Comercio Exterior",
];

const LOCAL_STORAGE_GAME_KEY = 'localGameProgress';

const levelColorClasses = Array.from({ length: 20 }, (_, i) => ({
  bg: `bg-[hsl(var(--level-${i + 1}-bg))]`,
  text: `text-[hsl(var(--level-${i + 1}-fg))]`,
}));

export function UserLevelBadge({ userId }: { userId: string }) {
  const [level, setLevel] = useState<number | null>(null);

  useEffect(() => {
    if (userId) {
      const key = `${LOCAL_STORAGE_GAME_KEY}_${userId}`;
      const storedProgress = localStorage.getItem(key);
      if (storedProgress) {
        const progress = JSON.parse(storedProgress);
        setLevel(progress.highestLevelCompleted + 1);
      } else {
        setLevel(1); // Default to level 1 if no progress found
      }
    }
  }, [userId]);

  if (level === null) {
    return null; // Or a loading state
  }

  const levelIndex = level - 1;
  const levelTitle = levelTitles[levelIndex] || `Nivel ${level}`;
  const colorClass = levelColorClasses[levelIndex] || { bg: 'bg-muted', text: 'text-muted-foreground' };

  return (
    <Badge className={cn('border-transparent', colorClass.bg, colorClass.text)}>
      {levelTitle}
    </Badge>
  );
}
