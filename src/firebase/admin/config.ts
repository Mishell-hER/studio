// src/firebase/admin/config.ts (¡Solo se usa en el lado del servidor!)
import * as admin from 'firebase-admin';

// Lee las credenciales de las variables de entorno
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Reemplaza los caracteres de escape `\n` con saltos de línea reales
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};


if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error: any) {
        console.error('Firebase Admin Initialization Error:', error.message);
    }
}

const adminAuth = admin.auth();
const adminFirestore = admin.firestore();

export { adminAuth, adminFirestore };
