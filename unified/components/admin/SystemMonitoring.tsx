import React, { useState, useEffect } from 'react';

const SystemMonitoring: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState({
    overall: 'healthy',
    uptime: 99.97,
    responseTime: 1.2,
    errorRate: 0.03,
    activeUsers: 1247,
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 32
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      level: 'warning',
      message: 'Utilizarea memoriei a depășit 70% pe serverul principal',
      timestamp: '2025-05-22T01:15:00Z',
      resolved: false
    },
    {
      id: 2,
      level: 'info',
      message: 'Backup automat completat cu succes',
      timestamp: '2025-05-22T00:00:00Z',
      resolved: true
    },
    {
      id: 3,
      level: 'error',
      message: 'Conexiune intermitentă cu baza de date Redis',
      timestamp: '2025-05-21T23:45:00Z',
      resolved: true
    }
  ]);

  const serverMetrics = [
    {
      name: 'Frontend Server',
      status: 'healthy',
      cpu: 35,
      memory: 45,
      uptime: '15d 8h 23m',
      requests: 125634,
      errors: 12
    },
    {
      name: 'Backend API',
      status: 'healthy',
      cpu: 55,
      memory: 72,
      uptime: '15d 8h 23m',
      requests: 89423,
      errors: 5
    },
    {
      name: 'Database',
      status: 'warning',
      cpu: 78,
      memory: 89,
      uptime: '45d 12h 45m',
      requests: 234567,
      errors: 23
    },
    {
      name: 'Redis Cache',
      status: 'error',
      cpu: 25,
      memory: 34,
      uptime: '0d 2h 15m',
      requests: 567890,
      errors: 156
    }
  ];

  const performanceMetrics = [
    { metric: 'Timp răspuns API', value: '1.2s', status: 'good', target: '< 2s' },
    { metric: 'Rata de eroare', value: '0.03%', status: 'excellent', target: '< 0.1%' },
    { metric: 'Throughput', value: '1,245 req/min', status: 'good', target: '> 1,000 req/min' },
    { metric: 'Disponibilitate', value: '99.97%', status: 'excellent', target: '> 99.9%' },
    { metric: 'Utilizatori activi', value: '1,247', status: 'good', target: 'N/A' },
    { metric: 'Conversații/min', value: '87', status: 'good', target: '> 50/min' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': case 'excellent': return 'bg-green-900/30 text-green-400';
      case 'warning': case 'good': return 'bg-yellow-900/30 text-yellow-400';
      case 'error': case 'poor': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-900/30 border-red-500/30 text-red-400';
      case 'warning': return 'bg-yellow-900/30 border-yellow-500/30 text-yellow-400';
      case 'info': return 'bg-blue-900/30 border-blue-500/30 text-blue-400';
      default: return 'bg-gray-700 border-gray-600 text-gray-400';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500';
    if (usage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Monitorizare Sistem</h2>
          <p className="text-gray-400">
            Monitorizează starea sistemului, performanța și alertele în timp real
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(systemStatus.overall)}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            <span className="text-sm font-medium">
              {systemStatus.overall === 'healthy' ? 'Sistem Sănătos' : 'Probleme Detectate'}
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">⏱️</span>
            <span className="text-green-400 text-sm font-medium">{systemStatus.uptime}%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Uptime</h3>
          <p className="text-gray-400 text-sm">Ultimele 30 zile</p>
        </div>

        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">⚡</span>
            <span className="text-blue-400 text-sm font-medium">{systemStatus.responseTime}s</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Răspuns</h3>
          <p className="text-gray-400 text-sm">Timp mediu de răspuns</p>
        </div>

        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">👥</span>
            <span className="text-purple-400 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{systemStatus.activeUsers.toLocaleString()}</h3>
          <p className="text-gray-400 text-sm">Utilizatori activi</p>
        </div>

        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">❌</span>
            <span className="text-green-400 text-sm font-medium">{systemStatus.errorRate}%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Erori</h3>
          <p className="text-gray-400 text-sm">Rata de eroare</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Server Status */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Status Servere</h3>
          <div className="space-y-4">
            {serverMetrics.map((server, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-white font-medium">{server.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                      {server.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">Uptime: {server.uptime}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">CPU</span>
                      <span className="text-white">{server.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                        style={{ width: `${server.cpu}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">RAM</span>
                      <span className="text-white">{server.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                        style={{ width: `${server.memory}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Requests: {server.requests.toLocaleString()}</span>
                  <span className="text-gray-400">Errors: {server.errors}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Metrici de Performanță</h3>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">{metric.metric}</h4>
                  <p className="text-gray-400 text-sm">Target: {metric.target}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{metric.value}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Alerte și Notificări</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {alerts.filter(a => !a.resolved).length} alerte active
            </span>
            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
              Rezolvă Toate
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.level)} ${alert.resolved ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {alert.level === 'error' ? '🚨' : alert.level === 'warning' ? '⚠️' : 'ℹ️'}
                  </span>
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm opacity-70">
                      {new Date(alert.timestamp).toLocaleString('ro-RO')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {alert.resolved ? (
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                      Rezolvat
                    </span>
                  ) : (
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors">
                      Rezolvă
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">🔧</div>
          <div className="text-sm">Manutenție Sistem</div>
        </button>
        <button className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">💾</div>
          <div className="text-sm">Backup Manual</div>
        </button>
        <button className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-sm">Raport Performanță</div>
        </button>
        <button className="p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white font-medium hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">🚨</div>
          <div className="text-sm">Test Alertă</div>
        </button>
      </div>
    </div>
  );
};

export default SystemMonitoring;