import React from 'react';
import { useRouter } from 'next/router';

const QuickActions: React.FC = () => {
  const router = useRouter();

  const actions = [
    {
      title: 'Explorează Agenți',
      description: 'Descoperă agenți noi pe coduri CAEN',
      icon: '🏭',
      action: () => router.push('/agents-caen'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Conversație Nouă',
      description: 'Inițiază o conversație cu un agent',
      icon: '💬',
      action: () => router.push('/conversations'),
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Vezi Analize',
      description: 'Monitorizează performanțele',
      icon: '📊',
      action: () => router.push('/analytics'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Upgrade Plan',
      description: 'Crește-ți limitele și funcționalitățile',
      icon: '⚡',
      action: () => router.push('/pricing'),
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6">Acțiuni Rapide</h2>
      
      <div className="space-y-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="w-full p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </div>
              <div className="text-gray-400 group-hover:text-white transition-colors">
                →
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;