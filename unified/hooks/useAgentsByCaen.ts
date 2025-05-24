import { useState, useEffect, useMemo } from 'react';
import { CaenCode, AgentByCaen, CaenFilter, CaenSearchResult, CaenCategory } from '../types/caen';
import { COMPREHENSIVE_CAEN_DATA } from '../data/inventEvolutionAgents';

export const useAgentsByCaen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCaenCode, setSelectedCaenCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<CaenFilter>({});

  // Get all CAEN codes
  const caenCodes = useMemo(() => COMPREHENSIVE_CAEN_DATA.caenCodes, []);

  // Get all agents
  const allAgents = useMemo(() => COMPREHENSIVE_CAEN_DATA.agents, []);

  // Get filtered agents based on selected CAEN code and filters
  const filteredAgents = useMemo(() => {
    let filtered = allAgents;

    // Filter by CAEN code if selected
    if (selectedCaenCode) {
      filtered = filtered.filter(agent => agent.caenCode === selectedCaenCode);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(agent => 
        agent.name.toLowerCase().includes(term) ||
        agent.description.toLowerCase().includes(term) ||
        agent.useCase.toLowerCase().includes(term) ||
        agent.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Apply filters
    if (activeFilters.category) {
      filtered = filtered.filter(agent => agent.category === activeFilters.category);
    }

    if (activeFilters.agentType) {
      filtered = filtered.filter(agent => agent.type === activeFilters.agentType);
    }

    if (activeFilters.pricing) {
      filtered = filtered.filter(agent => agent.pricing.type === activeFilters.pricing);
    }

    if (activeFilters.isPopular) {
      filtered = filtered.filter(agent => agent.isPopular);
    }

    if (activeFilters.isRecommended) {
      filtered = filtered.filter(agent => agent.isRecommended);
    }

    if (activeFilters.isPremium) {
      filtered = filtered.filter(agent => agent.isPremium);
    }

    if (activeFilters.licenseAvailable) {
      filtered = filtered.filter(agent => agent.licenseAvailable);
    }

    return filtered;
  }, [allAgents, selectedCaenCode, searchTerm, activeFilters]);

  // Get CAEN code by code
  const getCaenCodeDetails = (code: string): CaenCode | undefined => {
    return caenCodes.find(caen => caen.code === code);
  };

  // Get agents for specific CAEN code
  const getAgentsByCaenCode = (code: string): AgentByCaen[] => {
    return allAgents.filter(agent => agent.caenCode === code);
  };

  // Search functionality
  const searchAgentsAndCaen = (term: string): CaenSearchResult => {
    const filteredCaenCodes = caenCodes.filter(caen =>
      caen.code.includes(term) ||
      caen.title.toLowerCase().includes(term.toLowerCase()) ||
      caen.description.toLowerCase().includes(term.toLowerCase())
    );

    const filteredAgents = allAgents.filter(agent =>
      agent.name.toLowerCase().includes(term.toLowerCase()) ||
      agent.description.toLowerCase().includes(term.toLowerCase()) ||
      agent.useCase.toLowerCase().includes(term.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );

    return {
      caenCodes: filteredCaenCodes,
      agents: filteredAgents,
      totalResults: filteredCaenCodes.length + filteredAgents.length,
      searchTerm: term,
      appliedFilters: activeFilters
    };
  };

  // Update filters
  const updateFilters = (newFilters: Partial<CaenFilter>) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear filters
  const clearFilters = () => {
    setActiveFilters({});
  };

  // Select CAEN code
  const selectCaenCode = (code: string | null) => {
    setSelectedCaenCode(code);
  };

  // Get popular agents
  const getPopularAgents = (): AgentByCaen[] => {
    return allAgents
      .filter(agent => agent.isPopular)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  // Get recommended agents
  const getRecommendedAgents = (): AgentByCaen[] => {
    return allAgents
      .filter(agent => agent.isRecommended)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  // Get agents by category
  const getAgentsByCategory = (categoryId: string): AgentByCaen[] => {
    return allAgents.filter(agent => agent.category === categoryId);
  };

  // Get categories with agent counts
  const getCategoriesWithCounts = (): (CaenCategory & { agentCount: number })[] => {
    const categoryCounts = allAgents.reduce((acc, agent) => {
      acc[agent.category] = (acc[agent.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return caenCodes
      .map(caen => caen.category)
      .filter((category, index, arr) => 
        arr.findIndex(c => c.id === category.id) === index
      )
      .map(category => ({
        ...category,
        agentCount: categoryCounts[category.id] || 0
      }));
  };

  return {
    // Data
    caenCodes,
    allAgents,
    filteredAgents,
    selectedCaenCode,
    searchTerm,
    activeFilters,
    
    // State
    loading,
    error,
    
    // Actions
    setSearchTerm,
    updateFilters,
    clearFilters,
    selectCaenCode,
    
    // Getters
    getCaenCodeDetails,
    getAgentsByCaenCode,
    searchAgentsAndCaen,
    getPopularAgents,
    getRecommendedAgents,
    getAgentsByCategory,
    getCategoriesWithCounts
  };
};