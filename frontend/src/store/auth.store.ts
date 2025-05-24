import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';
import authService from '@/services/auth.service';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; password: string; first_name: string; last_name: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  fetchUserProfile: () => Promise<void>;
  updateProfile: (userData: { first_name?: string; last_name?: string; avatar_url?: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          const { user } = await authService.login({ email, password });
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || error.message || 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },
      
      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          const { user } = await authService.register(userData);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || error.message || 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      fetchUserProfile: async () => {
        try {
          set({ isLoading: true, error: null });
          const user = await authService.getProfile();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || error.message || 'Failed to fetch profile',
            isLoading: false,
            isAuthenticated: false
          });
          throw error;
        }
      },
      
      updateProfile: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          const updatedUser = await authService.updateProfile(userData);
          set({ user: updatedUser, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || error.message || 'Failed to update profile',
            isLoading: false 
          });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);