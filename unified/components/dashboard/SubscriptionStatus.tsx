import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const SubscriptionStatus: React.FC = () => {
  const { user } = useAuth();

  const planDetails = {
    free: {
      name: 'Plan Gratuit',
      icon: '🆓',
      color: 'from-gray-500 to-gray-600',
      features: ['3 conversații/zi', 'Agenți de bază', 'Suport email'],
      nextPlan: 'Basic',
    },
    basic: {
      name: 'Plan Basic',
      icon: '⭐',
      color: 'from-blue-500 to-blue-600',
      features: ['50 conversații/zi', 'Toți agenții', 'Suport prioritar'],
      nextPlan: 'Premium',
    },
    premium: {
      name: 'Plan Premium',
      icon: '💎',
      color: 'from-purple-500 to-purple-600',
      features: ['Conversații nelimitate', 'Analize avansate', 'API acces'],
      nextPlan: 'Enterprise',
    },
    enterprise: {
      name: 'Plan Enterprise',
      icon: '🏢',
      color: 'from-gold-500 to-gold-600',
      features: ['Soluții personalizate', 'Suport dedicat', 'Integrări avansate'],
      nextPlan: null,
    },
  };

  const currentPlan = planDetails[user?.subscription_tier as keyof typeof planDetails] || planDetails.free;

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6">Status Abonament</h2>
      
      {/* Current Plan */}
      <div className={`bg-gradient-to-r ${currentPlan.color} rounded-lg p-4 mb-6`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{currentPlan.icon}</span>
            <h3 className="text-white font-bold">{currentPlan.name}</h3>
          </div>
          <span className="text-white/80 text-sm">Activ</span>
        </div>
        
        <div className="space-y-2">
          {currentPlan.features.map((feature, index) => (
            <div key={index} className="flex items-center text-white/90 text-sm">
              <span className="mr-2">✓</span>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Conversații astăzi</span>
            <span className="text-white">23 / {user?.subscription_tier === 'free' ? '3' : user?.subscription_tier === 'basic' ? '50' : '∞'}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${currentPlan.color} h-2 rounded-full`}
              style={{ width: user?.subscription_tier === 'free' ? '100%' : '46%' }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Credits folosite</span>
            <span className="text-white">{1000 - (user?.credits_available || 0)} / 1000</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
              style={{ width: `${((1000 - (user?.credits_available || 0)) / 1000) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Upgrade Button */}
      {currentPlan.nextPlan && (
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-105">
          Upgrade la {currentPlan.nextPlan}
        </button>
      )}
    </div>
  );
};

export default SubscriptionStatus;