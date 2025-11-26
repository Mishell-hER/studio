
'use server';

import { adminAuth, adminFirestore } from '@/firebase/admin/config';
import * as z from 'zod';

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  apellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." }),
  correo: z.string().email({ message: "Por favor, introduce un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
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


export async function registerUser(data: RegistrationData) {
    // Barrera de seguridad: si el admin SDK no está inicializado, no podemos continuar.
    if (!adminAuth || !adminFirestore) {
        return { success: false, error: 'La configuración del servidor de Firebase no está completa. Revisa las credenciales del entorno.' };
    }

    const result = formSchema.safeParse(data);
    if (!result.success) {
        const errorMessages = result.error.errors.map(e => `${e.path.join('.')} - ${e.message}`).join('; ');
        return { success: false, error: `Datos de formulario inválidos: ${errorMessages}` };
    }
    const { correo, password, ...profileData } = result.data;
    
    try {
        const usernameSnapshot = await adminFirestore.collection('users').where('username', '==', profileData.username).get();
        if (!usernameSnapshot.empty) {
            return { success: false, error: 'Este nombre de usuario ya está en uso.' };
        }
    } catch(e: any) {
        console.error("Error checking username:", e);
        return { success: false, error: 'Error al verificar el nombre de usuario.' };
    }

    try {
        const userRecord = await adminAuth.createUser({
            email: correo,
            password: password,
            emailVerified: false,
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

        return { success: true, userId, message: 'Registro exitoso.' };

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
