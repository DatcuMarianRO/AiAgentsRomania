'use client';

interface AgentSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount?: number;
}

export function AgentSearch({ value, onChange, resultsCount }: AgentSearchProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Caută agenți AI după nume, categorie sau funcționalități..."
          className="w-full px-6 py-4 pl-14 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {resultsCount !== undefined && value && (
        <p className="text-sm text-gray-400 mt-2 text-center">
          {resultsCount} {resultsCount === 1 ? 'rezultat găsit' : 'rezultate găsite'}
        </p>
      )}
    </div>
  );
}