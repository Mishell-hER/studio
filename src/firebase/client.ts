
'use client';

// Este archivo se simplifica para exportar únicamente el proveedor de Google.
// La inicialización de la app se centraliza en FirebaseClientProvider.

import { GoogleAuthProvider } from 'firebase/auth';

// Se crea y exporta una única instancia del proveedor de Google.
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
