import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '../styles/globals.css';
import '../styles/premium-chat-widget.css';
import { AuthProvider } from '../hooks/useAuth';
import { AdminProvider } from '../contexts/AdminContext';

// Dynamically import AI Agent to avoid SSR issues
const AIAgentRomania = dynamic(
  () => import('../components/ai-agent-romania/core/AIAgentRomania').then(mod => mod.AIAgentRomania),
  { 
    ssr: false,
    loading: () => null
  }
);

export default function UnifiedApp({ Component, pageProps }: AppProps) {
  const apiKey = process.env.OPENROUTER_API_KEY || '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';
  const widgetEnabled = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_WIDGET_ENABLED !== 'false';

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