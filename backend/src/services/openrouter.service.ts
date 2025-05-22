import openRouterClient from '../config/openrouter';
import { AppError } from '../utils/errorHandler';
import logger from '../utils/logger';
import crypto from 'crypto';
import { getCache, setCache, getOrSetCache } from '../utils/cache';

// Interface definitions
export interface ChatCompletionMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterCompletionOptions {
  model: string;
  messages: ChatCompletionMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  response_format?: { type: string };
  stop?: string[];
  seed?: number;
  stream?: boolean;
  cacheKey?: string; // Optional custom cache key
  skipCache?: boolean; // Option to skip cache lookup
}

export interface OpenRouterUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
  context_length: number;
  pricing: {
    prompt: number;
    completion: number;
  };
  provider: {
    name: string;
    model_id: string;
  };
}

interface OpenRouterResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  model: string;
  usage: OpenRouterUsage;
  created: number;
}

export interface ChatCompletionResult {
  content: string;
  usage: OpenRouterUsage;
  model: string;
  cached?: boolean;
}

class OpenRouterService {
  // Default cache TTL in seconds
  private readonly DEFAULT_CACHE_TTL = 3600; // 1 hour
  private readonly MODELS_CACHE_TTL = 86400; // 24 hours

  /**
   * Generate a cache key from completion options
   */
  private generateCacheKey(options: OpenRouterCompletionOptions): string {
    // If a custom cache key is provided, use it
    if (options.cacheKey) {
      return `openrouter:${options.cacheKey}`;
    }

    // For deterministic results, we must include all parameters that affect the response
    const cacheableOptions = {
      model: options.model,
      messages: options.messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 2000,
      top_p: options.top_p || 1,
      frequency_penalty: options.frequency_penalty || 0,
      presence_penalty: options.presence_penalty || 0,
      response_format: options.response_format,
      stop: options.stop,
      seed: options.seed, // Important for deterministic responses
    };

    // Create hash of the options for cache key
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(cacheableOptions))
      .digest('hex');

