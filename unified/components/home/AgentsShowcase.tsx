'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const showcaseAgents = [
  {
    id: '1',
    name: 'Customer Support Pro',
    category: 'customer-service',
    description: 'Agent AI pentru suport clienți 24/7, răspunde instant la întrebări frecvente.',
    rating: 4.9,
    reviews: 234,
    price: { monthly: 99 },
    tags: ['Suport', 'Chat', 'Email'],
    icon: '🎧',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '2',
    name: 'Sales Assistant AI',
    category: 'sales',
    description: 'Califică lead-uri, programează întâlniri și crește vânzările automat.',
    rating: 4.8,
    reviews: 189,
    price: { monthly: 149 },
    tags: ['Vânzări', 'Lead Gen', 'CRM'],
    icon: '📈',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: '3',
    name: 'HR Recruiter Bot',
    category: 'hr',
    description: 'Screening CV-uri, interviuri inițiale și onboarding automatizat.',
    rating: 4.7,
    reviews: 156,
    price: { monthly: 129 },
    tags: ['HR', 'Recrutare', 'Interviuri'],
    icon: '👥',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: '4',
    name: 'Legal Document AI',
    category: 'legal',
    description: 'Analizează contracte, generează documente legale și oferă consultanță.',
    rating: 4.9,
    reviews: 98,
    price: { monthly: 199 },
    tags: ['Legal', 'Contracte', 'GDPR'],
    icon: '⚖️',
    gradient: 'from-orange-500 to-red-500',
  },
];

export function AgentsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-950/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Agenți AI{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Populari
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Descoperă cei mai apreciați agenți AI, gata să transforme modul 
            în care lucrează echipa ta.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {showcaseAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/agents/${agent.id}`} className="block group h-full">
                <div className="relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 h-full flex flex-col">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{agent.icon}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white font-medium">{agent.rating}</span>
                      <span className="text-gray-400">({agent.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:${agent.gradient}">
                    {agent.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {agent.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">
                        €{agent.price.monthly}
                      </span>
                      <span className="text-gray-400 text-sm">/lună</span>
                    </div>
                    <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Vezi detalii
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 group"
          >
            Vezi Toți Agenții (+50)
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}