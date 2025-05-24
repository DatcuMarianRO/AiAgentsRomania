'use client';

interface AgentFiltersProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function AgentFilters({
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}: AgentFiltersProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-white mb-6">Filtre</h3>
      
      {/* Sort Options */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Sortează după
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="rating">Cele mai apreciate</option>
          <option value="users">Cei mai populari</option>
          <option value="price-low">Preț crescător</option>
          <option value="price-high">Preț descrescător</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Interval preț (€/lună)
        </label>
        <div className="space-y-4">
          <div>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">€0</span>
            <span className="text-white font-medium">
              €{priceRange[0]} - €{priceRange[1]}
            </span>
            <span className="text-gray-400">€500+</span>
          </div>
        </div>
      </div>

      {/* Features Filter */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Funcționalități
        </label>
        <div className="space-y-2">
          {[
            'Integrare API',
            'Multi-limbă',
            'Rapoarte avansate',
            'White-label',
            'Suport prioritar',
            'Training personalizat'
          ].map((feature) => (
            <label key={feature} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onPriceChange([0, 500]);
          onSortChange('rating');
        }}
        className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
      >
        Resetează filtrele
      </button>
    </div>
  );
}