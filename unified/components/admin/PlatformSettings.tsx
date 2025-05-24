import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';

const PlatformSettings: React.FC = () => {
  const { settings, updateSettings, savePlatformSettings, enableMaintenanceMode, disableMaintenanceMode } = useAdmin();
  const [activeSection, setActiveSection] = useState('general');
  const [saving, setSaving] = useState(false);

  const sections = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'security', name: 'Securitate', icon: '🔒' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'api', name: 'API', icon: '🔌' },
    { id: 'payments', name: 'Plăți', icon: '💳' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' }
  ];

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value });
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await savePlatformSettings();
      alert('✅ Setările au fost salvate cu succes!');
    } catch (error) {
      alert('❌ Eroare la salvarea setărilor. Încearcă din nou.');
    } finally {
      setSaving(false);
    }
  };

  const toggleMaintenanceMode = () => {
    if (settings.maintenanceMode) {
      disableMaintenanceMode();
    } else {
      enableMaintenanceMode();
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Numele Site-ului
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleSettingChange('siteName', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Descrierea Site-ului
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <h4 className="text-white font-medium">Mod Mentenanță</h4>
          <p className="text-gray-400 text-sm">Dezactivează accesul utilizatorilor</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <h4 className="text-white font-medium">Înregistrări Permise</h4>
          <p className="text-gray-400 text-sm">Permite utilizatorilor noi să se înregistreze</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.registrationEnabled}
            onChange={(e) => handleSettingChange('registrationEnabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Lungime Minimă Parolă
        </label>
        <input
          type="number"
          value={settings.passwordMinLength}
          onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
          min="6"
          max="20"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Timeout Sesiune (ore)
        </label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
          min="1"
          max="168"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Încercări Maxime de Login
        </label>
        <input
          type="number"
          value={settings.maxLoginAttempts}
          onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
          min="3"
          max="10"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <h4 className="text-white font-medium">Autentificare cu Doi Factori</h4>
          <p className="text-gray-400 text-sm">Necesită 2FA pentru conturi admin</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Plan Gratuit - Credits
          </label>
          <input
            type="number"
            value={settings.freePlanCredits}
            onChange={(e) => handleSettingChange('freePlanCredits', parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Plan Basic - Preț (RON)
          </label>
          <input
            type="number"
            value={settings.basicPlanPrice}
            onChange={(e) => handleSettingChange('basicPlanPrice', parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Plan Premium - Preț (RON)
          </label>
          <input
            type="number"
            value={settings.premiumPlanPrice}
            onChange={(e) => handleSettingChange('premiumPlanPrice', parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Plan Enterprise - Preț (RON)
          </label>
          <input
            type="number"
            value={settings.enterprisePlanPrice}
            onChange={(e) => handleSettingChange('enterprisePlanPrice', parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <h4 className="text-white font-medium">Stripe Activat</h4>
          <p className="text-gray-400 text-sm">Permite plăți prin Stripe</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.stripeEnabled}
            onChange={(e) => handleSettingChange('stripeEnabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderAISettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Provider Model AI Implicit
        </label>
        <select
          value={settings.defaultModelProvider}
          onChange={(e) => handleSettingChange('defaultModelProvider', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="openrouter">OpenRouter</option>
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="local">Model Local</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tokeni Maximi per Request
        </label>
        <input
          type="number"
          value={settings.maxTokensPerRequest}
          onChange={(e) => handleSettingChange('maxTokensPerRequest', parseInt(e.target.value))}
          min="100"
          max="8000"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Istoric Conversații (zile)
        </label>
        <input
          type="number"
          value={settings.conversationHistory}
          onChange={(e) => handleSettingChange('conversationHistory', parseInt(e.target.value))}
          min="7"
          max="365"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <h4 className="text-white font-medium">Moderare Conținut</h4>
          <p className="text-gray-400 text-sm">Filtrează conținutul nedorit automat</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enableContentModeration}
            onChange={(e) => handleSettingChange('enableContentModeration', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderSettings = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'email': return <div className="text-gray-400">Setări email în dezvoltare...</div>;
      case 'api': return <div className="text-gray-400">Setări API în dezvoltare...</div>;
      case 'payments': return renderPaymentSettings();
      case 'ai': return renderAISettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Setări Platformă</h2>
          <p className="text-gray-400">
            Configurează setările generale ale platformei AI Agents România
          </p>
        </div>
        <button 
          onClick={saveSettings}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          💾 Salvează Setările
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800 sticky top-4">
            <h3 className="text-lg font-semibold text-white mb-4">Categorii</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">
              {sections.find(s => s.id === activeSection)?.name} Settings
            </h3>
            {renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettings;