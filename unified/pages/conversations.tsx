import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const ConversationsPage: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router, mounted]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Se încarcă conversațiile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Conversații | AI Agents România</title>
        <meta name="description" content="Gestionează conversațiile tale cu agenții AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-gray-800">
            <h1 className="text-3xl font-bold text-white mb-2">
              💬 Conversații AI
            </h1>
            <p className="text-gray-400">
              Gestionează și monitorizează toate conversațiile tale cu agenții AI specializați.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">📊</span>
                <span className="text-green-400 text-sm font-medium">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">247</h3>
              <p className="text-gray-400 text-sm">Total conversații</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">✅</span>
                <span className="text-green-400 text-sm font-medium">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">231</h3>
              <p className="text-gray-400 text-sm">Conversații cu succes</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">⏱️</span>
                <span className="text-blue-400 text-sm font-medium">2.3m</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1:45</h3>
              <p className="text-gray-400 text-sm">Durată medie</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🤖</span>
                <span className="text-purple-400 text-sm font-medium">5 activi</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">12</h3>
              <p className="text-gray-400 text-sm">Agenți folosiți</p>
            </div>
          </div>

          {/* Conversations List */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Conversații Recente</h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  + Conversație Nouă
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {/* Sample conversations */}
              {[
                {
                  agent: 'SINTRA AI',
                  icon: '🍽️',
                  lastMessage: 'Rezervarea pentru 6 persoane a fost confirmată pentru sâmbătă, 25 mai, ora 19:00.',
                  timestamp: '2 minute ago',
                  status: 'completed',
                  category: 'HORECA'
                },
                {
                  agent: 'MECHANOX AI',
                  icon: '🔧',
                  lastMessage: 'Vă recomand să programați o revizie completă în următoarele 2 săptămâni.',
                  timestamp: '1 oră ago',
                  status: 'active',
                  category: 'Automotive'
                },
                {
                  agent: 'CONTABIX',
                  icon: '📊',
                  lastMessage: 'Analiza financiară pentru Q4 2024 este gata. Profitul net a crescut cu 15%.',
                  timestamp: '3 ore ago',
                  status: 'completed',
                  category: 'Contabilitate'
                },
                {
                  agent: 'LEGALIS AI',
                  icon: '⚖️',
                  lastMessage: 'Documentele pentru contractul de muncă au fost generate și trimise.',
                  timestamp: '5 ore ago',
                  status: 'completed',
                  category: 'Juridic'
                },
                {
                  agent: 'MEDITRIX AI',
                  icon: '🏥',
                  lastMessage: 'Programarea pentru consultația de rutină este confirmată pentru marți.',
                  timestamp: '1 zi ago',
                  status: 'pending',
                  category: 'Medical'
                }
              ].map((conversation, index) => (
                <div key={index} className="p-6 hover:bg-gray-800/30 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                      <span className="text-xl">{conversation.icon}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-medium">{conversation.agent}</h3>
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                            {conversation.category}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-1 mb-2">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          conversation.status === 'completed' 
                            ? 'bg-green-900/30 text-green-400'
                            : conversation.status === 'active'
                            ? 'bg-blue-900/30 text-blue-400'
                            : 'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {conversation.status === 'completed' ? 'Finalizată' : 
                           conversation.status === 'active' ? 'Activă' : 'În așteptare'}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          Vezi conversația →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ConversationsPage;