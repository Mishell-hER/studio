
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { getFirebaseInstances } from './client';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

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

  // Este efecto se ejecuta solo una vez en el cliente para obtener las instancias
  // que ya deberían haber sido inicializadas por client.ts
  useEffect(() => {
    const { app, auth, firestore } = getFirebaseInstances();
    setInstances({ app, auth, firestore });
  }, []);

  // Pasamos las instancias al proveedor. Si aún no están listas, 
  // los hooks que dependen de ellas devolverán null, lo cual es manejado por los componentes.
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
