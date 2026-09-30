import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { demoUsers } from '@/data/mockData';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  demoLogin: () => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_CREDENTIALS = {
  email: 'admin@worldmonitor.demo',
  password: 'Demo@123',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setUser(demoUsers[0]);
      return true;
    }
    const found = demoUsers.find((u) => u.email === email);
    if (found && password === 'Demo@123') {
      setUser(found);
      return true;
    }
    return false;
  };

  const demoLogin = () => {
    setUser(demoUsers[0]);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    const found = demoUsers.find((u) => u.role === role);
    if (found) setUser(found);
  };

  return (
    <AuthContext.Provider value={{ user, login, demoLogin, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
