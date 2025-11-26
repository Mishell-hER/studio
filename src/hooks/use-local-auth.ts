// src/hooks/use-local-auth.ts
"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

export interface LocalUserProfile {
    uid: string;
    nombre: string;
}

interface LocalAuthContextType {
    user: LocalUserProfile | null;
    isLoading: boolean;
    loginLocal: (nombreElegido: string) => LocalUserProfile;
    logoutLocal: () => void;
}

const LOCAL_STORAGE_KEY = 'localUserAuth';

const LocalAuthContext = createContext<LocalAuthContextType | undefined>(undefined);

export function useLocalAuth() {
    const context = useContext(LocalAuthContext);
    if (context === undefined) {
        throw new Error('useLocalAuth must be used within a LocalUserProvider');
    }
    return context;
}

export function LocalUserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<LocalUserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const loginLocal = (nombreElegido: string) => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUser) {
            const existingUser = JSON.parse(storedUser);
            setUser(existingUser);
            return existingUser;
        }

        const newUid = uuidv4();
        const newUser: LocalUserProfile = {
            uid: newUid,
            nombre: nombreElegido,
        };
        
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
    };

    const logoutLocal = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setUser(null);
    };

    const value = { user, isLoading, loginLocal, logoutLocal };

    return (
        <LocalAuthContext.Provider value={value}>
            {children}
        </LocalAuthContext.Provider>
    );
}
