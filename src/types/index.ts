export interface Song {
  id?: string;
  title: string;
  key?: string;
  youtubeLink: string;
  sequence: string;
  sunday: 'first' | 'second' | 'third' | 'fourth' | 'fifth';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin: boolean;
}

export interface SundayLeader {
  id?: string;
  sunday: Sunday;
  leaderName: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type Sunday = 'first' | 'second' | 'third' | 'fourth' | 'fifth'; 