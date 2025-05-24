import { CaenCode, AgentByCaen, CaenCategory } from '../types/caen';

// Extended CAEN Categories based on Invent Evolution services
export const INVENT_EVOLUTION_CATEGORIES: CaenCategory[] = [
  {
    id: 'technology',
    name: 'Tehnologie și IT',
    description: 'Software, hardware, telecomunicații, dezvoltare web',
    icon: '💻',
    color: '#3B82F6'
  },
  {
    id: 'commerce',
    name: 'Comerț și Retail',
    description: 'Magazine, e-commerce, distribuție, fashion',
    icon: '🛍️',
    color: '#059669'
  },
  {
    id: 'horeca',
    name: 'HORECA',
    description: 'Hoteluri, restaurante, catering, ospitalitate',
    icon: '🍽️',
    color: '#DC2626'
  },
  {
    id: 'healthcare',
    name: 'Sănătate și Wellness',
    description: 'Clinici, farmacii, fitness, wellness, spa',
    icon: '🏥',
    color: '#7C3AED'
  },
  {
    id: 'education',
    name: 'Educație și Training',
    description: 'Școli, cursuri, training, e-learning',
    icon: '📚',
    color: '#EA580C'
  },
  {
    id: 'realestate',
    name: 'Imobiliare și Construcții',
    description: 'Agenții imobiliare, dezvoltatori, arhitectură',
    icon: '🏢',
    color: '#0891B2'
  },
  {
    id: 'finance',
    name: 'Servicii Financiare',
    description: 'Contabilitate, consultanță, juridic, notariat',
    icon: '💰',
    color: '#065F46'
  },
  {
    id: 'automotive',
    name: 'Automotive și Service',
    description: 'Service auto, vulcanizări, închirieri',
    icon: '🚗',
    color: '#92400E'
  },
  {
    id: 'logistics',
    name: 'Transport și Logistică',
    description: 'Curierat, transport, depozitare, flote',
    icon: '🚛',
    color: '#1F2937'
  },
  {
    id: 'agriculture',
    name: 'Agricultură și Agrotech',
    description: 'Ferme, culturi, zootehnie, silvicultură',
    icon: '🌾',
    color: '#166534'
  },
  {
    id: 'security',
    name: 'Securitate și Facility',
    description: 'Pază, curățenie, facility management',
    icon: '🛡️',
    color: '#7F1D1D'
  },
  {
    id: 'creative',
    name: 'Creative și Media',
    description: 'Design, video, marketing, publicitate',
    icon: '🎨',
    color: '#A21CAF'
  }
];

