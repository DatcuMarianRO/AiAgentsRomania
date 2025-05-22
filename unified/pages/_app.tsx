import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AuthProvider } from '../hooks/useAuth';
import { AdminProvider } from '../contexts/AdminContext';

export default function UnifiedApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AdminProvider>
        <Component {...pageProps} />
      </AdminProvider>
    </AuthProvider>
  );
}