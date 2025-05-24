import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon
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

async function getAnalytics(token: string) {
  const response = await fetch('http://localhost:4000/api/admin/analytics', {
    headers: { 'Cookie': `token=${token}` }
  });

  if (!response.ok) return null;

  const { data } = await response.json();
  return data;
}

export default async function AdminAnalyticsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const admin = await checkAdminAccess(token!.value);
  if (!admin) {
    redirect('/dashboard');
  }

  const analytics = await getAnalytics(token!.value);

  const statsCards = [
    {
      name: 'Venit Total',
      value: `${analytics?.revenue?.total || 0} RON`,
      change: `+${analytics?.revenue?.growth || 0}%`,
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon,
      bgColor: 'from-green-500 to-green-600'
    },
    {
      name: 'Utilizatori Activi',
      value: analytics?.users?.active || 0,
      change: `+${analytics?.users?.growth || 0}%`,
      changeType: 'positive' as const,
      icon: UserGroupIcon,
      bgColor: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Conversații Lunare',
      value: analytics?.conversations?.monthly || 0,
      change: `+${analytics?.conversations?.growth || 0}%`,
      changeType: 'positive' as const,
      icon: ChatBubbleLeftRightIcon,
      bgColor: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Agenți Activi',
      value: analytics?.agents?.active || 0,
      change: `+${analytics?.agents?.growth || 0}%`,
      changeType: 'positive' as const,
      icon: CpuChipIcon,
      bgColor: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analiză Platformă</h1>
        <p className="text-gray-400 mt-1">Monitorizează performanța și metricile platformei</p>
      </div>

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

      {/* Revenue chart placeholder */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Evoluție Venit</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Grafic venit - În dezvoltare</p>
          </div>
        </div>
      </div>

      {/* Top agents and users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top agents */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Top Agenți</h2>
          <div className="space-y-4">
            {analytics?.topAgents?.map((agent: any, index: number) => (
              <div key={agent.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500 font-mono text-sm w-6">{index + 1}.</span>
                  <div className="ml-3">
                    <p className="text-white font-medium">{agent.name}</p>
                    <p className="text-gray-400 text-sm">{agent.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{agent.conversations}</p>
                  <p className="text-gray-400 text-sm">conversații</p>
                </div>
              </div>
            )) || (
              <p className="text-gray-400 text-center py-4">Nu există date încă</p>
            )}
          </div>
        </div>

        {/* Top users */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Utilizatori Activi</h2>
          <div className="space-y-4">
            {analytics?.topUsers?.map((user: any, index: number) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500 font-mono text-sm w-6">{index + 1}.</span>
                  <div className="ml-3">
                    <p className="text-white font-medium">{user.fullName || user.email}</p>
                    <p className="text-gray-400 text-sm">{user.company || 'Fără companie'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{user.agents}</p>
                  <p className="text-gray-400 text-sm">agenți</p>
                </div>
              </div>
            )) || (
              <p className="text-gray-400 text-center py-4">Nu există date încă</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}