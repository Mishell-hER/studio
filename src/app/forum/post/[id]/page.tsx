'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useUser, useDoc, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Post, Reply, UserProfile } from '@/lib/types';

function UserAvatar({ userId }: { userId: string }) {
    const firestore = useFirestore();
    const userRef = firestore ? doc(firestore, 'users', userId) : null;
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
    const userRef = firestore ? doc(firestore, 'users', reply.authorId) : null;
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
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<UserProfile | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch Post and Author
  useEffect(() => {
    if (!firestore || !params.id) return;
    const fetchPost = async () => {
      setLoading(true);
      const postRef = doc(firestore, 'posts', params.id);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const postData = { id: postSnap.id, ...postSnap.data() } as Post;
        setPost(postData);

        const authorRef = doc(firestore, 'users', postData.authorId);
        const authorSnap = await getDoc(authorRef);
        if (authorSnap.exists()) {
          setAuthor(authorSnap.data() as UserProfile);
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [firestore, params.id]);

  // Subscribe to Replies
  useEffect(() => {
    if (!firestore || !params.id) return;
    const repliesQuery = query(collection(firestore, 'replies'), where('postId', '==', params.id), orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(repliesQuery, (querySnapshot) => {
        const repliesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reply));
        setReplies(repliesData);
    });

    return () => unsubscribe();
}, [firestore, params.id]);


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

  if (loading) return <p>Cargando publicación...</p>;
  if (!post) return <p>Publicación no encontrada.</p>;

  return (
    <div className="container mx-auto max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription>
            En <span className="font-semibold">{post.continent}</span> por {author?.name || 'Anónimo'} el {new Date(post.timestamp?.seconds * 1000).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Respuestas ({replies.length})</h2>
        {replies.map(reply => (
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

// Helper hook to fetch replies - not used in this version but useful for reference
function useReplies(postId: string) {
    const firestore = useFirestore();
    const [replies, setReplies] = useState<Reply[]>([]);

    useEffect(() => {
        if (!firestore) return;
        const q = query(
            collection(firestore, 'replies'),
            where('postId', '==', postId),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const repliesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reply));
            setReplies(repliesData);
        });

        return () => unsubscribe();
    }, [firestore, postId]);

    return replies;
}
