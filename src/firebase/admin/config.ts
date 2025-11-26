
// src/firebase/admin/config.ts (¡Solo se usa en el lado del servidor!)
import * as admin from 'firebase-admin';

// Define la forma de las credenciales de la cuenta de servicio
interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

// Lee las credenciales de las variables de entorno
const serviceAccount: Partial<ServiceAccount> = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Reemplaza los '\\n' por '\n' para restaurar los saltos de línea originales.
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Inicializa Firebase Admin solo si no ha sido inicializado
// y si las credenciales están completas.
if (!admin.apps.length) {
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount as ServiceAccount),
            });
            console.log("🟢 Firebase Admin SDK inicializado exitosamente.");
        } catch (error: any) {
            console.error('❌ Fallo al inicializar Firebase Admin SDK:', error.message);
            throw new Error("Error al inicializar el Admin SDK.");
        }
    } else {
        console.warn('🔴 ERROR: Credenciales de Firebase Admin SDK faltantes. Verifica tus variables de entorno.');
    }
}


// Exporta las instancias de admin de forma segura, incluso si la inicialización falló.
// El código que las use debe estar preparado para que no estén disponibles si las credenciales no se proporcionaron.
const adminAuth = admin.apps.length ? admin.auth() : null;
const adminFirestore = admin.apps.length ? admin.firestore() : null;

export { adminAuth, adminFirestore };
