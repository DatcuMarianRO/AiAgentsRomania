import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { 
  CpuChipIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

async function checkAdminAccess(token: string) {
  const response = await fetch('http://localhost:4000/api/auth/me', {
    headers: { 'Cookie': `token=${token}` }
  });

  if (!response.ok) return null;

  const { data: user } = await response.json();
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    return null;
  }
  
  return user;
}

async function getAllAgents(token: string) {
  const response = await fetch('http://localhost:4000/api/admin/agents', {
    headers: { 'Cookie': `token=${token}` }
  });

  if (!response.ok) return [];

  const { data } = await response.json();
  return data;
}

export default async function AdminAgentsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const admin = await checkAdminAccess(token!.value);
  if (!admin) {
    redirect('/dashboard');
  }

  const agents = await getAllAgents(token!.value);

  const typeColors: Record<string, string> = {
    'CUSTOMER_SUPPORT': 'from-blue-500 to-blue-600',
    'SALES': 'from-green-500 to-green-600',
    'MARKETING': 'from-purple-500 to-purple-600',
    'ANALYTICS': 'from-pink-500 to-pink-600',
    'HR': 'from-orange-500 to-orange-600',
    'FINANCE': 'from-red-500 to-red-600',
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestionare Agenți</h1>
          <p className="text-gray-400 mt-1">Administrează toți agenții platformei</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" />
          Adaugă Agent Nou
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Agenți</p>
              <p className="text-2xl font-bold text-white">{agents.length}</p>
            </div>
            <CpuChipIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Agenți Activi</p>
              <p className="text-2xl font-bold text-white">
                {agents.filter((a: any) => a.status === 'ACTIVE').length}
              </p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Utilizatori</p>
              <p className="text-2xl font-bold text-white">
                {agents.reduce((sum: number, agent: any) => sum + (agent._count?.userAgents || 0), 0)}
              </p>
            </div>
            <UserGroupIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversații Totale</p>
              <p className="text-2xl font-bold text-white">
                {agents.reduce((sum: number, agent: any) => sum + (agent._count?.conversations || 0), 0)}
              </p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Caută agenți..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
            <option value="">Toate tipurile</option>
            <option value="CUSTOMER_SUPPORT">Customer Support</option>
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="ANALYTICS">Analytics</option>
            <option value="HR">HR</option>
            <option value="FINANCE">Finance</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
            <option value="">Toate statusurile</option>
            <option value="ACTIVE">Activ</option>
            <option value="INACTIVE">Inactiv</option>
            <option value="BETA">Beta</option>
          </select>
        </div>
      </div>

      {/* Agents table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Agent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Tip</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Categorie</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Utilizatori</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Conversații</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent: any) => (
                <tr key={agent.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${typeColors[agent.type] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white font-semibold`}>
                        {agent.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-white font-medium">{agent.name}</p>
                        <p className="text-gray-400 text-sm line-clamp-1">{agent.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{agent.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{agent.category?.name || 'Fără categorie'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      agent.status === 'ACTIVE' 
                        ? 'bg-green-500/10 text-green-500' 
                        : agent.status === 'BETA'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{agent._count?.userAgents || 0}</td>
                  <td className="px-6 py-4 text-gray-300">{agent._count?.conversations || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
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
}