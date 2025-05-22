import React from 'react';
import { QuickAction } from '../store/aiAgentStore';

export interface QuickActionsProps {
  actions: QuickAction[];
  position: 'bottom-right' | 'bottom-left' | 'center';
  theme: 'light' | 'dark' | 'auto';
  onClose: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  position,
  theme,
  onClose
}) => {
  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const getPositionStyles = () => {
    const base = {
      position: 'fixed' as const,
      zIndex: 9998,
      bottom: '90px'
    };

    switch (position) {
      case 'bottom-right':
        return { ...base, right: '20px' };
      case 'bottom-left':
        return { ...base, left: '20px' };
      case 'center':
        return { ...base, left: '50%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <div
      style={getPositionStyles()}
      className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-3 space-y-2 max-w-xs`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Acțiuni rapide
        </h4>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {actions.map((action) => (
        <button
          key={action.id}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
            isDark
              ? 'hover:bg-gray-700 text-gray-200'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <span className="text-xl">{action.icon}</span>
          <span className="text-sm font-medium text-left">{action.label}</span>
        </button>
      ))}
    </div>
  );
};