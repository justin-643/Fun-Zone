import { create } from 'zustand';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { User } from '../types';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setFirebaseUser: (user: FirebaseUser | null) => void;
}

const crazyNames = [
  'Bandi', 'Bobby', 'Kareem', 'Ruthvin', 'Das',
  'Viv', 'crazy Srikanth', 'Vivek',
  'DJ Tillu', 'Alvi', 'chelsydhar'
];

const crazyAvatars = [
  'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg',
  'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
  'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg',
  'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg',
  'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg',
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  firebaseUser: null,
  isAuthenticated: false,
  isLoading: false,

  setFirebaseUser: (firebaseUser) => {
    set({ firebaseUser });
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true });

    try {
      const url = `https://check10151425-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}.json`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data) {
        throw new Error('User does not exist');
      }

      if (data.password !== password) {
        throw new Error('Incorrect password');
      }

      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        username,
        avatar: crazyAvatars[Math.floor(Math.random() * crazyAvatars.length)],
        status: 'online',
        score: 0,
      };

      set({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });

    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
      set({
        user: null,
        firebaseUser: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
}));

export const getCrazySuggestions = () => crazyNames;
