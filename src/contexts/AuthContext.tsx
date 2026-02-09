import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import {
  getSession,
  setSession,
  clearSession,
  getUserByUsername,
  verifyPassword,
  createUser,
} from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    username: string,
    password: string,
    securityQuestion: string,
    securityAnswer: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUsername = getSession();
    if (sessionUsername) {
      const storedUser = getUserByUsername(sessionUsername);
      setUser(storedUser || null);
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const isValid = await verifyPassword(username, password);
    if (!isValid) {
      return { success: false, error: 'Invalid username or password' };
    }

    const foundUser = getUserByUsername(username);
    if (!foundUser) {
      return { success: false, error: 'User not found' };
    }

    setSession(foundUser.username);
    setUser(foundUser);
    return { success: true };
  };

  const signup = async (
    username: string,
    password: string,
    securityQuestion: string,
    securityAnswer: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await createUser(username, password, securityQuestion, securityAnswer);
    if (result.success) {
      const newUser = getUserByUsername(username);
      if (newUser) {
        setSession(newUser.username);
        setUser(newUser);
      }
    }
    return result;
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
