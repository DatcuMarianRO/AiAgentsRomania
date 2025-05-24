import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Se redirecționează către dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{isLogin ? 'Autentificare' : 'Înregistrare'} | AI Agents România</title>
        <meta name="description" content={isLogin ? 'Conectează-te la contul tău AI Agents România' : 'Creează-ți un cont nou pe AI Agents România'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Logo Header */}
        <div className="absolute top-8 left-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Agents România</h1>
              <p className="text-xs text-gray-400">Powered by Invent Evolution</p>
            </div>
          </button>
        </div>

        {/* Auth Form Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Mode Toggle */}
          <div className="flex bg-gray-800/50 rounded-lg p-1 mb-8 backdrop-blur-sm border border-gray-700">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Autentificare
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Înregistrare
            </button>
          </div>

          {/* Auth Forms */}
          <div className="transition-all duration-300 ease-in-out">
            {isLogin ? (
              <LoginForm onToggleMode={toggleMode} />
            ) : (
              <RegisterForm onToggleMode={toggleMode} />
            )}
          </div>

          {/* Features Preview */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Alătură-te comunității de agenți AI din România
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <div className="text-2xl mb-2">🏭</div>
                <p className="text-xs text-gray-400">15+ Domenii CAEN</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <div className="text-2xl mb-2">🤖</div>
                <p className="text-xs text-gray-400">AI Specializați</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-xs text-gray-400">CRM Complet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-center text-gray-500 text-xs">
          <p>© 2025 AI Agents România. Powered by Invent Evolution</p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;