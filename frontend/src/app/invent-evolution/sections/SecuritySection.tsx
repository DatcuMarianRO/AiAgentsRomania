'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const securityCategories = [
  {
    category: 'Infrastructură Cloud',
    description: 'Arhitectură distribuită pe multiple zone geografice',
    icon: '☁️',
    gradient: 'from-blue-600 to-cyan-600',
    features: [
      { name: 'AWS Multi-Region', capability: 'Redundanță completă în 3 regiuni', metric: '99.99% uptime' },
      { name: 'Auto-Scaling', capability: 'Scalare automată bazată pe trafic', metric: '∞ capacitate' },
      { name: 'Load Balancing', capability: 'Distribuție inteligentă a sarcinii', metric: '<50ms latență' },
      { name: 'CDN Global', capability: 'CloudFlare Enterprise pe 200+ locații', metric: '10TB/s bandwidth' }
    ]
  },
  {
    category: 'Securitate Date',
    description: 'Protecție militară pentru datele tale business',
    icon: '🔐',
    gradient: 'from-purple-600 to-pink-600',
    features: [
      { name: 'Criptare AES-256', capability: 'End-to-end encryption pentru toate datele', metric: 'Military grade' },
      { name: 'Zero-Knowledge', capability: 'Nici noi nu putem accesa datele tale', metric: '100% privat' },
      { name: 'Backup Automat', capability: 'Snapshot-uri la fiecare 6 ore', metric: '30 zile istoric' },
      { name: 'ISO 27001', capability: 'Certificare internațională securitate', metric: 'Audit anual' }
    ]
  },
  {
    category: 'Procesare Plăți',
    description: 'Tranzacții securizate cu cei mai mari procesatori',
    icon: '💳',
    gradient: 'from-green-600 to-teal-600',
    features: [
      { name: 'Stripe Connect', capability: 'Plăți instant în 135+ monede', metric: 'PCI DSS Level 1' },
      { name: '3D Secure 2.0', capability: 'Autentificare dublă pentru carduri', metric: '99.9% anti-fraud' },
      { name: 'Crypto Payments', capability: 'Accept Bitcoin, Ethereum, USDC', metric: 'Instant settle' },
      { name: 'Invoice & Subscriptions', capability: 'Facturare automată recurentă', metric: 'EU compliant' }
    ]
  },
  {
    category: 'Compliance & GDPR',
    description: 'Conformitate totală cu legislația europeană',
    icon: '⚖️',
    gradient: 'from-orange-600 to-red-600',
    features: [
      { name: 'GDPR Compliant', capability: 'Drept la ștergere, portabilitate', metric: '100% conform' },
      { name: 'Data Residency', capability: 'Datele rămân în EU (Frankfurt)', metric: 'EU servers only' },
      { name: 'Audit Trail', capability: 'Log complet pentru toate acțiunile', metric: '2 ani arhivă' },
      { name: 'DPA Available', capability: 'Contract procesare date disponibil', metric: 'Template gratuit' }
    ]
  },
  {
    category: 'Monitorizare 24/7',
    description: 'Echipă dedicată și AI pentru securitate non-stop',
    icon: '🛡️',
    gradient: 'from-cyan-600 to-blue-600',
    features: [
      { name: 'SOC Team', capability: 'Security Operations Center activ', metric: '24/7/365' },
      { name: 'AI Threat Detection', capability: 'Detectare anomalii în timp real', metric: '<1s response' },
      { name: 'DDoS Protection', capability: 'Mitigare atacuri până la 1Tbps', metric: 'Auto-block' },
      { name: 'Penetration Testing', capability: 'Teste securitate trimestriale', metric: 'White-hat certified' }
    ]
  },
  {
    category: 'Business Continuity',
    description: 'Zero downtime garantat pentru operațiunile critice',
    icon: '🔄',
    gradient: 'from-pink-600 to-purple-600',
    features: [
      { name: 'Disaster Recovery', capability: 'RTO 15 minute, RPO 1 oră', metric: 'Testat lunar' },
      { name: 'Failover Automat', capability: 'Switch instant la backup systems', metric: '<10s switchover' },
      { name: 'SLA Enterprise', capability: 'Garanție disponibilitate și penalități', metric: '99.99% uptime' },
      { name: 'Hot Standby', capability: 'Sisteme redundante active permanent', metric: '3x redundancy' }
    ]
  }
]

export default function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    // Title animation
    gsap.fromTo('.security-header',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        }
      }
    )

    // Horizontal scroll animation
    const panels = gsap.utils.toArray('.security-panel') as HTMLElement[]
    const totalWidth = panels.length * 100

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalWidth}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const index = Math.floor(progress * panels.length)
          setActiveIndex(Math.min(index, panels.length - 1))
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="security" className="relative bg-black">
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black to-transparent pt-20 pb-10">
        <div className="container mx-auto px-6">
          <h2 className="security-header text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Securitate &</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 ml-4">Plăți</span>
          </h2>
          <p className="security-header text-gray-400 text-xl max-w-4xl">
            Infrastructură enterprise cu cele mai înalte standarde de securitate
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center space-x-2">
          {securityCategories.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 ${
                index === activeIndex ? 'w-12 bg-blue-500' : 'w-1 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="fixed top-32 right-6 z-30">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-800">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-400">All Systems Operational</span>
          </div>
          <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-800">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-400">SSL/TLS Active</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div ref={containerRef} className="flex h-screen">
        {securityCategories.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="security-panel flex-shrink-0 w-full h-full flex items-center justify-center relative"
          >
            <div className="container mx-auto px-6 py-20">
              {/* Category Header */}
              <div className="mb-16 text-center">
                <div className="inline-flex items-center space-x-4 mb-6">
                  <span className="text-7xl">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {category.category}
                    </h3>
                    <p className="text-gray-500 text-lg">
                      {category.features.length} măsuri de protecție active
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {category.features.map((feature, featureIndex) => (
                  <div
                    key={feature.name}
                    className="group relative"
                    style={{
                      opacity: categoryIndex === activeIndex ? 1 : 0.3,
                      transform: `translateY(${categoryIndex === activeIndex ? 0 : 20}px)`,
                      transition: `all 0.5s ease ${featureIndex * 0.1}s`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300`}></div>
                    
                    <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full hover:border-gray-700 transition-all duration-300 group-hover:transform group-hover:scale-105">
                      <div className="flex flex-col h-full">
                        <h4 className="text-2xl font-bold text-white mb-3">
                          {feature.name}
                        </h4>
                        
                        <p className="text-gray-400 mb-6 flex-grow">
                          {feature.capability}
                        </p>
                        
                        <div className="mt-auto">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${category.gradient} bg-opacity-10`}>
                            <span className="text-sm font-mono text-gray-300">
                              {feature.metric}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Stats */}
              <div className="mt-16 flex justify-center">
                <div className="inline-flex items-center space-x-8 px-8 py-4 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-full">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">100%</p>
                    <p className="text-gray-500 text-sm">Secure</p>
                  </div>
                  <div className="w-px h-12 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">24/7</p>
                    <p className="text-gray-500 text-sm">Protected</p>
                  </div>
                  <div className="w-px h-12 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">0</p>
                    <p className="text-gray-500 text-sm">Breaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}