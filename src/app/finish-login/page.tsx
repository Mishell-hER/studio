
// src/app/finish-login/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter }from 'next/navigation';
import { useAuth } from '@/firebase';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

function FinishLoginPageContent() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState('Verificando enlace...');

  useEffect(() => {
    const completeSignIn = async () => {
      if (!auth || !firestore || !window.location.href) {
        // Espera a que Firebase se inicialice en el cliente.
        // Si no se inicializa, las funciones de hook devolverán null.
        if(!auth || !firestore){
            setStatus("Esperando la inicialización de Firebase...");
            return;
        }
        return;
      }

      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Por favor, ingresa tu correo electrónico para confirmar.');
        }

        if (!email) {
          setStatus('No se proporcionó un correo. Proceso cancelado.');
          toast({
            variant: 'destructive',
            title: 'Inicio de sesión cancelado',
            description: 'No se pudo obtener el correo electrónico para la confirmación.',
          });
          router.push('/');
          return;
        }

        setStatus('Iniciando sesión...');
        try {
          const result = await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');

          const user = result.user;
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            const username = email.split('@')[0] || `user${Date.now()}`;
            const nameParts = user.displayName?.split(' ') || [username];
            await setDoc(userDocRef, {
                uid: user.uid,
                nombre: nameParts[0],
                apellido: nameParts.slice(1).join(' ') || '',
                username: username,
                correo: email,
                photoURL: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
                esEmpresario: false,
                createdAt: serverTimestamp()
            }, { merge: true });
             toast({
                title: '¡Bienvenido/a!',
                description: 'Hemos creado un perfil básico para ti.',
            });
          } else {
             toast({
                title: '¡Bienvenido/a de nuevo!',
                description: 'Has iniciado sesión correctamente.',
            });
          }

          setStatus('¡Inicio de sesión exitoso! Redirigiendo...');
          router.push('/');
          
        } catch (error: any) {
          console.error('Error al iniciar sesión con el enlace:', error);
          setStatus(`Error: ${error.message}`);
          toast({
            variant: 'destructive',
            title: 'Error al iniciar sesión',
            description: 'El enlace puede ser inválido o haber expirado. Por favor, inténtalo de nuevo.',
          });
          router.push('/');
        }
      } else {
        setStatus('Enlace no válido. Redirigiendo al inicio...');
        router.push('/');
      }
    };

    completeSignIn();
  }, [auth, firestore, router, toast]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tighter sm:text-3xl">
          Completando inicio de sesión...
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
          {status}
        </p>
         <div className="flex justify-center">
          <svg
            className="h-10 w-10 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function FinishLoginPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <FinishLoginPageContent />
        </Suspense>
    )
}