// Extended CAEN Codes with Invent Evolution focus
export const INVENT_EVOLUTION_CAEN_CODES: CaenCode[] = [
  // Technology & IT
  {
    code: '6201',
    title: 'Activități de realizare a software-ului la comandă',
    description: 'Dezvoltare software personalizat, aplicații AI, chatboți',
    icon: '💻',
    color: '#3B82F6',
    gradient: { from: '#3B82F6', to: '#1D4ED8' },
    category: INVENT_EVOLUTION_CATEGORIES[0],
    agentCount: 8
  },
  {
    code: '6202',
    title: 'Activități de consultanță în tehnologia informației',
    description: 'Consultanță AI, automatizare, transformare digitală',
    icon: '🔧',
    color: '#6366F1',
    gradient: { from: '#6366F1', to: '#4F46E5' },
    category: INVENT_EVOLUTION_CATEGORIES[0],
    agentCount: 5
  },
  {
    code: '6311',
    title: 'Prelucrarea datelor, administrarea paginilor web',
    description: 'AI Analytics, dezvoltare web cu AI, optimizare SEO',
    icon: '🌐',
    color: '#8B5CF6',
    gradient: { from: '#8B5CF6', to: '#7C3AED' },
    category: INVENT_EVOLUTION_CATEGORIES[0],
    agentCount: 6
  },

  // Commerce & Retail
  {
    code: '4711',
    title: 'Comerț cu amănuntul în magazine nealimentare',
    description: 'E-commerce cu AI, recomandări inteligente, chatboți vânzări',
    icon: '🛍️',
    color: '#059669',
    gradient: { from: '#059669', to: '#047857' },
    category: INVENT_EVOLUTION_CATEGORIES[1],
    agentCount: 4
  },
  {
    code: '4791',
    title: 'Comerț cu amănuntul prin intermediul firmelor de vânzări la distanță',
    description: 'E-commerce automatizat, AI pentru comenzi online',
    icon: '📦',
    color: '#10B981',
    gradient: { from: '#10B981', to: '#059669' },
    category: INVENT_EVOLUTION_CATEGORIES[1],
    agentCount: 3
  },

  // HORECA
  {
    code: '5610',
    title: 'Restaurante',
    description: 'SINTRA AI - rezervări automate, comenzi inteligente',
    icon: '🍽️',
    color: '#DC2626',
    gradient: { from: '#DC2626', to: '#B91C1C' },
    category: INVENT_EVOLUTION_CATEGORIES[2],
    agentCount: 3
  },
  {
    code: '5510',
    title: 'Hoteluri și alte facilități de cazare',
    description: 'Rezervări AI, guest experience automatizat',
    icon: '🏨',
    color: '#EF4444',
    gradient: { from: '#EF4444', to: '#DC2626' },
    category: INVENT_EVOLUTION_CATEGORIES[2],
    agentCount: 2
  },

  // Healthcare & Wellness
  {
    code: '8621',
    title: 'Activități de asistență medicală generală',
    description: 'MEDIA AI - triaj conversațional, programări medicale',
    icon: '🩺',
    color: '#7C3AED',
    gradient: { from: '#7C3AED', to: '#6D28D9' },
    category: INVENT_EVOLUTION_CATEGORIES[3],
    agentCount: 4
  },
  {
    code: '9602',
    title: 'Frizerii și alte activități de întreținere corporală',
    description: 'LUMINA AI - programări automate saloane',
    icon: '✂️',
    color: '#A855F7',
    gradient: { from: '#A855F7', to: '#9333EA' },
    category: INVENT_EVOLUTION_CATEGORIES[3],
    agentCount: 2
  },
  {
    code: '9311',
    title: 'Activități ale facilităților sportive',
    description: 'VITALIX - AI coach fitness, planuri antrenament',
    icon: '🏋️',
    color: '#C084FC',
    gradient: { from: '#C084FC', to: '#A855F7' },
    category: INVENT_EVOLUTION_CATEGORIES[3],
    agentCount: 3
  },

  // Education
  {
    code: '8559',
    title: 'Alte forme de învățământ',
    description: 'EDUNOVA AI - învățare personalizată, evaluare adaptivă',
    icon: '📚',
    color: '#EA580C',
    gradient: { from: '#EA580C', to: '#DC2626' },
    category: INVENT_EVOLUTION_CATEGORIES[4],
    agentCount: 3
  },

  // Real Estate & Construction
  {
    code: '6810',
    title: 'Cumpărarea și vânzarea de bunuri imobiliare proprii',
    description: 'PROP-AI - tururi virtuale, recomandări investiții',
    icon: '🏢',
    color: '#0891B2',
    gradient: { from: '#0891B2', to: '#0E7490' },
    category: INVENT_EVOLUTION_CATEGORIES[5],
    agentCount: 3
  },
  {
    code: '7111',
    title: 'Activități de arhitectură',
    description: 'ARHIX - simulări 3D, estimări costuri',
    icon: '🏗️',
    color: '#0EA5E9',
    gradient: { from: '#0EA5E9', to: '#0891B2' },
    category: INVENT_EVOLUTION_CATEGORIES[5],
    agentCount: 2
  },

  // Finance & Legal
  {
    code: '6920',
    title: 'Activități de contabilitate și audit',
    description: 'CONTABIX - automatizare contabilă, rapoarte fiscale',
    icon: '📊',
    color: '#065F46',
    gradient: { from: '#065F46', to: '#047857' },
    category: INVENT_EVOLUTION_CATEGORIES[6],
    agentCount: 4
  },
  {
    code: '6910',
    title: 'Activități juridice',
    description: 'LEXBOT - documente legale automate, consultanță AI',
    icon: '⚖️',
    color: '#10B981',
    gradient: { from: '#10B981', to: '#059669' },
    category: INVENT_EVOLUTION_CATEGORIES[6],
    agentCount: 2
  },

  // Automotive
  {
    code: '4520',
    title: 'Întreținerea și repararea autovehiculelor',
    description: 'MECHANOX AI - estimări reparații, programări service',
    icon: '🔧',
    color: '#92400E',
    gradient: { from: '#92400E', to: '#78350F' },
    category: INVENT_EVOLUTION_CATEGORIES[7],
    agentCount: 3
  },

  // Logistics & Transport
  {
    code: '4941',
    title: 'Transporturi rutiere de mărfuri',
    description: 'LOGIS-AI - rutare optimă, urmărire flote',
    icon: '🚛',
    color: '#1F2937',
    gradient: { from: '#1F2937', to: '#111827' },
    category: INVENT_EVOLUTION_CATEGORIES[8],
    agentCount: 4
  },

  // Agriculture
  {
    code: '0111',
    title: 'Cultivarea cerealelor, plantelor leguminoase și plantelor producătoare de semințe oleaginoase',
    description: 'AGRIMIND - predicții meteo, analiză sol, irigații AI',
    icon: '🌾',
    color: '#166534',
    gradient: { from: '#166534', to: '#14532D' },
    category: INVENT_EVOLUTION_CATEGORIES[9],
    agentCount: 3
  },

  // Security & Facility
  {
    code: '8010',
    title: 'Activități de securitate privată',
    description: 'SECURION AI - planificare ture, control acces',
    icon: '🛡️',
    color: '#7F1D1D',
    gradient: { from: '#7F1D1D', to: '#6B1A1A' },
    category: INVENT_EVOLUTION_CATEGORIES[10],
    agentCount: 2
  },

  // Creative & Media
  {
    code: '7311',
    title: 'Activități ale agențiilor de publicitate',
    description: 'INFLUAI - content AI, campanii automate, video AI',
    icon: '📺',
    color: '#A21CAF',
    gradient: { from: '#A21CAF', to: '#86198F' },
    category: INVENT_EVOLUTION_CATEGORIES[11],
    agentCount: 5
  }
];

