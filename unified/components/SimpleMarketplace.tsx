'use client';

import React from 'react';
import { Star, Users, Clock, ArrowRight, Bot, Brain, MessageSquare, Database, Image, Code } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  users: string;
  icon: any;
  tags: string[];
  color: string;
}

const SimpleMarketplace: React.FC = () => {
  const agents: Agent[] = [
    {
      id: "1",
      name: "ChatBot Pro",
      category: "Conversational AI",
      description: "Agent conversațional avansat pentru customer support și asistență virtuală 24/7. Înțelege contextul și oferă răspunsuri naturale.",
      price: "€299/lună",
      rating: 4.9,
      users: "2.5K",
      icon: MessageSquare,
      tags: ["GPT-4", "Română", "Multi-limbă"],
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: "2",
      name: "DataMiner AI",
      category: "Data Analysis",
      description: "Analizează volume mari de date și generează insights acționabile. Perfect pentru business intelligence și rapoarte automate.",
      price: "€499/lună",
      rating: 4.8,
      users: "1.8K",
      icon: Database,
      tags: ["Machine Learning", "Big Data", "Analytics"],
      color: "from-purple-600 to-pink-600"
    },
    {
      id: "3",
      name: "CodeGenius",
      category: "Development",
      description: "Asistent AI pentru programatori. Generează cod, detectează bug-uri și optimizează performanța aplicațiilor tale.",
      price: "€399/lună",
      rating: 4.7,
      users: "3.2K",
      icon: Code,
      tags: ["Python", "JavaScript", "React"],
      color: "from-green-600 to-teal-600"
    },
    {
      id: "4",
      name: "VisualCreator",
      category: "Creative AI",
      description: "Generează imagini, logo-uri și design-uri profesionale în câteva secunde. Ideal pentru marketing și branding.",
      price: "€199/lună",
      rating: 4.6,
      users: "4.1K",
      icon: Image,
      tags: ["DALL-E", "Midjourney", "Design"],
      color: "from-orange-600 to-red-600"
    },
    {
      id: "5",
      name: "BrainStormer",
      category: "Strategic AI",
      description: "Agent strategic pentru planificare business, analiză de piață și generare de idei inovatoare pentru compania ta.",
      price: "€699/lună",
      rating: 4.9,
      users: "1.2K",
      icon: Brain,
      tags: ["Strategy", "Business", "Innovation"],
      color: "from-indigo-600 to-purple-600"
    },
    {
      id: "6",
      name: "AutoBot",
      category: "Automation",
      description: "Automatizează task-urile repetitive și optimizează workflow-urile. Conectează aplicații și servicii diverse.",
      price: "€349/lună",
      rating: 4.8,
      users: "2.9K",
      icon: Bot,
      tags: ["Zapier", "API", "Workflow"],
      color: "from-cyan-600 to-blue-600"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Agenții AI <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Premium</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descoperă cea mai avansată colecție de agenți AI din România. 
            Fiecare agent este optimizat pentru performanță maximă și rezultate excepționale.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
            <span className="flex items-center gap-3">
              Vezi Toți Agenții AI
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => {
  const Icon = agent.icon;

  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-2">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${agent.color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{agent.price}</div>
          <div className="text-sm text-gray-400">pe lună</div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
          {agent.name}
        </h3>
        <div className="text-sm text-blue-400 font-medium mb-3">{agent.category}</div>
        <p className="text-gray-300 text-sm leading-relaxed">{agent.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {agent.tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-medium">{agent.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">{agent.users}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-400">
          <Clock className="w-4 h-4" />
          <span className="text-xs">Live</span>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${agent.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
};

export default SimpleMarketplace;