    return `openrouter:completion:${hash}`;
  }

  /**
   * Get a chat completion from OpenRouter with caching
   */
  async getChatCompletion(options: OpenRouterCompletionOptions): Promise<ChatCompletionResult> {
    try {
      if (options.stream) {
        throw new AppError('Streaming not supported in this method', 400);
      }

      // Deterministic responses require a seed
      const finalOptions = {
        ...options,
        seed: options.seed || Math.floor(Math.random() * 1000000),
      };

      // Generate cache key
      const cacheKey = this.generateCacheKey(finalOptions);

      // Skip cache if requested or if temperature > 0.1 (non-deterministic)
      const shouldSkipCache = 
        options.skipCache === true || 
        (options.temperature !== undefined && options.temperature > 0.1);

      if (shouldSkipCache) {
        // Skip cache and make direct API call
        logger.debug('Skipping cache for OpenRouter completion', { 
          model: options.model,
          temperature: options.temperature,
        });
        
        return await this.makeOpenRouterRequest(finalOptions);
      }

      // Try to get from cache first
      const cachedResult = await getCache<ChatCompletionResult>(cacheKey);
      if (cachedResult) {
        logger.debug('Cache hit for OpenRouter completion', { 
          cacheKey, 
          model: options.model 
        });
        
        return {
          ...cachedResult,
          cached: true,
        };
      }

      // If not in cache, make the API request
      logger.debug('Cache miss for OpenRouter completion', { 
        cacheKey, 
        model: options.model 
      });
      
      const result = await this.makeOpenRouterRequest(finalOptions);

      // Cache the result only if it's a successful response
      await setCache(cacheKey, result, this.DEFAULT_CACHE_TTL);

      return result;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      
      if (error.response) {
        logger.error('OpenRouter API error', {
          status: error.response.status,
          data: error.response.data,
          model: options.model,
        });

        throw new AppError(
          `OpenRouter API error: ${error.response.data.error?.message || 'Unknown error'}`,
          error.response.status
        );
      }

      logger.error('OpenRouter service error', { error, model: options.model });
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new AppError(`OpenRouter service error: ${errorMessage}`, 500);
    }
  }

  /**
   * Make the actual API request to OpenRouter
   */
  private async makeOpenRouterRequest(options: OpenRouterCompletionOptions): Promise<ChatCompletionResult> {
    const response = await openRouterClient.post<OpenRouterResponse>('/chat/completions', {
      model: options.model,
      messages: options.messages,
      temperature: options.temperature,
      max_tokens: options.max_tokens,
      top_p: options.top_p,
      frequency_penalty: options.frequency_penalty,
      presence_penalty: options.presence_penalty,
      response_format: options.response_format,
      stop: options.stop,
      seed: options.seed,
    });

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new AppError('No completion generated', 500);
    }

    return {
      content: response.data.choices[0].message.content,
      usage: response.data.usage,
      model: response.data.model,
      cached: false,
    };
  }

  /**
   * Stream a chat completion from OpenRouter
   * @returns A readable stream of server-sent events
   */
  async streamChatCompletion(options: OpenRouterCompletionOptions, res: any): Promise<void> {
    try {
      if (!options.stream) {
        options.stream = true;
      }

      // Set headers for SSE
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Start the request to OpenRouter with streaming enabled
      const response = await openRouterClient.post('/chat/completions', {
        model: options.model,
        messages: options.messages,
        temperature: options.temperature,
        max_tokens: options.max_tokens,
        top_p: options.top_p,
        frequency_penalty: options.frequency_penalty,
        presence_penalty: options.presence_penalty,
        response_format: options.response_format,
        stop: options.stop,
        seed: options.seed,
        stream: true,
      }, {
        responseType: 'stream',
      });

      // Variables to collect the complete response
      let fullContent = '';
      let totalUsage: OpenRouterUsage | null = null;
      let modelId = '';

      // Pipe the stream directly to the response
      response.data.on('data', (chunk: Buffer) => {
        const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            
            // The "[DONE]" message indicates the end of the stream
            if (data === '[DONE]') {
              res.write('event: done\ndata: [DONE]\n\n');
            } else {
              try {
                const parsed = JSON.parse(data);
                res.write(`data: ${JSON.stringify(parsed)}\n\n`);
                
                // Collect content for caching
                if (parsed.choices && parsed.choices[0]?.delta?.content) {
                  fullContent += parsed.choices[0].delta.content;
                }
                
                // Collect usage information if available
                if (parsed.usage) {
                  totalUsage = parsed.usage;
                }
                
                // Collect model information
                if (parsed.model && !modelId) {
                  modelId = parsed.model;
                }
              } catch (e) {
                logger.error('Error parsing SSE data', { data, error: e });
              }
            }
          }
        }
      });

      response.data.on('end', () => {
        // If we have a complete response and usage information, cache it
        if (fullContent && !options.skipCache && (options.temperature === undefined || options.temperature <= 0.1)) {
          try {
            const cacheKey = this.generateCacheKey({
              ...options,
              stream: false, // Important: we cache the non-streaming version
            });
            
            const resultToCache: ChatCompletionResult = {
              content: fullContent,
              usage: totalUsage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
              model: modelId || options.model,
              cached: false,
            };
            
            // Cache the complete response
            setCache(cacheKey, resultToCache, this.DEFAULT_CACHE_TTL)
              .catch(err => logger.error('Error caching streaming response', { error: err }));
          } catch (err) {
            logger.error('Error preparing streaming response for cache', { error: err });
          }
        }
        
        res.end();
      });

      // Handle client disconnection
      res.on('close', () => {
        response.data.destroy();
      });
    } catch (error: any) {
      if (error.response) {
        logger.error('OpenRouter API streaming error', {
          status: error.response.status,
          data: error.response.data,
          model: options.model,
        });

        // End the SSE connection with an error
        res.write(`event: error\ndata: ${JSON.stringify({
          message: `OpenRouter API error: ${error.response.data.error?.message || 'Unknown error'}`,
          status: error.response.status,
        })}\n\n`);
        res.end();
        return;
      }

      logger.error('OpenRouter service streaming error', { error, model: options.model });
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.write(`event: error\ndata: ${JSON.stringify({
        message: `OpenRouter service error: ${errorMessage}`,
        status: 500,
      })}\n\n`);
      res.end();
    }
  }

  /**
   * Get available models from OpenRouter
   */
  async getModels(): Promise<OpenRouterModel[]> {
    return getOrSetCache<OpenRouterModel[]>(
      'openrouter:models',
      async () => {
        try {
          const response = await openRouterClient.get('/models');
          return response.data.data;
        } catch (error: any) {
          if (error.response) {
            logger.error('OpenRouter API error when fetching models', {
              status: error.response.status,
              data: error.response.data,
            });

            throw new AppError(
              `OpenRouter API error: ${error.response.data.error?.message || 'Unknown error'}`,
              error.response.status
            );
          }

          logger.error('OpenRouter service error when fetching models', { error });
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          throw new AppError(`OpenRouter service error: ${errorMessage}`, 500);
        }
      },
      this.MODELS_CACHE_TTL
    );
  }

  /**
   * Calculate estimated token usage and cost for a request
   */
  estimateTokensAndCost(
    messages: ChatCompletionMessage[],
    model: string,
    maxTokens: number = 1000
  ): { estimatedTokens: number; estimatedCost: number } {
    // Very rough token estimation (4 chars ~= 1 token)
    const totalChars = messages.reduce((sum, msg) => sum + msg.content.length, 0);
    const estimatedPromptTokens = Math.ceil(totalChars / 4);
    const estimatedCompletionTokens = maxTokens;
    const estimatedTotalTokens = estimatedPromptTokens + estimatedCompletionTokens;
    
    // Default cost rates per 1K tokens (very approximate)
    const costRates: Record<string, { prompt: number; completion: number }> = {
      'anthropic/claude-3-opus': { prompt: 0.015, completion: 0.075 },
      'anthropic/claude-3-sonnet': { prompt: 0.003, completion: 0.015 },
      'anthropic/claude-3-haiku': { prompt: 0.00025, completion: 0.00125 },
      'openai/gpt-4o': { prompt: 0.005, completion: 0.015 },
      'openai/gpt-4': { prompt: 0.01, completion: 0.03 },
      'openai/gpt-3.5-turbo': { prompt: 0.0005, completion: 0.0015 },
      'default': { prompt: 0.001, completion: 0.002 }
    };
    
    // Find the matching model or use default rates
    const modelKey = Object.keys(costRates).find(key => model.includes(key)) || 'default';
    const rates = costRates[modelKey];
    
    // Calculate cost in USD
    const promptCost = (estimatedPromptTokens / 1000) * rates.prompt;
    const completionCost = (estimatedCompletionTokens / 1000) * rates.completion;
    const totalCost = promptCost + completionCost;
    
    return {
      estimatedTokens: estimatedTotalTokens,
      estimatedCost: totalCost
    };
  }
}

export default new OpenRouterService();