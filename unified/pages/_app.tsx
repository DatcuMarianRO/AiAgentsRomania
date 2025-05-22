import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AuthProvider } from '../hooks/useAuth';
import { AdminProvider } from '../contexts/AdminContext';
import { AIAgentRomania } from '../components/ai-agent-romania/core/AIAgentRomania';

export default function UnifiedApp({ Component, pageProps }: AppProps) {
  const apiKey = process.env.OPENROUTER_API_KEY || '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';
  const widgetEnabled = process.env.NEXT_PUBLIC_WIDGET_ENABLED !== 'false';

  return (
    <AuthProvider>
      <AdminProvider>
        <Component {...pageProps} />
        {widgetEnabled && (
          <AIAgentRomania 
            apiKey={apiKey}
            position="bottom-right"
            theme="auto"
            language="auto"
            features={{
              sales: true,
              support: true,
              guide: true,
              voice: true,
              proactive: true
            }}
            initialOpen={false}
          />
        )}
      </AdminProvider>
    </AuthProvider>
  );
}