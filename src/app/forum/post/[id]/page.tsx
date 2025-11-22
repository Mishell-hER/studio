'use client';
import { useState, useEffect, useMemo } from 'react';
import { doc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { useFirestore, useDoc, useCollection, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post, Reply, UserProfile } from '@/lib/types';
import { useLoginModal } from '@/hooks/use-login-modal';


function UserAvatar({ userId }: { userId: string }) {
    const firestore = useFirestore();
    const userRef = useMemo(() => firestore ? doc(firestore, 'users', userId) : null, [firestore, userId]);
    const { data: userProfile, loading } = useDoc<UserProfile>(userRef);

    if (loading || !userProfile) {
        return <Avatar className="h-8 w-8"><AvatarFallback>?</AvatarFallback></Avatar>;
    }

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={userProfile.photoURL || undefined} alt={userProfile.name || ''} />
            <AvatarFallback>{userProfile.name?.[0]}</AvatarFallback>
        </Avatar>
    );
}

function ReplyCard({ reply }: { reply: Reply }) {
    const firestore = useFirestore();
    const userRef = useMemo(() => firestore ? doc(firestore, 'users', reply.authorId) : null, [firestore, reply.authorId]);
    const { data: author, loading } = useDoc<UserProfile>(userRef);

    return (
        <Card className="bg-card/70">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                 {loading ? <div className="h-8 w-8 rounded-full bg-muted animate-pulse" /> : <UserAvatar userId={reply.authorId} />}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{loading ? 'Cargando...' : (author?.name || 'Anónimo')}</span>
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
    const { user, loading: userLoading } = useUser();
    const loginModal = useLoginModal();
    const [newReply, setNewReply] = useState('');

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReply.trim() || !firestore || !user) return;

        await addDoc(collection(firestore, 'replies'), {
            postId: postId,
            authorId: user.uid,
            content: newReply,
            timestamp: serverTimestamp(),
        });
        setNewReply('');
    };

    if (userLoading) return null;

    if (!user) {
        return (
            <div className="text-center p-4 border rounded-lg bg-card">
                <p>Debes iniciar sesión para poder responder.</p>
                <Button variant="link" onClick={loginModal.onOpen}>
                    Inicia sesión aquí.
                </Button>
            </div>
        )
    }
    
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

  const authorRef = useMemo(() => (firestore && post) ? doc(firestore, 'users', post.authorId) : null, [firestore, post]);
  const { data: author } = useDoc<UserProfile>(authorRef);

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
      
      <ReplyForm postId={params.id} />

    </div>
  );
}
