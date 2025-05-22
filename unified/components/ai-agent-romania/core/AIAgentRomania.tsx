import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { FloatingWidget } from '../ui/FloatingWidget';
import { ConversationEngine } from './ConversationEngine';
import { ContextManager } from './ContextManager';
import { OpenRouterClient } from '../intelligence/OpenRouterClient';
import { useAIAgentStore } from '../store/aiAgentStore';

export interface AIAgentRomaniaProps {
  apiKey: string;
  position?: 'bottom-right' | 'bottom-left' | 'center';
  theme?: 'light' | 'dark' | 'auto';
  language?: 'auto' | 'ro' | 'en' | 'de' | 'fr';
  features?: {
    sales?: boolean;
    support?: boolean;
    guide?: boolean;
    voice?: boolean;
    proactive?: boolean;
  };
  initialOpen?: boolean;
}

export const AIAgentRomania: React.FC<AIAgentRomaniaProps> = ({
  apiKey,
  position = 'bottom-right',
  theme = 'auto',
  language = 'auto',
  features = {
    sales: true,
    support: true,
    guide: true,
    voice: true,
    proactive: true
  },
  initialOpen = false
}) => {
  const router = useRouter();
  const store = useAIAgentStore();
  const [isClient, setIsClient] = useState(false);
  const openRouterRef = useRef<OpenRouterClient | null>(null);
  const conversationEngineRef = useRef<ConversationEngine | null>(null);
  const contextManagerRef = useRef<ContextManager | null>(null);

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize OpenRouter client
  useEffect(() => {
    if (!isClient || !apiKey) return;

    openRouterRef.current = new OpenRouterClient({
      apiKey,
      temperature: 0.7,
      maxTokens: 2000
    });

    contextManagerRef.current = new ContextManager(router);
    
    conversationEngineRef.current = new ConversationEngine(
      openRouterRef.current,
      contextManagerRef.current
    );

    // Initialize store
    store.initialize({
      position,
      theme,
      language,
      features,
      isOpen: initialOpen
    });

    return () => {
      // Cleanup
      conversationEngineRef.current?.destroy();
      contextManagerRef.current?.destroy();
    };
  }, [isClient, apiKey, position, theme, language, features, initialOpen, router, store]);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      contextManagerRef.current?.updateContext();
      store.updateContext(contextManagerRef.current?.getContext());
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, store]);

  // Proactive assistance
  useEffect(() => {
    if (!features.proactive || !isClient) return;

    let idleTimer: NodeJS.Timeout;
    let lastActivity = Date.now();

    const resetIdleTimer = () => {
      lastActivity = Date.now();
      clearTimeout(idleTimer);
      
      idleTimer = setTimeout(() => {
        const idleTime = (Date.now() - lastActivity) / 1000;
        if (idleTime > 60 && !store.isOpen) {
          store.showProactiveMessage("Pot să te ajut cu ceva? 🤔");
        }
      }, 60000);
    };

    // Monitor user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [features.proactive, isClient, store]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!conversationEngineRef.current) return;

    try {
      store.setProcessingState('thinking');
      
      const response = await conversationEngineRef.current.sendMessage(message, {
        stream: true,
        context: store.currentContext
      });

      store.setProcessingState('responding');
      
      // Handle streaming response
      let fullResponse = '';
      for await (const chunk of response) {
        fullResponse += chunk;
        store.updateStreamingResponse(fullResponse);
      }

      store.addMessage({
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date()
      });

      store.setProcessingState('idle');
    } catch (error) {
      console.error('Error sending message:', error);
      store.setProcessingState('idle');
      store.addMessage({
        role: 'assistant',
        content: 'Scuze, am întâmpinat o problemă. Poți încerca din nou?',
        timestamp: new Date()
      });
    }
  }, [store]);

  if (!isClient) return null;

  return (
    <FloatingWidget
      isOpen={store.isOpen}
      onToggle={() => store.toggleOpen()}
      position={store.position}
      theme={store.theme}
      messages={store.messages}
      onSendMessage={handleSendMessage}
      processingState={store.processingState}
      streamingResponse={store.streamingResponse}
      suggestions={store.suggestions}
      quickActions={store.quickActions}
      features={features}
    />
  );
};