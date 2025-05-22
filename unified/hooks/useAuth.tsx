import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'creator' | 'admin';
  subscription_tier: 'free' | 'basic' | 'premium' | 'enterprise';
  credits_available: number;
  avatar_url?: string;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const API_BASE_URL = '/api/v1';

  const clearError = () => setError(null);

  const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('accessToken');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Special handling for admin account during development
      if (email === 'office@inventevolution.com' && password === 'Invent.25Evolution$') {
        const adminUser = {
          id: 'admin-001',
          email: 'office@inventevolution.com',
          first_name: 'Invent',
          last_name: 'Evolution',
          role: 'admin' as const,
          subscription_tier: 'enterprise' as const,
          credits_available: 999999,
          avatar_url: undefined
        };
        
        localStorage.setItem('accessToken', 'admin-token-test');
        setUser(adminUser);
        return;
      }

      const response = await makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 'success') {
        const { user, accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        setUser(user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await makeRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.status === 'success') {
        const { user, accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        setUser(user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await makeRequest('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await makeRequest('/auth/refresh-token', {
        method: 'POST',
      });

      if (response.status === 'success') {
        const { accessToken, user } = response.data;
        localStorage.setItem('accessToken', accessToken);
        setUser(user);
      }
    } catch (err) {
      // Refresh failed, user needs to login again
      localStorage.removeItem('accessToken');
      setUser(null);
      throw err;
    }
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setInitialized(true);
      return;
    }

    // Special handling for admin token during development
    if (token === 'admin-token-test') {
      const adminUser = {
        id: 'admin-001',
        email: 'office@inventevolution.com',
        first_name: 'Invent',
        last_name: 'Evolution',
        role: 'admin' as const,
        subscription_tier: 'enterprise' as const,
        credits_available: 999999,
        avatar_url: undefined
      };
      setUser(adminUser);
      setInitialized(true);
      return;
    }

    try {
      const response = await makeRequest('/auth/profile');
      
      if (response.status === 'success') {
        setUser(response.data.user);
      }
    } catch (err) {
      // Token might be expired, try to refresh
      try {
        await refreshToken();
      } catch (refreshErr) {
        // Both access and refresh failed
        localStorage.removeItem('accessToken');
        setUser(null);
      }
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    refreshToken,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};