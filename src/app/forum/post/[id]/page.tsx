'use client';
import { useState, useMemo } from 'react';
import { doc, collection, addDoc, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { useFirestore, useDoc, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Post, Reply } from '@/lib/types';


function ReplyCard({ reply }: { reply: Reply }) {
    return (
        <Card className="bg-card/70">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                 <Avatar className="h-8 w-8"><AvatarFallback>U</AvatarFallback></Avatar>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{reply.authorName || 'Usuario Anónimo'}</span>
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

function ReplyForm({ postId }: { postId: string }) {
    const firestore = useFirestore();
    const [newReply, setNewReply] = useState('');

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReply.trim() || !firestore) return;

        const authorId = `anonymous_${Date.now()}`;
        await addDoc(collection(firestore, 'replies'), {
            postId: postId,
            authorId: authorId,
            authorName: "Usuario Anónimo",
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


export default function PostPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  
  const postRef = useMemo(() => firestore ? doc(firestore, 'posts', params.id) : null, [firestore, params.id]);
  const { data: post, loading: postLoading } = useDoc<Post>(postRef);

  const repliesQuery = useMemo(() => firestore ? query(collection(firestore, 'replies'), where('postId', '==', params.id), orderBy('timestamp', 'asc')) : null, [firestore, params.id]);
  const { data: replies, loading: repliesLoading } = useCollection<Reply>(repliesQuery);
  

  if (postLoading) return <p>Cargando publicación...</p>;
  if (!post) return <p>Publicación no encontrada.</p>;

  return (
    <div className="container mx-auto max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription>
            En <span className="font-semibold">{post.continent}</span> por {post.authorName || 'Usuario Anónimo'} el {post.timestamp ? new Date(post.timestamp?.seconds * 1000).toLocaleDateString() : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Respuestas ({replies?.length || 0})</h2>
        {repliesLoading ? <p>Cargando respuestas...</p> : replies?.map(reply => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>
      
      <ReplyForm postId={params.id} />

    </div>
  );
}
