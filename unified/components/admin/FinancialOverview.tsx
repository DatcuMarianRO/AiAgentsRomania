import React, { useState } from 'react';

const FinancialOverview: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const financialData = {
    totalRevenue: 89450,
    monthlyRevenue: 12850,
    weeklyRevenue: 3240,
    totalTransactions: 2847,
    averageTransactionValue: 31.45,
    churnRate: 2.3,
    conversionRate: 8.7,
    mrr: 45890 // Monthly Recurring Revenue
  };

  const revenueByPlan = [
    { plan: 'Enterprise', revenue: 45600, users: 47, percentage: 51 },
    { plan: 'Premium', revenue: 28900, users: 298, percentage: 32 },
    { plan: 'Basic', revenue: 14950, users: 523, percentage: 17 },
    { plan: 'Free', revenue: 0, users: 1247, percentage: 0 }
  ];

  const recentTransactions = [
    {
      id: 'TXN-001',
      user: 'alex.business@startup.com',
      amount: 1299,
      plan: 'Enterprise',
      date: '2025-05-22',
      status: 'completed',
      type: 'subscription'
    },
    {
      id: 'TXN-002',
      user: 'maria.popescu@company.ro',
      amount: 149,
      plan: 'Basic',
      date: '2025-05-22',
      status: 'completed',
      type: 'subscription'
    },
    {
      id: 'TXN-003',
      user: 'john.doe@example.com',
      amount: 50,
      plan: 'Premium',
      date: '2025-05-21',
      status: 'pending',
      type: 'credits'
    },
    {
      id: 'TXN-004',
      user: 'startup@newcompany.ro',
      amount: 299,
      plan: 'Premium',
      date: '2025-05-21',
      status: 'completed',
      type: 'subscription'
    },
    {
      id: 'TXN-005',
      user: 'consultant@business.com',
      amount: 25,
      plan: 'Basic',
      date: '2025-05-20',
      status: 'failed',
      type: 'credits'
    }
  ];

  const monthlyStats = [
    { month: 'Ian 2025', revenue: 38450, growth: 12.5 },
    { month: 'Feb 2025', revenue: 42100, growth: 9.5 },
    { month: 'Mar 2025', revenue: 45890, growth: 9.0 },
    { month: 'Apr 2025', revenue: 48320, growth: 5.3 },
    { month: 'Mai 2025', revenue: 52840, growth: 9.4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900/30 text-green-400';
      case 'pending': return 'bg-yellow-900/30 text-yellow-400';
      case 'failed': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'enterprise': return 'bg-yellow-900/30 text-yellow-400';
      case 'premium': return 'bg-purple-900/30 text-purple-400';
      case 'basic': return 'bg-blue-900/30 text-blue-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Prezentare Generală Financiară</h2>
          <p className="text-gray-400">
            Monitorizează veniturile, tranzacțiile și performanța financiară
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Această săptămână</option>
            <option value="month">Această lună</option>
            <option value="quarter">Acest trimestru</option>
            <option value="year">Acest an</option>
          </select>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
            📊 Export Raport
          </button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💰</span>
            <span className="text-green-400 text-sm font-medium">+23.4%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">€{financialData.totalRevenue.toLocaleString()}</h3>
          <p className="text-green-400 text-sm font-medium">Venit Total</p>
          <p className="text-gray-400 text-xs">Toate timpurile</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📈</span>
            <span className="text-blue-400 text-sm font-medium">+15.7%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">€{financialData.mrr.toLocaleString()}</h3>
          <p className="text-blue-400 text-sm font-medium">MRR</p>
          <p className="text-gray-400 text-xs">Monthly Recurring Revenue</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🔄</span>
            <span className="text-purple-400 text-sm font-medium">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{financialData.totalTransactions.toLocaleString()}</h3>
          <p className="text-purple-400 text-sm font-medium">Tranzacții Totale</p>
          <p className="text-gray-400 text-xs">Luna curentă</p>
        </div>

        <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💳</span>
            <span className="text-orange-400 text-sm font-medium">+5.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">€{financialData.averageTransactionValue}</h3>
          <p className="text-orange-400 text-sm font-medium">Valoare Medie</p>
          <p className="text-gray-400 text-xs">Per tranzacție</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue by Plan */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Venit pe Planuri de Abonament</h3>
          <div className="space-y-4">
            {revenueByPlan.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPlanColor(plan.plan)}`}>
                    {plan.plan === 'Enterprise' ? '👑' : 
                     plan.plan === 'Premium' ? '💎' : 
                     plan.plan === 'Basic' ? '⭐' : '🆓'}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{plan.plan}</h4>
                    <p className="text-gray-400 text-sm">{plan.users} utilizatori</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">€{plan.revenue.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">{plan.percentage}% din total</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Evoluție Venit Lunar</h3>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {stat.month.slice(0, 3)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{stat.month}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">€{stat.revenue.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${stat.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.growth > 0 ? '+' : ''}{stat.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Tranzacții Recente</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              Vezi toate →
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">ID Tranzacție</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Utilizator</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Sumă</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Plan</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Data</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Tip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-blue-400 font-mono text-sm">{transaction.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white">{transaction.user}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-green-400 font-semibold">€{transaction.amount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(transaction.plan)}`}>
                      {transaction.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-400">{new Date(transaction.date).toLocaleDateString('ro-RO')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-400 capitalize">{transaction.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-sm">Raport Financiar Complet</div>
        </button>
        <button className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">💳</div>
          <div className="text-sm">Gestionează Plăți</div>
        </button>
        <button className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">📈</div>
          <div className="text-sm">Previziuni Venit</div>
        </button>
        <button className="p-4 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">⚙️</div>
          <div className="text-sm">Setări Facturare</div>
        </button>
      </div>
    </div>
  );
};

export default FinancialOverview;