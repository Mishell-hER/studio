'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Post } from '@/lib/types';
import Link from 'next/link';
import { continents } from '@/lib/continents';

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

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Foro Comunitario</h1>
          <p className="text-muted-foreground">Pregunta y comparte tus conocimientos con la comunidad.</p>
        </div>
        {user && (
          <Button onClick={() => router.push('/forum/new-post')}>
            Nueva Pregunta
          </Button>
        )}
      </div>

      <div className="mb-6 flex items-center gap-4">
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

      {loading ? (
        <p>Cargando publicaciones...</p>
      ) : (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No hay publicaciones aún. ¡Sé el primero en preguntar!</p>
          ) : (
            posts.map(post => (
              <Link href={`/forum/post/${post.id}`} key={post.id} className="block">
                <Card className="hover:bg-accent transition-colors">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      <span className="font-semibold">{post.continent}</span> - Publicado el {new Date(post.timestamp?.seconds * 1000).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-muted-foreground">{post.content}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
