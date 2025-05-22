import React, { useState, useRef, useEffect } from 'react';
import { PremiumChatWidget } from './PremiumChatWidget';
import { PremiumFloatingButton } from './PremiumFloatingButton';
import { ChatInterface } from './ChatInterface';
import { MinimizedBubble } from './MinimizedBubble';
import { QuickActions } from './QuickActions';
import { Message, Suggestion, QuickAction } from '../store/aiAgentStore';

export interface FloatingWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  position: 'bottom-right' | 'bottom-left' | 'center';
  theme: 'light' | 'dark' | 'auto';
  messages: Message[];
  onSendMessage: (message: string) => void;
  processingState: 'idle' | 'thinking' | 'responding';
  streamingResponse?: string;
  suggestions?: Suggestion[];
  quickActions?: QuickAction[];
  features?: {
    sales?: boolean;
    support?: boolean;
    guide?: boolean;
    voice?: boolean;
    proactive?: boolean;
  };
}

export const FloatingWidget: React.FC<FloatingWidgetProps> = ({
  isOpen,
  onToggle,
  position,
  theme,
  messages,
  onSendMessage,
  processingState,
  streamingResponse,
  suggestions = [],
  quickActions = [],
  features = {}
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else if (isOpen) {
          onToggle();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isFullscreen, onToggle]);

  // Position styles
  const getPositionStyles = () => {
    const base = {
      position: 'fixed' as const,
      zIndex: 9999,
      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    };

    if (isFullscreen) {
      return {
        ...base,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: '1200px',
        height: '90vh',
        maxHeight: '800px'
      };
    }

    switch (position) {
      case 'bottom-right':
        return {
          ...base,
          bottom: '20px',
          right: '20px',
          width: isOpen ? '400px' : '60px',
          height: isOpen ? '600px' : '60px',
          maxWidth: '95vw',
          maxHeight: '80vh'
        };
      case 'bottom-left':
        return {
          ...base,
          bottom: '20px',
          left: '20px',
          width: isOpen ? '400px' : '60px',
          height: isOpen ? '600px' : '60px',
          maxWidth: '95vw',
          maxHeight: '80vh'
        };
      case 'center':
        return {
          ...base,
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isOpen ? '400px' : '60px',
          height: isOpen ? '600px' : '60px',
          maxWidth: '95vw',
          maxHeight: '80vh'
        };
    }
  };

  // Theme styles
  const getThemeStyles = () => {
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    return {
      background: isDark 
        ? 'rgba(17, 24, 39, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      boxShadow: isDark
        ? '0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 40px -10px rgba(139, 92, 246, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 40px -10px rgba(59, 130, 246, 0.3), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
      color: isDark ? '#ffffff' : '#000000'
    };
  };

  return (
    <>
      <div
        ref={widgetRef}
        style={{
          ...getPositionStyles(),
          ...getThemeStyles(),
          borderRadius: isOpen ? '20px' : '50%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="ai-agent-widget"
      >
        {isOpen ? (
          <ChatInterface
            messages={messages}
            onSendMessage={onSendMessage}
            processingState={processingState}
            streamingResponse={streamingResponse}
            suggestions={suggestions}
            onClose={onToggle}
            onFullscreen={() => setIsFullscreen(!isFullscreen)}
            isFullscreen={isFullscreen}
            theme={theme}
            features={features}
          />
        ) : (
          <MinimizedBubble
            onClick={onToggle}
            hasNewMessage={messages.length > 0 && messages[messages.length - 1].role === 'assistant'}
            processingState={processingState}
            theme={theme}
          />
        )}
      </div>

      {/* Quick Actions */}
      {showQuickActions && quickActions.length > 0 && (
        <QuickActions
          actions={quickActions}
          position={position}
          theme={theme}
          onClose={() => setShowQuickActions(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
          }
        }

        .ai-agent-widget {
          animation: slideInUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @media (max-width: 768px) {
          .ai-agent-widget {
            width: 100vw !important;
            height: ${isOpen ? '70vh' : '60px'} !important;
            max-height: none !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            border-radius: ${isOpen ? '20px 20px 0 0' : '50%'} !important;
          }
        }
      `}</style>
    </>
  );
};