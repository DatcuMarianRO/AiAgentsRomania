export default function Custom500() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl shadow-red-500/25">
            <span className="text-5xl animate-bounce">⚠️</span>
          </div>
          
          <h1 className="text-8xl font-black text-white mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            500
          </h1>
          
          <h2 className="text-3xl font-bold text-white mb-6">
            Eroare de server
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Agenții noștri AI lucrează din greu pentru a rezolva această problemă. 
            Vă rugăm să încercați din nou în câteva momente.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reîncarcă
            </button>
            
            <a
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 group shadow-2xl shadow-blue-500/25"
            >
              <span>🏠</span>
              Acasă
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Persistă problema? Contactați-ne pe{' '}
              <a href="https://wa.me/40744859100" className="text-green-400 hover:text-green-300 transition-colors duration-300 font-semibold">
                WhatsApp
              </a>
              {' '}sau prin{' '}
              <a href="mailto:contact@ai-agents-romania.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">
                email
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}