import { cookies } from 'next/headers';
import Link from 'next/link';
import { 
  CpuChipIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

async function getMyAgents(token: string) {
  const response = await fetch('http://localhost:4000/api/agents/my-agents', {
    headers: { 'Cookie': `token=${token}` }
  });

  if (!response.ok) {
    return [];
  }

  const { data } = await response.json();
  return data;
}

export default async function MyAgentsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const agents = await getMyAgents(token!.value);

  const agentTypeColors: Record<string, string> = {
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
          <h1 className="text-2xl font-bold text-white">Agenții Mei</h1>
          <p className="text-gray-400 mt-1">Gestionează și configurează agenții tăi AI</p>
        </div>
        <Link
          href="/agents"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Adaugă Agent Nou
        </Link>
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
          <button className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors border border-gray-700">
            <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
            Filtre
          </button>
        </div>
      </div>

      {/* Agents grid */}
      {agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: any) => (
            <div
              key={agent.id}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
            >
              {/* Agent header */}
              <div className={`h-2 bg-gradient-to-r ${agentTypeColors[agent.type] || 'from-gray-500 to-gray-600'}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${agentTypeColors[agent.type] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white font-bold text-lg`}>
                      {agent.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">
                        {agent.customName || agent.name}
                      </h3>
                      <p className="text-sm text-gray-400">{agent.category}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    agent.status === 'ACTIVE' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-gray-500/10 text-gray-500'
                  }`}>
                    {agent.status === 'ACTIVE' ? 'Activ' : 'Inactiv'}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {agent.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                    <span>{agent._count.conversations} conversații</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>{new Date(agent.createdAt).toLocaleDateString('ro-RO')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/agents/${agent.id}`}
                    className="flex-1 text-center px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Configurează
                  </Link>
                  <Link
                    href={`/dashboard/agents/${agent.id}/conversations`}
                    className="flex-1 text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Vezi Conversații
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-12">
          <div className="text-center">
            <CpuChipIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nu ai niciun agent încă</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Începe să automatizezi procesele tale de business cu agenți AI specializați.
            </p>
            <Link
              href="/agents"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Explorează Catalogul de Agenți
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}