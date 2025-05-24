import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const AnalyticsPage: React.FC = () => {
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
          <p>Se încarcă analizele...</p>
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
        <title>Analiză | AI Agents România</title>
        <meta name="description" content="Analizează performanțele și statisticile agenților tăi AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-8 border border-gray-800">
            <h1 className="text-3xl font-bold text-white mb-2">
              📈 Analiză și Rapoarte
            </h1>
            <p className="text-gray-400">
              Monitorizează performanțele agenților AI și urmărește tendințele de utilizare.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">📊</span>
                <span className="text-green-400 text-sm">+15.3%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">94.2%</h3>
              <p className="text-gray-400 text-sm">Rata de success</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">⚡</span>
                <span className="text-blue-400 text-sm">-0.2s</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1.8s</h3>
              <p className="text-gray-400 text-sm">Timp răspuns mediu</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🎯</span>
                <span className="text-purple-400 text-sm">+8.7%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">87.5%</h3>
              <p className="text-gray-400 text-sm">Satisfacție utilizatori</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">💰</span>
                <span className="text-green-400 text-sm">+12.1%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">2,847</h3>
              <p className="text-gray-400 text-sm">Credits economisiți</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Usage Over Time */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Utilizare în timp</h2>
              <div className="h-64 bg-gray-800/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <span className="text-4xl block mb-2">📈</span>
                  <p>Graficul de utilizare</p>
                  <p className="text-sm">Se încarcă...</p>
                </div>
              </div>
            </div>

            {/* Agent Performance */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Performanță agenți</h2>
              <div className="space-y-4">
                {[
                  { agent: 'SINTRA AI', performance: 96, color: 'bg-green-500', icon: '🍽️' },
                  { agent: 'MECHANOX AI', performance: 94, color: 'bg-blue-500', icon: '🔧' },
                  { agent: 'CONTABIX', performance: 92, color: 'bg-purple-500', icon: '📊' },
                  { agent: 'LEGALIS AI', performance: 89, color: 'bg-indigo-500', icon: '⚖️' },
                  { agent: 'MEDITRIX AI', performance: 91, color: 'bg-emerald-500', icon: '🏥' }
                ].map((agent, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-xl">{agent.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white">{agent.agent}</span>
                        <span className="text-gray-400">{agent.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`${agent.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${agent.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Reports */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Rapoarte Detaliate</h2>
            </div>
            
            <div className="divide-y divide-gray-800">
              {[
                {
                  title: 'Raport Lunar - Mai 2025',
                  type: 'Performanță Generală',
                  date: '22 Mai 2025',
                  status: 'Gata',
                  icon: '📋'
                },
                {
                  title: 'Analiză Conversații Q1 2025',
                  type: 'Analiză Detaliată',
                  date: '15 Mai 2025',
                  status: 'Gata',
                  icon: '💬'
                },
                {
                  title: 'Utilizare Credits - Aprilie 2025',
                  type: 'Raport Financiar',
                  date: '30 Aprilie 2025',
                  status: 'Gata',
                  icon: '💰'
                },
                {
                  title: 'Eficiență Agenți - Q1 2025',
                  type: 'Benchmarking',
                  date: '31 Martie 2025',
                  status: 'Arhivat',
                  icon: '🏆'
                }
              ].map((report, index) => (
                <div key={index} className="p-6 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                        <span className="text-xl">{report.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{report.title}</h3>
                        <p className="text-gray-400 text-sm">{report.type} • {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Gata' 
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {report.status}
                      </span>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        Descarcă →
                      </button>
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

export default AnalyticsPage;