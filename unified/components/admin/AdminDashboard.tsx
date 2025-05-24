import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminStats from './AdminStats';
import UserManagement from './UserManagement';
import AgentManagement from './AgentManagement';
import PlatformSettings from './PlatformSettings';
import SystemMonitoring from './SystemMonitoring';
import FinancialOverview from './FinancialOverview';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy',
    uptime: '99.9%',
    activeUsers: 1247,
    totalRevenue: 45890,
    apiCalls: 125634
  });

  const adminTabs = [
    { id: 'overview', name: 'Prezentare Generală', icon: '📊' },
    { id: 'users', name: 'Utilizatori', icon: '👥' },
    { id: 'agents', name: 'Agenți AI', icon: '🤖' },
    { id: 'financial', name: 'Financiar', icon: '💰' },
    { id: 'monitoring', name: 'Monitorizare', icon: '📈' },
    { id: 'settings', name: 'Setări', icon: '⚙️' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats />;
      case 'users':
        return <UserManagement />;
      case 'agents':
        return <AgentManagement />;
      case 'financial':
        return <FinancialOverview />;
      case 'monitoring':
        return <SystemMonitoring />;
      case 'settings':
        return <PlatformSettings />;
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">👑</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Panou Administrator
                </h1>
                <p className="text-red-400 text-sm">
                  AI Agents România - Management Complet
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                systemHealth.status === 'healthy' 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-red-900/30 text-red-400'
              }`}>
                <span className="mr-1">●</span>
                {systemHealth.status === 'healthy' ? 'Sistem Sănătos' : 'Probleme Detectate'}
              </div>
              <div className="text-white">
                Bun venit, <span className="font-semibold">{user?.first_name} {user?.last_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {adminTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;