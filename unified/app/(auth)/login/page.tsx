import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export const metadata = {
  title: 'Conectare - AI Agents România',
  description: 'Conectează-te la contul tău AI Agents România',
};

export default function LoginPage() {
  return (
    <>
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">AI</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Agents România
            </h1>
          </div>
        </Link>
        <h2 className="text-3xl font-bold text-white mb-2">Bine ai revenit!</h2>
        <p className="text-gray-400">
          Conectează-te pentru a accesa agenții tăi AI
        </p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Nu ai cont?{' '}
          <Link href="/auth/register" className="text-blue-400 hover:text-blue-300">
            Creează unul acum
          </Link>
        </p>
        <Link
          href="/auth/reset-password"
          className="block mt-4 text-sm text-gray-400 hover:text-gray-300"
        >
          Ai uitat parola?
        </Link>
      </div>
    </>
  );
}