import React from 'react';
import { AgentByCaen } from '../types/caen';

interface CaenStatsOverviewProps {
  popularAgents: AgentByCaen[];
  recommendedAgents: AgentByCaen[];
  onSelectAgent: (agentId: string) => void;
}

const CaenStatsOverview: React.FC<CaenStatsOverviewProps> = ({
  popularAgents,
  recommendedAgents,
  onSelectAgent
}) => {
  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'chatbot': '💬',
      'rag': '📚',
      'integrator': '🔗',
      'analyzer': '📊',
      'generator': '⚡',
      'assistant': '🤝',
      'automation': '🤖',
      'predictive': '🔮'
    };
    return icons[type] || '🤖';
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Agenți <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Recomandați</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Descoperă cei mai populari și mai bine cotați agenți AI din marketplace-ul nostru, 
            organizați pe industrii CAEN pentru maximă relevanță.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Popular Agents */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🔥</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Agenți Populari</h3>
                <p className="text-gray-400 text-sm">Cei mai căutați de comunitate</p>
              </div>
            </div>

            <div className="space-y-4">
              {popularAgents.slice(0, 4).map((agent, index) => (
                <div
                  key={agent.id}
                  className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
                  onClick={() => onSelectAgent(agent.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                        #{index + 1}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white">{getTypeIcon(agent.type)}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 truncate">
                        {agent.name}
                      </h4>
                      <p className="text-gray-400 text-sm truncate">
                        {agent.shortDescription}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white text-sm font-medium">{agent.rating}</span>
                        </div>
                        <span className="text-gray-500 text-xs">CAEN {agent.caenCode}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      {agent.isPremium && (
                        <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium mb-1">
                          👑 Premium
                        </div>
                      )}
                      <div className="text-gray-400 text-xs capitalize">
                        {agent.type.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full px-6 py-3 border border-gray-600 hover:border-red-400 text-gray-300 hover:text-white rounded-lg font-medium transition-all duration-300 hover:bg-red-400/10">
              🔥 Vezi toți agenții populari
            </button>
          </div>

          {/* Recommended Agents */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Agenți Recomandați</h3>
                <p className="text-gray-400 text-sm">Selectați de experții noștri</p>
              </div>
            </div>

            <div className="space-y-4">
              {recommendedAgents.slice(0, 4).map((agent, index) => (
                <div
                  key={agent.id}
                  className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
                  onClick={() => onSelectAgent(agent.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-sm">
                        <span className="text-white">⭐</span>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white">{getTypeIcon(agent.type)}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 truncate">
                        {agent.name}
                      </h4>
                      <p className="text-gray-400 text-sm truncate">
                        {agent.shortDescription}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white text-sm font-medium">{agent.rating}</span>
                        </div>
                        <span className="text-gray-500 text-xs">CAEN {agent.caenCode}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      {agent.isPremium && (
                        <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium mb-1">
                          👑 Premium
                        </div>
                      )}
                      <div className="text-gray-400 text-xs capitalize">
                        {agent.type.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full px-6 py-3 border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-400/10">
              ⭐ Vezi toți agenții recomandați
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-gray-400 text-sm">Relevanță CAEN</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">&lt;1s</div>
              <div className="text-gray-400 text-sm">Timp răspuns</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">GDPR</div>
              <div className="text-gray-400 text-sm">Conformitate</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">📈</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-400 text-sm">Disponibilitate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaenStatsOverview;