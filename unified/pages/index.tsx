import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import InventEvolutionShowcase from '../components/InventEvolutionShowcase';
import SplineRobot from '../components/SplineRobot';

export default function HomePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Advanced mouse tracking for 2025 interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };

    // Enhanced scroll tracking for parallax and morphing effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Mobile menu toggle functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMobileMenu = () => {
      mobileMenu?.classList.toggle('hidden');
    };

    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            mobileMenu?.classList.add('hidden');
          }
        }
      });
    });

    // Advanced navbar morphing effect
    const navbar = document.querySelector('nav');
    const handleNavbarScroll = () => {
      if (window.scrollY > 100) {
        navbar?.classList.add('nav-scrolled');
      } else {
        navbar?.classList.remove('nav-scrolled');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleNavbarScroll);

    // Cleanup
    return () => {
      mobileMenuBtn?.removeEventListener('click', toggleMobileMenu);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleNavbarScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>AI Agents România - Marketplace Premium 2025 | Inteligență Artificială de Ultimă Generație</title>
        <meta name="description" content="Marketplace-ul premium pentru agenți AI din România 2025. Transformăm viitorul business-urilor cu inteligența artificială avansată, glassmorphism design și soluții inovatoare." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI agents, România, marketplace, inteligență artificială, 2025, glassmorphism, neomorphism" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 2025 AI-Inspired Background Container */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Dynamic AI Neural Network Background */}
        <div className="absolute inset-0 ai-neural-bg opacity-20"></div>
        
        {/* Interactive Particle System */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="ai-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 12}s`
              }}
            />
          ))}
        </div>

        {/* Advanced Gradient Morphing Background */}
        <div 
          className="absolute inset-0 ai-gradient-morph"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 35%, rgba(34, 197, 94, 0.08) 70%, transparent 100%)`
          }}
        />
      </div>

      <main className="relative z-10 min-h-screen text-white overflow-x-hidden">
        {/* 2025 Glassmorphism Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 nav-glass transition-all duration-700 ease-out">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Ultra-Modern Logo with AI Glow */}
              <div className="flex items-center gap-4">
                <div className="relative ai-logo-container">
                  <div className="w-12 h-12 ai-logo-bg rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                    <span className="text-white text-xl font-bold ai-pulse">🧠</span>
                  </div>
                  <div className="absolute inset-0 ai-logo-glow rounded-2xl"></div>
                </div>
                <div className="space-y-1">
                  <div className="text-white font-black text-xl tracking-tight ai-text-glow">
                    AI Agents România
                  </div>
                  <div className="text-cyan-400 text-xs font-semibold tracking-wider uppercase">
                    Marketplace 2025
                  </div>
                </div>
              </div>

              {/* Desktop Navigation with Glassmorphism */}
              <div className="hidden md:flex items-center space-x-1">
                {[
                  { name: 'Acasă', href: '#home', icon: '🏠' },
                  { name: 'Features', href: '#features', icon: '⚡' },
                  { name: 'Marketplace', href: '/marketplace', icon: '🛒' },
                  { name: 'Agenți CAEN', href: '/agents-caen', icon: '🏭' },
                  { name: 'Prețuri', href: '#pricing', icon: '💎' },
                  { name: 'Contact', href: '#contact', icon: '🚀' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="nav-item group px-4 py-3 rounded-2xl transition-all duration-500 ease-out"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-sm group-hover:scale-125 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="group-hover:text-cyan-300 transition-colors duration-300">
                        {item.name}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              {/* Auth Buttons with 2025 Design */}
              <div className="hidden md:flex items-center gap-3">
                {user ? (
                  <div className="flex items-center gap-3">
                    <a 
                      href="/dashboard"
                      className="nav-item px-4 py-3 text-white hover:text-cyan-400 transition-all duration-300 font-semibold rounded-2xl"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={logout}
                      className="ai-button-secondary px-6 py-3 rounded-2xl font-semibold transition-all duration-500"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <a 
                      href="/auth"
                      className="nav-item px-4 py-3 text-white hover:text-cyan-400 transition-all duration-300 font-semibold rounded-2xl"
                    >
                      Login
                    </a>
                    <a 
                      href="/auth"
                      className="ai-button-primary px-6 py-3 rounded-2xl font-bold transition-all duration-500 shadow-2xl shadow-cyan-500/25"
                    >
                      <span className="flex items-center gap-2">
                        <span>Înregistrare</span>
                        <span className="text-lg">✨</span>
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  id="mobile-menu-btn"
                  className="nav-item p-3 rounded-2xl transition-all duration-300"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div id="mobile-menu" className="md:hidden hidden">
              <div className="mobile-nav-glass rounded-3xl mt-4 p-6 space-y-4">
                {[
                  { name: 'Acasă', href: '#home', icon: '🏠' },
                  { name: 'Features', href: '#features', icon: '⚡' },
                  { name: 'Marketplace', href: '/marketplace', icon: '🛒' },
                  { name: 'Agenți CAEN', href: '/agents-caen', icon: '🏭' },
                  { name: 'Prețuri', href: '#pricing', icon: '💎' },
                  { name: 'Contact', href: '#contact', icon: '🚀' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 nav-item rounded-2xl transition-all duration-300"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-semibold">{item.name}</span>
                  </a>
                ))}
                
                {user ? (
                  <div className="pt-4 border-t border-white/10">
                    <a href="/dashboard" className="flex items-center gap-3 p-3 nav-item rounded-2xl transition-all duration-300">
                      <span className="text-lg">📊</span>
                      <span className="font-semibold">Dashboard</span>
                    </a>
                    <button onClick={logout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 rounded-2xl transition-all duration-300">
                      <span className="text-lg">🚪</span>
                      <span className="font-semibold">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <a href="/auth" className="flex items-center gap-3 p-3 nav-item rounded-2xl transition-all duration-300">
                      <span className="text-lg">🔑</span>
                      <span className="font-semibold">Login</span>
                    </a>
                    <a href="/auth" className="w-full ai-button-primary p-3 rounded-2xl font-bold text-center transition-all duration-300">
                      Înregistrare ✨
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* 2025 AI Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          
          <div className={`relative z-10 max-w-8xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Cinematic 3D Spline Robot */}
            <div className="mb-16 ai-float" style={{animationDelay: '0.2s'}}>
              <SplineRobot 
                className="mx-auto w-full max-w-4xl h-[600px] transform hover:scale-105 transition-all duration-700 ai-3d-hover" 
                sceneUrl="https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode"
              />
            </div>

            {/* Premium Status Badge */}
            <div className="mb-8 ai-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="inline-flex items-center gap-4 status-badge rounded-full px-8 py-4 transition-all duration-500 hover:scale-105">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full ai-pulse-green shadow-lg shadow-green-400/50"></span>
                  <span className="text-green-300 font-bold text-sm uppercase tracking-wider">LIVE</span>
                </span>
                <span className="text-xl">🚀</span>
                <span className="text-white font-black text-lg">Platformă Premium 2025</span>
                <span className="text-xl">⚡</span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-cyan-400 rounded-full ai-pulse-cyan shadow-lg shadow-cyan-400/50"></span>
                  <span className="text-cyan-300 font-bold text-sm uppercase tracking-wider">AI</span>
                </span>
              </div>
            </div>
            
            {/* Ultra-Modern Typography */}
            <div className="mb-12 ai-slide-up" style={{animationDelay: '0.6s'}}>
              <h1 className="hero-title mb-8">
                <span className="block text-white mb-4 leading-tight">
                  Marketplace-ul
                </span>
                <span className="block relative leading-tight">
                  {/* Multiple Layered Text Effects for Maximum Impact */}
                  <span className="hero-title-bg absolute inset-0">
                    AI Agents România
                  </span>
                  <span className="hero-title-main relative">
                    AI Agents România
                  </span>
                  <span className="hero-title-glow absolute inset-0">
                    AI Agents România
                  </span>
                  <span className="hero-title-shine absolute inset-0">
                    AI Agents România
                  </span>
                </span>
              </h1>

              <div className="space-y-8">
                <p className="hero-subtitle max-w-6xl mx-auto">
                  Prima platformă din România dedicată agenților AI cu design de ultimă generație
                </p>
                
                <p className="hero-description max-w-5xl mx-auto">
                  Transformăm viitorul business-urilor cu{' '}
                  <span className="relative inline-block">
                    <span className="hero-highlight-bg absolute inset-0">
                      inteligența artificială avansată 2025
                    </span>
                    <span className="hero-highlight relative">
                      inteligența artificială avansată 2025
                    </span>
                  </span>
                </p>

                {/* Company Brand Enhancement */}
                <div className="flex items-center justify-center gap-6 mt-12">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  <div className="company-brand px-6 py-3 rounded-2xl">
                    <p className="text-lg font-medium text-gray-200">
                      Dezvoltat de{' '}
                      <span className="relative">
                        <span className="company-name-bg absolute inset-0">
                          Invent Evolution SRL
                        </span>
                        <span className="company-name relative">
                          Invent Evolution SRL
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent via-purple-400 to-transparent"></div>
                </div>
                
                <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed italic text-lg">
                  Revoluționăm viitorul cu inteligența artificială și design inovator
                </p>
              </div>
            </div>

            {/* 2025 Action Buttons */}
            <div className="mb-20 flex flex-col sm:flex-row items-center justify-center gap-6 ai-slide-up" style={{animationDelay: '0.8s'}}>
              <button className="ai-button-hero group relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-3 px-10 py-5">
                  <span className="text-xl">🚀</span>
                  <span className="font-black text-xl">Explorează Agenții AI</span>
                  <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="ai-button-hero-glow absolute inset-0"></div>
              </button>

              <button className="ai-button-secondary group relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-3 px-10 py-5">
                  <span className="text-xl">▶️</span>
                  <span className="font-black text-xl">Demo Live</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full ai-pulse-green shadow-lg shadow-green-400/50"></div>
                </div>
              </button>
            </div>

            {/* Enhanced Stats Grid with Glassmorphism */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto ai-slide-up" style={{animationDelay: '1s'}}>
              {[
                { number: "500+", label: "AI Agents", icon: "🤖", gradient: "from-blue-400 to-cyan-400" },
                { number: "25K+", label: "Utilizatori", icon: "👥", gradient: "from-purple-400 to-pink-400" },
                { number: "99.9%", label: "Uptime", icon: "⚡", gradient: "from-green-400 to-emerald-400" },
                { number: "24/7", label: "Suport", icon: "🛡️", gradient: "from-orange-400 to-red-400" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="stats-card group cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                  style={{animationDelay: `${1.2 + index * 0.1}s`}}
                >
                  <div className="relative z-10 text-center p-6">
                    <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className={`stats-number bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="stats-label group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                  <div className="stats-card-glow absolute inset-0"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-indicator" 
            onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
          >
            <div className="scroll-indicator-container">
              <div className="scroll-indicator-dot"></div>
            </div>
            <div className="text-white/60 text-sm mt-3 font-medium">Scroll pentru mai multe</div>
          </div>
        </section>

        {/* 2025 Features Section */}
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 status-badge rounded-full px-6 py-3 mb-8">
                <span className="text-cyan-400 text-xl">⚡</span>
                <span className="text-white font-bold uppercase tracking-wider text-sm">Features Premium</span>
                <span className="text-purple-400 text-xl">🚀</span>
              </div>
              
              <h2 className="section-title mb-8">
                De ce să alegi <span className="section-title-highlight">AI Agents România</span>?
              </h2>
              
              <p className="section-subtitle max-w-4xl mx-auto">
                Oferim cea mai avansată platformă de agenți AI din România, 
                cu design 2025, tehnologie de vârf și suport specializat.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "⚡",
                  title: "Performanță Extremă",
                  description: "Agenții noștri AI sunt optimizați pentru viteza maximă, oferind răspunsuri în timp real cu latență sub 50ms și procesare neurală avansată.",
                  gradient: "from-yellow-400 via-orange-400 to-red-400",
                  glowColor: "yellow-400"
                },
                {
                  icon: "🛡️",
                  title: "Securitate Enterprise",
                  description: "Protecție avansată cu criptare cuantică, conformitate GDPR completă și certificări internaționale de securitate pentru 2025.",
                  gradient: "from-green-400 via-emerald-400 to-teal-400",
                  glowColor: "green-400"
                },
                {
                  icon: "🚀",
                  title: "Integrare Ultra-Rapidă",
                  description: "API REST de ultimă generație cu SDK-uri pentru toate limbajele și documentație AI-powered pentru integrare în secunde.",
                  gradient: "from-purple-400 via-pink-400 to-rose-400",
                  glowColor: "purple-400"
                },
                {
                  icon: "🧠",
                  title: "AI Neural Networks",
                  description: "Rețele neurale profunde cu învățare adaptivă și procesare contextuală pentru înțelegerea perfectă a nevoilor business-ului.",
                  gradient: "from-blue-400 via-indigo-400 to-purple-400",
                  glowColor: "blue-400"
                },
                {
                  icon: "🎯",
                  title: "Personalizare Avansată",
                  description: "Algoritmi de machine learning care se adaptează automat la stilul și preferințele fiecărui utilizator pentru experiențe unice.",
                  gradient: "from-cyan-400 via-blue-400 to-indigo-400",
                  glowColor: "cyan-400"
                },
                {
                  icon: "🌍",
                  title: "Cloud Global",
                  description: "Infrastructură distribuită pe 5 continente cu auto-scaling, backup în timp real și disponibilitate garantată 99.99%.",
                  gradient: "from-emerald-400 via-green-400 to-lime-400",
                  glowColor: "emerald-400"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="relative z-10 p-8">
                    <div className="mb-6">
                      <div className={`feature-icon bg-gradient-to-r ${feature.gradient} shadow-2xl shadow-${feature.glowColor}/25`}>
                        <span className="text-3xl ai-float" style={{animationDelay: `${index * 0.2}s`}}>
                          {feature.icon}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="feature-title mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                      {feature.title}
                    </h3>
                    
                    <p className="feature-description group-hover:text-white transition-colors duration-500">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="feature-card-glow absolute inset-0"></div>
                  <div className="feature-card-border absolute inset-0"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Invent Evolution Showcase */}
        <div className="relative">
          <InventEvolutionShowcase />
        </div>

        {/* Testimonials & Case Studies Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 status-badge rounded-full px-6 py-3 mb-8">
                <span className="text-yellow-400 text-xl">⭐</span>
                <span className="text-white font-bold uppercase tracking-wider text-sm">Păreri Clienți</span>
                <span className="text-green-400 text-xl">💬</span>
              </div>
              
              <h2 className="section-title mb-8">
                Ce spun <span className="section-title-highlight">clienții noștri</span>
              </h2>
              
              <p className="section-subtitle max-w-4xl mx-auto">
                Peste 500+ companii din România și-au transformat business-ul cu ajutorul platformei noastre AI.
                Iată câteva dintre poveștile lor de succes.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  name: "Maria Popescu",
                  role: "CEO, TechStart SRL",
                  company: "Startup Tehnologic",
                  rating: 5,
                  testimonial: "Platforma AI Agents România ne-a ajutat să automatizăm 80% din procesele de customer service. Economisim 15.000€ lunar și clienții sunt mult mai mulțumiți.",
                  results: "80% automatizare, 15.000€ economii/lună",
                  location: "București"
                },
                {
                  name: "Alexandru Ionescu",
                  role: "Founder, EcomSuccess",
                  company: "E-commerce",
                  rating: 5,
                  testimonial: "Am integrat agenții AI în magazinul online și vânzările au crescut cu 150%. Recomandările personalizate funcționează perfect!",
                  results: "150% creștere vânzări, ROI 300%",
                  location: "Cluj-Napoca"
                },
                {
                  name: "Elena Marin",
                  role: "Marketing Director, FashionCorp",
                  company: "Retail Fashion",
                  rating: 5,
                  testimonial: "Agenții AI gestionează toate campaniile noastre de marketing. Conversiile au crescut cu 200% iar costurile s-au redus cu 60%.",
                  results: "200% mai multe conversii, -60% costuri",
                  location: "Iași"
                },
                {
                  name: "Mihai Georgescu",
                  role: "CTO, FinanceCore",
                  company: "Servicii Financiare",
                  rating: 5,
                  testimonial: "Securitatea enterprise și conformitatea GDPR sunt excepționale. Perfect pentru domeniul financiar. Suportul 24/7 este fantastic.",
                  results: "100% securitate, conformitate GDPR",
                  location: "Timișoara"
                },
                {
                  name: "Ana Dumitrescu",
                  role: "Operations Manager, LogiTrans",
                  company: "Transport & Logistică",
                  rating: 5,
                  testimonial: "Optimizarea rutelor cu AI ne economisește 25% din combustibil. Integrarea a fost rapidă, echipa de suport este profesionistă.",
                  results: "25% economii combustibil, optimizare rute",
                  location: "Constanța"
                },
                {
                  name: "Bogdan Radu",
                  role: "Head of Sales, PropertyPro",
                  company: "Real Estate",
                  rating: 5,
                  testimonial: "Lead-urile calificate automat de AI au crescut vânzările cu 180%. Cel mai bun investiție tech făcută vreodată!",
                  results: "180% creștere vânzări, lead-uri calificate",
                  location: "Brașov"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="testimonial-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="relative z-10 p-8">
                    
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">⭐</span>
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="testimonial-text mb-6">
                      "{testimonial.testimonial}"
                    </blockquote>
                    
                    {/* Results */}
                    <div className="results-badge mb-6">
                      <span className="text-green-400 font-bold text-sm">📈 {testimonial.results}</span>
                    </div>
                    
                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="author-avatar">
                        <span className="text-2xl">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="author-name">{testimonial.name}</div>
                        <div className="author-role">{testimonial.role}</div>
                        <div className="author-company">{testimonial.company} • {testimonial.location}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="testimonial-card-glow absolute inset-0"></div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="text-center">
              <div className="inline-flex items-center gap-8 status-badge rounded-full px-8 py-6">
                <div className="text-center">
                  <div className="trust-stat text-green-400 mb-1">500+</div>
                  <div className="trust-label">Clienți Activi</div>
                </div>
                <div className="w-1 h-8 bg-gray-600 rounded-full"></div>
                <div className="text-center">
                  <div className="trust-stat text-blue-400 mb-1">98.5%</div>
                  <div className="trust-label">Satisfacție</div>
                </div>
                <div className="w-1 h-8 bg-gray-600 rounded-full"></div>
                <div className="text-center">
                  <div className="trust-stat text-purple-400 mb-1">150M+</div>
                  <div className="trust-label">Interacțiuni AI</div>
                </div>
                <div className="w-1 h-8 bg-gray-600 rounded-full"></div>
                <div className="text-center">
                  <div className="trust-stat text-cyan-400 mb-1">24/7</div>
                  <div className="trust-label">Suport Expert</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2025 Pricing Section */}
        <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 status-badge rounded-full px-6 py-3 mb-8">
                <span className="text-purple-400 text-xl">💎</span>
                <span className="text-white font-bold uppercase tracking-wider text-sm">Prețuri Transparente</span>
                <span className="text-cyan-400 text-xl">💰</span>
              </div>
              
              <h2 className="section-title mb-8">
                Planuri pentru <span className="section-title-highlight">fiecare business</span>
              </h2>
              
              <p className="section-subtitle max-w-4xl mx-auto">
                De la startup-uri la enterprise. Alege planul potrivit și 
                începe să economisești timp și bani cu AI în 2025.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Starter",
                  price: "99",
                  period: "lună",
                  originalPrice: "149",
                  discount: "33% REDUCERE",
                  description: "Ideal pentru startup-uri și freelanceri care vor să automatizeze procesele",
                  features: [
                    "5 agenți AI activi simultan",
                    "5.000 interacțiuni incluse/lună",
                    "Suport email prioritar (răspuns în 2h)",
                    "Dashboard modern cu analytics",
                    "API REST complet + documentație",
                    "10 integrări standard (WhatsApp, Email, etc.)",
                    "Training online gratuit (3 sesiuni)",
                    "Backup automat zilnic"
                  ],
                  icon: "🚀",
                  gradient: "from-blue-600 via-cyan-600 to-teal-600",
                  popular: false,
                  glowColor: "blue-500"
                },
                {
                  name: "Business",
                  price: "299",
                  period: "lună",
                  originalPrice: "399",
                  discount: "25% REDUCERE",
                  description: "Perfect pentru companii în creștere cu volume medii-mari",
                  features: [
                    "20 agenți AI activi simultan",
                    "25.000 interacțiuni incluse/lună",
                    "Suport prioritar 24/7 (chat + telefon)",
                    "Dashboard avansat cu BI și rapoarte",
                    "API complet + webhooks + GraphQL",
                    "Integrări custom nelimitate",
                    "Manager de cont dedicat",
                    "Training personalizat (10 sesiuni)",
                    "Backup automat 3x/zi + versioning",
                    "White-label opțional",
                    "SLA 99.9% garantat"
                  ],
                  icon: "🏢",
                  gradient: "from-purple-600 via-pink-600 to-rose-600",
                  popular: true,
                  glowColor: "purple-500"
                },
                {
                  name: "Enterprise",
                  price: "899",
                  period: "lună",
                  originalPrice: "1299",
                  discount: "31% REDUCERE",
                  description: "Soluție completă pentru corporații și volume enterprise",
                  features: [
                    "Agenți AI nelimitați",
                    "Interacțiuni nelimitate",
                    "Suport dedicat 24/7 cu escalare",
                    "Dashboard enterprise cu AI Analytics",
                    "SLA 99.99% cu penalități",
                    "Securitate enterprise (ISO 27001)",
                    "AI training personalizat pe datele tale",
                    "Echipă dedicată (manager + 2 dezvoltatori)",
                    "Implementare on-premise sau cloud privat",
                    "Consultanță strategică lunară",
                    "Integrări enterprise (SAP, Oracle, etc.)",
                    "Compliance GDPR complet",
                    "Disaster recovery < 5min",
                    "Custom AI models pentru industria ta"
                  ],
                  icon: "🏭",
                  gradient: "from-emerald-600 via-green-600 to-lime-600",
                  popular: false,
                  glowColor: "emerald-500"
                }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`pricing-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4 ${
                    plan.popular ? 'pricing-card-popular' : ''
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {plan.popular && (
                    <div className="popular-badge absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-full text-white font-bold text-sm shadow-2xl shadow-purple-500/50 ai-pulse">
                        <span className="flex items-center gap-2">
                          <span>🔥</span>
                          <span>CEL MAI POPULAR</span>
                          <span>🔥</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-8">
                    
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`pricing-icon bg-gradient-to-r ${plan.gradient} shadow-2xl shadow-${plan.glowColor}/25 mb-6`}>
                        <span className="text-white text-3xl ai-float" style={{animationDelay: `${index * 0.3}s`}}>
                          {plan.icon}
                        </span>
                      </div>
                      
                      <h3 className="pricing-title mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                        {plan.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>
                      
                      {/* Discount Badge */}
                      {plan.discount && (
                        <div className="pricing-discount-badge">
                          {plan.discount}
                        </div>
                      )}
                      
                      <div className="pricing-price-container mb-2">
                        {/* Original Price */}
                        {plan.originalPrice && (
                          <div className="pricing-original-price">
                            <span>€{plan.originalPrice}/{plan.period}</span>
                          </div>
                        )}
                        
                        {/* Current Price */}
                        <div className="pricing-current-price">
                          <span className="pricing-price group-hover:ai-pulse transition-all duration-300">
                            {plan.price}
                          </span>
                          <span className="text-gray-400 font-medium">€/{plan.period}</span>
                        </div>
                        
                        {/* Savings */}
                        {plan.originalPrice && (
                          <div className="pricing-savings">
                            Economii: €{parseInt(plan.originalPrice) - parseInt(plan.price)}/{plan.period}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-gray-500 text-xs">
                        {plan.name === 'Enterprise' ? 'Facturate anual' : 'Fără contract pe termen lung'}
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
                          <span className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-green-400/25">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-sm font-medium leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-500 transform hover:scale-105 shadow-2xl relative overflow-hidden group ${
                      plan.popular
                        ? 'pricing-button-popular'
                        : 'pricing-button-normal'
                    }`}>
                      <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                        {plan.popular ? (
                          <>
                            <span>🚀</span>
                            <span>Începe acum</span>
                            <span>✨</span>
                          </>
                        ) : (
                          <>
                            <span>📝</span>
                            <span>Alege planul</span>
                          </>
                        )}
                      </span>
                      <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${plan.gradient}`}></div>
                    </button>
                  </div>
                  
                  <div className="pricing-card-glow absolute inset-0"></div>
                  <div className="pricing-card-border absolute inset-0"></div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="text-center">
              <div className="inline-flex items-center gap-6 status-badge rounded-full px-8 py-4 mb-8">
                <span className="flex items-center gap-2">
                  <span className="text-green-400">🔒</span>
                  <span className="text-sm font-medium">SSL & GDPR</span>
                </span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="flex items-center gap-2">
                  <span className="text-blue-400">💾</span>
                  <span className="text-sm font-medium">Backup automat</span>
                </span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="flex items-center gap-2">
                  <span className="text-purple-400">🇷🇴</span>
                  <span className="text-sm font-medium">Suport în română</span>
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="ai-button-secondary px-8 py-4 rounded-2xl font-semibold transition-all duration-500">
                  <span className="flex items-center gap-2">
                    <span>💬</span>
                    <span>Vorbește cu un expert</span>
                  </span>
                </button>
                <button className="ai-button-secondary px-8 py-4 rounded-2xl font-semibold transition-all duration-500">
                  <span className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Calculează economiile</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 status-badge rounded-full px-6 py-3 mb-8">
                <span className="text-blue-400 text-xl">❓</span>
                <span className="text-white font-bold uppercase tracking-wider text-sm">Întrebări Frecvente</span>
                <span className="text-green-400 text-xl">💡</span>
              </div>
              
              <h2 className="section-title mb-8">
                Răspunsuri la <span className="section-title-highlight">întrebările tale</span>
              </h2>
              
              <p className="section-subtitle max-w-4xl mx-auto">
                Tot ce trebuie să știi despre platforma AI Agents România. 
                Dacă nu găsești răspunsul, contactează-ne direct.
              </p>
            </div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  category: "General",
                  questions: [
                    {
                      q: "Ce sunt agenții AI și cum funcționează?",
                      a: "Agenții AI sunt programe inteligente care pot automatiza sarcini complexe precum customer service, vânzări, marketing și analiză de date. Folosesc tehnologii avansate de procesare a limbajului natural și machine learning pentru a înțelege și răspunde la solicitări în timp real."
                    },
                    {
                      q: "Cât timp durează implementarea?",
                      a: "Implementarea de bază durează 24-48 ore. Pentru personalizări complexe, durata poate fi de 1-2 săptămâni. Echipa noastră te ghidează pas cu pas și oferă training complet."
                    },
                    {
                      q: "Este platforma sigură pentru datele companiei?",
                      a: "Da, absolut! Folosim criptare end-to-end, suntem GDPR compliant și avem certificări ISO 27001. Datele tale sunt stocate în servere securizate în UE și nu sunt niciodată partajate cu terțe părți."
                    }
                  ]
                },
                {
                  category: "Tehnic",
                  questions: [
                    {
                      q: "Ce integrări sunt disponibile?",
                      a: "Integrăm cu 200+ platforme: Shopify, WooCommerce, Salesforce, HubSpot, WhatsApp Business, Facebook Messenger, website-uri custom prin API REST. Dacă nu găsești integrarea dorită, o creăm custom."
                    },
                    {
                      q: "Pot testa platforma înainte de abonare?",
                      a: "Da! Oferim o perioadă de probă gratuită de 14 zile cu acces complet la toate funcționalitățile. Plus, consultația inițială este întotdeauna gratuită."
                    },
                    {
                      q: "Ce se întâmplă dacă vreau să anulez abonamentul?",
                      a: "Poți anula oricând fără penalități. Îți exportăm toate datele în format standard și păstrezi accesul până la sfârșitul perioadei plătite."
                    }
                  ]
                },
                {
                  category: "Prețuri",
                  questions: [
                    {
                      q: "Există costuri ascunse?",
                      a: "Nu, absolut niciun cost ascuns! Prețurile afișate includ toate funcționalitățile. Plătești doar ce folosești, fără surprize neplăcute."
                    },
                    {
                      q: "Pot schimba planul oricând?",
                      a: "Da, poți face upgrade sau downgrade oricând. Schimbările se aplică imediat și facturarea se ajustează pro-rata pentru perioada rămasă."
                    },
                    {
                      q: "Oferă reduceri pentru contracte anuale?",
                      a: "Da! Pentru plata anuală oferim 20% reducere plus 2 luni gratuite. Pentru contracte enterprise (2+ ani) reducerile pot ajunge până la 35%."
                    }
                  ]
                },
                {
                  category: "Suport",
                  questions: [
                    {
                      q: "Ce fel de suport primiți?",
                      a: "Suport complet în română 24/7: chat live, email, telefon, WhatsApp. Plus training gratuit, documentație detaliată și manager de cont dedicat pentru planurile Business și Enterprise."
                    },
                    {
                      q: "Cât de repede primiții răspuns la întrebări?",
                      a: "Chat live: sub 30 secunde, Email: max 2 ore, Telefon: imediat în programul 09:00-18:00. Pentru urgențe enterprise: răspuns în max 15 minute, 24/7."
                    },
                    {
                      q: "Oferă training pentru echipa noastră?",
                      a: "Da! Training gratuit pentru toate planurile: sesiuni live, documentație video, ghiduri pas-cu-pas. Pentru Enterprise: training on-site și certificare oficială."
                    }
                  ]
                }
              ].map((category, categoryIndex) => (
                <div key={categoryIndex} className="faq-category">
                  <h3 className="faq-category-title mb-6">
                    <span className="category-icon">📂</span>
                    {category.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="faq-item group cursor-pointer transition-all duration-300">
                        <div className="faq-question">
                          <span className="question-icon group-hover:rotate-45 transition-transform duration-300">➕</span>
                          <span className="question-text">{faq.q}</span>
                        </div>
                        <div className="faq-answer">
                          {faq.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Help */}
            <div className="text-center mt-20">
              <div className="help-cta-card group cursor-pointer transition-all duration-700 hover:scale-105">
                <div className="relative z-10 p-8">
                  <div className="help-icon mb-4">
                    <span className="text-4xl">🤝</span>
                  </div>
                  
                  <h3 className="help-title mb-4">
                    Nu găsești răspunsul?
                  </h3>
                  
                  <p className="help-description mb-6">
                    Echipa noastră de experți este gata să te ajute cu orice întrebare specifică.
                    Contactează-ne direct pentru un răspuns personalizat.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#contact" className="help-button primary">
                      <span>💬</span>
                      <span>Chat Live</span>
                    </a>
                    <a href="mailto:contact@ai-agents-romania.com" className="help-button secondary">
                      <span>📧</span>
                      <span>Trimite Email</span>
                    </a>
                  </div>
                </div>
                
                <div className="help-cta-glow absolute inset-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 status-badge rounded-full px-6 py-3 mb-8">
                <span className="text-cyan-400 text-xl">⚙️</span>
                <span className="text-white font-bold uppercase tracking-wider text-sm">Specificații Tehnice</span>
                <span className="text-purple-400 text-xl">🔧</span>
              </div>
              
              <h2 className="section-title mb-8">
                Tehnologie <span className="section-title-highlight">de ultimă generație</span>
              </h2>
              
              <p className="section-subtitle max-w-4xl mx-auto">
                Platforma noastră folosește cele mai avansate tehnologii AI disponibile în 2025,
                optimizate pentru performanță maximă și siguranță enterprise.
              </p>
            </div>

            {/* Tech Specs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              
              {/* AI & Machine Learning */}
              <div className="tech-spec-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4">
                <div className="relative z-10 p-8">
                  <div className="spec-icon mb-6">
                    <span className="text-4xl">🧠</span>
                  </div>
                  
                  <h3 className="spec-title mb-4">AI & Machine Learning</h3>
                  
                  <ul className="spec-list">
                    <li>GPT-4 Turbo & Claude-3 Opus</li>
                    <li>Rețele neurale custom</li>
                    <li>Procesare NLP avansată</li>
                    <li>Computer Vision</li>
                    <li>Predictive Analytics</li>
                    <li>AutoML pentru optimizare</li>
                  </ul>
                </div>
                <div className="tech-spec-glow absolute inset-0"></div>
              </div>

              {/* Infrastructure */}
              <div className="tech-spec-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4">
                <div className="relative z-10 p-8">
                  <div className="spec-icon mb-6">
                    <span className="text-4xl">☁️</span>
                  </div>
                  
                  <h3 className="spec-title mb-4">Infrastructură Cloud</h3>
                  
                  <ul className="spec-list">
                    <li>Multi-cloud: AWS + Azure</li>
                    <li>Auto-scaling în timp real</li>
                    <li>CDN global pentru viteză</li>
                    <li>99.99% uptime garantat</li>
                    <li>Backup automat 3x zilnic</li>
                    <li>Disaster recovery &lt; 5min</li>
                  </ul>
                </div>
                <div className="tech-spec-glow absolute inset-0"></div>
              </div>

              {/* Security */}
              <div className="tech-spec-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4">
                <div className="relative z-10 p-8">
                  <div className="spec-icon mb-6">
                    <span className="text-4xl">🔒</span>
                  </div>
                  
                  <h3 className="spec-title mb-4">Securitate Enterprise</h3>
                  
                  <ul className="spec-list">
                    <li>Criptare AES-256 end-to-end</li>
                    <li>Autentificare multi-factor</li>
                    <li>ISO 27001 & SOC 2 Type II</li>
                    <li>GDPR & CCPA compliant</li>
                    <li>Penetration testing lunar</li>
                    <li>Zero-trust architecture</li>
                  </ul>
                </div>
                <div className="tech-spec-glow absolute inset-0"></div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="performance-metrics-card group cursor-pointer transition-all duration-700 hover:scale-105">
              <div className="relative z-10 p-8">
                <h3 className="performance-title mb-8">
                  <span className="title-icon">📊</span>
                  Metrici de Performanță Garanții
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="metric-item">
                    <div className="metric-value text-green-400">&lt; 50ms</div>
                    <div className="metric-label">Latență răspuns</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value text-blue-400">99.99%</div>
                    <div className="metric-label">Disponibilitate</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value text-purple-400">1M+</div>
                    <div className="metric-label">Requests/secundă</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value text-cyan-400">&lt; 5min</div>
                    <div className="metric-label">Recovery time</div>
                  </div>
                </div>
              </div>
              
              <div className="performance-metrics-glow absolute inset-0"></div>
            </div>

            {/* API Documentation */}
            <div className="api-docs-card group cursor-pointer transition-all duration-700 hover:scale-105 mt-8">
              <div className="relative z-10 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Side */}
                  <div>
                    <h3 className="api-title mb-6">
                      <span className="title-icon">🔌</span>
                      API REST Complet
                    </h3>
                    
                    <p className="api-description mb-6">
                      Documentație completă, SDK-uri pentru toate limbajele populare,
                      exemple de cod și playground interactiv pentru testare.
                    </p>
                    
                    <div className="api-features">
                      <div className="feature-row">
                        <span className="feature-icon">✅</span>
                        <span>RESTful API cu rate limiting inteligent</span>
                      </div>
                      <div className="feature-row">
                        <span className="feature-icon">✅</span>
                        <span>Webhooks pentru notificări în timp real</span>
                      </div>
                      <div className="feature-row">
                        <span className="feature-icon">✅</span>
                        <span>SDK-uri: Python, JavaScript, PHP, C#, Java</span>
                      </div>
                      <div className="feature-row">
                        <span className="feature-icon">✅</span>
                        <span>GraphQL pentru query-uri complexe</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="api-code-example">
                    <div className="code-header">
                      <div className="code-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                      </div>
                      <span className="code-title">API Example</span>
                    </div>
                    <div className="code-content">
                      <pre className="code-block">
{`// Inițializare agent AI
const agent = new AIAgent({
  apiKey: 'your-api-key',
  model: 'gpt-4-turbo'
});

// Procesare mesaj
const response = await agent.chat({
  message: 'Ajută-mă cu această problemă',
  context: 'customer-support',
  language: 'ro'
});

console.log(response.message);
// → "Bună! Cu drag te ajut. 
//    Ce problemă întâmpini?"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="api-docs-glow absolute inset-0"></div>
            </div>
          </div>
        </section>

        {/* 2025 Contact Section */}
        <section id="contact" className="py-40 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-8xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 status-badge rounded-full px-6 py-3 mb-8">
                <span className="text-green-400 text-xl">📞</span>
                <span className="text-white font-bold uppercase tracking-wider text-sm">Contact Premium</span>
                <span className="text-cyan-400 text-xl">💎</span>
              </div>
              
              <h2 className="section-title mb-8">
                Începe <span className="section-title-highlight">transformarea</span> astăzi
              </h2>
              
              <p className="section-subtitle max-w-4xl mx-auto mb-8">
                Echipa noastră de experți AI este gata să îți răspundă la toate întrebările 
                și să te ghideze către soluția perfectă pentru business-ul tău.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full ai-pulse-green"></span>
                  <span className="font-semibold">Online acum</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="text-gray-400 font-medium">Răspuns în max 15 min</div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="text-gray-400 font-medium">Consultația inițială gratuită</div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              
              {/* Email Contact */}
              <div className="contact-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4">
                <div className="relative z-10 text-center p-8">
                  <div className="contact-icon bg-gradient-to-r from-blue-600 to-cyan-600 shadow-2xl shadow-blue-500/25 mb-6">
                    <span className="text-white text-3xl ai-pulse">📧</span>
                  </div>
                  
                  <h3 className="contact-title mb-3">Email Support</h3>
                  <p className="contact-description mb-6">
                    Trimite-ne un email detaliat și vei primi un răspuns complet în maxim 1 oră.
                  </p>
                  
                  <a href="mailto:contact@ai-agents-romania.com" className="contact-button bg-blue-600/20 border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-600/40">
                    <span>contact@ai-agents-romania.com</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="contact-card-glow absolute inset-0"></div>
              </div>

              {/* WhatsApp Contact */}
              <div className="contact-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4">
                <div className="relative z-10 text-center p-8">
                  <div className="contact-icon bg-gradient-to-r from-green-600 to-emerald-600 shadow-2xl shadow-green-500/25 mb-6">
                    <span className="text-white text-3xl ai-pulse">📱</span>
                  </div>
                  
                  <h3 className="contact-title mb-3">WhatsApp Direct</h3>
                  <p className="contact-description mb-4">
                    Contactează-ne prin WhatsApp pentru consultanță rapidă și răspunsuri imediate.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full ai-pulse-green"></span>
                      <span className="font-medium">Disponibil Luni-Vineri 9:00-18:00</span>
                    </div>
                    <a href="https://wa.me/40744859100" target="_blank" rel="noopener noreferrer" className="contact-button bg-green-600/20 border-green-500/30 text-green-400 hover:text-white hover:bg-green-600/40">
                      <span>📱 0744 859 100</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="contact-card-glow absolute inset-0"></div>
              </div>

              {/* Live Chat */}
              <div className="contact-card group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4">
                <div className="relative z-10 text-center p-8">
                  <div className="contact-icon bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/25 mb-6">
                    <span className="text-white text-3xl ai-pulse">💬</span>
                  </div>
                  
                  <h3 className="contact-title mb-3">Live Chat AI</h3>
                  <p className="contact-description mb-4">
                    Chat în timp real cu specialiștii noștri pentru suport tehnic instantaneu.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <span className="w-2 h-2 bg-purple-400 rounded-full ai-pulse-purple"></span>
                      <span className="font-medium">Răspuns în 30 secunde</span>
                    </div>
                    <button className="contact-button bg-purple-600/20 border-purple-500/30 text-purple-400 hover:text-white hover:bg-purple-600/40">
                      <span>Începe Chat-ul</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="contact-card-glow absolute inset-0"></div>
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="consultation-card group cursor-pointer transition-all duration-700 hover:scale-105">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side */}
                <div className="space-y-8">
                  <div>
                    <h3 className="consultation-title mb-4">
                      Consultația Premium Gratuită
                    </h3>
                    <p className="consultation-description">
                      Rezervă-ți o sesiune de consultanță personalizată cu experții noștri AI și descoperă 
                      cum putem transforma business-ul tău cu soluții de ultimă generație 2025.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { title: "Analiză Completă Gratuită", desc: "Evaluăm nevoile business-ului tău și identificăm oportunități", gradient: "from-green-400 to-blue-400" },
                      { title: "Demonstrație Live", desc: "Vezi în timp real cum funcționează agenții AI pentru domeniul tău", gradient: "from-blue-400 to-purple-400" },
                      { title: "Plan Personalizat", desc: "Primești o strategie detaliată de implementare adaptată", gradient: "from-purple-400 to-pink-400" },
                      { title: "Suport Continuu", desc: "Acces la echipa noastră de experți pe toată durata colaborării", gradient: "from-green-400 to-emerald-400" }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ai-float`} style={{animationDelay: `${index * 0.1}s`}}>
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 text-lg">{benefit.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trust Signals */}
                  <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                    <div className="text-center">
                      <div className="consultation-stat text-green-400 mb-1">500+</div>
                      <div className="text-xs text-gray-400 font-medium">Clienți Mulțumiți</div>
                    </div>
                    <div className="text-center">
                      <div className="consultation-stat text-blue-400 mb-1">98%</div>
                      <div className="text-xs text-gray-400 font-medium">Rata Satisfacție</div>
                    </div>
                    <div className="text-center">
                      <div className="consultation-stat text-purple-400 mb-1">24/7</div>
                      <div className="text-xs text-gray-400 font-medium">Support Premium</div>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 status-badge rounded-full px-4 py-2 mb-8">
                      <span className="w-2 h-2 bg-green-400 rounded-full ai-pulse-green"></span>
                      <span className="text-green-400 font-semibold text-sm">Specialiștii noștri sunt online</span>
                    </div>
                    
                    <button className="w-full consultation-cta-button group mb-8">
                      <span className="relative z-10 flex items-center justify-center gap-3 px-10 py-6">
                        <span className="text-2xl">🚀</span>
                        <span className="font-black text-xl">Programează Consultația Gratuită</span>
                        <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <div className="consultation-cta-glow absolute inset-0"></div>
                    </button>

                    <div className="text-center text-gray-400 text-sm mb-8">
                      Sau alege una din opțiunile de mai sus pentru contact rapid
                    </div>

                    {/* Quick Contact Options */}
                    <div className="grid grid-cols-2 gap-4">
                      <a href="mailto:contact@ai-agents-romania.com" className="quick-contact-button group">
                        <span className="text-blue-400 text-xl group-hover:scale-125 transition-transform duration-300">📧</span>
                        <span className="text-sm font-semibold">Email Direct</span>
                      </a>
                      <a href="https://wa.me/40744859100" target="_blank" rel="noopener noreferrer" className="quick-contact-button group">
                        <span className="text-green-400 text-xl group-hover:scale-125 transition-transform duration-300">📱</span>
                        <span className="text-sm font-semibold">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="consultation-card-glow absolute inset-0"></div>
            </div>

            {/* Bottom Info */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-6 status-badge rounded-full px-8 py-4">
                <span className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">⚡</span>
                  <span className="text-sm font-bold">Răspuns garantat în 15 minute</span>
                </span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="text-sm font-medium">Consultația inițială 100% gratuită</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="text-sm font-medium">Fără obligații</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2025 Enhanced Footer */}
        <footer className="bg-gradient-to-b from-gray-900/50 to-gray-950 border-t border-white/10 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 ai-neural-bg opacity-5"></div>
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/30 rounded-full ai-pulse"></div>
            <div className="absolute bottom-10 right-10 w-3 h-3 bg-purple-400/30 rounded-full ai-pulse"></div>
          </div>

          <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
              
              {/* Company Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 ai-logo-bg rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                    <span className="text-white text-2xl ai-pulse">🧠</span>
                  </div>
                  <div>
                    <div className="text-white font-black text-xl ai-text-glow">AI Agents România</div>
                    <div className="text-cyan-400 text-sm font-bold">Marketplace Premium 2025</div>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  Prima platformă din România dedicată agenților AI cu design de ultimă generație. 
                  Transformăm viitorul business-urilor cu inteligența artificială avansată.
                </p>

                {/* Company Details */}
                <div className="space-y-3 text-sm">
                  <div className="footer-info-item">
                    <span className="text-blue-400">🏢</span>
                    <a href="https://www.inventevolution.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                      INVENT EVOLUTION S.R.L.
                    </a>
                  </div>
                  <div className="footer-info-item">
                    <span className="text-green-400">🆔</span>
                    <span>CUI: RO49679100</span>
                  </div>
                  <div className="footer-info-item">
                    <span className="text-purple-400">🏛️</span>
                    <span>J2024000750228</span>
                  </div>
                  <div className="footer-info-item">
                    <span className="text-cyan-400">🌍</span>
                    <span>EUID: ROONRC.J2024000750228</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-6">
                  <div className="text-white text-sm font-bold mb-4">Metode de plată securizate:</div>
                  <div className="flex items-center gap-3">
                    <div className="payment-badge bg-gradient-to-r from-blue-600 to-purple-600">
                      💳 STRIPE
                    </div>
                    <div className="payment-badge-secondary">
                      🏪 ANAF
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6">
                <h3 className="footer-heading">
                  <span className="text-blue-400 text-xl">🧭</span>
                  <span>Navigare</span>
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: "Acasă", href: "#home", icon: "🏠" },
                    { name: "Features", href: "#features", icon: "⚡" },
                    { name: "Marketplace", href: "/marketplace", icon: "🛒" },
                    { name: "Agenți CAEN", href: "/agents-caen", icon: "🏭" },
                    { name: "Prețuri", href: "#pricing", icon: "💎" },
                    { name: "Dashboard", href: "/dashboard", icon: "📊" },
                    { name: "Contact", href: "#contact", icon: "🚀" }
                  ].map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer-link group">
                        <span className="group-hover:scale-125 transition-transform duration-300">{link.icon}</span>
                        <span className="group-hover:text-blue-400 transition-colors duration-300">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal & Compliance */}
              <div className="space-y-6">
                <h3 className="footer-heading">
                  <span className="text-green-400 text-xl">⚖️</span>
                  <span>Legal & Conformitate</span>
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: "ANPDPD", href: "https://www.dataprotection.ro", icon: "🛡️", external: true },
                    { name: "ANPC", href: "https://anpc.ro", icon: "🏛️", external: true },
                    { name: "Termeni și Condiții", href: "/termeni-conditii", icon: "📋" },
                    { name: "Plată în Rate", href: "/plata-rate", icon: "💳" },
                    { name: "Livrare și Retur", href: "/livrare-retur", icon: "📦" },
                    { name: "Cookies", href: "/cookies", icon: "🍪" },
                    { name: "Confidențialitate", href: "/confidentialitate", icon: "🔒" }
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="footer-link group"
                      >
                        <span className="group-hover:scale-125 transition-transform duration-300">{link.icon}</span>
                        <span className="group-hover:text-green-400 transition-colors duration-300">{link.name}</span>
                        {link.external && <span className="text-xs text-blue-400">↗</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Support */}
              <div className="space-y-6">
                <h3 className="footer-heading">
                  <span className="text-purple-400 text-xl">📞</span>
                  <span>Suport Premium</span>
                </h3>
                
                <div className="space-y-4">
                  <a href="mailto:contact@ai-agents-romania.com" className="footer-contact-item group">
                    <span className="text-blue-400 text-xl group-hover:scale-125 transition-transform duration-300">📧</span>
                    <span className="group-hover:text-blue-400 transition-colors duration-300">contact@ai-agents-romania.com</span>
                  </a>
                  
                  <a href="tel:+40312345678" className="footer-contact-item group">
                    <span className="text-green-400 text-xl group-hover:scale-125 transition-transform duration-300">📞</span>
                    <span className="group-hover:text-green-400 transition-colors duration-300">+40 31 234 5678</span>
                  </a>

                  {/* ANPC SAL */}
                  <div className="footer-anpc-card">
                    <div className="text-yellow-400 text-sm font-bold mb-2 flex items-center gap-2">
                      <span>⚖️</span>
                      <span>Soluționarea Litigiilor Online</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4">
                      Conform art. 14 din Regulamentul UE 524/2013, consumatorii pot accesa platforma SAL.
                    </p>
                    <a 
                      href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer-sal-button"
                    >
                      <span>🌐 SAL Platform</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button className="footer-action-button primary">
                      💬 Chat Live Support
                    </button>
                    <button className="footer-action-button secondary">
                      📋 Raportează o Problemă
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* Copyright */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="text-gray-400 text-sm">
                    © 2025 <a href="https://www.inventevolution.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-bold">INVENT EVOLUTION S.R.L.</a> 
                    Toate drepturile rezervate.
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400 font-medium">România</span>
                    <span className="text-2xl ai-float">🇷🇴</span>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="flex items-center gap-4">
                  <div className="trust-badge">
                    <span className="text-green-400">🔒</span>
                    <span>SSL Secured</span>
                  </div>
                  
                  <div className="trust-badge">
                    <span className="text-blue-400">✅</span>
                    <span>GDPR Compliant</span>
                  </div>
                  
                  <div className="trust-badge">
                    <span className="text-purple-400">⚡</span>
                    <span>99.9% Uptime</span>
                  </div>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="mt-8 footer-legal-notice">
                <p className="text-gray-500 text-xs text-center leading-relaxed">
                  Platforma AI Agents România este operată de INVENT EVOLUTION S.R.L., înregistrată în România (CUI: RO49679100). 
                  Toate tranzacțiile sunt procesate securizat prin Stripe. Pentru reclamații, vă puteți adresa 
                  <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 mx-1">ANPC</a> 
                  sau utiliza 
                  <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mx-1">platforma SAL</a>.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}