import React, { useState } from 'react';
import { useAgentsByCaen } from '../hooks/useAgentsByCaen';
import CaenCategorySidebar from './CaenCategorySidebar';
import CaenSearchBar from './CaenSearchBar';
import CaenFilterBar from './CaenFilterBar';
import AgentListByCaen from './AgentListByCaen';
import CaenHeroSection from './CaenHeroSection';
import CaenStatsOverview from './CaenStatsOverview';

const CaenMarketplace: React.FC = () => {
  const {
    caenCodes,
    filteredAgents,
    selectedCaenCode,
    searchTerm,
    activeFilters,
    setSearchTerm,
    updateFilters,
    clearFilters,
    selectCaenCode,
    getCaenCodeDetails,
    getCategoriesWithCounts,
    getPopularAgents,
    getRecommendedAgents
  } = useAgentsByCaen();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const selectedCaenDetails = selectedCaenCode ? getCaenCodeDetails(selectedCaenCode) : null;
  const categoriesWithCounts = getCategoriesWithCounts();
  const popularAgents = getPopularAgents();
  const recommendedAgents = getRecommendedAgents();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <CaenHeroSection 
        totalCaenCodes={caenCodes.length}
        totalAgents={filteredAgents.length}
        categories={categoriesWithCounts}
      />

      {/* Stats Overview */}
      <CaenStatsOverview 
        popularAgents={popularAgents}
        recommendedAgents={recommendedAgents}
        onSelectAgent={(agentId) => {
          // Navigate to agent details - implement based on your routing
          console.log('Navigate to agent:', agentId);
        }}
      />

      {/* Main Content */}
      <div className="relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex">
          {/* Sidebar */}
          <CaenCategorySidebar
            categories={categoriesWithCounts}
            caenCodes={caenCodes}
            selectedCaenCode={selectedCaenCode}
            onSelectCaenCode={selectCaenCode}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 lg:ml-80">
            <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-lg border-b border-gray-800/50">
              <div className="px-4 sm:px-6 lg:px-8 py-4">
                {/* Mobile menu button */}
                <div className="flex items-center justify-between lg:hidden mb-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <div className="text-sm text-gray-400">
                    {filteredAgents.length} agenți găsiți
                  </div>
                </div>

                {/* Search Bar */}
                <CaenSearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Căutați agenți AI sau coduri CAEN..."
                />

                {/* Filter Bar */}
                <CaenFilterBar
                  activeFilters={activeFilters}
                  onUpdateFilters={updateFilters}
                  onClearFilters={clearFilters}
                  agentCount={filteredAgents.length}
                />
              </div>
            </div>

            {/* Selected CAEN Header */}
            {selectedCaenDetails && (
              <div className="px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-800/30">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedCaenDetails.gradient.from}, ${selectedCaenDetails.gradient.to})` 
                    }}
                  >
                    {selectedCaenDetails.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-black text-white">
                        CAEN {selectedCaenDetails.code}
                      </h1>
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                        {selectedCaenDetails.agentCount} agenți
                      </span>
                    </div>
                    <h2 className="text-xl text-gray-300 mb-2">
                      {selectedCaenDetails.title}
                    </h2>
                    <p className="text-gray-400 max-w-2xl">
                      {selectedCaenDetails.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => selectCaenCode(null)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Înapoi la toate categoriile
                </button>
              </div>
            )}

            {/* Agents List */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <AgentListByCaen
                agents={filteredAgents}
                selectedCaenCode={selectedCaenCode}
                loading={false}
                onSelectAgent={(agentId) => {
                  // Navigate to agent details
                  console.log('Navigate to agent:', agentId);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaenMarketplace;