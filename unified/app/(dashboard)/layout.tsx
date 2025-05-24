import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  CpuChipIcon, 
  CreditCardIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Check authentication
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if (!token) {
    redirect('/login');
  }

  // Fetch user data
  const response = await fetch('http://localhost:4000/api/auth/me', {
    headers: {
      'Cookie': `token=${token.value}`
    }
  });

  if (!response.ok) {
    redirect('/login');
  }

  const { data: user } = await response.json();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Agenții Mei', href: '/dashboard/agents', icon: CpuChipIcon },
    { name: 'Abonament', href: '/dashboard/billing', icon: CreditCardIcon },
    { name: 'Setări', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];

  const adminNavigation = [
    { name: 'Utilizatori', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Toți Agenții', href: '/admin/agents', icon: CpuChipIcon },
    { name: 'Analiză', href: '/admin/analytics', icon: ChartBarIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-6 py-4 border-b border-gray-800">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-white">AI</span>
                <span className="text-blue-500">Agents</span>
              </Link>
            </div>

            {/* User info */}
            <div className="px-6 py-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {user.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.fullName || user.email}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.role === 'ADMIN' ? 'Administrator' : user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Utilizator'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}

              {/* Admin section */}
              {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                <>
                  <div className="pt-4 mt-4 border-t border-gray-800">
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Administrare
                    </p>
                  </div>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-gray-800">
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                  Deconectare
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-gray-900 border-b border-gray-800">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">
                  {user.fullName ? `Bun venit, ${user.fullName}!` : 'Dashboard'}
                </h1>
                <button className="relative p-2 text-gray-400 hover:text-white">
                  <BellIcon className="w-6 h-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-950">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}