import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { widgetVariants, messageVariants, typingVariants, dotVariants } from '../utils/animations';

import { Message as StoreMessage, Suggestion } from '../store/aiAgentStore';

interface PremiumChatWidgetProps {
  messages: StoreMessage[];
  onSendMessage: (message: string) => void;
  processingState: 'idle' | 'thinking' | 'responding';
  streamingResponse?: string;
  suggestions?: Suggestion[];
  onClose: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
  theme: 'light' | 'dark' | 'auto';
  features?: {
    sales?: boolean;
    support?: boolean;
    guide?: boolean;
    voice?: boolean;
    proactive?: boolean;
  };
}

export const PremiumChatWidget: React.FC<PremiumChatWidgetProps> = ({
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
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, processingState]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(`${Math.min(scrollHeight, 120)}px`);
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
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

  return (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="fixed bottom-6 right-6 z-[9999] w-[420px] h-[600px] max-h-[75vh]"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)'
          }}
        >
          {/* Main Container with Glassmorphism */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
               style={{
                 background: 'rgba(30, 30, 45, 0.6)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)'
               }}>
            
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                {/* AI Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Online Indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1e1e2d]"></div>
                </div>
                
                {/* Agent Info */}
                <div>
                  <h3 className="text-white font-bold text-base">AI AGENT ROMANIA™</h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online și gata să ajut
                  </p>
                </div>
              </div>
              
              {/* Header Controls */}
              <div className="flex items-center gap-2">
                <button onClick={onFullscreen} className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                  <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <button onClick={onClose} 
                        className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                  <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 h-[calc(100%-140px)]"
                 style={{ 
                   background: '#1A202C',
                   scrollbarWidth: 'thin',
                   scrollbarColor: 'rgba(139, 92, 246, 0.3) transparent'
                 }}>
              
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.25, 0.8, 0.25, 1]
                  }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                    {/* Message Bubble */}
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-tr-sm' 
                        : 'bg-[#2D3748] text-[#F7FAFC] rounded-tl-sm'
                    }`}>
                      <p className="text-[15px] leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {processingState !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#2D3748] px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} 
                  className="px-6 py-4 border-t border-white/10 bg-[#1A202C]">
              <div className="flex items-end gap-3">
                {/* Optional Attachment Button */}
                <button type="button"
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 
                                 rounded-lg transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                {/* Textarea */}
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Scrie un mesaj..."
                    className="w-full px-4 py-3 bg-[#2D3748] text-white placeholder-gray-500
                             rounded-xl resize-none focus:outline-none focus:ring-2 
                             focus:ring-blue-500/50 transition-all duration-200"
                    style={{ 
                      height: textareaHeight,
                      minHeight: '48px',
                      maxHeight: '120px'
                    }}
                  />
                </div>
                
                {/* Send Button */}
                <button type="submit"
                        disabled={!inputValue.trim()}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          inputValue.trim() 
                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105' 
                            : 'text-gray-500 bg-gray-700 cursor-not-allowed'
                        }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
  );
};