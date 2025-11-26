
'use client';

import { initializeApp, getApps, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;
// Exportamos directamente el proveedor para un acceso garantizado
export let googleProvider: GoogleAuthProvider | undefined;

// Verificamos que las credenciales no sean los valores por defecto
const isConfigValid = firebaseConfig && firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('TU_VALOR_AQUI');

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
        
        // Creamos la instancia del proveedor y la asignamos
        googleProvider = new GoogleAuthProvider();
        googleProvider.addScope('profile');
        googleProvider.addScope('email');
    }
  }
}

// Llama a la inicialización para que se ejecute una vez al cargar el script
initializeFirebase();

export function getFirebaseInstances() {
  // Esta función ahora solo devuelve las instancias principales.
  // El proveedor se importa directamente.
  return { app, auth, firestore };
}
