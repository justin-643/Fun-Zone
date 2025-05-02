import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  databaseURL: 'https://check10151425-default-rtdb.asia-southeast1.firebasedatabase.app',
  apiKey: 'AIzaSyDHZOmC4KbYoIqzL6qLxg_kcrWyXYOhyXk',
  authDomain: 'check10151425.firebaseapp.com',
  projectId: 'check10151425',
  storageBucket: 'check10151425.appspot.com',
  messagingSenderId: '450310103669',
  appId: '1:450310103669:web:9a8f0f9f0f0f0f0f0f0f0f'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);