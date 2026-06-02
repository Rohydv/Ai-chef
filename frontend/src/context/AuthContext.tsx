import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Hardcoded Guest Chef by default for instant sandbox use without sign-in
  const [user] = useState<User | null>({
    id: 1,
    username: 'Guest Chef',
    email: 'guest@nutrichef.com',
    created_at: new Date().toISOString()
  });

  const login = async () => {};
  const register = async () => {};
  const logout = () => {
    alert("Guest Mode is active. Logout is disabled to let you explore freely!");
  };
  const checkAuth = async () => {};

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: true,
      isLoading: false,
      login,
      register,
      logout,
      checkAuth
    }}>
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
