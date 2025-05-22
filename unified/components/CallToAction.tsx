'use client';

import React from 'react';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';

const CallToAction: React.FC = () => {

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-40 h-40 border border-blue-500 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-purple-500 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-2/3 left-1/2 w-24 h-24 border border-cyan-500 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div>
          
          {/* Main CTA Content */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Revoluționează-ți <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Business-ul</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Alătură-te celor peste 1000 de companii care au ales AI Agents România pentru transformarea digitală completă.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Începe cu o consultație gratuită și descoperă cum agenții noștri AI pot automatiza procesele tale business în mai puțin de 24 de ore.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-4">
                <Rocket className="w-6 h-6" />
                Începe Acum - Gratuit
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </button>

            <button className="group px-10 py-5 border-2 border-gray-600 hover:border-blue-400 rounded-full text-white font-bold text-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-4">
                <Sparkles className="w-6 h-6" />
                Consultație Gratuită
              </span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2">
                Implementare în 24h
              </div>
              <div className="text-gray-400">
                Setup rapid și funcțional
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                ROI în 30 de zile
              </div>
              <div className="text-gray-400">
                Returnul investiției garantat
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">
                Suport 24/7
              </div>
              <div className="text-gray-400">
                Echipa de experți disponibilă
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              🔒 Securitate Enterprise • 🇷🇴 Dezvoltat în România • 🌍 Folosit Global
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default CallToAction;