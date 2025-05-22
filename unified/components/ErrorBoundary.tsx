import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Ups! Ceva nu a mers bine
              </h1>
              <p className="text-gray-400 mb-8">
                A apărut o eroare neașteptată. Ne pare rău pentru neplăceri.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                  <p className="text-red-400 text-sm mb-2 font-mono">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-gray-400 text-xs">
                      <summary className="cursor-pointer hover:text-gray-300">
                        Stack trace
                      </summary>
                      <pre className="mt-2 overflow-auto max-h-40">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg 
                           transition-all duration-200 hover:scale-105"
                >
                  Reîncearcă
                </button>
                <Link href="/">
                  <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg 
                                   transition-all duration-200 hover:scale-105">
                    Acasă
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}