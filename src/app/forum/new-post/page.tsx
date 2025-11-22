'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { continents } from '@/lib/continents';

export default function NewPostPage() {
  const router = useRouter();
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
        authorId: 'anonymous', // Placeholder
        timestamp: serverTimestamp(),
      });
      router.push('/forum');
    } catch (err) {
      console.error(err);
      setError('No se pudo crear la publicación. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nueva Pregunta</CardTitle>
          <CardDescription>Comparte tu duda con la comunidad.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title">Título de la pregunta</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: ¿Cuáles son los mejores proveedores en Argentina?"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="continent">Continente</label>
              <Select onValueChange={setContinent} value={continent}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un continente" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="content">Describe tu pregunta</label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Añade más detalles sobre tu pregunta..."
                rows={6}
              />
            </div>
            {error && <p className="text-destructive">{error}</p>}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit">Publicar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
