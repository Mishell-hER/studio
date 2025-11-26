
'use client';

// Barrel file for client-side Firebase utilities.
export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './client-provider';

// Export types for convenience
export type { FirebaseApp, FirebaseOptions } from 'firebase/app';
export type { Auth } from 'firebase/auth';
export type { Firestore } from 'firebase/firestore';
