
'use client';

import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;
let googleProvider: GoogleAuthProvider | undefined;

// Verificamos que las credenciales no sean los valores por defecto
const isConfigValid = firebaseConfig && firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('AIzaSyA');

function initializeFirebase() {
  if (typeof window !== 'undefined') {
    if (isConfigValid) {
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
    } else {
        // No intentes inicializar si la configuración no es válida.
        // Las funciones getFirebaseInstances devolverán undefined y la UI lo manejará.
        console.warn("FIREBASE CLIENT WARNING: Firebase config is missing or invalid. Please update src/firebase/config.ts with your project credentials. Firebase features will not work.");
    }
  }
}

// Llama a la inicialización para que se ejecute una vez al cargar el script
initializeFirebase();

export function getFirebaseInstances() {
  // Esta función simplemente devuelve las instancias ya creadas (o undefined si la config no era válida)
  return { app, auth, firestore, googleProvider };
}
