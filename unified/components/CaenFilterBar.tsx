import React, { useState } from 'react';
import { CaenFilter, AgentType } from '../types/caen';

interface CaenFilterBarProps {
  activeFilters: CaenFilter;
  onUpdateFilters: (filters: Partial<CaenFilter>) => void;
  onClearFilters: () => void;
  agentCount: number;
}

const CaenFilterBar: React.FC<CaenFilterBarProps> = ({
  activeFilters,
  onUpdateFilters,
  onClearFilters,
  agentCount
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const agentTypes: { value: AgentType; label: string; icon: string }[] = [
    { value: 'chatbot', label: 'Chatbot', icon: '💬' },
    { value: 'rag', label: 'RAG System', icon: '📚' },
    { value: 'integrator', label: 'Integrator', icon: '🔗' },
    { value: 'analyzer', label: 'Analyzer', icon: '📊' },
    { value: 'generator', label: 'Generator', icon: '⚡' },
    { value: 'assistant', label: 'Assistant', icon: '🤝' },
    { value: 'automation', label: 'Automation', icon: '🤖' },
    { value: 'predictive', label: 'Predictive', icon: '🔮' }
  ];

  const pricingTypes = [
    { value: 'free', label: 'Gratuit', icon: '🆓' },
    { value: 'freemium', label: 'Freemium', icon: '💡' },
    { value: 'paid', label: 'Plătit', icon: '💳' },
    { value: 'enterprise', label: 'Enterprise', icon: '🏢' }
  ];

  const quickFilters = [
    { 
      key: 'isPopular', 
      label: 'Popular', 
      icon: '🔥',
      active: activeFilters.isPopular 
    },
    { 
      key: 'isRecommended', 
      label: 'Recomandat', 
      icon: '⭐',
      active: activeFilters.isRecommended 
    },
    { 
      key: 'isPremium', 
      label: 'Premium', 
      icon: '👑',
      active: activeFilters.isPremium 
    },
    { 
      key: 'licenseAvailable', 
      label: 'Licență disponibilă', 
      icon: '📜',
      active: activeFilters.licenseAvailable 
    }
  ];

  const handleQuickFilter = (filterKey: keyof CaenFilter) => {
    const currentValue = activeFilters[filterKey];
    onUpdateFilters({
      [filterKey]: !currentValue
    });
  };

  const activeFilterCount = Object.values(activeFilters).filter(value => 
    value !== undefined && value !== null && value !== false
  ).length;

  return (
    <div className="space-y-4 mt-4">
      {/* Quick Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Results count */}
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v4a2 2 0 002 2h2m2-6V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0V7" />
          </svg>
          <span className="font-medium text-white">{agentCount}</span> agenți găsiți
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleQuickFilter(filter.key as keyof CaenFilter)}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                transition-all duration-200 hover:scale-105
                ${filter.active
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 border border-gray-700'
                }
              `}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 border border-gray-700 transition-all duration-200"
        >
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Filtre avansate
        </button>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Șterge filtre ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Agent Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Tipul agentului
              </label>
              <div className="space-y-2">
                {agentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => onUpdateFilters({
                      agentType: activeFilters.agentType === type.value ? undefined : type.value
                    })}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                      transition-all duration-200
                      ${activeFilters.agentType === type.value
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                      }
                    `}
                  >
                    <span>{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Model de prețuri
              </label>
              <div className="space-y-2">
                {pricingTypes.map((pricing) => (
                  <button
                    key={pricing.value}
                    onClick={() => onUpdateFilters({
                      pricing: activeFilters.pricing === pricing.value ? undefined : pricing.value as any
                    })}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                      transition-all duration-200
                      ${activeFilters.pricing === pricing.value
                        ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                      }
                    `}
                  >
                    <span>{pricing.icon}</span>
                    {pricing.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Opțiuni speciale
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeFilters.isPremium || false}
                    onChange={(e) => onUpdateFilters({ isPremium: e.target.checked || undefined })}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                    Doar agenți premium
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeFilters.licenseAvailable || false}
                    onChange={(e) => onUpdateFilters({ licenseAvailable: e.target.checked || undefined })}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                    Licență comercială disponibilă
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeFilters.isRecommended || false}
                    onChange={(e) => onUpdateFilters({ isRecommended: e.target.checked || undefined })}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                    Doar agenți recomandați
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeFilters.isPopular || false}
                    onChange={(e) => onUpdateFilters({ isPopular: e.target.checked || undefined })}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                    Doar agenți populari
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaenFilterBar;