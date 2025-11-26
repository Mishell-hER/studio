
'use client';
import { useState } from 'react';
import { Card, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Post, Opinion } from '@/lib/types';
import { continents } from '@/lib/continents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from './_components/post-card';
import { OpinionCard } from './_components/opinion-card';

// Datos de ejemplo para el foro
const samplePosts: Post[] = [
    { id: '1', title: '¿Cómo afecta el Brexit al transporte terrestre desde España?', content: 'Tengo un envío programado para la próxima semana y no estoy seguro de qué documentos adicionales necesito...', authorId: 'user1', authorName: 'Carlos M.', continent: 'Europa', timestamp: { seconds: 1678886400, nanoseconds: 0 } },
    { id: '2', title: 'Mejor ruta para exportar a Bolivia desde Perú', content: 'Estoy evaluando si es mejor ir por Desaguadero o por otra ruta alternativa. ¿Alguien tiene experiencia reciente?', authorId: 'user2', authorName: 'Ana P.', continent: 'América del Sur', timestamp: { seconds: 1678800000, nanoseconds: 0 } },
];

const sampleOpinions: Opinion[] = [
    { id: 'o1', content: 'Creo que la digitalización de las aduanas en América Latina va muy lenta. Deberíamos presionar más como sector.', authorId: 'user3', authorName: 'Juan D.', timestamp: { seconds: 1678963200, nanoseconds: 0 } },
];

export default function ForumPage() {
  const [posts] = useState<Post[]>(samplePosts);
  const [opinions] = useState<Opinion[]>(sampleOpinions);
  const [continentFilter, setContinentFilter] = useState('all');

  const filteredPosts = continentFilter === 'all'
    ? posts
    : posts.filter(post => post.continent === continentFilter);

  const renderPosts = () => {
    if (filteredPosts.length === 0) return <p className="text-muted-foreground py-8 text-center">No hay preguntas para este filtro.</p>;
    
    return (
      <div className="space-y-4">
        {filteredPosts.map(post => <PostCard post={post} key={post.id} />)}
      </div>
    );
  }

  const renderOpinions = () => {
    if (opinions.length === 0) return <p className="text-muted-foreground py-8 text-center">No hay opiniones todavía.</p>;

    return (
        <div className="space-y-4">
            {opinions.map(opinion => <OpinionCard opinion={opinion} key={opinion.id} />)}
        </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">Foro Comunitario</h1>
        <p className="text-lg text-muted-foreground mt-2">Pregunta, opina y comparte tus conocimientos con la comunidad.</p>
      </div>
       <Card className="mb-8 p-4 bg-muted/20 border-dashed">
            <CardDescription className="text-center">
                La creación de nuevas preguntas y opiniones se ha desactivado temporalmente.
            </CardDescription>
       </Card>

       <Tabs defaultValue="preguntas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="preguntas">Preguntas y Respuestas</TabsTrigger>
          <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
        </TabsList>
        <TabsContent value="preguntas" className="mt-6">
            <div className="my-6 flex items-center gap-4">
                <span className="text-sm font-medium">Filtrar por continente:</span>
                <Select value={continentFilter} onValueChange={setContinentFilter}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Seleccionar continente" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {continents.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
                </Select>
            </div>
            {renderPosts()}
        </TabsContent>
        <TabsContent value="opiniones" className="mt-6">
            {renderOpinions()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
