'use client';

import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;
let googleProvider: GoogleAuthProvider | undefined;

const requiredKeys: (keyof typeof firebaseConfig)[] = ['apiKey', 'authDomain', 'projectId'];
const isConfigValid = requiredKeys.every(key => !!firebaseConfig[key] && !firebaseConfig[key].includes('TU_VALOR_AQUI'));


function initializeFirebase() {
  if (typeof window !== 'undefined' && isConfigValid) {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
    firestore = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
  } else if (typeof window !== 'undefined') {
    console.warn("FIREBASE CLIENT WARNING: Firebase config is missing or invalid. Please update src/firebase/config.ts with your project credentials. Firebase features will not work.");
  }
}

// Llama a la inicialización para que se ejecute una vez
initializeFirebase();

function getFirebaseInstances() {
  return { app, auth, firestore, googleProvider };
}

export { getFirebaseInstances };
