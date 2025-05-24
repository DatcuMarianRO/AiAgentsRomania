import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  err?: Error;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">{statusCode}</h1>
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            {statusCode === 404
              ? 'Pagina nu a fost găsită'
              : statusCode === 500
              ? 'Eroare de server'
              : 'A apărut o eroare'}
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {statusCode === 404
              ? 'Pagina pe care o căutați nu există sau a fost mutată.'
              : 'Ne pare rău, a apărut o problemă tehnică. Încercați din nou mai târziu.'}
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors duration-300 mr-4"
          >
            ← Înapoi
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl text-white font-semibold transition-all duration-300 inline-block"
          >
            🏠 Acasă
          </a>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default Error;