'use client';
import { useState, useEffect, useMemo } from 'react';
import { doc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { useFirestore, useDoc, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Post, Reply, UserProfile } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Star, MessageSquare } from 'lucide-react';


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

const StarRating = ({ rating, onRate, commentId }: { rating: number, onRate: (rating: number) => void, commentId: string }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={cn(
                        "h-5 w-5 cursor-pointer transition-colors",
                        star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                    )}
                    onClick={() => onRate(star)}
                />
            ))}
        </div>
    );
};


function ReplyCard({ reply }: { reply: Reply }) {
    const firestore = useFirestore();
    // Since users are gone, we can't fetch author details. We'll show "Anónimo".
    // const userRef = useMemo(() => firestore ? doc(firestore, 'users', reply.authorId) : null, [firestore, reply.authorId]);
    // const { data: author, loading } = useDoc<UserProfile>(userRef);
    const [currentRating, setCurrentRating] = useState(0); // Simulación

    const handleRate = (rating: number) => {
        setCurrentRating(rating);
        // Aquí iría la lógica para enviar la calificación a Firebase
        alert(`¡Voto de ${rating} estrellas registrado para el comentario #${reply.id}! (Simulación)`);
    };

    return (
        <Card className="bg-card/70">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                 <Avatar className="h-8 w-8"><AvatarFallback>?</AvatarFallback></Avatar>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Anónimo</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {reply.timestamp ? new Date(reply.timestamp.seconds * 1000).toLocaleString() : 'Justo ahora'}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-foreground/90">{reply.content}</p>
                 <div className="mt-4 flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center gap-2">
                       <StarRating rating={currentRating} onRate={handleRate} commentId={reply.id} />
                       <span className="text-xs ml-2">({currentRating > 0 ? `${currentRating}.0/5` : 'Sin calificar'})</span>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Responder
                    </Button>
                </div>
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

        await addDoc(collection(firestore, 'replies'), {
            postId: postId,
            authorId: 'anonymous', // Placeholder
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

  // Author fetching is removed as there are no users.
  // const authorRef = useMemo(() => (firestore && post) ? doc(firestore, 'users', post.authorId) : null, [firestore, post]);
  // const { data: author } = useDoc<UserProfile>(authorRef);

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
            En <span className="font-semibold">{post.continent}</span> por Anónimo el {post.timestamp ? new Date(post.timestamp?.seconds * 1000).toLocaleDateString() : ''}
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
