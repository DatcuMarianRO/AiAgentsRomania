import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const StatsOverview: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Agenți Activi',
      value: '3',
      change: '+2',
      changeType: 'positive',
      icon: '🤖',
      description: 'Agenți în utilizare'
    },
    {
      name: 'Conversații Totale',
      value: '147',
      change: '+23',
      changeType: 'positive',
      icon: '💬',
      description: 'Conversații în ultima lună'
    },
    {
      name: 'Credits Disponibili',
      value: user?.credits_available?.toString() || '0',
      change: '-15',
      changeType: 'negative',
      icon: '⭐',
      description: 'Credits rămași'
    },
    {
      name: 'Eficiență Medie',
      value: '94.2%',
      change: '+1.8%',
      changeType: 'positive',
      icon: '📈',
      description: 'Rata de success'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{stat.icon}</div>
            <div className={`text-sm font-medium px-2 py-1 rounded-full ${
              stat.changeType === 'positive' 
                ? 'text-green-400 bg-green-900/20' 
                : 'text-red-400 bg-red-900/20'
            }`}>
              {stat.change}
            </div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-300">{stat.name}</p>
          </div>
          
          <p className="text-xs text-gray-500">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;