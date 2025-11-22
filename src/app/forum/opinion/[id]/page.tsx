
'use client';
import { useState, useMemo } from 'react';
import { doc, collection, addDoc, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { useFirestore, useDoc, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Opinion, Reply } from '@/lib/types';

// Helper to generate a random user name
const generateAnonymousUser = () => `Usuario (${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')})`;

function ReplyCard({ reply }: { reply: Reply }) {
    return (
        <Card className="bg-card/70">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                 <Avatar className="h-8 w-8"><AvatarFallback>U</AvatarFallback></Avatar>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{reply.authorName || 'Anónimo'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {reply.timestamp ? new Date(reply.timestamp.seconds * 1000).toLocaleString() : 'Justo ahora'}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-foreground/90">{reply.content}</p>
            </CardContent>
        </Card>
    );
}

function ReplyForm({ opinionId }: { opinionId: string }) {
    const firestore = useFirestore();
    const [newReply, setNewReply] = useState('');

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReply.trim() || !firestore) return;
        
        const authorName = generateAnonymousUser();
        const authorId = `anonymous_${Date.now()}`;
        
        // Note: For opinions, we might be storing replies in the same `replies` collection,
        // but pointing to the opinion's ID. We need a way to distinguish them if needed,
        // but for now we use `opinionId` as `postId`.
        await addDoc(collection(firestore, 'replies'), {
            postId: opinionId, // Re-using postId field for the opinion's ID
            authorId,
            authorName,
            content: newReply,
            timestamp: serverTimestamp(),
        });
        setNewReply('');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Escribe una respuesta</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleReplySubmit} className="space-y-4">
                    <Textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Comparte tu conocimiento..."
                        rows={5}
                    />
                    <Button type="submit" disabled={!newReply.trim()}>
                        Publicar Respuesta
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default function OpinionResponsePage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  
  // Fetch the opinion
  const opinionRef = useMemo(() => firestore ? doc(firestore, 'opinions', params.id) : null, [firestore, params.id]);
  const { data: opinion, loading: opinionLoading } = useDoc<Opinion>(opinionRef);

  // Fetch replies for this opinion
  const repliesQuery = useMemo(() => firestore ? query(collection(firestore, 'replies'), where('postId', '==', params.id), orderBy('timestamp', 'asc')) : null, [firestore, params.id]);
  const { data: replies, loading: repliesLoading } = useCollection<Reply>(repliesQuery);
  

  if (opinionLoading) return <p>Cargando opinión...</p>;
  if (!opinion) return <p>Opinión no encontrada.</p>;

  return (
    <div className="container mx-auto max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardDescription>
            Opinión de {opinion.authorName || 'Anónimo'} el {opinion.timestamp ? new Date(opinion.timestamp?.seconds * 1000).toLocaleDateString() : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{opinion.content}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Respuestas ({replies?.length || 0})</h2>
        {repliesLoading ? <p>Cargando respuestas...</p> : replies?.map(reply => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>
      
      <ReplyForm opinionId={params.id} />

    </div>
  );
}