// Comprehensive Agents Database - Invent Evolution Portfolio
export const INVENT_EVOLUTION_AGENTS: AgentByCaen[] = [
  // HORECA - SINTRA AI
  {
    id: 'sintra-ai',
    name: 'SINTRA AI',
    description: 'Smart Intelligent Networked Table Reservation Assistant - Asistent AI conversațional pentru rezervări, comenzi și recomandări în industria HORECA',
    shortDescription: 'Asistent AI pentru rezervări restaurante',
    useCase: 'Automatizare rezervări, comenzi inteligente, feedback clienți, promovare oferte',
    caenCode: '5610',
    category: 'horeca',
    type: 'chatbot',
    rating: 4.9,
    reviewCount: 187,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 299,
      currency: 'EUR'
    },
    tags: ['Rezervări', 'WhatsApp', 'POS Integration', 'CRM', 'Recomandări'],
    features: [
      'Preluare automată rezervări (web, WhatsApp, telefon)',
      'Recomandări meniu personalizate',
      'Feedback instant și sondaje satisfacție',
      'Promovare oferte prin notificări AI'
    ],
    integrations: ['POS Systems', 'CRM', 'Google Calendar', 'Google Maps', 'WhatsApp Business'],
    thumbnail: '/agents/sintra-ai.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Automotive - MECHANOX AI
  {
    id: 'mechanox-ai',
    name: 'MECHANOX AI',
    description: 'Asistent AI pentru service-uri auto și întreținere vehicule. Automatizează estimări, programări și comunicarea cu clienții.',
    shortDescription: 'AI pentru service-uri auto',
    useCase: 'Estimări automate reparații, programări, notificări status, întreținere preventivă',
    caenCode: '4520',
    category: 'automotive',
    type: 'assistant',
    rating: 4.8,
    reviewCount: 142,
    isPremium: true,
    isRecommended: true,
    isPopular: false,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 399,
      currency: 'EUR'
    },
    tags: ['Service Auto', 'Estimări', 'Programări', 'ERP Integration', 'SMS Notifications'],
    features: [
      'Estimări automate pentru reparații',
      'Preluare programări multicanal',
      'Notificări status reparație',
      'Recomandări întreținere preventivă'
    ],
    integrations: ['ERP Auto', 'CRM Clienți', 'Platforme Plăți', 'SMS Gateway', 'Email Marketing'],
    thumbnail: '/agents/mechanox-ai.jpg',
    demoAvailable: true,
    trialAvailable: false
  },

  // Beauty & Wellness - LUMINA AI
  {
    id: 'lumina-ai',
    name: 'LUMINA AI',
    description: 'Asistent AI pentru saloane de înfrumusețare, frizerii și spa. Gestionează programări și oferă recomandări personalizate.',
    shortDescription: 'AI pentru saloane și spa',
    useCase: 'Programări automate, recomandări servicii, management clienți, statistici',
    caenCode: '9602',
    category: 'healthcare',
    type: 'assistant',
    rating: 4.7,
    reviewCount: 98,
    isPremium: false,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'freemium',
      startingPrice: 199,
      currency: 'EUR'
    },
    tags: ['Saloane', 'Programări', 'Beauty', 'Instagram', 'Recomandări'],
    features: [
      'Programări automate prin chat sau voice',
      'Reamintiri automate pentru clienți',
      'Recomandări personalizate servicii',
      'Statistici și istoric clienți'
    ],
    integrations: ['SimplyBook', 'Setmore', 'Google Calendar', 'Instagram DM', 'WhatsApp'],
    thumbnail: '/agents/lumina-ai.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Healthcare - MEDIA AI
  {
    id: 'media-ai',
    name: 'MEDIA AI',
    description: 'Asistent AI pentru clinici și cabinete medicale. Oferă triaj conversațional și gestionează interacțiunile cu pacienții.',
    shortDescription: 'AI pentru clinici medicale',
    useCase: 'Triaj pacienți, programări medicale, interpretare rezultate, follow-up automat',
    caenCode: '8621',
    category: 'healthcare',
    type: 'assistant',
    rating: 4.9,
    reviewCount: 256,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: false,
    pricing: {
      type: 'enterprise',
      currency: 'EUR'
    },
    tags: ['Medical', 'Triaj', 'GDPR', 'DEP Integration', 'Telemedicina'],
    features: [
      'Triaj conversațional inițial',
      'Programări automate și reminder-uri',
      'Interpretare AI rezultate text & imagine',
      'Comunicare automată follow-up'
    ],
    integrations: ['Soft Medical', 'CRM Medical', 'DEP', 'Email & SMS', 'Telemedicine Platforms'],
    thumbnail: '/agents/media-ai.jpg',
    demoAvailable: false,
    trialAvailable: false
  },

  // Education - EDUNOVA AI
  {
    id: 'edunova-ai',
    name: 'EDUNOVA AI',
    description: 'Asistent AI educațional pentru învățare personalizată și evaluare adaptivă în mediul online și offline.',
    shortDescription: 'AI pentru educație personalizată',
    useCase: 'Recomandări conținut, teste adaptive, suport 24/7, evaluare inteligentă',
    caenCode: '8559',
    category: 'education',
    type: 'assistant',
    rating: 4.6,
    reviewCount: 189,
    isPremium: false,
    isRecommended: true,
    isPopular: false,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 249,
      currency: 'EUR'
    },
    tags: ['E-learning', 'Adaptive Testing', 'Moodle', 'Google Classroom', 'Personalizare'],
    features: [
      'Recomandări conținut pe baza progresului',
      'Teste adaptative cu feedback inteligent',
      'Chatbot suport 24/7',
      'Integrare sisteme evaluare'
    ],
    integrations: ['Moodle', 'Zoom', 'Google Classroom', 'Microsoft Teams', 'Khan Academy'],
    thumbnail: '/agents/edunova-ai.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Real Estate - PROP-AI
  {
    id: 'prop-ai',
    name: 'PROP-AI',
    description: 'Asistent digital pentru promovarea și vânzarea/închirierea proprietăților cu tururi virtuale și recomandări AI.',
    shortDescription: 'AI pentru imobiliare',
    useCase: 'Tururi virtuale AI, programare vizionări, recomandări investiții, automatizare lead-uri',
    caenCode: '6810',
    category: 'realestate',
    type: 'assistant',
    rating: 4.5,
    reviewCount: 134,
    isPremium: true,
    isRecommended: false,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 449,
      currency: 'EUR'
    },
    tags: ['Imobiliare', 'VR Tours', 'Lead Generation', 'Investment AI', 'CRM Integration'],
    features: [
      'Ghid AI în tururi virtuale',
      'Programare automată vizionări',
      'Recomandări investiții pe bază de AI',
      'Automatizare email-uri și mesaje lead-uri'
    ],
    integrations: ['CRM Imobiliar', 'AR/VR Apps', 'Site-uri Listare', 'Google Maps', 'Virtual Tour Platforms'],
    thumbnail: '/agents/prop-ai.jpg',
    demoAvailable: true,
    trialAvailable: false
  },

  // Accounting - CONTABIX
  {
    id: 'contabix',
    name: 'CONTABIX',
    description: 'Robot AI pentru automatizarea sarcinilor contabile și gestionarea documentelor financiare cu integrări SmartBill.',
    shortDescription: 'AI pentru contabilitate automatizată',
    useCase: 'Preluare facturi OCR, generare rapoarte fiscale, interpretare financiară, reminder termene',
    caenCode: '6920',
    category: 'finance',
    type: 'automation',
    rating: 4.8,
    reviewCount: 203,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 349,
      currency: 'EUR'
    },
    tags: ['Contabilitate', 'OCR', 'SmartBill', 'Fiscal', 'Automatizare'],
    features: [
      'Preluare și sortare facturi OCR inteligent',
      'Generare automatizată balanțe și rapoarte fiscale',
      'Asistență AI pentru interpretarea financiară',
      'Reminder termene fiscale'
    ],
    integrations: ['SmartBill', 'eFact', 'ANAF', 'Banking APIs', 'Excel/CSV Export'],
    thumbnail: '/agents/contabix.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Legal - LEXBOT
  {
    id: 'lexbot',
    name: 'LEXBOT',
    description: 'Robot AI pentru automatizarea documentației legale și consultanță juridică inițială prin chatbot inteligent.',
    shortDescription: 'AI pentru servicii juridice',
    useCase: 'Răspunsuri juridice inițiale, generare documente, programări clienți, arhivare',
    caenCode: '6910',
    category: 'finance',
    type: 'chatbot',
    rating: 4.7,
    reviewCount: 156,
    isPremium: false,
    isRecommended: true,
    isPopular: false,
    licenseAvailable: true,
    pricing: {
      type: 'freemium',
      startingPrice: 299,
      currency: 'EUR'
    },
    tags: ['Juridic', 'Documente Legale', 'Consultanță', 'Automatizare', 'Arhivare'],
    features: [
      'Chatbot pentru răspunsuri juridice inițiale',
      'Generare documente automate',
      'Programări clienți și reminder-uri',
      'Sistem arhivare documentație'
    ],
    integrations: ['Document Management', 'CRM Juridic', 'E-signature', 'Court Systems', 'Legal Databases'],
    thumbnail: '/agents/lexbot.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Logistics - LOGIS-AI
  {
    id: 'logis-ai',
    name: 'LOGIS-AI',
    description: 'Robot AI pentru automatizarea logisticii, optimizarea rutelor și gestionarea flotelor de transport.',
    shortDescription: 'AI pentru logistică și transport',
    useCase: 'Rutare optimă, predicție livrări, monitorizare flotă, asistență clienți transport',
    caenCode: '4941',
    category: 'logistics',
    type: 'automation',
    rating: 4.6,
    reviewCount: 178,
    isPremium: true,
    isRecommended: false,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 499,
      currency: 'EUR'
    },
    tags: ['Logistică', 'Rutare', 'GPS Tracking', 'Fleet Management', 'Predictive Analytics'],
    features: [
      'Calcul automat rută optimă',
      'Predicție estimări livrare în timp real',
      'Monitorizare parc auto + întreținere predictivă',
      'Asistență AI clienți: status, modificări, retururi'
    ],
    integrations: ['GPS Systems', 'Fleet Management', 'ERP Logistics', 'Customer Portal', 'Mobile Apps'],
    thumbnail: '/agents/logis-ai.jpg',
    demoAvailable: true,
    trialAvailable: false
  },

  // Agriculture - AGRIMIND
  {
    id: 'agrimind',
    name: 'AGRIMIND',
    description: 'Asistent AI agricol pentru optimizarea culturilor prin predicții meteo, analiză sol și irigații inteligente.',
    shortDescription: 'AI pentru agricultură inteligentă',
    useCase: 'Predicții meteo, analiză sol, planificare recoltare, management resurse agricole',
    caenCode: '0111',
    category: 'agriculture',
    type: 'analyzer',
    rating: 4.4,
    reviewCount: 89,
    isPremium: false,
    isRecommended: true,
    isPopular: false,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 199,
      currency: 'EUR'
    },
    tags: ['Agricultură', 'IoT Senzori', 'Meteo', 'Drone Analysis', 'Smart Irrigation'],
    features: [
      'Predicții meteo și starea solului',
      'Analiză imagini dronă',
      'Planificare inteligentă recoltare și irigații',
      'Estimare productivitate și management resurse'
    ],
    integrations: ['IoT Sensors', 'Weather APIs', 'Drone Platforms', 'Irrigation Systems', 'Farm Management Software'],
    thumbnail: '/agents/agrimind.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Security - SECURION AI
  {
    id: 'securion-ai',
    name: 'SECURION AI',
    description: 'Asistent AI pentru management operațional în securitate, pază și facility management cu control acces inteligent.',
    shortDescription: 'AI pentru securitate și facility',
    useCase: 'Planificare ture pază, recunoaștere facială, alertare, control acces inteligent',
    caenCode: '8010',
    category: 'security',
    type: 'automation',
    rating: 4.5,
    reviewCount: 67,
    isPremium: true,
    isRecommended: false,
    isPopular: false,
    licenseAvailable: false,
    pricing: {
      type: 'enterprise',
      currency: 'EUR'
    },
    tags: ['Securitate', 'Facial Recognition', 'Access Control', 'CCTV', 'Alerting'],
    features: [
      'Planificare ture și recunoaștere facială',
      'Alertare instant evenimente',
      'Rapoarte automate intervenție',
      'Control acces inteligent'
    ],
    integrations: ['CCTV Systems', 'Access Control', 'Alarm Systems', 'Mobile Security Apps', 'Facial Recognition'],
    thumbnail: '/agents/securion-ai.jpg',
    demoAvailable: false,
    trialAvailable: false
  },

  // Creative & Marketing - INFLUAI
  {
    id: 'influai',
    name: 'INFLUAI',
    description: 'Robot AI pentru marketing automatizat, generare conținut video, campanii publicitare și analiză performance.',
    shortDescription: 'AI pentru marketing și publicitate',
    useCase: 'Content AI, campanii automate, video AI, analiză sentimente, optimizare comunicare',
    caenCode: '7311',
    category: 'creative',
    type: 'generator',
    rating: 4.7,
    reviewCount: 234,
    isPremium: true,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 399,
      currency: 'EUR'
    },
    tags: ['Marketing AI', 'Video Generation', 'Content Creation', 'Social Media', 'Analytics'],
    features: [
      'Generare conținut video AI automat',
      'Campanii publicitare automatizate',
      'Analiză sentimente și optimizare comunicare',
      'Personalizare mesaje și email marketing'
    ],
    integrations: ['Social Media APIs', 'Video Platforms', 'Email Marketing', 'Analytics Tools', 'Ad Platforms'],
    thumbnail: '/agents/influai.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Fitness & Wellness - VITALIX
  {
    id: 'vitalix',
    name: 'VITALIX',
    description: 'AI coach pentru sănătate și performanță fizică cu planuri personalizate de nutriție și antrenament.',
    shortDescription: 'AI coach pentru fitness și wellness',
    useCase: 'Planuri nutriționale personalizate, antrenamente adaptive, monitorizare progres',
    caenCode: '9311',
    category: 'healthcare',
    type: 'assistant',
    rating: 4.6,
    reviewCount: 145,
    isPremium: false,
    isRecommended: true,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'freemium',
      startingPrice: 149,
      currency: 'EUR'
    },
    tags: ['Fitness', 'Nutriție', 'Wellness', 'Tracking', 'Personalizare'],
    features: [
      'Planuri nutriționale și antrenamente personalizate',
      'Monitorizare progres și feedback AI',
      'Programări automate și recomandări suplimente',
      'Integrare cu device-uri fitness'
    ],
    integrations: ['Fitness Trackers', 'Nutrition Apps', 'Gym Management', 'Health Monitors', 'Supplement Stores'],
    thumbnail: '/agents/vitalix.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Freelance & Creative - CREATIX
  {
    id: 'creatix',
    name: 'CREATIX',
    description: 'Asistent AI creativ și manager de proiecte pentru freelanceri, designeri și dezvoltatori.',
    shortDescription: 'AI pentru freelanceri și creatori',
    useCase: 'Management proiecte, generare contracte, time tracking, sugestii creative AI',
    caenCode: '7410',
    category: 'creative',
    type: 'assistant',
    rating: 4.5,
    reviewCount: 112,
    isPremium: false,
    isRecommended: false,
    isPopular: true,
    licenseAvailable: true,
    pricing: {
      type: 'freemium',
      startingPrice: 99,
      currency: 'EUR'
    },
    tags: ['Freelance', 'Project Management', 'Creative AI', 'Time Tracking', 'Contracts'],
    features: [
      'Generare contracte și propuneri automate',
      'Time tracking și management livrabile',
      'Sugestii AI pentru design și copywriting',
      'Facturare și urmărire plăți'
    ],
    integrations: ['Project Management Tools', 'Design Software', 'Invoice Systems', 'Time Trackers', 'Portfolio Platforms'],
    thumbnail: '/agents/creatix.jpg',
    demoAvailable: true,
    trialAvailable: true
  },

  // Construction & Architecture - ARHIX
  {
    id: 'arhix',
    name: 'ARHIX',
    description: 'Suport AI pentru proiecte de construcție și urbanism cu simulări 3D și estimări de costuri.',
    shortDescription: 'AI pentru construcții și arhitectură',
    useCase: 'Gestionare documentație, simulări 3D, estimări costuri, monitorizare șantier',
    caenCode: '7111',
    category: 'realestate',
    type: 'analyzer',
    rating: 4.3,
    reviewCount: 78,
    isPremium: true,
    isRecommended: false,
    isPopular: false,
    licenseAvailable: true,
    pricing: {
      type: 'paid',
      startingPrice: 599,
      currency: 'EUR'
    },
    tags: ['Construcții', '3D Modeling', 'Cost Estimation', 'Project Management', 'Documentation'],
    features: [
      'Gestionare documentație și planuri',
      'Simulări 3D și estimări costuri AI',
      'Monitorizare șantier și rapoarte progres',
      'Management permise și autorizații'
    ],
    integrations: ['CAD Software', '3D Modeling Tools', 'Project Management', 'Document Management', 'Cost Estimation Tools'],
    thumbnail: '/agents/arhix.jpg',
    demoAvailable: true,
    trialAvailable: false
  }
];

// Export combined data
export const COMPREHENSIVE_CAEN_DATA = {
  categories: INVENT_EVOLUTION_CATEGORIES,
  caenCodes: INVENT_EVOLUTION_CAEN_CODES,
  agents: INVENT_EVOLUTION_AGENTS
};