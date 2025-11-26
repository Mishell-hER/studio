"use client";

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useLoginModal } from '@/hooks/use-login-modal';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useAuth } from '@/firebase';

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  apellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." }).regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos."),
  correo: z.string().email({ message: "Por favor, introduce un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  esEmpresario: z.boolean().default(false),
  RUC: z.string().optional(),
  sector: z.string().optional(),
}).refine(data => {
    if (data.esEmpresario) {
        return !!data.RUC && data.RUC.length > 0 && !!data.sector && data.sector.length > 0;
    }
    return true;
}, {
    message: "RUC y sector son obligatorios si eres empresario.",
    path: ["esEmpresario"],
});

export function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        nombre: "",
        apellido: "",
        username: "",
        correo: "",
        password: "",
        esEmpresario: false,
        RUC: "",
        sector: ""
    },
  });

  const isEmpresario = form.watch('esEmpresario');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    if (!firestore || !auth) {
        toast({
            variant: 'destructive',
            title: "Error",
            description: "El servicio de autenticación no está disponible.",
        });
        setIsLoading(false);
        return;
    }

    try {
      // 1. Crear el usuario en Firebase Authentication (CLIENT-SIDE)
      const userCredential = await createUserWithEmailAndPassword(auth, values.correo, values.password);
      const user = userCredential.user;

      // 2. Actualizar el perfil de Auth (nombre y foto, si aplica)
      await updateProfile(user, {
        displayName: `${values.nombre} ${values.apellido}`,
      });

      // 3. Preparar el documento de perfil para Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      const profileData: any = {
        uid: user.uid,
        nombre: values.nombre,
        apellido: values.apellido,
        username: values.username,
        correo: values.correo,
        photoURL: user.photoURL || '',
        esEmpresario: values.esEmpresario,
      };

      if (values.esEmpresario) {
        profileData.RUC = values.RUC;
        profileData.sector = values.sector;
      }
      
      // 4. Crear el documento de perfil en Firestore
      await setDoc(userDocRef, profileData);

      // 5. Finalizar el proceso con una notificación de éxito
      toast({ 
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
      });
      registerModal.onClose();
      loginModal.onOpen(); 
      form.reset();

    } catch (error: any) {
      let errorMessage = "Ocurrió un error desconocido durante el registro.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está registrado.';
        form.setError("correo", { message: errorMessage });
      } else {
        console.error("Error en el registro:", error);
      }
      toast({
        variant: 'destructive',
        title: "Error en el registro",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  return (
    <Dialog open={registerModal.isOpen} onOpenChange={registerModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear una cuenta</DialogTitle>
          <DialogDescription>
            Únete a la comunidad para guardar tu progreso y participar en el foro.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="nombre" render={({ field }) => ( <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="apellido" render={({ field }) => ( <FormItem><FormLabel>Apellido</FormLabel><FormControl><Input {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <FormField control={form.control} name="username" render={({ field }) => ( <FormItem><FormLabel>Nombre de Usuario</FormLabel><FormControl><Input {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="correo" render={({ field }) => ( <FormItem><FormLabel>Correo electrónico</FormLabel><FormControl><Input type="email" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="password" render={({ field }) => ( <FormItem><FormLabel>Contraseña</FormLabel><FormControl><Input type="password" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>)} />

            <FormField
              control={form.control}
              name="esEmpresario"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>Soy empresario</FormLabel>
                        <FormDescription>Selecciona si eres empresario para añadir RUC y sector.</FormDescription>
                    </div>
                </FormItem>
              )}
            />

            {isEmpresario && (
                <>
                    <FormField control={form.control} name="RUC" render={({ field }) => ( <FormItem><FormLabel>RUC</FormLabel><FormControl><Input {...field} value={field.value || ''} disabled={isLoading} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sector</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu sector" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="agricultura">Agricultura</SelectItem>
                              <SelectItem value="tecnologia">Tecnología</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="servicios">Servicios</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Button variant="link" className="px-0" onClick={onToggle}>
            Inicia sesión
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
