
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

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
    // Asegurarse de que este código solo se ejecute en el navegador
    if (typeof window !== 'undefined') {
      let app: FirebaseApp;
      
      const isConfigValid = firebaseConfig && firebaseConfig.apiKey;

      if (isConfigValid && getApps().length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }

      if (isConfigValid) {
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        setInstances({ app, auth, firestore });
      }
    }
  }, []);

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
