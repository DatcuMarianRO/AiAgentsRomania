import React from 'react';

const AdminStats: React.FC = () => {
  const overviewStats = [
    {
      title: 'Utilizatori Activi',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: '👥',
      description: 'Utilizatori unici în ultimele 30 zile'
    },
    {
      title: 'Venit Total',
      value: '€45,890',
      change: '+23.1%',
      changeType: 'positive',
      icon: '💰',
      description: 'Venit generat în luna curentă'
    },
    {
      title: 'Conversații AI',
      value: '125,634',
      change: '+18.7%',
      changeType: 'positive',
      icon: '💬',
      description: 'Conversații procesate astăzi'
    },
    {
      title: 'Agenți Activi',
      value: '15',
      change: '+2',
      changeType: 'positive',
      icon: '🤖',
      description: 'Agenți AI disponibili în marketplace'
    },
    {
      title: 'Rata de Success',
      value: '94.2%',
      change: '+1.8%',
      changeType: 'positive',
      icon: '✅',
      description: 'Conversații finalizate cu succes'
    },
    {
      title: 'Timp Răspuns',
      value: '1.2s',
      change: '-0.3s',
      changeType: 'positive',
      icon: '⚡',
      description: 'Timp mediu de răspuns AI'
    },
    {
      title: 'Satisfacție Client',
      value: '4.8/5',
      change: '+0.2',
      changeType: 'positive',
      icon: '⭐',
      description: 'Rating mediu din feedback-uri'
    },
    {
      title: 'Abonamente Premium',
      value: '347',
      change: '+45',
      changeType: 'positive',
      icon: '💎',
      description: 'Utilizatori cu planuri plătite'
    }
  ];

  const recentActivity = [
    {
      action: 'Utilizator nou înregistrat',
      user: 'alex.popescu@email.com',
      timestamp: '2 minute ago',
      type: 'user',
      icon: '👤'
    },
    {
      action: 'Agent SINTRA AI - Conversație finalizată',
      user: 'Maria Ionescu',
      timestamp: '5 minute ago',
      type: 'conversation',
      icon: '🍽️'
    },
    {
      action: 'Plan Premium activat',
      user: 'company@example.com',
      timestamp: '12 minute ago',
      type: 'subscription',
      icon: '💎'
    },
    {
      action: 'Agent MECHANOX AI - Sesiune de debugging',
      user: 'System Admin',
      timestamp: '18 minute ago',
      type: 'system',
      icon: '🔧'
    },
    {
      action: 'Raport financiar generat',
      user: 'Invent Evolution',
      timestamp: '25 minute ago',
      type: 'report',
      icon: '📊'
    }
  ];

  const topAgents = [
    { name: 'SINTRA AI', usage: 2847, revenue: '€12,450', performance: 96 },
    { name: 'MECHANOX AI', usage: 1923, revenue: '€8,720', performance: 94 },
    { name: 'CONTABIX', usage: 1654, revenue: '€7,890', performance: 92 },
    { name: 'LEGALIS AI', usage: 1432, revenue: '€6,340', performance: 89 },
    { name: 'MEDITRIX AI', usage: 1287, revenue: '€5,670', performance: 91 }
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
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
              <p className="text-sm font-medium text-gray-300">{stat.title}</p>
            </div>
            
            <p className="text-xs text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Activitate Recentă</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.user} • {activity.timestamp}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.type === 'user' ? 'bg-blue-900/30 text-blue-400' :
                  activity.type === 'conversation' ? 'bg-green-900/30 text-green-400' :
                  activity.type === 'subscription' ? 'bg-purple-900/30 text-purple-400' :
                  activity.type === 'system' ? 'bg-orange-900/30 text-orange-400' :
                  'bg-gray-700 text-gray-400'
                }`}>
                  {activity.type.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Agents */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Top Agenți AI - Performanță</h2>
          <div className="space-y-4">
            {topAgents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-orange-600 text-white' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{agent.name}</h3>
                    <p className="text-gray-400 text-sm">{agent.usage} utilizări</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">{agent.revenue}</p>
                  <p className="text-gray-400 text-sm">{agent.performance}% success</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6">Acțiuni Rapide Administrator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Backup Sistem', icon: '💾', color: 'from-blue-500 to-blue-600' },
            { title: 'Raport Lunar', icon: '📋', color: 'from-green-500 to-green-600' },
            { title: 'Alertă Manuală', icon: '🚨', color: 'from-red-500 to-red-600' },
            { title: 'Manutenție Programată', icon: '🔧', color: 'from-purple-500 to-purple-600' }
          ].map((action, index) => (
            <button
              key={index}
              className={`p-4 bg-gradient-to-r ${action.color} rounded-lg text-white font-medium hover:scale-105 transition-transform`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm">{action.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;