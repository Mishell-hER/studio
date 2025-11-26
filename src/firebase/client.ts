
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Este archivo es ahora la ÚNICA fuente de verdad para la inicialización y las instancias de Firebase.

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let googleProvider: GoogleAuthProvider;

// Comprobación de que estamos en el navegador antes de inicializar
if (typeof window !== 'undefined') {
  // Inicializamos la app solo si no se ha hecho antes
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  auth = getAuth(app);
  firestore = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('profile');
  googleProvider.addScope('email');
}

// Exportamos las instancias para que sean usadas en toda la aplicación cliente
export { app, auth, firestore, googleProvider };
