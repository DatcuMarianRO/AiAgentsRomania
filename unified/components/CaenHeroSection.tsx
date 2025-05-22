import React from 'react';
import { CaenCategory } from '../types/caen';

interface CaenHeroSectionProps {
  totalCaenCodes: number;
  totalAgents: number;
  categories: (CaenCategory & { agentCount: number })[];
}

const CaenHeroSection: React.FC<CaenHeroSectionProps> = ({
  totalCaenCodes,
  totalAgents,
  categories
}) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main Title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none mb-4">
            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Agents
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              pe Coduri CAEN
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Descoperă agenții AI specializați pentru fiecare industrie din România.
            <br />
            <span className="text-blue-400 font-semibold">Organizați perfect pe coduri CAEN</span> pentru maximă relevanță.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-110">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
              {totalCaenCodes}
            </div>
            <div className="text-gray-400 font-medium mt-1 group-hover:text-white transition-colors duration-300">
              Coduri CAEN
            </div>
          </div>
          
          <div className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-110">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
              {totalAgents}
            </div>
            <div className="text-gray-400 font-medium mt-1 group-hover:text-white transition-colors duration-300">
              Agenți AI
            </div>
          </div>
          
          <div className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-110">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
              {categories.length}
            </div>
            <div className="text-gray-400 font-medium mt-1 group-hover:text-white transition-colors duration-300">
              Industrii
            </div>
          </div>
          
          <div className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-110">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
              100%
            </div>
            <div className="text-gray-400 font-medium mt-1 group-hover:text-white transition-colors duration-300">
              Compatibilitate
            </div>
          </div>
        </div>

        {/* Categories Preview */}
        <div className="max-w-6xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-bold text-white mb-8">
            Explorează industriile disponibile
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category, index) => (
              <div
                key={category.id}
                className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      backgroundColor: category.color + '20',
                      color: category.color 
                    }}
                  >
                    {category.icon}
                  </div>
                  
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {category.name}
                  </h3>
                  
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {category.agentCount} agenți
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 animate-fade-in" style={{animationDelay: '0.9s'}}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1">
              🚀 Explorează agenții
            </button>
            
            <button className="px-8 py-4 border-2 border-gray-600 hover:border-blue-400 rounded-full text-white font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 hover:bg-blue-400/10">
              📋 Vezi toate codurile CAEN
            </button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            Fiecare agent este verificat și optimizat pentru industria ta specifică
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-blue-400 transition-colors duration-300">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default CaenHeroSection;