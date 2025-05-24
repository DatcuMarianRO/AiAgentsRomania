import React from 'react';

interface ActivityItem {
  id: string;
  type: 'conversation' | 'agent_added' | 'upgrade' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
}

const AgentActivityFeed: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'conversation',
      title: 'Conversație finalizată cu SINTRA AI',
      description: 'Rezervare pentru 6 persoane la restaurant în centrul Bucureștiului',
      timestamp: '2 minute ago',
      icon: '🍽️',
      color: 'text-green-400',
    },
    {
      id: '2',
      type: 'agent_added',
      title: 'Agent nou adăugat',
      description: 'MECHANOX AI a fost adăugat în lista ta de agenți preferați',
      timestamp: '1 oră ago',
      icon: '🔧',
      color: 'text-blue-400',
    },
    {
      id: '3',
      type: 'conversation',
      title: 'Consultare CONTABIX',
      description: 'Analiză financiară pentru trimestrul Q4 2024 finalizată',
      timestamp: '3 ore ago',
      icon: '📊',
      color: 'text-purple-400',
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Achievement deblocat!',
      description: 'Ai realizat 50 de conversații cu succes. Felicitări!',
      timestamp: '1 zi ago',
      icon: '🏆',
      color: 'text-yellow-400',
    },
    {
      id: '5',
      type: 'conversation',
      title: 'LEGALIS AI - Consultanță juridică',
      description: 'Clarificări despre contractele de muncă și legislația actuală',
      timestamp: '2 zile ago',
      icon: '⚖️',
      color: 'text-indigo-400',
    },
    {
      id: '6',
      type: 'upgrade',
      title: 'Plan upgradat cu succes',
      description: 'Felicitări! Ai trecut la planul Basic și ai primit 500 de credite bonus',
      timestamp: '3 zile ago',
      icon: '⭐',
      color: 'text-orange-400',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'conversation':
        return '💬';
      case 'agent_added':
        return '➕';
      case 'upgrade':
        return '⬆️';
      case 'achievement':
        return '🎉';
      default:
        return '📌';
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Activitate Recentă</h2>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
          Vezi tot
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            {/* Activity Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                <span className="text-lg">{activity.icon}</span>
              </div>
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs">{getActivityIcon(activity.type)}</span>
                <h3 className="text-white font-medium text-sm truncate">
                  {activity.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                {activity.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${activity.color}`}>
                  {activity.type.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  {activity.timestamp}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <button className="text-gray-500 hover:text-white transition-colors p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="mt-6 text-center">
        <button className="w-full py-3 text-gray-400 hover:text-white text-sm font-medium border border-gray-700 hover:border-gray-600 rounded-lg transition-colors">
          Încarcă mai multe activități
        </button>
      </div>
    </div>
  );
};

export default AgentActivityFeed;