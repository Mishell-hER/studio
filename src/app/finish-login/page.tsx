

'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { isSignInWithEmailLink, signInWithEmailLink, getRedirectResult, User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useLoginModal } from '@/hooks/use-login-modal';

function FinishLoginPageContent() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const loginModal = useLoginModal();
  const [status, setStatus] = useState('Verificando inicio de sesión...');

  const processUser = useCallback(async (user: User | null) => {
    if (!firestore || !user) return;
    
    setStatus('Procesando datos de usuario...');
    const userDocRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const username = user.email?.split('@')[0] || `user${Date.now()}`;
      const nameParts = user.displayName?.split(' ') || [username];
      
      await setDoc(userDocRef, {
        uid: user.uid,
        nombre: nameParts[0] || '',
        apellido: nameParts.slice(1).join(' ') || '',
        username: username,
        correo: user.email,
        photoURL: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
        esEmpresario: false,
        createdAt: serverTimestamp()
      });

      toast({
        title: '¡Bienvenido/a a LogisticX!',
        description: 'Hemos creado un perfil para ti.',
      });
    } else {
      toast({
        title: `¡Bienvenido/a de nuevo!`,
        description: 'Has iniciado sesión correctamente.',
      });
    }
  }, [firestore, toast]);


  useEffect(() => {
    const completeSignIn = async () => {
      if (!auth || !firestore) {
        setStatus("Esperando la inicialización de Firebase...");
        return;
      }
      
      // 1. Manejar el resultado de la redirección de Google
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          loginModal.onClose();
          setStatus('Procesando inicio de sesión con Google...');
          await processUser(result.user);
          setStatus('¡Inicio de sesión exitoso! Redirigiendo...');
          router.push('/');
          return; // Finaliza la ejecución si se procesó una redirección de Google
        }
      } catch (error: any) {
         console.error("Error al obtener resultado de redirección:", error);
         toast({
           variant: 'destructive',
           title: 'Error de inicio de sesión',
           description: "No se pudo completar el inicio de sesión con Google. Por favor, inténtalo de nuevo.",
         });
         router.push('/');
         return;
      }

      // 2. Manejar el resultado del enlace de correo electrónico
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Por favor, ingresa tu correo electrónico para confirmar.');
        }

        if (!email) {
          setStatus('No se proporcionó un correo. Proceso cancelado.');
          toast({ variant: 'destructive', title: 'Inicio de sesión cancelado' });
          router.push('/');
          return;
        }

        setStatus('Iniciando sesión con correo...');
        try {
          const result = await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          await processUser(result.user);
          setStatus('¡Inicio de sesión exitoso! Redirigiendo...');
          router.push('/');
          return;
        } catch (error: any) {
          console.error('Error al iniciar sesión con el enlace:', error);
          setStatus(`Error: ${error.message}`);
          toast({
            variant: 'destructive',
            title: 'Error al iniciar sesión',
            description: 'El enlace puede ser inválido o haber expirado.',
          });
          router.push('/');
          return;
        }
      } 
      
      // 3. Si no hay redirección ni enlace, pero ya hay usuario, redirigir
      if(auth.currentUser) {
        setStatus('Ya has iniciado sesión. Redirigiendo...');
        setTimeout(() => router.push('/'), 1000);
        return;
      }
      
      // 4. Si no hay ninguna acción pendiente
      setStatus('No se encontró una acción de inicio de sesión. Redirigiendo al inicio...');
      setTimeout(() => router.push('/'), 2000);
    };

    completeSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, firestore]);

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
