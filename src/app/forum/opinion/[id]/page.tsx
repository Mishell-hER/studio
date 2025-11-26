
'use client';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Opinion, Reply } from '@/lib/types';
import { notFound } from 'next/navigation';

// Datos de ejemplo para la opinión y sus respuestas
const sampleOpinion: Opinion = {
    id: 'o1',
    content: 'Creo que la digitalización de las aduanas en América Latina va muy lenta. Deberíamos presionar más como sector.',
    authorId: 'user3',
    authorName: 'Juan D.',
    timestamp: { seconds: 1678963200, nanoseconds: 0 }
};

const sampleReplies: Reply[] = [
    { id: 'r1', postId: 'o1', content: 'Totalmente de acuerdo. En Europa, el sistema es mucho más ágil y transparente.', authorId: 'user4', authorName: 'Lucía F.', authorPhotoURL: 'https://i.pravatar.cc/150?u=user4', timestamp: { seconds: 1678966800, nanoseconds: 0 } },
    { id: 'r2', postId: 'o1', content: 'El principal problema es la falta de voluntad política y la resistencia al cambio en muchos países.', authorId: 'user5', authorName: 'Marco G.', authorPhotoURL: 'https://i.pravatar.cc/150?u=user5', timestamp: { seconds: 1678970400, nanoseconds: 0 } },
];


function ReplyCard({ reply }: { reply: Reply }) {
    return (
        <Card className="bg-card/70">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                 <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.authorPhotoURL || ''} />
                    <AvatarFallback>{reply.authorName?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                 </Avatar>
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

export default function OpinionResponsePage({ params }: { params: { id: string } }) {
  // Simulación: encontrar la opinión por ID. En una app real, esto sería una llamada a la API/DB.
  const opinion = params.id === sampleOpinion.id ? sampleOpinion : null;
  
  if (!opinion) {
    notFound();
  }

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
