import React, { useState, useRef, useEffect } from 'react';
import { Message, Suggestion } from '../store/aiAgentStore';

export interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  processingState: 'idle' | 'thinking' | 'responding';
  streamingResponse?: string;
  suggestions?: Suggestion[];
  onClose: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
  theme: 'light' | 'dark' | 'auto';
  features?: {
    voice?: boolean;
  };
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  processingState,
  streamingResponse,
  suggestions = [],
  onClose,
  onFullscreen,
  isFullscreen,
  theme,
  features = {}
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingResponse]);

  // Focus input on open
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && processingState === 'idle') {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
              processingState === 'idle' ? 'bg-green-400' : 'bg-yellow-400'
            } border-2 ${isDark ? 'border-gray-800' : 'border-white'}`} />
          </div>
          <div>
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>AI AGENT ROMANIA™</h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {processingState === 'thinking' ? 'Mă gândesc...' : 
               processingState === 'responding' ? 'Răspund...' : 'Online și gata să ajut'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onFullscreen}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            title={isFullscreen ? 'Ieși din ecran complet' : 'Ecran complet'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
          </button>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            title="Închide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-white border border-gray-600'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className={`text-xs mt-1 block ${
                message.role === 'user' ? 'text-white/70' : isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString('ro-RO', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
        
        {/* Streaming response */}
        {streamingResponse && (
          <div className="flex justify-start">
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              isDark ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-100 text-gray-900'
            }`}>
              <p className="whitespace-pre-wrap">{streamingResponse}</p>
              <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
            </div>
          </div>
        )}
        
        {/* Processing indicator */}
        {processingState === 'thinking' && !streamingResponse && (
          <div className="flex justify-start">
            <div className={`p-3 rounded-2xl ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => {
                  setInputValue(suggestion.text);
                  inputRef.current?.focus();
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {suggestion.icon && <span className="mr-1">{suggestion.icon}</span>}
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrie un mesaj..."
            className={`flex-1 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDark
                ? 'bg-gray-700 text-white placeholder-gray-400'
                : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            }`}
            rows={1}
            disabled={processingState !== 'idle'}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || processingState !== 'idle'}
            className={`p-3 rounded-lg transition-all ${
              inputValue.trim() && processingState === 'idle'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};