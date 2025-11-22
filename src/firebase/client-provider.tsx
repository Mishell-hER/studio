'use client';
import { useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { getApps, initializeApp, getAuth, getFirestore } from './index';
import type { FirebaseApp, Auth, Firestore } from './index';

interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const instances = useMemo(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    // Solo inicializar en el cliente y si la config está presente
    if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
      const apps = getApps();
      const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const firestore = getFirestore(app);
      return { app, auth, firestore };
    }
    
    // En el servidor, devolvemos null
    return null;
  }, []);

  if (!instances) {
    // No renderizar el provider en el servidor o si la config no es válida
    return <>{children}</>;
  }

  const { app, auth, firestore } = instances;

  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
