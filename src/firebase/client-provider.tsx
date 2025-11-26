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

  useEffect(() => {
    // Esta función se ejecutará solo en el cliente, después del montaje.
    const { app, auth, firestore } = getFirebaseInstances();
    if (app && auth && firestore) {
      setInstances({ app, auth, firestore });
    }
  }, []);

  if (!instances.app || !instances.auth || !instances.firestore) {
    // Muestra un loader o nada mientras Firebase se inicializa
    return <>{children}</>;
  }

  return (
    <FirebaseProvider
      app={instances.app}
      auth={instances.auth}
      firestore={instances.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
