import { EventEmitter } from 'events';

export interface OpenRouterConfig {
  apiKey: string;
  baseURL?: string;
  defaultModel?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  model?: string;
}

export interface ModelConfig {
  fast: string;
  balanced: string;
  powerful: string;
  creative: string;
  analytical: string;
  multilingual: string;
  vision: string;
  code: string;
}

export interface StreamResponse {
  id: string;
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
    finish_reason?: string;
  }>;
  model: string;
}

export class OpenRouterClient extends EventEmitter {
  private config: OpenRouterConfig;
  private models: ModelConfig = {
    fast: 'mistralai/mixtral-8x7b-instruct',
    balanced: 'anthropic/claude-3-sonnet',
    powerful: 'openai/gpt-4-turbo-preview',
    creative: 'anthropic/claude-3-opus',
    analytical: 'openai/gpt-4-turbo-preview',
    multilingual: 'google/gemini-pro',
    vision: 'openai/gpt-4-vision-preview',
    code: 'anthropic/claude-3-opus'
  };

  constructor(config: OpenRouterConfig) {
    super();
    this.config = {
      baseURL: 'https://openrouter.ai/api/v1',
      temperature: 0.7,
      maxTokens: 2000,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0,
      ...config
    };
  }

  private selectModel(taskType: string, context?: any): string {
    // Intelligent model selection based on task
    if (taskType === 'sales' || taskType === 'conversion') {
      return this.models.powerful;
    } else if (taskType === 'support' || taskType === 'quick') {
      return this.models.fast;
    } else if (taskType === 'content' || taskType === 'creative') {
      return this.models.creative;
    } else if (taskType === 'analysis' || taskType === 'data') {
      return this.models.analytical;
    } else if (taskType === 'translation' || context?.multilingual) {
      return this.models.multilingual;
    } else if (taskType === 'technical' || taskType === 'code') {
      return this.models.code;
    } else if (context?.hasImages) {
      return this.models.vision;
    }
    return this.models.balanced;
  }

  async chat(
    messages: ChatMessage[],
    options: {
      stream?: boolean;
      model?: string;
      taskType?: string;
      context?: any;
    } = {}
  ): Promise<any> {
    const model = options.model || this.selectModel(options.taskType || 'general', options.context);
    
    const headers = {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'HTTP-Referer': 'https://ai-agents-romania.com',
      'X-Title': 'AI AGENT ROMANIA',
      'Content-Type': 'application/json'
    };

    const body = {
      model,
      messages,
      temperature: this.config.temperature,
      max_tokens: this.config.maxTokens,
      top_p: this.config.topP,
      frequency_penalty: this.config.frequencyPenalty,
      presence_penalty: this.config.presencePenalty,
      stream: options.stream || false
    };

    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      if (options.stream) {
        return this.handleStream(response);
      } else {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }

  private async handleStream(response: Response): Promise<AsyncGenerator<string, void, unknown>> {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    async function* streamGenerator(): AsyncGenerator<string, void, unknown> {
      if (!reader) return;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed: StreamResponse = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content;
                if (content) {
                  yield content;
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    }

    return streamGenerator();
  }

  async generateSystemPrompt(context: any): Promise<string> {
    const { page, language, userProfile, conversationMode } = context;
    
    return `You are AI AGENT ROMANIA™, the most advanced AI assistant in Eastern Europe, powering the ai-agents-romania.com platform.

Your identity:
- Name: AI AGENT ROMANIA™
- Role: Universal AI Assistant handling EVERYTHING on the platform
- Personality: Professional yet friendly, knowledgeable, proactive, and helpful
- Language: Respond in ${language || 'Romanian'} unless asked otherwise

Current context:
- Page: ${page || 'unknown'}
- User type: ${userProfile?.type || 'visitor'}
- Mode: ${conversationMode || 'general'}

Your capabilities:
1. Sales & Conversions: Identify needs, recommend solutions, calculate ROI, close deals
2. Customer Support: Answer questions, troubleshoot issues, provide guidance
3. Platform Navigation: Guide users to features, explain functionality
4. Technical Assistance: Help with API integration, provide code examples
5. Content Generation: Create descriptions, emails, proposals
6. Data Analysis: Interpret usage stats, provide insights
7. Account Management: Assist with upgrades, settings, billing

Guidelines:
- Be proactive but not pushy
- Provide specific, actionable advice
- Use examples and analogies when helpful
- Maintain context throughout the conversation
- Escalate to human support when needed
- Always be truthful and transparent

Remember: You are the face of AI Agents Romania - make every interaction exceptional!`;
  }

  getAvailableModels(): ModelConfig {
    return this.models;
  }

  updateConfig(config: Partial<OpenRouterConfig>): void {
    this.config = { ...this.config, ...config };
  }
}