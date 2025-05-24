import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatsOverview from '../components/dashboard/StatsOverview';
import AgentActivityFeed from '../components/dashboard/AgentActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';
import SubscriptionStatus from '../components/dashboard/SubscriptionStatus';

const DashboardPage: React.FC = () => {
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
          <p>Se încarcă dashboard-ul...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting to auth
  }

  return (
    <>
      <Head>
        <title>Dashboard | AI Agents România</title>
        <meta name="description" content="Dashboard-ul tău personal pentru gestionarea agenților AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Bun venit, {user.first_name}! 👋
                </h1>
                <p className="text-gray-400">
                  Gestionează-ți agenții AI și monitorizează performanțele din dashboard-ul tău personal.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl">
                  🤖
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsOverview />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quick Actions & Subscription */}
            <div className="space-y-8">
              <QuickActions />
              <SubscriptionStatus />
            </div>

            {/* Right Column - Activity Feed */}
            <div className="lg:col-span-2">
              <AgentActivityFeed />
            </div>
          </div>

          {/* Recent Agents Section */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Agenții Recomandați</h2>
              <button 
                onClick={() => router.push('/agents-caen')}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Vezi toți agenții →
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample recommended agents */}
              {[
                { name: 'SINTRA AI', icon: '🍽️', category: 'HORECA', description: 'Rezervări restaurante' },
                { name: 'MECHANOX AI', icon: '🔧', category: 'Automotive', description: 'Service auto intelligent' },
                { name: 'CONTABIX', icon: '📊', category: 'Contabilitate', description: 'Gestiune financiară' },
              ].map((agent, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer group">
                  <div className="text-3xl mb-3">{agent.icon}</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-blue-400 mb-2">{agent.category}</p>
                  <p className="text-gray-400 text-sm">{agent.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;