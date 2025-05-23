import { cookies } from 'next/headers';
import { 
  CpuChipIcon, 
  ChatBubbleLeftRightIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

async function getDashboardData(token: string) {
  const [statsRes, agentsRes] = await Promise.all([
    fetch('http://localhost:4000/api/dashboard/stats', {
      headers: { 'Cookie': `token=${token}` }
    }),
    fetch('http://localhost:4000/api/agents/my-agents', {
      headers: { 'Cookie': `token=${token}` }
    })
  ]);

  const stats = statsRes.ok ? await statsRes.json() : { data: {} };
  const agents = agentsRes.ok ? await agentsRes.json() : { data: [] };

  return { stats: stats.data, agents: agents.data };
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const { stats, agents } = await getDashboardData(token!.value);

  const statsCards = [
    {
      name: 'Agenți Activi',
      value: agents.length || 0,
      icon: CpuChipIcon,
      change: '+12%',
      changeType: 'positive',
      bgColor: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Conversații Totale',
      value: stats.totalConversations || 0,
      icon: ChatBubbleLeftRightIcon,
      change: '+23%',
      changeType: 'positive',
      bgColor: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Venit Lunar',
      value: `${stats.monthlyRevenue || 0} RON`,
      icon: CurrencyDollarIcon,
      change: '+8%',
      changeType: 'positive',
      bgColor: 'from-green-500 to-green-600'
    },
    {
      name: 'Utilizatori Activi',
      value: stats.activeUsers || 0,
      icon: UserGroupIcon,
      change: '+5%',
      changeType: 'positive',
      bgColor: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat) => (
          <div key={stat.name} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.bgColor}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-sm">
                {stat.changeType === 'positive' ? (
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Agents */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Agenții Tăi</h2>
          <Link
            href="/dashboard/agents"
            className="text-sm text-blue-500 hover:text-blue-400 font-medium"
          >
            Vezi toți →
          </Link>
        </div>

        {agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.slice(0, 3).map((agent: any) => (
              <div
                key={agent.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {agent.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-white font-medium">{agent.name}</h3>
                      <p className="text-gray-400 text-sm">{agent.type}</p>
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
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {agent.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {agent._count?.conversations || 0} conversații
                  </span>
                  <Link
                    href={`/dashboard/agents/${agent.id}`}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    Configurează →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CpuChipIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Nu ai niciun agent încă</p>
            <Link
              href="/agents"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Explorează Agenții
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/agents"
          className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
        >
          <CpuChipIcon className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-white font-medium mb-2">Adaugă Agent Nou</h3>
          <p className="text-gray-400 text-sm">
            Explorează catalogul nostru de agenți AI specializați
          </p>
        </Link>

        <Link
          href="/dashboard/billing"
          className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
        >
          <CreditCardIcon className="w-8 h-8 text-purple-500 mb-4" />
          <h3 className="text-white font-medium mb-2">Gestionează Abonament</h3>
          <p className="text-gray-400 text-sm">
            Vezi detalii despre planul tău și facturi
          </p>
        </Link>

        <Link
          href="/dashboard/settings"
          className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
        >
          <Cog6ToothIcon className="w-8 h-8 text-pink-500 mb-4" />
          <h3 className="text-white font-medium mb-2">Setări Cont</h3>
          <p className="text-gray-400 text-sm">
            Actualizează profilul și preferințele tale
          </p>
        </Link>
      </div>
    </div>
  );
}