
"use client";

import { ReactNode, useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { firebaseConfig } from './config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  googleProvider: GoogleAuthProvider;
}

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [instances, setInstances] = useState<FirebaseInstances | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let app: FirebaseApp;
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }
      
      const auth = getAuth(app);
      const firestore = getFirestore(app);
      const googleProvider = new GoogleAuthProvider();
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
      
      setInstances({ app, auth, firestore, googleProvider });
    }
  }, []);

  if (!instances) {
    // Puedes mostrar un loader aquí si quieres
    return null; 
  }

  return (
    <FirebaseProvider 
        app={instances.app} 
        auth={instances.auth} 
        firestore={instances.firestore}
        googleProvider={instances.googleProvider}
    >
      {children}
    </FirebaseProvider>
  );
}
