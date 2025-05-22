import { OpenRouterClient, ChatMessage } from '../intelligence/OpenRouterClient';
import { ContextManager } from './ContextManager';
import { useAIAgentStore } from '../store/aiAgentStore';

export class ConversationEngine {
  private openRouter: OpenRouterClient;
  private contextManager: ContextManager;
  private conversationHistory: ChatMessage[] = [];

  constructor(openRouter: OpenRouterClient, contextManager: ContextManager) {
    this.openRouter = openRouter;
    this.contextManager = contextManager;
  }

  async sendMessage(
    message: string,
    options: {
      stream?: boolean;
      context?: any;
    } = {}
  ): Promise<any> {
    const store = useAIAgentStore.getState();
    const context = this.contextManager.getContext();
    
    // Add user message to history
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    this.conversationHistory.push(userMessage);
    store.addMessage(userMessage);

    // Generate system prompt
    const systemPrompt = await this.openRouter.generateSystemPrompt({
      page: context.path,
      language: this.detectLanguage(message),
      userProfile: store.userProfile,
      conversationMode: store.conversationMode
    });

    // Prepare messages for API
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
    ];

    // Determine task type from context
    const taskType = this.determineTaskType(message, context);

    try {
      const response = await this.openRouter.chat(messages, {
        stream: options.stream,
        taskType,
        context: {
          ...context,
          ...options.context
        }
      });

      if (!options.stream) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        this.conversationHistory.push(assistantMessage);
      }

      // Update suggestions based on response
      this.updateSuggestions(taskType, context);

      return response;
    } catch (error) {
      console.error('ConversationEngine error:', error);
      throw error;
    }
  }

  private detectLanguage(text: string): string {
    // Simple language detection based on common patterns
    const patterns = {
      ro: /\b(și|sau|este|sunt|pentru|care|acest|această)\b/i,
      en: /\b(and|or|is|are|for|which|this|that)\b/i,
      de: /\b(und|oder|ist|sind|für|welche|diese|dieser)\b/i,
      fr: /\b(et|ou|est|sont|pour|qui|ce|cette)\b/i
    };

    for (const [lang, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        return lang;
      }
    }

    return 'ro'; // Default to Romanian
  }

  private determineTaskType(message: string, context: any): string {
    const lowerMessage = message.toLowerCase();
    
    // Sales indicators
    if (
      lowerMessage.includes('preț') || 
      lowerMessage.includes('cost') || 
      lowerMessage.includes('abonament') ||
      lowerMessage.includes('discount') ||
      lowerMessage.includes('ofert') ||
      context.path.includes('pricing') ||
      context.path.includes('checkout')
    ) {
      return 'sales';
    }
    
    // Support indicators
    if (
      lowerMessage.includes('problemă') ||
      lowerMessage.includes('eroare') ||
      lowerMessage.includes('nu funcționează') ||
      lowerMessage.includes('ajutor') ||
      lowerMessage.includes('cum') ||
      context.path.includes('support')
    ) {
      return 'support';
    }
    
    // Technical indicators
    if (
      lowerMessage.includes('api') ||
      lowerMessage.includes('cod') ||
      lowerMessage.includes('integr') ||
      lowerMessage.includes('tehnic') ||
      context.path.includes('docs')
    ) {
      return 'technical';
    }
    
    // Content generation
    if (
      lowerMessage.includes('scrie') ||
      lowerMessage.includes('genereaz') ||
      lowerMessage.includes('creează') ||
      lowerMessage.includes('descriere')
    ) {
      return 'creative';
    }
    
    // Analysis
    if (
      lowerMessage.includes('analiză') ||
      lowerMessage.includes('statistici') ||
      lowerMessage.includes('raport') ||
      lowerMessage.includes('date')
    ) {
      return 'analytical';
    }
    
    return 'general';
  }

  private updateSuggestions(taskType: string, context: any): void {
    const store = useAIAgentStore.getState();
    const suggestions = [];

    switch (taskType) {
      case 'sales':
        suggestions.push(
          { id: '1', text: 'Vezi planurile disponibile', icon: '💎' },
          { id: '2', text: 'Calculează ROI', icon: '📊' },
          { id: '3', text: 'Solicită demo', icon: '🎥' }
        );
        break;
      case 'support':
        suggestions.push(
          { id: '1', text: 'Verifică statusul', icon: '✅' },
          { id: '2', text: 'Contactează suport', icon: '🤝' },
          { id: '3', text: 'Vezi documentația', icon: '📚' }
        );
        break;
      case 'technical':
        suggestions.push(
          { id: '1', text: 'Exemplu de cod', icon: '💻' },
          { id: '2', text: 'API Reference', icon: '🔧' },
          { id: '3', text: 'Tutorial pas cu pas', icon: '📖' }
        );
        break;
      default:
        suggestions.push(
          { id: '1', text: 'Explorează agenții', icon: '🤖' },
          { id: '2', text: 'Vezi beneficiile', icon: '✨' },
          { id: '3', text: 'Întrebări frecvente', icon: '❓' }
        );
    }

    store.setSuggestions(suggestions);
  }

  destroy(): void {
    this.conversationHistory = [];
  }
}