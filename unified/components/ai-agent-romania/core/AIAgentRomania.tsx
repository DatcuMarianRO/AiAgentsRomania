import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { FloatingWidget } from '../ui/FloatingWidget';
import { ConversationEngine } from './ConversationEngine';
import { ContextManager } from './ContextManager';
import { OpenRouterClient } from '../intelligence/OpenRouterClient';
import { Message, Suggestion, QuickAction } from '../store/aiAgentStore';

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
  language = 'auto', // eslint-disable-line @typescript-eslint/no-unused-vars
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
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [processingState, setProcessingState] = useState<'idle' | 'thinking' | 'responding'>('idle');
  const [streamingResponse, setStreamingResponse] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [quickActions] = useState<QuickAction[]>([]);
  
  const openRouterRef = useRef<OpenRouterClient | null>(null);
  const conversationEngineRef = useRef<ConversationEngine | null>(null);
  const contextManagerRef = useRef<ContextManager | null>(null);

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize services
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

    // Initial welcome message
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Bună! 👋 Sunt AI AGENT ROMANIA, asistentul tău personal. Cum te pot ajuta azi?',
      timestamp: new Date()
    }]);

    // Set initial suggestions based on page
    updateSuggestionsForPage();

    return () => {
      conversationEngineRef.current?.destroy();
      contextManagerRef.current?.destroy();
    };
  }, [isClient, apiKey, router]);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      contextManagerRef.current?.updateContext();
      updateSuggestionsForPage();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

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
        if (idleTime > 60 && !isOpen) {
          setIsOpen(true);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Pot să te ajut cu ceva? 🤔',
            timestamp: new Date()
          }]);
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
  }, [features.proactive, isClient, isOpen]);

  const updateSuggestionsForPage = () => {
    const context = contextManagerRef.current?.getContext();
    if (!context) return;

    const metadata = context.metadata || { suggestions: [] };
    setSuggestions(
      metadata.suggestions.map((text: string, index: number) => ({
        id: index.toString(),
        text,
        icon: ['🎯', '✨', '🚀'][index] || '💡'
      }))
    );
  };

  const handleSendMessage = useCallback(async (message: string) => {
    if (!conversationEngineRef.current || !openRouterRef.current) return;

    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      setProcessingState('thinking');
      
      // Get context
      const context = contextManagerRef.current?.getContext();
      const systemPrompt = await openRouterRef.current.generateSystemPrompt({
        page: context?.path,
        language: 'ro',
        conversationMode: 'general'
      });

      // Prepare messages for API
      const apiMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        { role: 'user' as const, content: message }
      ];

      setProcessingState('responding');
      
      // Get response with streaming
      const response = await openRouterRef.current.chat(apiMessages, {
        stream: true,
        taskType: 'general',
        context
      });

      // Handle streaming response
      let fullResponse = '';
      setStreamingResponse('');
      
      for await (const chunk of response) {
        fullResponse += chunk;
        setStreamingResponse(fullResponse);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setStreamingResponse('');
      setProcessingState('idle');

    } catch (error) {
      console.error('Error sending message:', error);
      setProcessingState('idle');
      setStreamingResponse('');
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Scuze, am întâmpinat o problemă. Poți încerca din nou?',
        timestamp: new Date()
      }]);
    }
  }, [messages]);

  if (!isClient) return null;

  return (
    <FloatingWidget
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      position={position}
      theme={theme}
      messages={messages}
      onSendMessage={handleSendMessage}
      processingState={processingState}
      streamingResponse={streamingResponse}
      suggestions={suggestions}
      quickActions={quickActions}
      features={features}
    />
  );
};