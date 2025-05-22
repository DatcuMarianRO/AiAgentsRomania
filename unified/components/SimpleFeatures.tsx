'use client';

import React from 'react';
import { Zap, Shield, Rocket, Globe, HeadphonesIcon, Cpu } from 'lucide-react';

const SimpleFeatures: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Performanță Extremă",
      description: "Agenții noștri AI sunt optimizați pentru viteza și eficiența maximă, oferind răspunsuri în timp real.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Shield,
      title: "Securitate Enterprise",
      description: "Protecție avansată a datelor cu criptare end-to-end și conformitate GDPR completă.",
      color: "from-green-400 to-teal-400"
    },
    {
      icon: Rocket,
      title: "Integrare Rapidă",
      description: "API simplu și documentație completă pentru integrare în orice aplicație în câteva minute.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Globe,
      title: "Suport Multi-limbă",
      description: "Agenți AI care vorbesc perfect româna și alte 50+ de limbi pentru audiențe globale.",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: HeadphonesIcon,
      title: "Suport 24/7",
      description: "Echipa noastră de experți este disponibilă non-stop pentru a te ajuta cu orice problemă.",
      color: "from-indigo-400 to-purple-400"
    },
    {
      icon: Cpu,
      title: "AI de Ultimă Generație",
      description: "Folosim cele mai avansate modele AI: GPT-4, Claude, Gemini și modele custom dezvoltate intern.",
      color: "from-red-400 to-pink-400"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            De ce să alegi <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">AI Agents România</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Oferim cea mai avansată platformă de agenți AI din România, 
            cu tehnologie de vârf și suport specializat pentru orice tip de business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ feature: any; index: number }> = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-2">
      {/* Icon */}
      <div className="mb-6">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
          {feature.title}
        </h3>
        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
          {feature.description}
        </p>
      </div>

      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-20 blur-sm`}></div>
      </div>
    </div>
  );
};

export default SimpleFeatures;