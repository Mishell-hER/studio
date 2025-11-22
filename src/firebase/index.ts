import { initializeApp, getApps, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';


// Helper para comprobar si estamos en el navegador
const isBrowser = () => typeof window !== 'undefined';

interface FirebaseInstances {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

export function initializeFirebase(config: FirebaseOptions): FirebaseInstances {
  if (!isBrowser() || !config.apiKey) {
    // Si no estamos en el navegador o no hay apiKey, devolvemos nulls.
    // Esto previene errores durante la compilación en el servidor (SSR/SSG).
    return { app: null, auth: null, firestore: null };
  }

  const apps = getApps();
  const app = apps.length ? apps[0] : initializeApp(config);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}
