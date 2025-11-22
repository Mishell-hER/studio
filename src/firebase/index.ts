import { initializeApp, getApps, FirebaseOptions } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';

export function initializeFirebase(config: FirebaseOptions) {
  const apps = getApps();
  const app = apps.length ? apps[0] : initializeApp(config);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  if (process.env.NODE_ENV === 'development') {
    // Estos condicionales evitan que se reconecte en cada recarga en caliente
    if (!(auth as any).emulatorConfig) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    }
    if (!(firestore as any)._settings.host) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }

  return { app, auth, firestore };
}
