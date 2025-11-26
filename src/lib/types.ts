import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    nombre: string;
    apellido: string;
    username: string;
    correo: string;
    photoURL?: string;
    esEmpresario: boolean;
    RUC?: string;
    sector?: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName?: string;
    continent: string;
    timestamp: Timestamp;
}

export interface Opinion {
    id: string;
    content: string;
    authorId: string;
    authorName?: string;
    timestamp: Timestamp;
}

export interface Reply {
    id: string;
    postId: string;
    content: string;
    authorId: string;
    authorName?: string;
    authorPhotoURL?: string;
    timestamp: Timestamp;
}

export interface GameProgress {
    id: string;
    userId: string;
    highestLevelCompleted: number;
    levels: {
        [level: number]: {
            score: number;
            timeTakenSeconds: number;
            completedAt: Timestamp;
        }
    };
    lastPlayed: Timestamp;
}
