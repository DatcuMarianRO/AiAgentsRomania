import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - AI Agents Romania',
  description: 'Sign in or create an account on AI Agents Romania',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">AI Agents Romania</span>
        </Link>
      </div>
      <main className="flex-1">
        <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}