import React, { useState, useEffect } from 'react';
import { PremiumChatWidget } from './PremiumChatWidget';
import { PremiumFloatingButton } from './PremiumFloatingButton';
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

  // The PremiumChatWidget and PremiumFloatingButton handle their own positioning and styling

  return (
    <>
      {isOpen ? (
        <PremiumChatWidget
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
        <PremiumFloatingButton
          onClick={onToggle}
          hasNewMessage={messages.length > 0 && messages[messages.length - 1].role === 'assistant'}
          processingState={processingState}
          theme={theme}
        />
      )}

      {/* Quick Actions */}
      {showQuickActions && quickActions.length > 0 && (
        <QuickActions
          actions={quickActions}
          position={position}
          theme={theme}
          onClose={() => setShowQuickActions(false)}
        />
      )}
    </>
  );
};