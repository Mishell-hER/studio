import { initializeApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';


export function initializeFirebase(config: FirebaseOptions) {
  const apps = getApps();
  const app = apps.length ? apps[0] : initializeApp(config);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // NOTE: Emulator connection is removed as it's not needed for production builds
  // and can cause issues in environments like Vercel.

  return { app, auth, firestore };
}
