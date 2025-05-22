'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const SimpleHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-7xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none text-white mb-8">
            AI Agents România
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto">
          
          {/* Main Title */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AI Agents
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                România
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Marketplace-ul premium pentru agenți AI de ultimă generație
              <br />
              <span className="text-blue-400 font-semibold">Invent Evolution SRL</span> - 
              Revoluționăm viitorul cu inteligența artificială
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '1s' }}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Explorează Agenții AI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="group px-8 py-4 border-2 border-gray-600 hover:border-blue-400 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-3">
                <Play className="w-5 h-5" />
                Vezi Demo Live
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1.5s' }}>
            {[
              { value: "500+", label: "AI Agents" },
              { value: "25K+", label: "Utilizatori Activi" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Suport Tehnic" }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium mt-1 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-transparent to-gray-950/50 pointer-events-none"></div>
    </section>
  );
};

export default SimpleHero;