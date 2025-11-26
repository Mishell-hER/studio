
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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


function NewPostForm({ onPostCreated }: { onPostCreated: (post: Post) => void }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [continent, setContinent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !continent) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        
        const newPost: Post = {
            id: `post-${Date.now()}`,
            title,
            content,
            continent,
            authorId: 'currentUser', // Placeholder
            authorName: 'Usuario Actual', // Placeholder
            timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
        };
        onPostCreated(newPost);
        setTitle('');
        setContent('');
        setContinent('');
        setError('');
    };
    
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Crea una Nueva Pregunta</CardTitle>
                <CardDescription>Comparte tu duda con la comunidad.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título de la pregunta"
                    />
                    <Select onValueChange={setContinent} value={continent}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un continente" />
                        </SelectTrigger>
                        <SelectContent>
                            {continents.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Describe tu pregunta..."
                        rows={3}
                    />
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    <div className="flex justify-end">
                        <Button type="submit">Publicar Pregunta</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function NewOpinionForm({ onOpinionCreated }: { onOpinionCreated: (opinion: Opinion) => void }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) {
            setError('La opinión no puede estar vacía.');
            return;
        }

        const newOpinion: Opinion = {
            id: `opinion-${Date.now()}`,
            content,
            authorId: 'currentUser', // Placeholder
            authorName: 'Usuario Actual', // Placeholder
            timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
        };

        onOpinionCreated(newOpinion);
        setContent('');
        setError('');
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Comparte tu Opinión</CardTitle>
                <CardDescription>Deja un comentario o inicia una discusión general.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe tu opinión aquí..."
                        rows={4}
                    />
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    <div className="flex justify-end">
                        <Button type="submit">Publicar Opinión</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [opinions, setOpinions] = useState<Opinion[]>(sampleOpinions);
  const [continentFilter, setContinentFilter] = useState('all');

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  }

  const handleOpinionCreated = (newOpinion: Opinion) => {
    setOpinions(prev => [newOpinion, ...prev]);
  }

  const filteredPosts = continentFilter === 'all'
    ? posts
    : posts.filter(post => post.continent === continentFilter);

  const renderPosts = () => {
    if (filteredPosts.length === 0) return <p className="text-muted-foreground py-8 text-center">No hay preguntas para este filtro. ¡Sé el primero en preguntar!</p>;
    
    return (
      <div className="space-y-4">
        {filteredPosts.map(post => <PostCard post={post} key={post.id} />)}
      </div>
    );
  }

  const renderOpinions = () => {
    if (opinions.length === 0) return <p className="text-muted-foreground py-8 text-center">No hay opiniones todavía. ¡Comparte la tuya!</p>;

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

       <Tabs defaultValue="preguntas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="preguntas">Preguntas y Respuestas</TabsTrigger>
          <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
        </TabsList>
        <TabsContent value="preguntas" className="mt-6">
            <NewPostForm onPostCreated={handlePostCreated}/>
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
            <NewOpinionForm onOpinionCreated={handleOpinionCreated} />
            {renderOpinions()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
