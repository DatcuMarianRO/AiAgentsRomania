import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header to requests if token exists
api.interceptors.request.use((config) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        // Clear token and redirect to login if not already there
        localStorage.removeItem('token');
        
        // Avoid redirect loops
        if (!window.location.pathname.includes('/auth/login')) {
          window.location.href = '/auth/login?session=expired';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;