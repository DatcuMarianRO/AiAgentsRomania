import React, { useState } from 'react';
import { INVENT_EVOLUTION_AGENTS } from '../../data/inventEvolutionAgents';

const AgentManagement: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const agentStats = {
    totalAgents: INVENT_EVOLUTION_AGENTS.length,
    activeAgents: INVENT_EVOLUTION_AGENTS.filter(a => a.status === 'active').length,
    totalConversations: 125634,
    averageRating: 4.7,
    totalRevenue: 89450
  };

  const categories = [
    'all', 'horeca', 'automotive', 'contabilitate', 'juridic', 'medical', 
    'educatie', 'constructii', 'agricultura', 'tehnologie', 'marketing'
  ];

  const filteredAgents = filterCategory === 'all' 
    ? INVENT_EVOLUTION_AGENTS 
    : INVENT_EVOLUTION_AGENTS.filter(agent => agent.category === filterCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      horeca: 'bg-orange-900/30 text-orange-400',
      automotive: 'bg-blue-900/30 text-blue-400',
      contabilitate: 'bg-green-900/30 text-green-400',
      juridic: 'bg-purple-900/30 text-purple-400',
      medical: 'bg-red-900/30 text-red-400',
      educatie: 'bg-indigo-900/30 text-indigo-400',
      constructii: 'bg-yellow-900/30 text-yellow-400',
      agricultura: 'bg-emerald-900/30 text-emerald-400',
      tehnologie: 'bg-cyan-900/30 text-cyan-400',
      marketing: 'bg-pink-900/30 text-pink-400'
    };
    return colors[category] || 'bg-gray-700 text-gray-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-900/30 text-green-400';
      case 'maintenance': return 'bg-yellow-900/30 text-yellow-400';
      case 'inactive': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Management Agenți AI</h2>
          <p className="text-gray-400">
            Gestionează și monitorizează toți agenții AI din marketplace
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + Adaugă Agent Nou
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">🤖</div>
          <div className="text-xl font-bold text-white">{agentStats.totalAgents}</div>
          <div className="text-gray-400 text-sm">Total Agenți</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-xl font-bold text-white">{agentStats.activeAgents}</div>
          <div className="text-gray-400 text-sm">Agenți Activi</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">💬</div>
          <div className="text-xl font-bold text-white">{agentStats.totalConversations.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Conversații Totale</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">⭐</div>
          <div className="text-xl font-bold text-white">{agentStats.averageRating}</div>
          <div className="text-gray-400 text-sm">Rating Mediu</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-xl font-bold text-white">€{agentStats.totalRevenue.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Venit Total</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center space-x-4 mb-4">
          <h3 className="text-lg font-semibold text-white">Filtrează după categorie:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category === 'all' ? 'Toate' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{agent.icon}</div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(agent.category)}`}>
                  {agent.category.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status || 'active')}`}>
                  {(agent.status || 'active').toUpperCase()}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{agent.description}</p>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">CAEN Code:</span>
                <span className="text-white text-sm font-medium">{agent.caenCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Rating:</span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white text-sm font-medium">{agent.rating}</span>
                  <span className="text-gray-400 text-sm">({agent.reviewCount})</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Preț:</span>
                <span className="text-green-400 text-sm font-medium">
                  {agent.pricing.type === 'free' ? 'Gratuit' : 
                   agent.pricing.type === 'paid' ? `€${agent.pricing.startingPrice}/lună` :
                   'Contact pentru preț'}
                </span>
              </div>
              {agent.isPremium && (
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Plan:</span>
                  <span className="text-purple-400 text-sm font-medium">💎 Premium</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setSelectedAgent(agent.id)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                📊 Detalii
              </button>
              <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors">
                ⚙️
              </button>
              <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors">
                📈
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Agent Details Modal (simplified) */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Detalii Agent</h2>
              <button 
                onClick={() => setSelectedAgent(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {(() => {
              const agent = INVENT_EVOLUTION_AGENTS.find(a => a.id === selectedAgent);
              if (!agent) return null;
              
              return (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{agent.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <p className="text-gray-400">{agent.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Informații Generale</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Categorie:</span>
                          <span className="text-white">{agent.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cod CAEN:</span>
                          <span className="text-white">{agent.caenCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tip:</span>
                          <span className="text-white">{agent.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Performanță</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rating:</span>
                          <span className="text-white">{agent.rating}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Review-uri:</span>
                          <span className="text-white">{agent.reviewCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className="text-green-400">Activ</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Editează Agent
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                      Vezi Analize
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentManagement;