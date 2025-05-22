import React from 'react';

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = 'Se încarcă...' 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
          <div className="w-full h-full rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
};

export const FullPageLoading: React.FC<LoadingFallbackProps> = ({ 
  message = 'Se încarcă...' 
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <div className="w-full h-full rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">AI AGENT ROMANIA™</h2>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
};