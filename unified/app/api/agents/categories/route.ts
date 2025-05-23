import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';

// Agent categories with metadata
const AGENT_CATEGORIES = [
  {
    id: 'customer-service',
    name: 'Customer Service',
    nameRo: 'Serviciu Clienți',
    description: 'Agenți pentru suport și asistență clienți',
    icon: '🎧',
    color: '#3B82F6',
  },
  {
    id: 'sales',
    name: 'Sales & Marketing',
    nameRo: 'Vânzări & Marketing',
    description: 'Agenți pentru vânzări, lead generation și marketing',
    icon: '📈',
    color: '#10B981',
  },
  {
    id: 'hr',
    name: 'Human Resources',
    nameRo: 'Resurse Umane',
    description: 'Agenți pentru recrutare, onboarding și HR',
    icon: '👥',
    color: '#8B5CF6',
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    nameRo: 'Finanțe & Contabilitate',
    description: 'Agenți pentru contabilitate, facturare și analiză financiară',
    icon: '💰',
    color: '#EF4444',
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    nameRo: 'Juridic & Conformitate',
    description: 'Agenți pentru asistență juridică și conformitate',
    icon: '⚖️',
    color: '#F59E0B',
  },
  {
    id: 'education',
    name: 'Education & Training',
    nameRo: 'Educație & Training',
    description: 'Agenți pentru învățare, training și dezvoltare',
    icon: '🎓',
    color: '#14B8A6',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    nameRo: 'Sănătate',
    description: 'Agenți pentru domeniul medical și sănătate',
    icon: '🏥',
    color: '#EC4899',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    nameRo: 'Imobiliare',
    description: 'Agenți pentru imobiliare și proprietăți',
    icon: '🏠',
    color: '#6366F1',
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    nameRo: 'HoReCa & Turism',
    description: 'Agenți pentru hoteluri, restaurante și turism',
    icon: '🏨',
    color: '#84CC16',
  },
  {
    id: 'logistics',
    name: 'Logistics & Transport',
    nameRo: 'Logistică & Transport',
    description: 'Agenți pentru transport, livrări și logistică',
    icon: '🚚',
    color: '#06B6D4',
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    nameRo: 'Retail & E-commerce',
    description: 'Agenți pentru magazine și comerț online',
    icon: '🛍️',
    color: '#F97316',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    nameRo: 'Producție',
    description: 'Agenți pentru industrie și producție',
    icon: '🏭',
    color: '#64748B',
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    nameRo: 'Agricultură',
    description: 'Agenți pentru agricultură și industria alimentară',
    icon: '🌾',
    color: '#65A30D',
  },
  {
    id: 'technology',
    name: 'Technology & IT',
    nameRo: 'Tehnologie & IT',
    description: 'Agenți pentru dezvoltare software și IT',
    icon: '💻',
    color: '#2563EB',
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    nameRo: 'Creativ & Design',
    description: 'Agenți pentru design, conținut și industrii creative',
    icon: '🎨',
    color: '#DC2626',
  },
  {
    id: 'consulting',
    name: 'Consulting',
    nameRo: 'Consultanță',
    description: 'Agenți pentru consultanță și servicii profesionale',
    icon: '💼',
    color: '#7C3AED',
  },
];

export async function GET(request: NextRequest) {
  try {
    // Could enhance this with agent counts per category
    // For now, return static categories
    
    return successResponse({
      categories: AGENT_CATEGORIES,
      total: AGENT_CATEGORIES.length,
    });
    
  } catch (error) {
    console.error('Get categories error:', error);
    return errorResponse('A apărut o eroare la încărcarea categoriilor', 500);
  }
}