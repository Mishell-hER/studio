
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLocalAuth } from "@/hooks/use-local-auth"

const replySchema = z.object({
  content: z.string().min(10, { message: "La respuesta debe tener al menos 10 caracteres." }),
})

export function NewReplyForm({ postId }: { postId: string }) {
  const { toast } = useToast();
  const { user } = useLocalAuth();

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: { content: "" },
  })

  function onSubmit(values: z.infer<typeof replySchema>) {
     if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'Debes iniciar sesión para responder.' });
        return;
    }

    // Aquí iría la lógica para guardar en la base de datos
    console.log({ ...values, postId, authorId: user.uid, authorName: user.nombre });

    toast({
        title: "¡Respuesta enviada!",
        description: "Gracias por tu contribución a la comunidad. (Simulación)",
    });
    form.reset();
  }

  return (
    <Card className="mt-8 bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Añadir una respuesta</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu respuesta</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Publicar Respuesta</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
