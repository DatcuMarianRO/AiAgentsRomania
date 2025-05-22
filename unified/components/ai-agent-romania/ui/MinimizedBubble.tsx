import React, { useEffect, useState } from 'react';

export interface MinimizedBubbleProps {
  onClick: () => void;
  hasNewMessage: boolean;
  processingState: 'idle' | 'thinking' | 'responding';
  theme: 'light' | 'dark' | 'auto';
}

export const MinimizedBubble: React.FC<MinimizedBubbleProps> = ({
  onClick,
  hasNewMessage,
  processingState,
  theme
}) => {
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (hasNewMessage) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasNewMessage]);

  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={onClick}
      className="relative w-full h-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
      aria-label="Deschide AI Agent Romania"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity ${
        showPulse ? 'animate-pulse' : ''
      }`} />
      
      {/* Icon container */}
      <div className="relative z-10">
        {processingState === 'idle' ? (
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13h4v6h-4zm0 8h4v2h-4z"/>
          </svg>
        ) : (
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>
      
      {/* New message indicator */}
      {hasNewMessage && (
        <div className="absolute -top-1 -right-1 w-4 h-4">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
        </div>
      )}
      
      {/* Hover tooltip */}
      <div className={`absolute bottom-full mb-2 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
        isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
      }`}>
        AI Agent România
      </div>
    </button>
  );
};