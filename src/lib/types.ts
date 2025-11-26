

// Mantendremos Timestamp para compatibilidad futura si se vuelve a Firebase
import type { Timestamp } from "firebase/firestore";

// Perfil de usuario local, puede ser extendido
export interface UserProfile {
    uid: string;
    nombre: string;
    // se pueden añadir más campos si se necesita
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName?: string;
    continent: string;
    timestamp: Timestamp; // Mantenido por si se reutiliza
}

export interface Opinion {
    id: string;
    content: string;
    authorId: string;
    authorName?: string;
    timestamp: Timestamp; // Mantenido
}

export interface Reply {
    id: string;
    postId: string;
    content: string;
    authorId: string;
    authorName?: string;
    authorPhotoURL?: string; // Mantenido
    timestamp: Timestamp; // Mantenido
}

export interface GameProgress {
    id: string;
    userId: string;
    highestLevelCompleted: number;
    levels: {
        [level: number]: {
            score: number;
            timeTakenSeconds: number;
            completedAt: Timestamp; // Mantenido
        }
    };
    lastPlayed: Timestamp; // Mantenido
}
