import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { ClassroomType, UserType } from '../types';

interface AuthContextData {
  signed: boolean;
  user: UserType | null;
  loading: boolean;
  professorId: string;
  classRoom: ClassroomType | null;
  handleLogin(ra: string, password: string): Promise<void>;
  handleLogout(): void;
  handleSetProfessor(id: string): void;
  handleClassroom(classRoom: ClassroomType): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [professorId, setProfessor] = useState('');
  const [classRoom, setClassRoom] = useState<ClassroomType | null>(null);

  const [loading, setLoading] = useState(false);

  function handleSetProfessor(id: string) {
    setProfessor(id);
  }

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

  function handleClassroom(classRoom: ClassroomType) {
    setClassRoom(classRoom);
  }

  function handleLogout() {
    setUser(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        professorId,
        classRoom,
        handleClassroom,
        handleSetProfessor,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
