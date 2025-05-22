import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface PageContext {
  path: string;
  title: string;
  type: string;
  params?: any;
}

export interface UserProfile {
  id?: string;
  type: 'visitor' | 'user' | 'customer';
  language?: string;
  preferences?: any;
}

export interface Suggestion {
  id: string;
  text: string;
  icon?: string;
  action?: () => void;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
}

export interface AIAgentState {
  // Conversation state
  messages: Message[];
  currentContext: PageContext | null;
  userProfile: UserProfile;
  conversationMode: 'sales' | 'support' | 'guide' | 'general';
  
  // UI state
  isOpen: boolean;
  isFullscreen: boolean;
  position: 'bottom-right' | 'bottom-left' | 'center';
  theme: 'light' | 'dark' | 'auto';
  language: 'auto' | 'ro' | 'en' | 'de' | 'fr';
  
  // Intelligence state
  activeModel: string;
  streamingResponse: string;
  processingState: 'idle' | 'thinking' | 'responding';
  
  // Features state
  features: {
    sales: boolean;
    support: boolean;
    guide: boolean;
    voice: boolean;
    proactive: boolean;
  };
  suggestions: Suggestion[];
  quickActions: QuickAction[];
  
  // Actions
  initialize: (config: any) => void;
  toggleOpen: () => void;
  toggleFullscreen: () => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  clearMessages: () => void;
  updateContext: (context: PageContext | null) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setConversationMode: (mode: AIAgentState['conversationMode']) => void;
  setProcessingState: (state: AIAgentState['processingState']) => void;
  updateStreamingResponse: (response: string) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  setQuickActions: (actions: QuickAction[]) => void;
  showProactiveMessage: (message: string) => void;
}

export const useAIAgentStore = create<AIAgentState>()(
  persist(
    (set, get) => ({
      // Initial state
      messages: [],
      currentContext: null,
      userProfile: { type: 'visitor' },
      conversationMode: 'general',
      
      isOpen: false,
      isFullscreen: false,
      position: 'bottom-right',
      theme: 'auto',
      language: 'auto',
      
      activeModel: 'balanced',
      streamingResponse: '',
      processingState: 'idle',
      
      features: {
        sales: true,
        support: true,
        guide: true,
        voice: true,
        proactive: true
      },
      suggestions: [],
      quickActions: [],
      
      // Actions
      initialize: (config) => set((state) => ({
        ...state,
        ...config,
        messages: [
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Bună! 👋 Sunt AI AGENT ROMANIA, asistentul tău personal. Cum te pot ajuta azi?',
            timestamp: new Date()
          }
        ]
      })),
      
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      
      toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, {
          ...message,
          id: Date.now().toString()
        }],
        streamingResponse: '' // Clear streaming response
      })),
      
      clearMessages: () => set({ 
        messages: [{
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Conversație nouă începută. Cu ce te pot ajuta?',
          timestamp: new Date()
        }] 
      }),
      
      updateContext: (context) => set({ currentContext: context }),
      
      updateUserProfile: (profile) => set((state) => ({
        userProfile: { ...state.userProfile, ...profile }
      })),
      
      setConversationMode: (mode) => set({ conversationMode: mode }),
      
      setProcessingState: (processingState) => set({ processingState }),
      
      updateStreamingResponse: (response) => set({ streamingResponse: response }),
      
      setSuggestions: (suggestions) => set({ suggestions }),
      
      setQuickActions: (quickActions) => set({ quickActions }),
      
      showProactiveMessage: (message) => set((state) => {
        if (!state.isOpen) {
          return {
            isOpen: true,
            messages: [...state.messages, {
              id: Date.now().toString(),
              role: 'assistant',
              content: message,
              timestamp: new Date()
            }]
          };
        }
        return state;
      })
    }),
    {
      name: 'ai-agent-romania-storage',
      partialize: (state) => ({
        messages: state.messages.slice(-20), // Keep only last 20 messages
        userProfile: state.userProfile,
        language: state.language,
        theme: state.theme,
        position: state.position
      })
    }
  )
);