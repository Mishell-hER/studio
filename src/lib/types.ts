import { Timestamp } from 'firebase/firestore';

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: 'normal' | 'expert';
  continent?: string;
  verified: boolean;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  continent: string;
  timestamp: Timestamp;
};

export type Reply = {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  timestamp: Timestamp;
};
