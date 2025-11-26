
'use client';
import { useLocalAuth } from "@/hooks/use-local-auth";
import { useLoginModal } from "@/hooks/use-login-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useLocalAuth();
  const loginModal = useLoginModal();

  if (isLoading) {
    return <div className="container mx-auto max-w-4xl text-center py-10">Cargando...</div>;
  }

  if (!user) {
    return (
       <div className="container mx-auto max-w-4xl text-center py-10">
          <Card className="max-w-md mx-auto bg-card/70 backdrop-blur-sm p-8">
              <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardHeader>
                <CardTitle>Foro Comunitario Bloqueado</CardTitle>
                <CardDescription>
                  Necesitas iniciar sesión para ver las discusiones y participar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={loginModal.onOpen}>Iniciar Sesión</Button>
              </CardContent>
          </Card>
      </div>
    )
  }

  return <div className="container mx-auto max-w-4xl">{children}</div>;
}
