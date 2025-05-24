import { cookies } from 'next/headers';
import { 
  UserIcon,
  EnvelopeIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

async function getUserData(token: string) {
  const response = await fetch('http://localhost:4000/api/auth/me', {
    headers: { 'Cookie': `token=${token}` }
  });

  if (!response.ok) {
    return null;
  }

  const { data } = await response.json();
  return data;
}

export default async function SettingsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const user = await getUserData(token!.value);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Setări cont</h1>
        <p className="text-gray-400 mt-1">Gestionează informațiile profilului și preferințele</p>
      </div>

      {/* Profile settings */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
          <UserIcon className="w-5 h-5 mr-2" />
          Informații profil
        </h2>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nume complet
              </label>
              <input
                type="text"
                defaultValue={user?.fullName || ''}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Ion Popescu"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="ion@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Companie
            </label>
            <input
              type="text"
              defaultValue={user?.company || ''}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Numele companiei"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              rows={3}
              defaultValue={user?.bio || ''}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Spune-ne câte ceva despre tine..."
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Salvează modificările
          </button>
        </form>
      </div>

      {/* Security settings */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
          <ShieldCheckIcon className="w-5 h-5 mr-2" />
          Securitate
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Schimbă parola</h3>
            <form className="space-y-3">
              <input
                type="password"
                placeholder="Parola curentă"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Parola nouă"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Confirmă parola nouă"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Actualizează parola
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Autentificare în doi pași</h3>
            <p className="text-gray-400 text-sm mb-3">
              Adaugă un nivel suplimentar de securitate contului tău.
            </p>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
              Activează 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Notification preferences */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
          <BellIcon className="w-5 h-5 mr-2" />
          Notificări
        </h2>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Notificări email</p>
              <p className="text-gray-400 text-sm">Primește actualizări despre activitatea agenților</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Newsletter</p>
              <p className="text-gray-400 text-sm">Știri și actualizări despre platformă</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Alerte conversații</p>
              <p className="text-gray-400 text-sm">Notificări pentru conversații importante</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-gray-900 rounded-xl border border-red-900 p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Zonă periculoasă</h2>
        <p className="text-gray-400 text-sm mb-4">
          Odată ce ștergi contul, nu există cale de întoarcere. Te rugăm să fii sigur.
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
          <TrashIcon className="w-4 h-4 mr-2" />
          Șterge cont
        </button>
      </div>
    </div>
  );
}