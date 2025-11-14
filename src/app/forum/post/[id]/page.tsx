'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { useFirestore, useUser, useDoc, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Post, Reply, UserProfile } from '@/lib/types';
import { useMemo } from 'react';

function UserAvatar({ userId }: { userId: string }) {
    const firestore = useFirestore();
    const userRef = useMemo(() => firestore ? doc(firestore, 'users', userId) : null, [firestore, userId]);
    const { data: userProfile, loading } = useDoc<UserProfile>(userRef);

    if (loading || !userProfile) {
        return <Avatar className="h-8 w-8"><AvatarFallback>?</AvatarFallback></Avatar>;
    }

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={userProfile.photoURL || undefined} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name?.[0]}</AvatarFallback>
        </Avatar>
    );
}

function ReplyCard({ reply }: { reply: Reply }) {
    const firestore = useFirestore();
    const userRef = useMemo(() => firestore ? doc(firestore, 'users', reply.authorId) : null, [firestore, reply.authorId]);
    const { data: author, loading } = useDoc<UserProfile>(userRef);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                 {author && <UserAvatar userId={reply.authorId} />}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{loading ? 'Cargando...' : author?.name}</span>
                        {author?.role && <Badge variant={author.role === 'expert' ? 'default' : 'secondary'}>{author.role === 'expert' ? 'Experto' : 'Usuario'}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {reply.timestamp ? new Date(reply.timestamp.seconds * 1000).toLocaleString() : 'Justo ahora'}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{reply.content}</p>
            </CardContent>
        </Card>
    );
}


export default function PostPage({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const postRef = useMemo(() => firestore ? doc(firestore, 'posts', params.id) : null, [firestore, params.id]);
  const { data: post, loading: postLoading } = useDoc<Post>(postRef);

  const authorRef = useMemo(() => (firestore && post) ? doc(firestore, 'users', post.authorId) : null, [firestore, post]);
  const { data: author } = useDoc<UserProfile>(authorRef);

  const repliesQuery = useMemo(() => firestore ? query(collection(firestore, 'replies'), where('postId', '==', params.id), orderBy('timestamp', 'asc')) : null, [firestore, params.id]);
  const { data: replies, loading: repliesLoading } = useCollection<Reply>(repliesQuery);
  
  const [newReply, setNewReply] = useState('');

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !user || !firestore) return;

    await addDoc(collection(firestore, 'replies'), {
      postId: params.id,
      authorId: user.uid,
      content: newReply,
      timestamp: serverTimestamp(),
    });
    setNewReply('');
  };

  if (postLoading) return <p>Cargando publicación...</p>;
  if (!post) return <p>Publicación no encontrada.</p>;

  return (
    <div className="container mx-auto max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription>
            En <span className="font-semibold">{post.continent}</span> por {author?.name || 'Anónimo'} el {post.timestamp ? new Date(post.timestamp?.seconds * 1000).toLocaleDateString() : ''}
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

      {user && (
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
      )}
    </div>
  );
}
