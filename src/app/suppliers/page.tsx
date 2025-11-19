"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SuppliersPage() {
    const router = useRouter();

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle>Página de Proveedores</CardTitle>
                    <CardDescription>
                        Esta página está lista para un nuevo comienzo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/')}>
                        Volver al Inicio
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
