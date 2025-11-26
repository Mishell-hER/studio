'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

function getFirebaseInstances() {
  if (typeof window !== 'undefined') {
    if (!app) {
      const apps = getApps();
      if (apps.length > 0) {
        app = apps[0];
      } else if (firebaseConfig.apiKey) {
        app = initializeApp(firebaseConfig);
      }
    }

    if (app && !auth) {
      auth = getAuth(app);
    }
    if (app && !firestore) {
      firestore = getFirestore(app);
    }
  }

  return { app, auth, firestore };
}

export { getFirebaseInstances };
