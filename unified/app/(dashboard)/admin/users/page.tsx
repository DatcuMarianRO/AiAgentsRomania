import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon
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

async function getUsers(token: string) {
  const response = await fetch('http://localhost:4000/api/admin/users', {
    headers: { 'Cookie': `token=${token}` }
  });

  if (!response.ok) return [];

  const { data } = await response.json();
  return data;
}

export default async function AdminUsersPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const admin = await checkAdminAccess(token!.value);
  if (!admin) {
    redirect('/dashboard');
  }

  const users = await getUsers(token!.value);

  const roleColors = {
    'USER': 'bg-gray-500/10 text-gray-500',
    'ADMIN': 'bg-blue-500/10 text-blue-500',
    'SUPER_ADMIN': 'bg-purple-500/10 text-purple-500'
  };

  const statusColors = {
    'ACTIVE': 'bg-green-500/10 text-green-500',
    'SUSPENDED': 'bg-red-500/10 text-red-500',
    'DELETED': 'bg-gray-500/10 text-gray-500'
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestionare Utilizatori</h1>
          <p className="text-gray-400 mt-1">Administrează utilizatorii platformei</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">
            Total: {users.length} utilizatori
          </span>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Caută utilizatori..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
            <option value="">Toate rolurile</option>
            <option value="USER">Utilizator</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
            <option value="">Toate statusurile</option>
            <option value="ACTIVE">Activ</option>
            <option value="SUSPENDED">Suspendat</option>
            <option value="DELETED">Șters</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Utilizator</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Agenți</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Înregistrat</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {user.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-white font-medium">{user.fullName || 'Fără nume'}</p>
                        <p className="text-gray-400 text-sm">{user.company || 'Fără companie'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[user.status]}`}>
                      {user.status === 'ACTIVE' ? 'Activ' : user.status === 'SUSPENDED' ? 'Suspendat' : 'Șters'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user._count?.userAgents || 0}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('ro-RO')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      {admin.role === 'SUPER_ADMIN' && user.role !== 'SUPER_ADMIN' && (
                        <>
                          <button className="p-1 text-gray-400 hover:text-purple-500 transition-colors">
                            <ShieldCheckIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}