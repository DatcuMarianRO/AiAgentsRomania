'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AgentCard } from './AgentCard';
import { AgentFilters } from './AgentFilters';
import { AgentSearch } from './AgentSearch';

// Mock data - în producție ar veni din API
const mockAgents = [
  {
    id: '1',
    name: 'Customer Support Pro',
    slug: 'customer-support-pro',
    category: 'customer-service',
    description: 'Agent AI pentru suport clienți 24/7, răspunde instant la întrebări frecvente și rezolvă probleme comune.',
    rating: 4.9,
    totalReviews: 234,
    totalUsers: 1250,
    pricing: { monthly: 99, yearly: 990 },
    tags: ['Suport', 'Chat', 'Email', 'Ticketing'],
    features: [
      { name: 'Răspunsuri instant', included: true },
      { name: 'Integrare CRM', included: true },
      { name: 'Multi-limbă', included: true },
      { name: 'Analiză sentimente', included: true },
    ],
    imageUrl: '/agents/support.jpg',
  },
  {
    id: '2',
    name: 'Sales Assistant AI',
    slug: 'sales-assistant',
    category: 'sales',
    description: 'Califică lead-uri, programează întâlniri și crește vânzările cu un asistent AI dedicat.',
    rating: 4.8,
    totalReviews: 189,
    totalUsers: 890,
    pricing: { monthly: 149, yearly: 1490 },
    tags: ['Vânzări', 'Lead Gen', 'CRM', 'Automatizare'],
    features: [
      { name: 'Calificare lead-uri', included: true },
      { name: 'Programare automată', included: true },
      { name: 'Follow-up inteligent', included: true },
      { name: 'Rapoarte vânzări', included: true },
    ],
    imageUrl: '/agents/sales.jpg',
  },
  // Adaugă mai mulți agenți aici...
];

const categories = [
  { id: 'all', name: 'Toate', icon: '🎯' },
  { id: 'customer-service', name: 'Suport Clienți', icon: '🎧' },
  { id: 'sales', name: 'Vânzări', icon: '📈' },
  { id: 'hr', name: 'Resurse Umane', icon: '👥' },
  { id: 'finance', name: 'Finanțe', icon: '💰' },
  { id: 'legal', name: 'Juridic', icon: '⚖️' },
  { id: 'marketing', name: 'Marketing', icon: '📱' },
  { id: 'healthcare', name: 'Sănătate', icon: '🏥' },
];

export function AgentsCatalog() {
  const [agents, setAgents] = useState(mockAgents);
  const [filteredAgents, setFilteredAgents] = useState(mockAgents);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(false);

  // Simulate API call
  useEffect(() => {
    // În producție, aici ar fi un call către API
    setLoading(true);
    setTimeout(() => {
      setAgents(mockAgents);
      setLoading(false);
    }, 500);
  }, []);

  // Filter agents
  useEffect(() => {
    let filtered = [...agents];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(agent => agent.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Price filter
    filtered = filtered.filter(agent => {
      const monthlyPrice = agent.pricing.monthly || 0;
      return monthlyPrice >= priceRange[0] && monthlyPrice <= priceRange[1];
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'users':
          return b.totalUsers - a.totalUsers;
        case 'price-low':
          return (a.pricing.monthly || 0) - (b.pricing.monthly || 0);
        case 'price-high':
          return (b.pricing.monthly || 0) - (a.pricing.monthly || 0);
        default:
          return 0;
      }
    });

    setFilteredAgents(filtered);
  }, [agents, selectedCategory, searchQuery, priceRange, sortBy]);

  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <AgentSearch
            value={searchQuery}
            onChange={setSearchQuery}
            resultsCount={filteredAgents.length}
          />
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <AgentFilters
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Agents Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse" />
                ))}
              </div>
            ) : filteredAgents.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <AgentCard agent={agent} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nu am găsit agenți
                </h3>
                <p className="text-gray-400">
                  Încearcă să modifici filtrele sau criteriile de căutare
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}