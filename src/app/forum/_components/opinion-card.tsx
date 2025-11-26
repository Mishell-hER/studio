
'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import type { Opinion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { UserLevelBadge } from './user-level-badge';

export function OpinionCard({ opinion }: { opinion: Opinion }) {
    const replyLink = `/forum/opinion/${opinion.id}`;

    return (
        <Card>
            <CardHeader>
                <CardDescription className="flex items-center gap-2 flex-wrap">
                    Opinión de {opinion.authorName || 'Anónimo'}
                    <UserLevelBadge userId={opinion.authorId} />
                    <span>- Publicado el {opinion.timestamp ? new Date(opinion.timestamp.seconds * 1000).toLocaleDateString() : 'hace un momento'}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-foreground">{opinion.content}</p>
            </CardContent>
             <CardFooter>
                <Button asChild variant="outline" size="sm">
                    <Link href={replyLink}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Responder
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
