import React from 'react';

const InventEvolutionShowcase: React.FC = () => {
  const showcaseAgents = [
    {
      id: 'sintra-ai',
      name: 'SINTRA AI',
      industry: 'HORECA',
      icon: '🍽️',
      gradient: 'from-orange-500 to-red-500',
      results: '+30% rezervări, -50% timp așteptare',
      description: 'Asistent AI conversațional pentru rezervări restaurante',
      caenCode: '5610'
    },
    {
      id: 'mechanox-ai', 
      name: 'MECHANOX AI',
      industry: 'Automotive',
      icon: '🔧',
      gradient: 'from-blue-500 to-indigo-500',
      results: '-60% apeluri telefonice, +40% transparență',
      description: 'AI pentru service-uri auto și estimări',
      caenCode: '4520'
    },
    {
      id: 'contabix',
      name: 'CONTABIX',
      industry: 'Contabilitate',
      icon: '📊',
      gradient: 'from-green-500 to-emerald-500',
      results: '-80% timp procesare, 100% acuratețe',
      description: 'Automatizare contabilă și rapoarte fiscale',
      caenCode: '6920'
    },
    {
      id: 'media-ai',
      name: 'MEDIA AI', 
      industry: 'Sănătate',
      icon: '🩺',
      gradient: 'from-purple-500 to-pink-500',
      results: '+50% eficiență triaj, -30% timp programări',
      description: 'AI pentru clinici și triaj pacienți',
      caenCode: '8621'
    },
    {
      id: 'logis-ai',
      name: 'LOGIS-AI',
      industry: 'Logistică',
      icon: '🚛',
      gradient: 'from-gray-600 to-gray-800',
      results: '-25% costuri transport, +35% punctualitate',
      description: 'Optimizare rute și management flotă',
      caenCode: '4941'
    },
    {
      id: 'influai',
      name: 'INFLUAI',
      industry: 'Marketing',
      icon: '📺',
      gradient: 'from-pink-500 to-violet-500',
      results: '+200% engagement, -70% timp producție',
      description: 'Marketing automatizat și conținut AI',
      caenCode: '7311'
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Floating tech elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-400 font-medium mb-8">
            🚀 Portfolio complet INVENT EVOLUTION
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-8">
            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Roboți AI Specializați
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              Pentru Fiecare Industrie
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            În 2025, performanța unei afaceri este determinată de nivelul de automatizare și inteligență aplicat. 
            <br />
            <span className="text-blue-400 font-semibold">INVENT EVOLUTION</span> creează roboți AI specializați pentru fiecare industrie.
          </p>

          {/* Global Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                15+
              </div>
              <div className="text-gray-400 font-medium mt-2">Roboți AI Specializați</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                12
              </div>
              <div className="text-gray-400 font-medium mt-2">Industrii Acoperite</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                20+
              </div>
              <div className="text-gray-400 font-medium mt-2">Coduri CAEN</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                2025
              </div>
              <div className="text-gray-400 font-medium mt-2">Tehnologie Avansată</div>
            </div>
          </div>
        </div>

        {/* Featured Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {showcaseAgents.map((agent, index) => (
            <div
              key={agent.id}
              className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Industry Badge */}
              <div className="absolute -top-4 left-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${agent.gradient} text-white rounded-full text-sm font-bold shadow-lg`}>
                  {agent.icon} {agent.industry}
                </span>
              </div>

              {/* Agent Header */}
              <div className="pt-4 mb-6">
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {agent.name}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {agent.description}
                </p>
                <div className="text-sm text-gray-500">
                  CAEN {agent.caenCode}
                </div>
              </div>

              {/* Results Highlight */}
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 mb-6">
                <div className="text-sm font-semibold text-green-400 mb-2">📈 Rezultate dovedite</div>
                <div className="text-white font-bold">{agent.results}</div>
              </div>

              {/* Action Button */}
              <a
                href={`/agent/${agent.id}`}
                className="block w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium text-center transition-all duration-300 transform hover:scale-105"
              >
                🔍 Vezi detalii complete
              </a>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${agent.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Company Credentials */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Company Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl">🏢</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">INVENT EVOLUTION SRL</h2>
                  <p className="text-blue-400 font-semibold">Liderul în automatizare AI din România</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                Partenerul tău de încredere pentru digitalizare, automatizare și inovație AI. 
                Transformăm viitorul business-urilor prin inteligența artificială de ultimă generație, 
                specializată pe fiecare industrie din România.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <span className="text-gray-300">Iași, România</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <span className="text-gray-300">0744 859 100</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <span className="text-gray-300">office@inventevolution.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌐</span>
                  </div>
                  <span className="text-gray-300">www.inventevolution.com</span>
                </div>
              </div>
            </div>

            {/* Right - Key Differentiators */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">🎯 De ce aleg companiile INVENT EVOLUTION?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-xl">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Specializare pe industrie</h4>
                    <p className="text-gray-300 text-sm">Fiecare robot AI este personalizat pentru specificul industriei tale</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-xl">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Implementare rapidă</h4>
                    <p className="text-gray-300 text-sm">Setup în maximum 24h cu suport tehnic complet</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-xl">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">ROI garantat</h4>
                    <p className="text-gray-300 text-sm">Rezultate măsurabile în primele 30 de zile</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-xl">
                  <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🛡️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Conformitate GDPR</h4>
                    <p className="text-gray-300 text-sm">Securitate enterprise și protecția datelor garantată</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Gata să-ți <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">automatizezi business-ul</span>?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Contactează echipa noastră pentru o consultație gratuită și descoperă cum AI poate transforma compania ta.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/agents-caen"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1"
            >
              🏭 Explorează Marketplace-ul CAEN
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-600 hover:border-blue-400 rounded-full text-white font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 hover:bg-blue-400/10"
            >
              📞 Consultație Gratuită
            </a>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            🇷🇴 Produs 100% românesc • ⚡ Setup în 24h • 🛡️ GDPR Compliant
          </p>
        </div>
      </div>
    </section>
  );
};

export default InventEvolutionShowcase;