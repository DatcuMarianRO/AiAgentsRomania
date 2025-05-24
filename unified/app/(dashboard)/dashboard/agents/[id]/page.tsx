import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  BoltIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

async function getAgent(agentId: string, token: string) {
  const response = await fetch(`http://localhost:4000/api/agents/my-agents/${agentId}`, {
    headers: { 'Cookie': `token=${token}` }
  });

  if (!response.ok) {
    return null;
  }

  const { data } = await response.json();
  return data;
}

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const agent = await getAgent(params.id, token!.value);

  if (!agent) {
    notFound();
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <Link
        href="/dashboard/agents"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Înapoi la agenți
      </Link>

      {/* Agent header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
              {agent.name.charAt(0)}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white mb-1">
                {agent.customName || agent.name}
              </h1>
              <p className="text-gray-400 mb-2">{agent.category} • {agent.type}</p>
              <p className="text-gray-300">{agent.description}</p>
            </div>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full ${
            agent.status === 'ACTIVE' 
              ? 'bg-green-500/10 text-green-500' 
              : 'bg-gray-500/10 text-gray-500'
          }`}>
            {agent.status === 'ACTIVE' ? 'Activ' : 'Inactiv'}
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversații</p>
              <p className="text-2xl font-bold text-white">{agent._count?.conversations || 0}</p>
            </div>
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Mesaje</p>
              <p className="text-2xl font-bold text-white">{agent._count?.messages || 0}</p>
            </div>
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rata succes</p>
              <p className="text-2xl font-bold text-white">94%</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Timp răspuns</p>
              <p className="text-2xl font-bold text-white">1.2s</p>
            </div>
            <BoltIcon className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Configuration sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Cog6ToothIcon className="w-5 h-5 mr-2" />
            Configurare Agent
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nume personalizat
              </label>
              <input
                type="text"
                defaultValue={agent.customName || agent.name}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Ex: Asistent Vânzări"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mesaj de întâmpinare
              </label>
              <textarea
                rows={3}
                defaultValue={agent.settings?.greeting || ''}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Bună! Sunt agentul tău AI..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ton conversație
              </label>
              <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                <option value="professional">Profesional</option>
                <option value="friendly">Prietenos</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status agent
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={agent.status === 'ACTIVE'}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Agent activ</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Salvează modificările
            </button>
          </form>
        </div>

        {/* Integration */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Integrare</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">API Key</h3>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-mono overflow-hidden">
                  sk_live_51234567890abcdef
                </code>
                <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Copiază
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Webhook URL</h3>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-mono overflow-hidden">
                  https://api.ai-agents.ro/webhook/{agent.id}
                </code>
                <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Copiază
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Cod embed</h3>
              <pre className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-mono overflow-x-auto">
{`<script src="https://ai-agents.ro/embed.js"></script>
<script>
  AIAgents.init({
    agentId: '${agent.id}',
    position: 'bottom-right'
  });
</script>`}
              </pre>
              <button className="mt-2 w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                Copiază cod
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="mt-6 bg-gray-900 rounded-xl border border-red-900 p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Zonă periculoasă</h2>
        <p className="text-gray-400 text-sm mb-4">
          Odată ce ștergi acest agent, nu există cale de întoarcere. Te rugăm să fii sigur.
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
          <TrashIcon className="w-4 h-4 mr-2" />
          Șterge agent
        </button>
      </div>
    </div>
  );
}