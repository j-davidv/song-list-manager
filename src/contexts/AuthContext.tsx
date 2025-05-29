import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string, stayLoggedIn?: boolean) => Promise<void>;
  adminLogin: (username: string, password: string, stayLoggedIn?: boolean) => Promise<void>;
  register: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Verify admin credentials are set
if (!process.env.REACT_APP_ADMIN_USERNAME || !process.env.REACT_APP_ADMIN_PASSWORD) {
  throw new Error('Admin credentials not configured. Please set REACT_APP_ADMIN_USERNAME and REACT_APP_ADMIN_PASSWORD in your environment variables.');
}

// Admin credentials from environment variables
const ADMIN_CREDENTIALS = {
  username: process.env.REACT_APP_ADMIN_USERNAME,
  password: process.env.REACT_APP_ADMIN_PASSWORD
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage (persistent) or sessionStorage (temporary)
    const persistentAdminUser = localStorage.getItem('adminUser');
    const sessionAdminUser = sessionStorage.getItem('adminUser');
    
    if (persistentAdminUser) {
      setCurrentUser(JSON.parse(persistentAdminUser));
      setLoading(false);
      return;
    } else if (sessionAdminUser) {
      setCurrentUser(JSON.parse(sessionAdminUser));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            isAdmin: userData.isAdmin || false
          });
        } else {
          // Create user document if it doesn't exist
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            isAdmin: false
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setCurrentUser(newUser);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string, stayLoggedIn: boolean = false) => {
    // Set Firebase persistence based on user choice
    await setPersistence(auth, stayLoggedIn ? browserLocalPersistence : browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const adminLogin = async (username: string, password: string, stayLoggedIn: boolean = false) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        uid: 'admin-user',
        email: 'admin@beloved.com',
        displayName: 'Administrator',
        isAdmin: true
      };
      setCurrentUser(adminUser);
      
      // Store in localStorage for persistent login or sessionStorage for temporary
      if (stayLoggedIn) {
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        sessionStorage.removeItem('adminUser'); // Clear session storage if exists
      } else {
        sessionStorage.setItem('adminUser', JSON.stringify(adminUser));
        localStorage.removeItem('adminUser'); // Clear local storage if exists
      }
    } else {
      throw new Error('Invalid admin credentials');
    }
  };

  const register = async (email: string, password: string, isAdmin: boolean = false) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      isAdmin
    });
  };

  const logout = async () => {
    // Clear admin user from both localStorage and sessionStorage
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminUser');
    setCurrentUser(null);
    
    // Also sign out from Firebase if logged in
    try {
      await signOut(auth);
    } catch (error) {
      // User might not be logged in via Firebase, which is fine
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    adminLogin,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 