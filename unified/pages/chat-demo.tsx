import React, { useState } from 'react';
import Head from 'next/head';
import { PremiumChatWidget } from '../components/ai-agent-romania/ui/PremiumChatWidget';
import { PremiumFloatingButton } from '../components/ai-agent-romania/ui/PremiumFloatingButton';
import '../styles/premium-chat-widget.css';

import { Message } from '../components/ai-agent-romania/store/aiAgentStore';

// Mock messages for demo
const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Bună! 👋 Sunt AI AGENT ROMANIA™, asistentul tău personal pentru soluții AI de ultimă generație. Cum te pot ajuta astăzi?',
    timestamp: new Date()
  }
];

export default function ChatDemoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        'Excelentă întrebare! Permiteți-mi să vă ofer informații detaliate despre aceasta.',
        'Am pregătit pentru tine o analiză personalizată bazată pe nevoile tale specifice.',
        'Platformele noastre AI pot automatiza până la 80% din procesele repetitive, economisind timp prețios echipei tale.'
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      if (!isOpen) {
        setHasNewMessage(true);
        setTimeout(() => setHasNewMessage(false), 3000);
      }
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Premium Chat Widget Demo - AI Agent România</title>
        <meta name="description" content="Experience the ultra-premium AI chat interface" />
      </Head>
      
      {/* Demo Background */}
      <div className="min-h-screen bg-gray-900 relative overflow-hidden">
        {/* Cyberpunk Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
        </div>
        
        {/* Demo Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Premium Chat Widget Demo
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the future of AI-powered customer interaction
            </p>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="text-lg font-semibold text-white mb-2">Glassmorphism Design</h3>
                <p className="text-gray-400 text-sm">Ultra-premium glass effect with perfect blur and transparency</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Interactions</h3>
                <p className="text-gray-400 text-sm">Contextual action buttons and intelligent responses</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-white mb-2">Fluid Animations</h3>
                <p className="text-gray-400 text-sm">Smooth transitions and micro-interactions throughout</p>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Try it out!</h2>
              <p className="text-gray-300 mb-4">
                Click the floating button in the bottom-right corner to open the chat widget.
                Send a message to see the AI response with suggested actions.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span>💡 Pro tip: Notice the smooth animations and premium feel</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Widget */}
        {!isOpen && (
          <PremiumFloatingButton 
            onClick={() => setIsOpen(true)}
            hasNewMessage={hasNewMessage}
            processingState={isTyping ? 'thinking' : 'idle'}
          />
        )}
        
        {isOpen && (
          <PremiumChatWidget
            messages={messages}
            onSendMessage={handleSendMessage}
            processingState={isTyping ? 'thinking' : 'idle'}
            streamingResponse=""
            suggestions={[]}
            onClose={() => setIsOpen(false)}
            onFullscreen={() => {}}
            isFullscreen={false}
            theme="dark"
            features={{}}
          />
        )}
      </div>
    </>
  );
}