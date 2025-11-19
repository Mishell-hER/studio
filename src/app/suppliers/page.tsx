"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SuppliersTable } from './_components/suppliers-table';

export default function SuppliersPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al inicio
                </Link>
            </Button>

            <Card className="w-full mx-auto bg-card/50 backdrop-blur-sm mt-4">
                <CardHeader>
                     <CardTitle className="text-center text-xl">
                        Proveedores por Continente
                     </CardTitle>
                     <CardDescription className="text-center">
                        Encuentra información sobre fortalezas, debilidades y tipos de contrato de proveedores en diferentes regiones.
                     </CardDescription>
                </CardHeader>
                <CardContent>
                    <SuppliersTable />
                </CardContent>
            </Card>
        </div>
    );
}
