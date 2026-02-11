import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCi0MA15VRt23xXLtFlo-zWbgr7D2z-Dfo",
  authDomain: "miriam-yacobson.firebaseapp.com",
  projectId: "miriam-yacobson",
  storageBucket: "miriam-yacobson.firebasestorage.app",
  messagingSenderId: "261583763715",
  appId: "1:261583763715:web:b8de506a0381aef48e1136"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
