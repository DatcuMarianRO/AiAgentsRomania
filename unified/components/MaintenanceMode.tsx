import React from 'react';
import { useAdmin } from '../contexts/AdminContext';

const MaintenanceMode: React.FC = () => {
  const { settings } = useAdmin();

  if (!settings.maintenanceMode) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8 bg-gray-900 rounded-2xl border border-yellow-500/50">
        <div className="text-6xl mb-6">🔧</div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Platformă în Mentenanță
        </h1>
        <p className="text-gray-400 mb-6">
          {settings.siteName} este momentan în mentenanță. Vom reveni în curând cu îmbunătățiri.
        </p>
        <div className="text-yellow-400 text-sm">
          Vă mulțumim pentru înțelegere!
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMode;