
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Post, Reply } from '@/lib/types';
import { notFound } from 'next/navigation';
import { UserLevelBadge } from '../../_components/user-level-badge';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Datos de ejemplo para el post y sus respuestas
const samplePost: Post = {
    id: '1',
    title: '¿Cómo afecta el Brexit al transporte terrestre desde España?',
    content: 'Tengo un envío programado para la próxima semana y no estoy seguro de qué documentos adicionales necesito. He oído hablar del GVMS, pero no sé si se aplica a mi caso. ¿Alguien puede orientarme?',
    authorId: 'user1',
    authorName: 'Carlos M.',
    continent: 'Europa',
    timestamp: { seconds: 1678886400, nanoseconds: 0 }
};

const sampleReplies: Reply[] = [
    { id: 'r1', postId: '1', content: 'Sí, necesitas registrarte en el GVMS (Goods Vehicle Movement Service). Es obligatorio para todas las mercancías que viajan del Reino Unido a la UE y viceversa. Te recomiendo que lo hagas cuanto antes.', authorId: 'user2', authorName: 'Ana P.', authorPhotoURL: 'https://i.pravatar.cc/150?u=user2', timestamp: { seconds: 1678890000, nanoseconds: 0 } },
    { id: 'r2', postId: '1', content: 'Además del GVMS, asegúrate de que tu agente de aduanas ha presentado la declaración de exportación en España y la de importación en el Reino Unido. Necesitarás los números de referencia (MRN) para generar el GMR en el GVMS.', authorId: 'user3', authorName: 'Juan D.', authorPhotoURL: 'https://i.pravatar.cc/150?u=user3', timestamp: { seconds: 1678893600, nanoseconds: 0 } },
];

function StarRating({ totalStars = 5 }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={starValue}
              className="bg-transparent border-none cursor-pointer"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(rating)}
            >
              <Star
                className={cn(
                  "h-5 w-5 transition-colors",
                  starValue <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                )}
              />
            </button>
          );
        })}
      </div>
    );
}

function ReplyCard({ reply }: { reply: Reply }) {
    return (
        <Card className="bg-card/70">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                 <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.authorPhotoURL || ''} />
                    <AvatarFallback>{reply.authorName?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                 </Avatar>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{reply.authorName || 'Anónimo'}</span>
                        <UserLevelBadge userId={reply.authorId} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {reply.timestamp ? new Date(reply.timestamp.seconds * 1000).toLocaleString() : 'Justo ahora'}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-foreground/90">{reply.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Calificar respuesta:</span>
                <StarRating />
            </CardFooter>
        </Card>
    );
}

export default function PostPage({ params }: { params: { id: string } }) {
  // Simulación: encontrar el post por ID. En una app real, esto sería una llamada a la API/DB.
  const post = params.id === samplePost.id ? samplePost : null;
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 flex-wrap">
            En <span className="font-semibold">{post.continent}</span> por {post.authorName || 'Anónimo'}
            <UserLevelBadge userId={post.authorId} />
            <span>el {post.timestamp ? new Date(post.timestamp?.seconds * 1000).toLocaleDateString() : ''}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Respuestas ({sampleReplies.length || 0})</h2>
        {sampleReplies.map(reply => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>
      
       <Card className="mt-8 p-4 bg-muted/20 border-dashed">
            <CardDescription className="text-center">
                La creación de nuevas respuestas se ha desactivado temporalmente.
            </CardDescription>
       </Card>

    </div>
  );
}
