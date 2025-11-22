import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    name: string | null;
    email: string | null;
    photoURL?: string | null;
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
