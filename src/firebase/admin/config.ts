// src/firebase/admin/config.ts

import * as admin from 'firebase-admin';

// Define la forma de las credenciales de la cuenta de servicio
interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

// 1. Obtener y preparar las variables de entorno
const serviceAccount: Partial<ServiceAccount> = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // ⚠️ CORRECCIÓN CLAVE: Reemplazamos los '\\n' por '\n' para restaurar los saltos de línea originales.
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let initialized = false;

// 2. Comprobar que todas las credenciales estén disponibles
if (!serviceAccount.projectId) {
    console.warn("🔴 ADVERTENCIA: La variable de entorno FIREBASE_PROJECT_ID no está definida en tu archivo .env. Las funciones de administrador no estarán disponibles.");
} else if (!serviceAccount.clientEmail) {
    console.warn("🔴 ADVERTENCIA: La variable de entorno FIREBASE_CLIENT_EMAIL no está definida en tu archivo .env. Las funciones de administrador no estarán disponibles.");
} else if (!serviceAccount.privateKey) {
    console.warn("🔴 ADVERTENCIA: La variable de entorno FIREBASE_PRIVATE_KEY no está definida en tu archivo .env. Las funciones de administrador no estarán disponibles.");
} else {
    initialized = true;
}


// 3. Inicializar el Admin SDK si aún no se ha hecho y las credenciales están completas
if (initialized && !admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
        console.log("🟢 Firebase Admin SDK inicializado exitosamente.");
    } catch (error: any) {
        console.error("❌ Fallo al inicializar Firebase Admin SDK:", error.message);
        initialized = false;
    }
}

// 4. Exportar las instancias (serán 'null' si la inicialización falló o se omitió)
const adminAuth = initialized ? admin.auth() : null;
const adminFirestore = initialized ? admin.firestore() : null;

export { adminAuth, adminFirestore };
