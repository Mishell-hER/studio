import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    photoURL?: string;
    birthYear: number;
    hasCompany: boolean;
    ruc?: string;
    sector?: string;
    role: 'normal' | 'expert';
    verified: boolean;
    createdAt: Timestamp;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    continent: string;
    timestamp: Timestamp;
}

export interface Reply {
    id: string;
    postId: string;
    content: string;
    authorId: string;
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
