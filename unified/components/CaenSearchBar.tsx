import React, { useState, useRef, useEffect } from 'react';

interface CaenSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const CaenSearchBar: React.FC<CaenSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Căutați agenți AI sau coduri CAEN...'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick search suggestions
  const quickSearches = [
    'ChatBot',
    'Automatizare',
    'Analiză date',
    'CAEN 6201',
    'Manufacturing',
    'Finance',
    'Healthcare'
  ];

  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  const handleQuickSearch = (term: string) => {
    onSearchChange(term);
    setIsFocused(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  return (
    <div className="relative">
      {/* Search Input */}
      <div className={`
        relative group transition-all duration-300
        ${isFocused 
          ? 'ring-2 ring-blue-500/50 ring-offset-2 ring-offset-gray-950' 
          : 'hover:ring-1 hover:ring-gray-600'
        }
        rounded-xl bg-gray-800/50 backdrop-blur-sm
      `}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? 'text-blue-400' : 'text-gray-400'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-gray-400 
            border-0 focus:outline-none focus:ring-0
            text-sm font-medium
          "
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Keyboard Shortcut Hint */}
        {!isFocused && !searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
              <kbd className="px-2 py-1 bg-gray-700/50 rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-gray-700/50 rounded text-xs">K</kbd>
            </div>
          </div>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {isFocused && !searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Căutări rapide
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {quickSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSearch(term)}
                  className="
                    text-left px-3 py-2 rounded-lg text-sm text-gray-300 
                    hover:text-white hover:bg-gray-700/50 transition-all duration-200
                    group
                  "
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {term}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Tip: Folosiți Esc pentru a închide</span>
              <span>AI Agents România</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Preview (when typing) */}
      {isFocused && searchTerm && searchTerm.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Căutare pentru: <span className="text-white font-medium">"{searchTerm}"</span>
            </div>
            
            <div className="text-center py-8 text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Rezultatele vor apărea în lista principală
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaenSearchBar;