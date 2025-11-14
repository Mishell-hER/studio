import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initializeFirebase(config: FirebaseOptions) {
  const apps = getApps();
  const app = apps.length ? apps[0] : initializeApp(config);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  if (process.env.NODE_ENV === 'development') {
    // These checks are to prevent re-connecting the emulators on every hot-reload
    if (!(auth as any).emulatorConfig) {
        connectAuthEmulator(auth, 'http://localhost:9099');
    }
    if (!(firestore as any).emulatorConfig) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }

  return { app, auth, firestore };
}

// Hook to get Firebase services
function useFirebase() {
  const { app, auth, firestore } = initializeFirebase(firebaseConfig);
  return { app, auth, firestore };
}

function useFirebaseApp() {
    return initializeFirebase(firebaseConfig).app;
}

function useAuth() {
    return initializeFirebase(firebaseConfig).auth;
}

function useFirestore() {
    return initializeFirebase(firebaseConfig).firestore;
}


export { useFirebase, useFirebaseApp, useAuth, useFirestore, initializeFirebase };
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
