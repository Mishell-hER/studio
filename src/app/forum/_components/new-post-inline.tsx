
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { continents } from '@/lib/continents';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';

export function NewPostInline({ user }: { user: User }) {
  const router = useRouter();
  const firestore = useFirestore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [continent, setContinent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !continent) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!firestore || !user) return;

    setIsSubmitting(true);
    setError('');

    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        title,
        content,
        continent,
        authorId: user.uid,
        timestamp: serverTimestamp(),
      });
      setIsExpanded(false);
      setTitle('');
      setContent('');
      setContinent('');
      // Optionally, navigate to the new post
      // router.push(`/forum/post/${docRef.id}`);
    } catch (err) {
      console.error(err);
      setError('No se pudo crear la publicación. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'Usuario'} />
        <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        {!isExpanded ? (
          <button
            className="w-full text-left bg-muted hover:bg-muted/90 text-muted-foreground px-4 py-2 rounded-md transition-colors text-sm"
            onClick={() => setIsExpanded(true)}
          >
            Haz una pregunta o comparte tu opinión...
          </button>
        ) : (
          <AnimatePresence>
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la pregunta"
                required
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe tu pregunta o tu opinión..."
                rows={4}
                required
              />
              <Select onValueChange={setContinent} value={continent}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un continente" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map((c) => (
                    <SelectItem key={c.slug} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsExpanded(false)} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting || !title || !content || !continent}>
                  {isSubmitting ? 'Publicando...' : 'Publicar'}
                </Button>
              </div>
            </motion.form>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
