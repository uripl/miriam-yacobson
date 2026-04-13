import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyCi0MA15VRt23xXLtFlo-zWbgr7D2z-Dfo',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'miriam-yacobson.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'miriam-yacobson',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'miriam-yacobson.firebasestorage.app',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '261583763715',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:261583763715:web:b8de506a0381aef48e1136'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics - רק בדפדפנים שתומכים (לא ב-SSR או בסביבות ללא cookies)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export default app;
