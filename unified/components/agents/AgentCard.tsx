import Link from 'next/link';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    rating: number;
    totalReviews: number;
    totalUsers: number;
    pricing: {
      monthly?: number;
      yearly?: number;
    };
    tags: string[];
    features: Array<{
      name: string;
      included: boolean;
    }>;
    imageUrl?: string;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'customer-service': 'from-blue-500 to-cyan-500',
      'sales': 'from-green-500 to-emerald-500',
      'hr': 'from-purple-500 to-pink-500',
      'finance': 'from-orange-500 to-red-500',
      'legal': 'from-yellow-500 to-orange-500',
      'marketing': 'from-indigo-500 to-purple-500',
      'healthcare': 'from-pink-500 to-rose-500',
    };
    return gradients[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <Link href={`/agents/${agent.slug}`} className="block group h-full">
      <div className="relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 h-full flex flex-col">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(agent.category)} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:${getCategoryGradient(agent.category)}">
              {agent.name}
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-medium">{agent.rating}</span>
                <span className="text-gray-400">({agent.totalReviews})</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>{agent.totalUsers} utilizatori</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">
          {agent.description}
        </p>
        
        {/* Features */}
        <div className="space-y-2 mb-4">
          {agent.features.slice(0, 3).map((feature) => (
            <div key={feature.name} className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">{feature.name}</span>
            </div>
          ))}
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {agent.tags.length > 3 && (
            <span className="px-2 py-1 text-gray-400 text-xs">
              +{agent.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-700">
          <div>
            <span className="text-2xl font-bold text-white">
              €{agent.pricing.monthly}
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
  );
}