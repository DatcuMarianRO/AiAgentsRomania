import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';

export const metadata = {
  title: 'Înregistrare - AI Agents România',
  description: 'Creează un cont gratuit și începe să folosești agenți AI',
};

export default function RegisterPage() {
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
        <h2 className="text-3xl font-bold text-white mb-2">Creează cont gratuit</h2>
        <p className="text-gray-400">
          Alătură-te celor 500+ companii care folosesc AI
        </p>
      </div>

      <RegisterForm />

      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Ai deja cont?{' '}
          <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
            Conectează-te
          </Link>
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Prin crearea contului, ești de acord cu{' '}
        <Link href="/terms" className="text-blue-400 hover:text-blue-300">
          Termenii și Condițiile
        </Link>{' '}
        și{' '}
        <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
          Politica de Confidențialitate
        </Link>
      </p>
    </>
  );
}