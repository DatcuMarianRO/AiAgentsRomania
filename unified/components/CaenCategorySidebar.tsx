import React, { useState } from 'react';
import { CaenCode, CaenCategory } from '../types/caen';

interface CaenCategorySidebarProps {
  categories: (CaenCategory & { agentCount: number })[];
  caenCodes: CaenCode[];
  selectedCaenCode: string | null;
  onSelectCaenCode: (code: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CaenCategorySidebar: React.FC<CaenCategorySidebarProps> = ({
  categories,
  caenCodes,
  selectedCaenCode,
  onSelectCaenCode,
  isOpen,
  onClose
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getCaenCodesByCategory = (categoryId: string) => {
    return caenCodes.filter(caen => caen.category.id === categoryId);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-gray-900/95 backdrop-blur-lg border-r border-gray-800/50 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
            <h2 className="text-xl font-bold text-white">
              Categorii CAEN
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* All Agents Button */}
          <div className="p-4 border-b border-gray-800/30">
            <button
              onClick={() => {
                onSelectCaenCode(null);
                onClose();
              }}
              className={`
                w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group
                ${!selectedCaenCode 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center text-lg
                  ${!selectedCaenCode 
                    ? 'bg-white/20' 
                    : 'bg-gray-700 group-hover:bg-gray-600'
                  }
                `}>
                  🏪
                </div>
                <div>
                  <div className="font-semibold">Toți Agenții AI</div>
                  <div className={`text-sm ${!selectedCaenCode ? 'text-blue-100' : 'text-gray-400'}`}>
                    {caenCodes.reduce((sum, caen) => sum + caen.agentCount, 0)} agenți
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Categories List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {categories.map((category) => {
              const categoryAgents = getCaenCodesByCategory(category.id);
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div key={category.id} className="space-y-1">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full text-left px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-md"
                          style={{ backgroundColor: category.color + '20', color: category.color }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{category.name}</div>
                          <div className="text-xs text-gray-400">
                            {category.agentCount} agenți
                          </div>
                        </div>
                      </div>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* CAEN Codes */}
                  {isExpanded && (
                    <div className="ml-4 space-y-1 animate-fade-in">
                      {categoryAgents.map((caen) => (
                        <button
                          key={caen.code}
                          onClick={() => {
                            onSelectCaenCode(caen.code);
                            onClose();
                          }}
                          className={`
                            w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group text-sm
                            ${selectedCaenCode === caen.code
                              ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 rounded flex items-center justify-center text-xs"
                                style={{ 
                                  background: selectedCaenCode === caen.code 
                                    ? `linear-gradient(135deg, ${caen.gradient.from}, ${caen.gradient.to})`
                                    : caen.color + '20',
                                  color: selectedCaenCode === caen.code ? 'white' : caen.color
                                }}
                              >
                                {caen.icon}
                              </div>
                              <div>
                                <div className="font-medium">CAEN {caen.code}</div>
                                <div className={`text-xs ${selectedCaenCode === caen.code ? 'text-blue-200' : 'text-gray-500'}`}>
                                  {caen.title.length > 40 ? caen.title.substring(0, 40) + '...' : caen.title}
                                </div>
                              </div>
                            </div>
                            <span className={`
                              text-xs px-2 py-1 rounded-full
                              ${selectedCaenCode === caen.code 
                                ? 'bg-blue-500/20 text-blue-300' 
                                : 'bg-gray-700 text-gray-400'
                              }
                            `}>
                              {caen.agentCount}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800/30">
            <div className="text-center text-xs text-gray-500">
              AI Agents România Marketplace
              <br />
              Specializat pe industrii CAEN
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaenCategorySidebar;