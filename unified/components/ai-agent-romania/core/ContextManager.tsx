import { NextRouter } from 'next/router';

export interface PageContext {
  path: string;
  title: string;
  type: string;
  params?: any;
  metadata?: any;
}

export class ContextManager {
  private router: NextRouter;
  private currentContext: PageContext | null = null;

  constructor(router: NextRouter) {
    this.router = router;
    this.updateContext();
  }

  updateContext(): void {
    const path = this.router.pathname;
    const query = this.router.query;
    
    this.currentContext = {
      path,
      title: this.getPageTitle(path),
      type: this.getPageType(path),
      params: query,
      metadata: this.getPageMetadata(path)
    };
  }

  getContext(): PageContext | null {
    return this.currentContext;
  }

  private getPageTitle(path: string): string {
    const titles: { [key: string]: string } = {
      '/': 'Acasă',
      '/agents': 'Catalog Agenți',
      '/agents-caen': 'Agenți CAEN',
      '/pricing': 'Prețuri',
      '/dashboard': 'Dashboard',
      '/checkout': 'Finalizare Comandă',
      '/support': 'Suport',
      '/docs': 'Documentație',
      '/auth': 'Autentificare'
    };

    return titles[path] || 'Pagină';
  }

  private getPageType(path: string): string {
    if (path === '/') return 'landing';
    if (path.includes('/agents')) return 'catalog';
    if (path.includes('/pricing')) return 'pricing';
    if (path.includes('/dashboard')) return 'user-area';
    if (path.includes('/checkout')) return 'transaction';
    if (path.includes('/support')) return 'support';
    if (path.includes('/docs')) return 'documentation';
    if (path.includes('/auth')) return 'authentication';
    
    return 'general';
  }

  private getPageMetadata(path: string): any {
    // Context-specific metadata
    const metadata: { [key: string]: any } = {
      '/': {
        greeting: "Bună! 👋 Sunt AI AGENT ROMANIA, ghidul tău personal în lumea agenților AI.",
        suggestions: ['Vezi demo', 'Află beneficiile', 'Calculează ROI'],
        mode: 'sales',
        priority: 'conversion'
      },
      '/agents': {
        greeting: "Caut agentul perfect pentru tine! Ce problemă vrei să rezolvi?",
        suggestions: ['Automatizare email', 'Suport clienți', 'Analiză date'],
        mode: 'guide',
        priority: 'discovery'
      },
      '/agents-caen': {
        greeting: "Explorează agenții AI specializați pe industrii CAEN. Care este domeniul tău?",
        suggestions: ['Retail', 'Producție', 'Servicii', 'IT'],
        mode: 'guide',
        priority: 'filtering'
      },
      '/pricing': {
        greeting: "Te ajut să alegi planul perfect pentru nevoile tale!",
        suggestions: ['Compară planuri', 'Beneficii Enterprise', 'Perioada de probă'],
        mode: 'sales',
        priority: 'pricing'
      },
      '/checkout': {
        greeting: "Sunt aici să te ajut să finalizezi comanda. Ai întrebări?",
        suggestions: ['Metode de plată', 'Garanții', 'Suport post-vânzare'],
        mode: 'support',
        priority: 'transaction'
      },
      '/dashboard': {
        greeting: "Bine ai revenit! Cum te pot ajuta azi?",
        suggestions: ['Vezi statistici', 'Configurează agent', 'Upgrade plan'],
        mode: 'assistant',
        priority: 'user-support'
      },
      '/support': {
        greeting: "Sunt aici să rezolv orice problemă. Spune-mi ce te preocupă.",
        suggestions: ['Problemă tehnică', 'Întrebare despre facturare', 'Ghid de utilizare'],
        mode: 'support',
        priority: 'issue-resolution'
      },
      '/docs': {
        greeting: "Te ajut să navighezi prin documentație. Ce informații cauți?",
        suggestions: ['Quick Start', 'API Reference', 'Exemple de cod'],
        mode: 'technical',
        priority: 'education'
      },
      '/auth': {
        greeting: "Bine ai venit! Te ajut cu procesul de autentificare.",
        suggestions: ['Creează cont nou', 'Am uitat parola', 'Beneficii membru'],
        mode: 'onboarding',
        priority: 'authentication'
      }
    };

    return metadata[path] || {
      greeting: "Bună! Sunt AI AGENT ROMANIA. Cu ce te pot ajuta?",
      suggestions: ['Explorează platforma', 'Află mai multe', 'Contactează-ne'],
      mode: 'general',
      priority: 'general'
    };
  }

  isOnPage(pattern: string): boolean {
    return this.currentContext?.path.includes(pattern) || false;
  }

  getPageParam(key: string): any {
    return this.currentContext?.params?.[key];
  }

  destroy(): void {
    this.currentContext = null;
  }
}