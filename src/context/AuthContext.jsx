import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(() => {
    return localStorage.getItem('editMode') !== 'false';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const snap = await getDoc(doc(db, 'admins', currentUser.email));
          setIsAdmin(snap.exists());
        } catch (err) {
          console.error('Error checking admin status:', err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const toggleEditMode = () => {
    setEditMode(prev => {
      const next = !prev;
      localStorage.setItem('editMode', String(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout, editMode, toggleEditMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
