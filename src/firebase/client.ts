'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config'; // Import from the new config file

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

function getFirebaseInstances() {
  // This function will only run on the client side, so `window` is safe to use.
  if (typeof window !== 'undefined') {
    // Check if Firebase has already been initialized
    if (getApps().length === 0) {
      // Check if the config keys are valid before initializing
      if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_VALOR_AQUI") {
        app = initializeApp(firebaseConfig);
      } else {
        console.error("FIREBASE CLIENT ERROR: Firebase config is missing or invalid. Please update src/firebase/config.ts with your project credentials.");
      }
    } else {
      // If already initialized, get the existing app instance
      app = getApps()[0];
    }
  
    // Get Auth and Firestore instances from the app
    if (app) {
      auth = getAuth(app);
      firestore = getFirestore(app);
    }
  }


  return { app, auth, firestore };
}

export { getFirebaseInstances };
