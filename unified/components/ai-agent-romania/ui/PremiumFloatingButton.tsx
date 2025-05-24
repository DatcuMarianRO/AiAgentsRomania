import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumFloatingButtonProps {
  onClick: () => void;
  hasNewMessage?: boolean;
  processingState?: 'idle' | 'thinking' | 'responding';
  theme?: 'light' | 'dark' | 'auto';
}

export const PremiumFloatingButton: React.FC<PremiumFloatingButtonProps> = ({
  onClick,
  hasNewMessage = false,
  processingState = 'idle',
  theme = 'dark'
}) => {
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (hasNewMessage) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasNewMessage]);

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[9998] group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Main Button Container */}
      <div className="relative">
        {/* Glow Effect Background */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
          processingState !== 'idle'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-60' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-40'
        } group-hover:opacity-80`} />
        
        {/* Button Body */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl
                      bg-gradient-to-br from-blue-500 to-purple-600
                      border border-white/20 backdrop-blur-sm">
          
          {/* AI Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          {/* Active Status Ring */}
          {processingState !== 'idle' && (
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
          )}
        </div>
        
        {/* New Message Indicator */}
        <AnimatePresence>
          {(hasNewMessage || showPulse) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <div className="relative">
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hover Tooltip */}
        <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                      pointer-events-none whitespace-nowrap">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
            AI Agent România™
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                          border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};