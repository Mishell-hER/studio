
'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export function PostCard({ post }: { post: Post }) {
    return (
        <Card>
            <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
                <span className="font-semibold">{post.continent}</span> - Publicado por {post.authorName || 'Usuario Anónimo'} el {post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleDateString() : 'hace un momento'}
            </CardDescription>
            </CardHeader>
            <CardContent>
            <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" size="sm">
                    <Link href={`/forum/post/${post.id}`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Responder
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
