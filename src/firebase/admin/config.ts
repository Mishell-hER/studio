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

// 2. Inicializar el Admin SDK si aún no se ha hecho y las credenciales están completas
if (!admin.apps.length) {
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount as ServiceAccount),
            });
            console.log("🟢 Firebase Admin SDK inicializado exitosamente.");
        } catch (error: any) {
            console.error("❌ Fallo al inicializar Firebase Admin SDK:", error);
            // Lanzar un error aquí es opcional, pero ayuda a diagnosticar
        }
    } else {
        console.warn("🔴 ADVERTENCIA: Credenciales de Firebase Admin SDK faltantes. Las funciones de administrador no estarán disponibles. Verifica tu archivo .env");
    }
}

// 3. Exportar las instancias (serán 'null' si la inicialización falló o se omitió)
const adminAuth = admin.apps.length ? admin.auth() : null;
const adminFirestore = admin.apps.length ? admin.firestore() : null;

export { adminAuth, adminFirestore };
