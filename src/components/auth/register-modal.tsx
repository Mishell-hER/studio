
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { useLoginModal } from '@/hooks/use-login-modal';
import { cn } from '@/lib/utils';

const profileImages = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${i + 1}/100/100`);

const formSchema = z
  .object({
    firstName: z.string().min(1, 'El nombre es obligatorio.'),
    lastName: z.string().min(1, 'El apellido es obligatorio.'),
    email: z.string().email('Correo electrónico no válido.'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    birthYear: z.coerce.number().min(1900, 'Año no válido.').max(new Date().getFullYear() - 10, 'Debes tener al menos 10 años.'),
    photoURL: z.string().url('Por favor, selecciona una foto de perfil.').min(1, 'Por favor, selecciona una foto de perfil.'),
    hasCompany: z.boolean().default(false),
    ruc: z.string().optional(),
    sector: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasCompany) {
        return !!data.ruc && data.ruc.length > 0 && !!data.sector && data.sector.length > 0;
      }
      return true;
    },
    {
      message: 'RUC y sector son obligatorios si tienes una empresa.',
      path: ['hasCompany'],
    }
  );

export function RegisterModal() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { isOpen, onClose } = useRegisterModal();
  const loginModal = useLoginModal();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthYear: undefined,
      photoURL: '',
      hasCompany: false,
      ruc: '',
      sector: '',
    },
  });
  
  const hasCompany = form.watch('hasCompany');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth || !firestore) {
      setError('Servicios de Firebase no disponibles.');
      return;
    }
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      const displayName = `${values.firstName} ${values.lastName}`;

      await updateProfile(user, { 
          displayName,
          photoURL: values.photoURL 
        });

      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: displayName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        birthYear: values.birthYear,
        photoURL: values.photoURL,
        hasCompany: values.hasCompany,
        ruc: values.hasCompany ? values.ruc : null,
        sector: values.hasCompany ? values.sector : null,
        role: 'normal',
        verified: false,
        createdAt: serverTimestamp(),
      });

      onClose();
      router.push('/forum'); // Redirigir al foro después del registro
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado.');
      } else {
        setError('Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.');
      }
      console.error(err);
    }
  }

  const handleOpenLogin = () => {
    onClose();
    loginModal.onOpen();
  }

  const handleClose = () => {
    setError('');
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear una Cuenta</DialogTitle>
          <DialogDescription>Completa el formulario para unirte a la comunidad.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl><Input type="password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField control={form.control} name="birthYear" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año de Nacimiento</FormLabel>
                    <FormControl><Input type="number" min="1900" max={new Date().getFullYear()} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={form.control}
                name="photoURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elige tu Foto de Perfil</FormLabel>
                     <FormControl>
                        <div className="grid grid-cols-5 gap-2">
                          {profileImages.map((img) => (
                            <button
                              key={img}
                              type="button"
                              onClick={() => field.onChange(img)}
                              className={cn(
                                'rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                                field.value === img && 'ring-2 ring-primary ring-offset-2'
                              )}
                            >
                              <Image
                                src={img}
                                alt="Avatar"
                                width={100}
                                height={100}
                                className="rounded-full"
                                data-ai-hint="avatar image"
                              />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name="hasCompany" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                     </FormControl>
                    <div className="space-y-1 leading-none">
                       <FormLabel>¿Cuentas con empresa?</FormLabel>
                    </div>
                  </FormItem>
                )} />
              
              {hasCompany && (
                 <div className="space-y-4 rounded-md border p-4">
                     <FormField control={form.control} name="ruc" render={({ field }) => (
                        <FormItem>
                           <FormLabel>RUC</FormLabel>
                           <FormControl><Input {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                     )} />
                     <FormField control={form.control} name="sector" render={({ field }) => (
                        <FormItem>
                           <FormLabel>Sector que Abarca</FormLabel>
                           <FormControl><Input {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                     )} />
                 </div>
              )}

              {error && <p className="text-sm text-destructive">{error}</p>}
              {form.formState.errors.hasCompany && <p className="text-sm text-destructive">{form.formState.errors.hasCompany.message}</p>}
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
              </Button>
            </form>
          </Form>
           <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <button onClick={handleOpenLogin} className="font-medium text-primary hover:underline focus:outline-none">
              Inicia sesión
            </button>
          </p>
      </DialogContent>
    </Dialog>
  );
}
