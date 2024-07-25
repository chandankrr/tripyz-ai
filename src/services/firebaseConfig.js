import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCGf_QW8rfQoiPPVzc5ctS6lsyEST-YWW8',
  authDomain: 'tripyz-ai-44c68.firebaseapp.com',
  projectId: 'tripyz-ai-44c68',
  storageBucket: 'tripyz-ai-44c68.appspot.com',
  messagingSenderId: '720940162376',
  appId: '1:720940162376:web:f4c104f1e0a55ac52fa77d',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
