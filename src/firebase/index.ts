'use client';

// Barrel file for client-side Firebase utilities.
// The actual initialization is handled in FirebaseClientProvider
// to ensure it only runs on the client.

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';

// Export types for convenience
export type { FirebaseApp, FirebaseOptions } from 'firebase/app';
export type { Auth } from 'firebase/auth';
export type { Firestore } from 'firebase/firestore';
