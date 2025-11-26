// src/firebase/admin/config.ts

import * as admin from 'firebase-admin';

// Define la forma de las credenciales de la cuenta de servicio
interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

let initialized = false;

// 1. Comprobar que todas las credenciales estén disponibles
if (!process.env.FIREBASE_PROJECT_ID) {
    console.warn("🔴 ADVERTENCIA: La variable de entorno FIREBASE_PROJECT_ID no está definida. Las funciones de administrador no estarán disponibles.");
} else if (!process.env.FIREBASE_CLIENT_EMAIL) {
    console.warn("🔴 ADVERTENCIA: La variable de entorno FIREBASE_CLIENT_EMAIL no está definida. Las funciones de administrador no estarán disponibles.");
} else if (!process.env.FIREBASE_PRIVATE_KEY) {
    console.warn("🔴 ADVERTENCIA: La variable de entorno FIREBASE_PRIVATE_KEY no está definida. Las funciones de administrador no estarán disponibles.");
} else {
    initialized = true;
}


// 2. Inicializar el Admin SDK si aún no se ha hecho y las credenciales están completas
if (initialized && !admin.apps.length) {
    try {
        const serviceAccount: ServiceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            // ⚠️ CORRECCIÓN CLAVE: Reemplazamos los '\\n' por '\n' para restaurar los saltos de línea originales.
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("🟢 Firebase Admin SDK inicializado exitosamente.");
    } catch (error: any) {
        console.error("❌ Fallo al inicializar Firebase Admin SDK:", error.message);
        initialized = false;
    }
}

// 3. Exportar las instancias (serán 'null' si la inicialización falló o se omitió)
const adminAuth = initialized ? admin.auth() : null;
const adminFirestore = initialized ? admin.firestore() : null;

export { adminAuth, adminFirestore };
