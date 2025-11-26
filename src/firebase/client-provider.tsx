
'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { FirebaseProvider } from './provider';
import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth, getRedirectResult } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useLoginModal } from '@/hooks/use-login-modal';
import { firebaseConfig } from './config'; // ¡¡¡ESTA ERA LA IMPORTACIÓN QUE FALTABA!!!

interface FirebaseInstancesState {
  app: FirebaseApp | undefined;
  auth: Auth | undefined;
  firestore: Firestore | undefined;
}

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [instances, setInstances] = useState<FirebaseInstancesState>({
    app: undefined,
    auth: undefined,
    firestore: undefined,
  });

  const { toast } = useToast();
  const loginModal = useLoginModal();

  // Función para manejar el resultado de la redirección de Google
  const handleRedirectResult = useCallback(async (auth: Auth, firestore: Firestore) => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        loginModal.onClose();

        const user = result.user;
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
              title: `¡Bienvenido/a de nuevo, ${user.displayName}!`,
              description: 'Has iniciado sesión correctamente.',
          });
        }
      }
    } catch (error: any) {
      if (error.code !== 'auth/web-storage-unsupported' && error.code !== 'auth/operation-not-supported-in-this-environment') {
        console.error("Error al obtener resultado de redirección:", error);
        toast({
          variant: 'destructive',
          title: 'Error de inicio de sesión',
          description: "No se pudo completar el inicio de sesión con Google. Por favor, inténtalo de nuevo.",
        });
      }
    }
  }, [toast, loginModal]);


  useEffect(() => {
    // Asegurarse de que este código solo se ejecute en el navegador
    if (typeof window !== 'undefined') {
      let app: FirebaseApp;
      if (getApps().length === 0) {
        // Inicializamos Firebase CON la configuración
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }

      const auth = getAuth(app);
      const firestore = getFirestore(app);
      setInstances({ app, auth, firestore });

      // Una vez inicializado, comprobamos si hay un resultado de redirección pendiente
      handleRedirectResult(auth, firestore);
    }
  }, [handleRedirectResult]);

  return (
    <FirebaseProvider
      app={instances.app || null}
      auth={instances.auth || null}
      firestore={instances.firestore || null}
    >
      {children}
    </FirebaseProvider>
  );
}
