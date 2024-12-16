import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import { AutenticacaoDTO } from '../../dto/autenticacao-dto';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getAuthHeaders: () => Record<string, string> | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const auth = async (username: string, password: string): Promise<AutenticacaoDTO | null> => {
    try {
      const response = await axios.post('http://localhost:8086/auth-service/api/auth/signin', {
        username,
        password,
      });
      return response.data as AutenticacaoDTO;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return null;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const autenticacaoDTO = await auth(username, password);

    if (autenticacaoDTO && autenticacaoDTO.authenticated) {
      setIsAuthenticated(true);
      setAuthToken(autenticacaoDTO.token); // Armazena o token
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken(null); // Limpa o token
  };

  const getAuthHeaders = () => {
    if (authToken) {
      return { Authorization: `Bearer ${authToken}` };
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};