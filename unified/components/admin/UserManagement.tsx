import React, { useState } from 'react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterTier, setFilterTier] = useState('all');

  const users = [
    {
      id: '1',
      email: 'office@inventevolution.com',
      first_name: 'Invent',
      last_name: 'Evolution',
      role: 'admin',
      subscription_tier: 'enterprise',
      credits_available: 999999,
      created_at: '2025-01-15',
      last_login: '2025-05-22',
      status: 'active',
      total_conversations: 0,
      total_spent: 0
    },
    {
      id: '2',
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      role: 'user',
      subscription_tier: 'premium',
      credits_available: 2500,
      created_at: '2025-05-10',
      last_login: '2025-05-22',
      status: 'active',
      total_conversations: 147,
      total_spent: 299
    },
    {
      id: '3',
      email: 'maria.popescu@company.ro',
      first_name: 'Maria',
      last_name: 'Popescu',
      role: 'creator',
      subscription_tier: 'basic',
      credits_available: 850,
      created_at: '2025-04-22',
      last_login: '2025-05-21',
      status: 'active',
      total_conversations: 89,
      total_spent: 149
    },
    {
      id: '4',
      email: 'alex.business@startup.com',
      first_name: 'Alexandru',
      last_name: 'Ionescu',
      role: 'user',
      subscription_tier: 'enterprise',
      credits_available: 15000,
      created_at: '2025-03-15',
      last_login: '2025-05-20',
      status: 'active',
      total_conversations: 523,
      total_spent: 1299
    },
    {
      id: '5',
      email: 'test.user@email.com',
      first_name: 'Test',
      last_name: 'User',
      role: 'user',
      subscription_tier: 'free',
      credits_available: 50,
      created_at: '2025-05-01',
      last_login: '2025-05-15',
      status: 'inactive',
      total_conversations: 12,
      total_spent: 0
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-900/30 text-red-400';
      case 'creator': return 'bg-purple-900/30 text-purple-400';
      default: return 'bg-blue-900/30 text-blue-400';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-yellow-900/30 text-yellow-400';
      case 'premium': return 'bg-purple-900/30 text-purple-400';
      case 'basic': return 'bg-blue-900/30 text-blue-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-900/30 text-green-400' 
      : 'bg-gray-700 text-gray-400';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesTier = filterTier === 'all' || user.subscription_tier === filterTier;
    
    return matchesSearch && matchesRole && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Management Utilizatori</h2>
          <p className="text-gray-400">
            Gestionează conturile și permisiunile utilizatorilor platformei
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + Adaugă Utilizator
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">👥</div>
          <div className="text-xl font-bold text-white">{users.length}</div>
          <div className="text-gray-400 text-sm">Total Utilizatori</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-xl font-bold text-white">{users.filter(u => u.status === 'active').length}</div>
          <div className="text-gray-400 text-sm">Utilizatori Activi</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">💎</div>
          <div className="text-xl font-bold text-white">{users.filter(u => u.subscription_tier !== 'free').length}</div>
          <div className="text-gray-400 text-sm">Abonați Premium</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl mb-2">👑</div>
          <div className="text-xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</div>
          <div className="text-gray-400 text-sm">Administratori</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Căutare utilizatori
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Email sau nume..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Filtrează după rol
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toate rolurile</option>
              <option value="admin">Administrator</option>
              <option value="creator">Creator</option>
              <option value="user">Utilizator</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Filtrează după plan
            </label>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toate planurile</option>
              <option value="free">Gratuit</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Utilizator</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Rol</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Plan</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Credits</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Activitate</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {user.first_name[0]}{user.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(user.subscription_tier)}`}>
                      {user.subscription_tier.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-white font-medium">{user.credits_available.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">credits disponibili</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-white text-sm">{user.total_conversations} conversații</div>
                    <div className="text-gray-400 text-xs">
                      Ultima: {new Date(user.last_login).toLocaleDateString('ro-RO')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-lg transition-colors">
                        ✏️
                      </button>
                      <button className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 rounded-lg transition-colors">
                        🔧
                      </button>
                      {user.role !== 'admin' && (
                        <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;