import React from 'react';
import { AgentByCaen } from '../types/caen';
import AgentCard from './AgentCard';

interface AgentListByCaenProps {
  agents: AgentByCaen[];
  selectedCaenCode: string | null;
  loading: boolean;
  onSelectAgent: (agentId: string) => void;
}

const AgentListByCaen: React.FC<AgentListByCaenProps> = ({
  agents,
  selectedCaenCode,
  loading,
  onSelectAgent
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-800/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
                  <div className="w-20 h-6 bg-gray-700 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-10 bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            Nu am găsit agenți AI
          </h3>
          
          <p className="text-gray-400 mb-6">
            {selectedCaenCode 
              ? `Nu există agenți disponibili pentru codul CAEN ${selectedCaenCode}. Încercați să modificați filtrele sau să căutați în alte categorii.`
              : 'Nu am găsit agenți care să corespundă criteriilor de căutare. Încercați să modificați filtrele sau termenul de căutare.'
            }
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              🔄 Resetează căutarea
            </button>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-all duration-300"
            >
              ← Înapoi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Group agents by category for better organization
  const agentsByCategory = agents.reduce((acc, agent) => {
    if (!acc[agent.category]) {
      acc[agent.category] = [];
    }
    acc[agent.category].push(agent);
    return acc;
  }, {} as Record<string, AgentByCaen[]>);

  const categoryNames: Record<string, string> = {
    'technology': 'Tehnologie și IT',
    'commerce': 'Comerț și Retail', 
    'horeca': 'HORECA',
    'healthcare': 'Sănătate și Wellness',
    'education': 'Educație și Training',
    'realestate': 'Imobiliare și Construcții',
    'finance': 'Servicii Financiare',
    'automotive': 'Automotive și Service',
    'logistics': 'Transport și Logistică',
    'agriculture': 'Agricultură și Agrotech',
    'security': 'Securitate și Facility',
    'creative': 'Creative și Media'
  };

  return (
    <div className="space-y-12">
      {Object.entries(agentsByCategory).map(([category, categoryAgents]) => (
        <div key={category} className="space-y-6">
          {/* Category Header - only show if we have multiple categories */}
          {Object.keys(agentsByCategory).length > 1 && (
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">
                {categoryNames[category] || category}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
              <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                {categoryAgents.length} agenți
              </span>
            </div>
          )}

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryAgents.map((agent, index) => (
              <div 
                key={agent.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AgentCard
                  agent={agent}
                  onSelect={() => onSelectAgent(agent.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Load More Section (for future pagination) */}
      {agents.length >= 12 && (
        <div className="text-center py-8">
          <button className="px-8 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg font-medium transition-all duration-300">
            📄 Încarcă mai mulți agenți
          </button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {agents.length}
            </div>
            <div className="text-sm text-gray-400">
              Agenți găsiți
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {agents.filter(a => a.isPremium).length}
            </div>
            <div className="text-sm text-gray-400">
              Agenți premium
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {agents.filter(a => a.pricing.type === 'free').length}
            </div>
            <div className="text-sm text-gray-400">
              Agenți gratuiți
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {(agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-400">
              Rating mediu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentListByCaen;