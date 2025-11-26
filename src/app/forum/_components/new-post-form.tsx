
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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLocalAuth } from "@/hooks/use-local-auth"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { continents } from "@/lib/continents"

const questionSchema = z.object({
  title: z.string().min(10, { message: "El título debe tener al menos 10 caracteres." }),
  content: z.string().min(20, { message: "El contenido debe tener al menos 20 caracteres." }),
  continent: z.string({ required_error: "Debes seleccionar un continente." }),
})

const opinionSchema = z.object({
  content: z.string().min(20, { message: "Tu opinión debe tener al menos 20 caracteres." }),
})

type NewPostFormProps = {
  type: 'question' | 'opinion';
}

export function NewPostForm({ type }: NewPostFormProps) {
  const { toast } = useToast();
  const { user } = useLocalAuth();

  const isQuestion = type === 'question';
  const formSchema = isQuestion ? questionSchema : opinionSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isQuestion ? { title: "", content: "", continent: undefined } : { content: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'Debes iniciar sesión para publicar.' });
        return;
    }
    
    // Aquí iría la lógica para guardar en la base de datos
    console.log({ ...values, authorId: user.uid, authorName: user.nombre });

    toast({
        title: `¡${isQuestion ? 'Pregunta' : 'Opinión'} publicada!`,
        description: `Tu publicación ha sido creada. (Simulación)`,
    });
    form.reset();
  }

  return (
    <Card className="mb-8 bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Crear nueva {isQuestion ? 'pregunta' : 'opinión'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isQuestion && (
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título de la pregunta</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: ¿Cómo optimizar costos en la ruta a Shanghái?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="continent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Continente relacionado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un continente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {continents.filter(c => c.slug !== 'otros').map(c => (
                            <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isQuestion ? 'Describe tu pregunta en detalle' : 'Escribe tu opinión'}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={isQuestion ? 'Contexto, lo que has intentado, etc.' : 'Comparte tu punto de vista con la comunidad...'}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Publicar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
