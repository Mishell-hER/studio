'use server';

import { adminAuth, adminFirestore } from '@/firebase/admin/config';
import * as z from 'zod';
import { getAuth } from 'firebase-admin/auth';

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  apellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." }),
  correo: z.string().email({ message: "Por favor, introduce un correo válido." }),
  esEmpresario: z.boolean().default(false),
  RUC: z.string().optional(),
  sector: z.string().optional(),
}).refine(data => {
    if (data.esEmpresario) {
        return !!data.RUC && data.RUC.length > 0 && !!data.sector && data.sector.length > 0;
    }
    return true;
}, {
    message: "RUC y sector son obligatorios si eres empresario.",
    path: ["esEmpresario"],
});

type RegistrationData = z.infer<typeof formSchema>;

/**
 * Server Action para registrar el perfil de un nuevo usuario en Firestore.
 * Ya no crea el usuario en Auth, solo el perfil. La autenticación se maneja
 * por separado con el flujo de Email Link.
 * @param data Los datos del formulario de registro.
 */
export async function registerUser(data: RegistrationData) {
    if (!adminAuth || !adminFirestore) {
        return { success: false, error: 'La configuración del servidor de Firebase no está completa. Revisa las credenciales del entorno.' };
    }

    const result = formSchema.safeParse(data);
    if (!result.success) {
        const errorMessages = result.error.errors.map(e => `${e.path.join('.')} - ${e.message}`).join('; ');
        return { success: false, error: `Datos de formulario inválidos: ${errorMessages}` };
    }
    
    const { correo, ...profileData } = result.data;

    try {
        // Verificar si el nombre de usuario ya está en uso
        const usernameSnapshot = await adminFirestore.collection('users').where('username', '==', profileData.username).get();
        if (!usernameSnapshot.empty) {
            return { success: false, error: 'Este nombre de usuario ya está en uso.' };
        }

        // Verificar si el correo ya está en uso en Firestore (y por lo tanto en Auth)
        const emailSnapshot = await adminFirestore.collection('users').where('correo', '==', correo).get();
        if (!emailSnapshot.empty) {
            return { success: false, error: 'Este correo electrónico ya está registrado.' };
        }
        
        // ¡Importante! El usuario aún no existe en Firebase Auth.
        // El flujo de Email Link lo creará la primera vez que inicie sesión.
        // Lo que hacemos aquí es PRE-CREAR el perfil en Firestore,
        // pero necesitamos un UID. Vamos a usar un UID temporal que luego
        // puede ser actualizado, o mejor, simplemente usamos el email como ID
        // temporal si el modelo de datos lo permite.
        // 
        // Para este caso, vamos a crear un usuario en Auth pero sin contraseña,
        // para tener un UID estable desde el principio.
        
        const userRecord = await adminAuth.createUser({
            email: correo,
            emailVerified: false, // Se verificará con el primer inicio de sesión
            displayName: `${profileData.nombre} ${profileData.apellido}`,
        });

        const userId = userRecord.uid;

        const firestoreProfile: any = {
            uid: userId,
            ...profileData, 
            correo: correo,
        };

        if (!firestoreProfile.esEmpresario) {
            delete firestoreProfile.RUC;
            delete firestoreProfile.sector;
        }

        await adminFirestore.collection('users').doc(userId).set(firestoreProfile);

        return { success: true, userId, message: 'Perfil creado exitosamente.' };

    } catch (error: any) {
        let errorMessage = 'Error desconocido durante el registro.';
        
        if (error.code === 'auth/email-already-exists') {
            errorMessage = 'El correo electrónico ya está registrado.';
        } else {
            errorMessage = error.message; 
        }

        console.error("Error de registro en Server Action:", error);
        return { success: false, error: errorMessage };
    }
}
