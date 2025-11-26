
'use client';
import { createContext, useContext, ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, GoogleAuthProvider } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  googleProvider: GoogleAuthProvider | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  firestore: null,
  googleProvider: null,
});

export function FirebaseProvider({
  children,
  ...value
}: {
  children: ReactNode;
} & FirebaseContextValue) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
}

export const useFirebaseApp = () => {
    return useFirebase().app;
}

export const useAuth = () => {
    return useFirebase().auth;
}

export const useFirestore = () => {
    return useFirebase().firestore;
}

export const useGoogleProvider = () => {
    return useFirebase().googleProvider;
}
