
'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/forum/post/${post.id}`} className="block">
            <Card className="hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  <span className="font-semibold">{post.continent}</span> - Publicado el {post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleDateString() : 'hace un momento'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">{post.content}</p>
              </CardContent>
            </Card>
        </Link>
    )
}
