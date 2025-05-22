import React from 'react';
import { AgentByCaen } from '../types/caen';
import { COMPREHENSIVE_CAEN_DATA } from '../data/inventEvolutionAgents';

interface AgentDetailPageProps {
  agentId: string;
}

const AgentDetailPage: React.FC<AgentDetailPageProps> = ({ agentId }) => {
  const agent = COMPREHENSIVE_CAEN_DATA.agents.find(a => a.id === agentId);
  const caenCode = agent ? COMPREHENSIVE_CAEN_DATA.caenCodes.find(c => c.code === agent.caenCode) : null;

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agent nu a fost găsit</h1>
          <a href="/agents-caen" className="text-blue-400 hover:text-blue-300">
            ← Înapoi la marketplace
          </a>
        </div>
      </div>
    );
  }

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

  const getPricingDisplay = () => {
    switch (agent.pricing.type) {
      case 'free':
        return { text: 'Gratuit', color: 'text-green-400', bg: 'bg-green-500/20' };
      case 'freemium':
        return { text: 'Freemium', color: 'text-blue-400', bg: 'bg-blue-500/20' };
      case 'paid':
        return { 
          text: `€${agent.pricing.startingPrice}/lună`, 
          color: 'text-yellow-400', 
          bg: 'bg-yellow-500/20' 
        };
      case 'enterprise':
        return { text: 'Enterprise', color: 'text-purple-400', bg: 'bg-purple-500/20' };
      default:
        return { text: 'Contact', color: 'text-gray-400', bg: 'bg-gray-500/20' };
    }
  };

  const pricing = getPricingDisplay();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation Header */}
      <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a 
                href="/agents-caen"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Marketplace CAEN
              </a>
              <span className="text-gray-600">/</span>
              <span className="text-gray-400">{agent.name}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {caenCode && (
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                  CAEN {caenCode.code}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Agent Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Agent Header */}
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-2xl">
                  {getTypeIcon(agent.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-black text-white">{agent.name}</h1>
                    {agent.isPremium && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-bold">
                        👑 Premium
                      </span>
                    )}
                    {agent.isRecommended && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold">
                        ⭐ Recomandat
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xl text-gray-300 mb-4 capitalize">
                    {agent.type.replace('_', ' ')} • {agent.category}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-white font-medium ml-2">{agent.rating}</span>
                      <span className="text-gray-400">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Despre {agent.name}</h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {agent.description}
                </p>
                
                <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">🎯 Caz de utilizare principal</h3>
                  <p className="text-gray-300">{agent.useCase}</p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">🚀 Funcționalități cheie</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agent.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">🔗 Integrări disponibile</h2>
                <div className="flex flex-wrap gap-3">
                  {agent.integrations.map((integration, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">🏷️ Tehnologii și domenii</h2>
                <div className="flex flex-wrap gap-3">
                  {agent.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600 hover:border-gray-500 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Actions */}
            <div className="space-y-6">
              
              {/* Pricing Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold ${pricing.bg} ${pricing.color} mb-4`}>
                    {pricing.text}
                  </div>
                  
                  {agent.pricing.type === 'paid' && (
                    <p className="text-gray-400 text-sm">per lună, fără contract</p>
                  )}
                  
                  {agent.pricing.type === 'enterprise' && (
                    <p className="text-gray-400 text-sm">Prețuri personalizate în funcție de volum</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                    🚀 Începe acum
                  </button>
                  
                  {agent.demoAvailable && (
                    <button className="w-full px-6 py-3 border-2 border-gray-600 hover:border-blue-400 text-white rounded-xl font-medium transition-all duration-300 hover:bg-blue-400/10">
                      ▶️ Vezi Demo
                    </button>
                  )}
                  
                  {agent.trialAvailable && (
                    <button className="w-full px-6 py-3 border-2 border-gray-600 hover:border-green-400 text-white rounded-xl font-medium transition-all duration-300 hover:bg-green-400/10">
                      🆓 Trial Gratuit
                    </button>
                  )}
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="space-y-3 text-sm">
                    {agent.licenseAvailable && (
                      <div className="flex items-center gap-2 text-green-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Licență comercială disponibilă
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Suport tehnic inclus
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Setup în maximum 24h
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📞 Contact & Suport</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">📧</span>
                    <div>
                      <div className="text-white font-medium">Email</div>
                      <div className="text-gray-400">office@inventevolution.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">📞</span>
                    <div>
                      <div className="text-white font-medium">Telefon</div>
                      <div className="text-gray-400">0744 859 100</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">🌐</span>
                    <div>
                      <div className="text-white font-medium">Website</div>
                      <div className="text-gray-400">www.inventevolution.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentDetailPage;