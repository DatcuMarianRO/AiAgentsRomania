import { CaenCode, AgentByCaen, MOCK_CAEN_CATEGORIES } from '../types/caen';

export const MOCK_CAEN_CODES: CaenCode[] = [
  // Technology & IT
  {
    code: '6201',
    title: 'Activități de realizare a software-ului la comandă',
    description: 'Dezvoltare software personalizat pentru clienți',
    icon: '💻',
    color: '#3B82F6',
    gradient: { from: '#3B82F6', to: '#1D4ED8' },
    category: MOCK_CAEN_CATEGORIES[0],
    agentCount: 15
  },
  {
    code: '6202',
    title: 'Activități de consultanță în tehnologia informației',
    description: 'Consultanță și servicii IT specializate',
    icon: '🔧',
    color: '#6366F1',
    gradient: { from: '#6366F1', to: '#4F46E5' },
    category: MOCK_CAEN_CATEGORIES[0],
    agentCount: 12
  },
  {
    code: '6311',
    title: 'Prelucrarea datelor, administrarea paginilor web',
    description: 'Procesare date și managementul website-urilor',
    icon: '🌐',
    color: '#8B5CF6',
    gradient: { from: '#8B5CF6', to: '#7C3AED' },
    category: MOCK_CAEN_CATEGORIES[0],
    agentCount: 8
  },

  // Manufacturing
  {
    code: '2511',
    title: 'Fabricarea construcțiilor metalice',
    description: 'Producția de structuri metalice și componente',
    icon: '🔩',
    color: '#059669',
    gradient: { from: '#059669', to: '#047857' },
    category: MOCK_CAEN_CATEGORIES[1],
    agentCount: 6
  },
  {
    code: '2849',
    title: 'Fabricarea altor mașini-unelte',
    description: 'Producția de echipamente industriale specializate',
    icon: '⚙️',
    color: '#10B981',
    gradient: { from: '#10B981', to: '#059669' },
    category: MOCK_CAEN_CATEGORIES[1],
    agentCount: 9
  },

  // Finance
  {
    code: '6419',
    title: 'Alte activități bancare',
    description: 'Servicii bancare specializate și produse financiare',
    icon: '🏦',
    color: '#DC2626',
    gradient: { from: '#DC2626', to: '#B91C1C' },
    category: MOCK_CAEN_CATEGORIES[2],
    agentCount: 11
  },
  {
    code: '6512',
    title: 'Alte activități de asigurări',
    description: 'Produse de asigurare și servicii conexe',
    icon: '🛡️',
    color: '#EF4444',
    gradient: { from: '#EF4444', to: '#DC2626' },
    category: MOCK_CAEN_CATEGORIES[2],
    agentCount: 7
  },

  // Healthcare
  {
    code: '8621',
    title: 'Activități de asistență medicală generală',
    description: 'Servicii medicale primare și consultații',
    icon: '🩺',
    color: '#7C3AED',
    gradient: { from: '#7C3AED', to: '#6D28D9' },
    category: MOCK_CAEN_CATEGORIES[3],
    agentCount: 13
  },
  {
    code: '2120',
    title: 'Fabricarea preparatelor farmaceutice',
    description: 'Producția de medicamente și produse farmaceutice',
    icon: '💊',
    color: '#A855F7',
    gradient: { from: '#A855F7', to: '#9333EA' },
    category: MOCK_CAEN_CATEGORIES[3],
    agentCount: 5
  }
];

export const MOCK_AGENTS_BY_CAEN: AgentByCaen[] = [
  // Software Development (6201)
  {
    id: 'agent-1',
    name: 'CodeMaster Pro',
    description: 'AI agent specializat în generarea și optimizarea codului pentru dezvoltatori software',
    shortDescription: 'Generează cod optimizat instant',
    useCase: 'Accelerarea dezvoltării software prin generare automată de cod',
    caenCode: '6201',
    category: 'technology',
    type: 'generator',
    rating: 4.8,
    reviewCount: 245,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 299,
      currency: 'EUR'
    },
    tags: ['JavaScript', 'Python', 'React', 'Node.js'],
    features: ['Code Generation', 'Bug Detection', 'Performance Optimization', 'Documentation'],
    integrations: ['VS Code', 'GitHub', 'GitLab', 'Slack'],
    thumbnail: '/agents/codemaster-pro.jpg',
    demoAvailable: true,
    trialAvailable: true
  },
  {
    id: 'agent-2',
    name: 'DevOps Wizard',
    description: 'Automatizează procesele DevOps și gestionează infrastructura cloud',
    shortDescription: 'Automatizare DevOps inteligentă',
    useCase: 'Optimizarea pipeline-urilor CI/CD și monitorizarea infrastructurii',
    caenCode: '6201',
    category: 'technology',
    type: 'automation',
    rating: 4.6,
    reviewCount: 189,
    isPremium: false,
    isRecommended: true,
    isPopular: false,
    licenseAvailable: true,
    pricing: {
      type: 'freemium',
      startingPrice: 199,
      currency: 'EUR'
    },
    tags: ['Docker', 'Kubernetes', 'AWS', 'Azure'],
    features: ['Infrastructure Monitoring', 'Auto Scaling', 'Security Scanning', 'Cost Optimization'],
    integrations: ['Jenkins', 'Docker', 'Terraform', 'Prometheus'],
    thumbnail: '/agents/devops-wizard.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // IT Consulting (6202)
  {
    id: 'agent-3',
    name: 'TechConsult AI',
    description: 'Asistent AI pentru consultanță tehnică și analiza arhitecturii software',
    shortDescription: 'Consultanță tehnică expertă',
    useCase: 'Analiză tehnică și recomandări pentru arhitectura sistemelor IT',
    caenCode: '6202',
    category: 'technology',
    type: 'analyzer',
    rating: 4.9,
    reviewCount: 156,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: false,
    pricing: {
      type: 'enterprise',
      currency: 'EUR'
    },
    tags: ['Architecture', 'Security', 'Scalability', 'Performance'],
    features: ['System Analysis', 'Risk Assessment', 'Technology Recommendations', 'Migration Planning'],
    integrations: ['Confluence', 'Jira', 'Microsoft Teams', 'Slack'],
    thumbnail: '/agents/techconsult-ai.jpg',
    demoAvailable: false,
    trialAvailable: false
  },

  // Manufacturing (2511)
  {
    id: 'agent-4',
    name: 'MetalWorks Optimizer',
    description: 'AI pentru optimizarea proceselor de fabricație metalurgică',
    shortDescription: 'Optimizare procese metalurgice',
    useCase: 'Maximizarea eficienței în producția de construcții metalice',
    caenCode: '2511',
    category: 'manufacturing',
    type: 'analyzer',
    rating: 4.7,
    reviewCount: 98,
    isPremium: true,
    isRecommended: false,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 599,
      currency: 'EUR'
    },
    tags: ['Manufacturing', 'Quality Control', 'Process Optimization', 'Predictive Maintenance'],
    features: ['Production Planning', 'Quality Analysis', 'Cost Reduction', 'Waste Minimization'],
    integrations: ['SAP', 'Oracle', 'Siemens', 'Rockwell'],
    thumbnail: '/agents/metalworks-optimizer.jpg',
    demoAvailable: true,
    trialAvailable: false
  },

  // Banking (6419)
  {
    id: 'agent-5',
    name: 'FinanceGuard Pro',
    description: 'Agent AI pentru detectarea fraudelor și analiza riscurilor financiare',
    shortDescription: 'Protecție avansată împotriva fraudelor',
    useCase: 'Monitorizarea tranzacțiilor și detectarea activităților suspecte',
    caenCode: '6419',
    category: 'finance',
    type: 'analyzer',
    rating: 4.9,
    reviewCount: 312,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: false,
    pricing: {
      type: 'enterprise',
      currency: 'EUR'
    },
    tags: ['Fraud Detection', 'Risk Analysis', 'Compliance', 'AML'],
    features: ['Real-time Monitoring', 'Pattern Recognition', 'Risk Scoring', 'Regulatory Compliance'],
    integrations: ['Core Banking', 'SWIFT', 'FIS', 'Temenos'],
    thumbnail: '/agents/financeguard-pro.jpg',
    demoAvailable: false,
    trialAvailable: false
  },

  // Healthcare (8621)
  {
    id: 'agent-6',
    name: 'MediAssist AI',
    description: 'Asistent medical AI pentru diagnostic și managementul pacienților',
    shortDescription: 'Asistent medical inteligent',
    useCase: 'Suport în procesul de diagnostic și monitorizarea pacienților',
    caenCode: '8621',
    category: 'healthcare',
    type: 'assistant',
    rating: 4.8,
    reviewCount: 276,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 399,
      currency: 'EUR'
    },
    tags: ['Medical Diagnosis', 'Patient Care', 'Clinical Decision', 'Telemedicine'],
    features: ['Symptom Analysis', 'Treatment Recommendations', 'Drug Interactions', 'Patient Monitoring'],
    integrations: ['Epic', 'Cerner', 'Allscripts', 'MEDITECH'],
    thumbnail: '/agents/mediassist-ai.jpg',
    demoAvailable: true,
    trialAvailable: true
  }
];