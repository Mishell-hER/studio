
// src/hooks/use-local-auth.ts
"use client";

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface LocalUserProfile {
    uid: string;
    nombre: string;
}

export interface LocalAuthContextType {
    user: LocalUserProfile | null;
    isLoading: boolean;
    loginLocal: (nombreElegido: string) => LocalUserProfile;
    logoutLocal: () => void;
}

export const LocalAuthContext = createContext<LocalAuthContextType | undefined>(undefined);

export function useLocalAuth() {
    const context = useContext(LocalAuthContext);
    if (context === undefined) {
        throw new Error('useLocalAuth must be used within a LocalUserProvider');
    }
    return context;
}
