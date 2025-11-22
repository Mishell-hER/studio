
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, onSnapshot, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
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

function NewPostForm({ onPostCreated }: { onPostCreated: () => void }) {
    const firestore = useFirestore();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [continent, setContinent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !continent) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        if (!firestore) return;

        try {
            await addDoc(collection(firestore, 'posts'), {
                title,
                content,
                continent,
                authorId: `anonymous_${Date.now()}`,
                authorName: "Usuario Anónimo",
                timestamp: serverTimestamp(),
            });
            setTitle('');
            setContent('');
            setContinent('');
            setError('');
            onPostCreated();
        } catch (err) {
            console.error(err);
            setError('No se pudo crear la publicación.');
        }
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

function NewOpinionForm({ onOpinionCreated }: { onOpinionCreated: () => void }) {
    const firestore = useFirestore();
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) {
            setError('La opinión no puede estar vacía.');
            return;
        }
        if (!firestore) return;

        try {
            await addDoc(collection(firestore, 'opinions'), {
                content,
                authorId: `anonymous_${Date.now()}`,
                authorName: "Usuario Anónimo",
                timestamp: serverTimestamp(),
            });
            setContent('');
            setError('');
            onOpinionCreated();
        } catch (err) {
            console.error(err);
            setError('No se pudo publicar la opinión.');
        }
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
  const firestore = useFirestore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingOpinions, setLoadingOpinions] = useState(true);
  const [continentFilter, setContinentFilter] = useState('all');

  useEffect(() => {
    if (!firestore) return;

    let postsQuery = query(collection(firestore, 'posts'), orderBy('timestamp', 'desc'));
    if (continentFilter !== 'all') {
      postsQuery = query(postsQuery, where('continent', '==', continentFilter));
    }
    const unsubscribePosts = onSnapshot(postsQuery, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
      setLoadingPosts(false);
    });

    const opinionsQuery = query(collection(firestore, 'opinions'), orderBy('timestamp', 'desc'));
    const unsubscribeOpinions = onSnapshot(opinionsQuery, (snapshot) => {
        const opinionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()} as Opinion));
        setOpinions(opinionsData);
        setLoadingOpinions(false);
    });

    return () => {
        unsubscribePosts();
        unsubscribeOpinions();
    };
  }, [firestore, continentFilter]);

  const renderPosts = () => {
    if (loadingPosts) return <p>Cargando publicaciones...</p>;
    if (posts.length === 0) return <p className="text-muted-foreground py-8 text-center">No hay preguntas aún. ¡Sé el primero en preguntar!</p>;
    
    return (
      <div className="space-y-4">
        {posts.map(post => <PostCard post={post} key={post.id} />)}
      </div>
    );
  }

  const renderOpinions = () => {
    if (loadingOpinions) return <p>Cargando opiniones...</p>;
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
            <NewPostForm onPostCreated={() => { /* Could add a toast or notification here */ }}/>
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
            <NewOpinionForm onOpinionCreated={() => { /* Notification */ }} />
            {renderOpinions()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
