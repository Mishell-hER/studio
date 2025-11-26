'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;
let googleProvider: GoogleAuthProvider | undefined;

function getFirebaseInstances() {
  if (typeof window !== 'undefined') {
    if (getApps().length === 0) {
      if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_VALOR_AQUI") {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
        googleProvider = new GoogleAuthProvider();
        googleProvider.addScope('profile');
        googleProvider.addScope('email');
      } else {
        console.warn("FIREBASE CLIENT WARNING: Firebase config is missing or invalid. Please update src/firebase/config.ts with your project credentials. Firebase features will not work.");
      }
    } else {
      app = getApps()[0];
      if (app) {
        auth = getAuth(app);
        firestore = getFirestore(app);
        if (!googleProvider) {
          googleProvider = new GoogleAuthProvider();
          googleProvider.addScope('profile');
          googleProvider.addScope('email');
        }
      }
    }
  }

  return { app, auth, firestore, googleProvider };
}

export { getFirebaseInstances };
