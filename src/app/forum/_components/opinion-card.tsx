
'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import type { Opinion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export function OpinionCard({ opinion }: { opinion: Opinion }) {
    // Note: Opinions might not have a dedicated reply page structure like posts.
    // This is a placeholder link. You might need a different page for opinion replies.
    const replyLink = `/forum/post/${opinion.id}`; // Re-using post page for now

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Opinión de {opinion.authorName || 'Usuario Anónimo'} - Publicado el {opinion.timestamp ? new Date(opinion.timestamp.seconds * 1000).toLocaleDateString() : 'hace un momento'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-foreground">{opinion.content}</p>
            </CardContent>
             <CardFooter>
                <Button asChild variant="outline" size="sm">
                    {/* This link might need to be adjusted if opinions have their own reply pages */}
                    <Link href={replyLink}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Responder
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
