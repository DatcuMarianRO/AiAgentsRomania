import api from './api';
import { User, ApiResponse } from '@/types';

// Auth service for handling authentication and user operations
const authService = {
  // Register a new user
  register: async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/register',
      data
    );
    
    if (response.data.status === 'success' && response.data.data) {
      // Save token to localStorage
      localStorage.setItem('token', response.data.data.token);
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Registration failed');
  },
  
  // Login user
  login: async (data: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/login',
      data
    );
    
    if (response.data.status === 'success' && response.data.data) {
      // Save token to localStorage
      localStorage.setItem('token', response.data.data.token);
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Login failed');
  },
  
  // Get current user profile
  getProfile: async () => {
    const response = await api.get<ApiResponse<{ user: User }>>(
      '/auth/profile'
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.user;
    }
    
    throw new Error(response.data.message || 'Failed to get profile');
  },
  
  // Update user profile
  updateProfile: async (data: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  }) => {
    const response = await api.patch<ApiResponse<{ user: User }>>(
      '/auth/profile',
      data
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.user;
    }
    
    throw new Error(response.data.message || 'Failed to update profile');
  },
  
  // Request password reset
  requestPasswordReset: async (email: string) => {
    const response = await api.post<ApiResponse<void>>(
      '/auth/reset-password-request',
      { email }
    );
    
    if (response.data.status === 'success') {
      return true;
    }
    
    throw new Error(response.data.message || 'Failed to request password reset');
  },
  
  // Reset password with token
  resetPassword: async (token: string, password: string) => {
    const response = await api.post<ApiResponse<void>>(
      '/auth/reset-password',
      { token, password }
    );
    
    if (response.data.status === 'success') {
      return true;
    }
    
    throw new Error(response.data.message || 'Failed to reset password');
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    return true;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },
};

export default authService;