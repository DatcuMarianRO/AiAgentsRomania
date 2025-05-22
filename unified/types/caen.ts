// CAEN Code Types for AI Agents Romania Marketplace
export interface CaenCode {
  code: string; // e.g., "6201", "7220"
  title: string; // e.g., "Activități de realizare a software-ului la comandă"
  description: string;
  icon: string; // emoji or icon identifier
  color: string; // hex color for branding
  gradient: {
    from: string;
    to: string;
  };
  category: CaenCategory;
  agentCount: number;
}

export interface CaenCategory {
  id: string; // e.g., "technology", "manufacturing"
  name: string; // e.g., "Tehnologie și IT", "Producție și Manufacturing"
  description: string;
  icon: string;
  color: string;
}

export interface AgentByCaen {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  useCase: string;
  caenCode: string;
  category: string;
  type: AgentType;
  rating: number;
  reviewCount: number;
  isPremium: boolean;
  isRecommended: boolean;
  isPopular: boolean;
  licenseAvailable: boolean;
  pricing: {
    type: 'free' | 'freemium' | 'paid' | 'enterprise';
    startingPrice?: number;
    currency: string;
  };
  tags: string[];
  features: string[];
  integrations: string[];
  thumbnail: string;
  demoAvailable: boolean;
  trialAvailable: boolean;
}

export type AgentType = 
  | 'chatbot' 
  | 'rag' 
  | 'integrator' 
  | 'analyzer' 
  | 'generator' 
  | 'assistant' 
  | 'automation'
  | 'predictive';

export interface CaenFilter {
  category?: string;
  agentType?: AgentType;
  pricing?: 'free' | 'freemium' | 'paid' | 'enterprise';
  features?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  isPremium?: boolean;
  licenseAvailable?: boolean;
}

export interface CaenSearchResult {
  caenCodes: CaenCode[];
  agents: AgentByCaen[];
  totalResults: number;
  searchTerm: string;
  appliedFilters: CaenFilter;
}

// Mock data structure for development
export const MOCK_CAEN_CATEGORIES: CaenCategory[] = [
  {
    id: 'technology',
    name: 'Tehnologie și IT',
    description: 'Software, hardware, telecomunicații',
    icon: '💻',
    color: '#3B82F6'
  },
  {
    id: 'manufacturing',
    name: 'Producție și Manufacturing',
    description: 'Industrie, automatizare, calitate',
    icon: '🏭',
    color: '#059669'
  },
  {
    id: 'finance',
    name: 'Servicii Financiare',
    description: 'Bănci, asigurări, investiții',
    icon: '💰',
    color: '#DC2626'
  },
  {
    id: 'healthcare',
    name: 'Sănătate și Farmacie',
    description: 'Spitale, clinici, cercetare medicală',
    icon: '🏥',
    color: '#7C3AED'
  },
  {
    id: 'retail',
    name: 'Comerț și Retail',
    description: 'Magazine, e-commerce, distribuție',
    icon: '🛍️',
    color: '#EA580C'
  },
  {
    id: 'logistics',
    name: 'Transport și Logistică',
    description: 'Curierat, transport, depozitare',
    icon: '🚛',
    color: '#0891B2'
  },
  {
    id: 'education',
    name: 'Educație și Training',
    description: 'Școli, universități, formare profesională',
    icon: '📚',
    color: '#065F46'
  },
  {
    id: 'agriculture',
    name: 'Agricultură și Alimentar',
    description: 'Fermă, procesare, distribuție alimentară',
    icon: '🌾',
    color: '#92400E'
  }
];