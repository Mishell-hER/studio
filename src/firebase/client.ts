
'use client';

import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;
export let googleProvider: GoogleAuthProvider | undefined;

// Esta función se asegura de que Firebase se inicialice solo una vez y solo en el cliente.
function initializeFirebase() {
  if (typeof window !== 'undefined' && getApps().length === 0) {
    if (firebaseConfig && firebaseConfig.apiKey) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      firestore = getFirestore(app);
      googleProvider = new GoogleAuthProvider();
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
    }
  } else if (typeof window !== 'undefined') {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
    if (!googleProvider) {
      googleProvider = new GoogleAuthProvider();
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
    }
  }
}

// Inicializamos Firebase al cargar este módulo en el cliente
initializeFirebase();

export function getFirebaseInstances() {
  // Ahora esta función simplemente devuelve las instancias ya creadas.
  return { app, auth, firestore };
}
