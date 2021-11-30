import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { UserType } from '../types';

interface AuthContextData {
  signed: boolean;
  user: UserType | null;
  loading: boolean;
  handleLogin(ra: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(ra: string, password: string) {
    setLoading(true);

    const response: any = await api.post('/authentication', {
      strategy: 'local',
      ra,
      password,
    });

    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
    }

    setUser(response.data.user);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
