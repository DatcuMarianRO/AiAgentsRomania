'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: '🚀',
    title: 'Implementare Rapidă',
    description: 'Agenții AI gata de utilizare în mai puțin de 5 minute. Fără cod, fără complicații tehnice.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🧠',
    title: 'AI de Ultimă Generație',
    description: 'Powered by GPT-4, Claude 3 și alte modele avansate pentru rezultate excepționale.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '💰',
    title: 'Reduce Costurile cu 80%',
    description: 'Automatizează task-uri repetitive și economisește mii de euro lunar.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: '🔒',
    title: '100% Securizat',
    description: 'Date criptate, GDPR compliant, servere în UE. Confidențialitatea ta e prioritatea noastră.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: '📈',
    title: 'Scalabilitate Infinită',
    description: 'De la 10 la 10.000 de conversații zilnic, fără probleme de performanță.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: '🎯',
    title: 'Personalizare Completă',
    description: 'Antrenează agenții pe datele tale specifice pentru rezultate perfecte.',
    gradient: 'from-teal-500 to-cyan-500',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            De Ce Să Alegi{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Agents România
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Platforma noastră combină cele mai avansate tehnologii AI cu o 
            interfață simplă și intuitivă, special creată pentru afacerile din România.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="text-5xl mb-4">{feature.icon}</div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:${feature.gradient} transition-all duration-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Vrei să vezi cum funcționează? Testează gratuit orice agent AI.
          </p>
          <a
            href="/agents"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 group"
          >
            Vezi Toți Agenții
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}