import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, FIREBASE_ENABLED } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  offlineMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase is not enabled, check for demo mode user in localStorage
    if (!FIREBASE_ENABLED || !auth) {
      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        // Create a fake user object for demo mode
        setCurrentUser({ email: 'demo@example.com' } as User);
      }
      setLoading(false);
      return;
    }

    // Firebase is enabled, set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!FIREBASE_ENABLED || !auth) {
      // Demo mode: allow login with any credentials for testing
      if (password === 'demo' || password === 'test') {
        const demoUser = { email: email } as User;
        setCurrentUser(demoUser);
        localStorage.setItem('demoUser', 'true');
        return;
      }
      throw new Error('In offline mode, use password "demo" or "test" to access demo admin panel');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    if (!FIREBASE_ENABLED || !auth) {
      // Demo mode: clear demo user
      setCurrentUser(null);
      localStorage.removeItem('demoUser');
      return;
    }
    await firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signOut,
    offlineMode: !FIREBASE_ENABLED
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
