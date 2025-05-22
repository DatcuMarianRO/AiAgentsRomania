import React from 'react';
import { AgentByCaen } from '../types/caen';

interface AgentCardProps {
  agent: AgentByCaen;
  onSelect: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
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
    <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:bg-gray-800/70">
      
      {/* Premium Badge */}
      {agent.isPremium && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            👑 Premium
          </div>
        </div>
      )}

      {/* Recommended Badge */}
      {agent.isRecommended && !agent.isPremium && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Recomandat
          </div>
        </div>
      )}

      {/* Popular Badge */}
      {agent.isPopular && !agent.isPremium && !agent.isRecommended && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            🔥 Popular
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            {getTypeIcon(agent.type)}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
              {agent.name}
            </h3>
            <div className="text-sm text-gray-400 capitalize">
              {agent.type.replace('_', ' ')}
            </div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-medium ${pricing.bg} ${pricing.color}`}>
          {pricing.text}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 mb-2">
          {agent.shortDescription}
        </p>
        <p className="text-gray-500 text-xs leading-relaxed">
          {agent.useCase}
        </p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-white ml-1">{agent.rating}</span>
        </div>
        
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
          </svg>
          {agent.reviewCount} review{agent.reviewCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {agent.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs border border-gray-600 group-hover:border-gray-500 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
        {agent.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs border border-gray-600">
            +{agent.tags.length - 3} mai multe
          </span>
        )}
      </div>

      {/* Features */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Funcționalități cheie
        </div>
        <div className="space-y-1">
          {agent.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <a
          href={`/agent/${agent.id}`}
          className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-center"
        >
          📋 Vezi detalii
        </a>

        <div className="flex gap-2">
          {agent.demoAvailable && (
            <button className="flex-1 px-4 py-2 border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-400/10">
              ▶️ Demo
            </button>
          )}
          
          {agent.trialAvailable && (
            <button className="flex-1 px-4 py-2 border border-gray-600 hover:border-green-400 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-400/10">
              🆓 Trial
            </button>
          )}

          {agent.licenseAvailable && (
            <button className="flex-1 px-4 py-2 border border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-purple-400/10">
              📜 Licență
            </button>
          )}
        </div>
      </div>

      {/* CAEN Code Badge */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-900/90 backdrop-blur-sm text-gray-400 px-2 py-1 rounded text-xs border border-gray-700">
          CAEN {agent.caenCode}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;