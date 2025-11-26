
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
        } catch (error: any) {
            console.error('Firebase Admin Initialization Error:', error.message);
        }
    } else {
        console.warn('Firebase Admin credentials not provided. Admin features will be disabled.');
    }
}


// Exporta las instancias de admin de forma segura, incluso si la inicialización falló.
// Las funciones que las usen deberán manejar el caso de que no estén disponibles.
const adminAuth = admin.apps.length ? admin.auth() : null;
const adminFirestore = admin.apps.length ? admin.firestore() : null;

export { adminAuth, adminFirestore };
