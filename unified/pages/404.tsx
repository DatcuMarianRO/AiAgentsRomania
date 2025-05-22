export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl shadow-blue-500/25">
            <span className="text-5xl animate-bounce">🤖</span>
          </div>
          
          <h1 className="text-8xl font-black text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            404
          </h1>
          
          <h2 className="text-3xl font-bold text-white mb-6">
            Pagina nu a fost găsită
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Se pare că agentul AI pe care îl căutați s-a pierdut în spațiul cibernetic. 
            Nu vă faceți griji, îl vom găsi!
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Înapoi
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
              Sau explorați{' '}
              <a href="/agents-caen" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">
                marketplace-ul nostru
              </a>
              {' '}pentru a găsi agentul AI perfect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}