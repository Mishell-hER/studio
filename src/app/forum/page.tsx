
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Post } from '@/lib/types';
import { continents } from '@/lib/continents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from './_components/post-card';
import { NewPostInline } from './_components/new-post-inline';

export default function ForumPage() {
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [continentFilter, setContinentFilter] = useState('all');

  useEffect(() => {
    if (!firestore) return;

    let postsQuery = query(collection(firestore, 'posts'), orderBy('timestamp', 'desc'));

    if (continentFilter !== 'all') {
      postsQuery = query(postsQuery, where('continent', '==', continentFilter));
    }

    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Post));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, continentFilter]);

  const renderPosts = () => {
    if (loading) return <p>Cargando publicaciones...</p>;
    if (posts.length === 0) return <p className="text-muted-foreground py-8 text-center">No hay publicaciones aún. ¡Sé el primero en preguntar!</p>;
    
    return (
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Foro Comunitario</h1>
          <p className="text-muted-foreground">Pregunta y comparte tus conocimientos con la comunidad.</p>
        </div>
      </div>

       <Tabs defaultValue="preguntas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="preguntas">Preguntas y Respuestas</TabsTrigger>
          <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
        </TabsList>
        <TabsContent value="preguntas">
             <Card className="mt-6">
                <CardContent className="p-4">
                    <NewPostInline user={user} type="question" />
                </CardContent>
             </Card>

          <div className="mt-6 flex items-center gap-4">
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
          <div className="mt-6">
            {renderPosts()}
          </div>
        </TabsContent>
        <TabsContent value="opiniones">
            <Card className="mt-6">
                <CardContent className="p-4">
                    <NewPostInline user={user} type="opinion" />
                </CardContent>
             </Card>
           <div className="mt-6 text-center text-muted-foreground py-12">
            <p>Aquí se listarán discusiones de opiniones generales, sin un formato Q&A estricto.</p>
            <p>(Funcionalidad en desarrollo)</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
