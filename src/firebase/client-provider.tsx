
"use client";

import { ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { app, auth, firestore } from './client'; // Importar instancias ya inicializadas

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  // El proveedor ahora solo pasa las instancias ya creadas desde client.ts
  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
