'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const agentCategories = [
  {
    category: 'Business & Finance',
    description: 'Automatizare completă pentru operațiuni business',
    icon: '💼',
    gradient: 'from-blue-600 to-purple-600',
    agents: [
      { 
        name: 'CONTRIX AI', 
        role: 'CFO Virtual & Contabil Expert',
        capabilities: 'Facturare automată, rapoarte fiscale, optimizare taxe',
        industries: 'Toate industriile',
        power: '24/7 Active'
      },
      { 
        name: 'SALES MASTER', 
        role: 'Director Vânzări AI',
        capabilities: 'Lead generation, email outreach, CRM automation',
        industries: 'B2B & B2C',
        power: '10x Conversie'
      },
      { 
        name: 'HR GENIUS', 
        role: 'Manager Resurse Umane',
        capabilities: 'Recrutare AI, screening CV, interviuri automate',
        industries: 'Tech & Corporate',
        power: '1000+ CV/zi'
      },
      { 
        name: 'MARKET ANALYST', 
        role: 'Analist Piață & Strategie',
        capabilities: 'Research competiție, trend analysis, forecasting',
        industries: 'Toate piețele',
        power: 'Real-time data'
      }
    ]
  },
  {
    category: 'Sănătate & Wellness',
    description: 'Asistență medicală inteligentă și personalizată',
    icon: '⚕️',
    gradient: 'from-green-600 to-teal-600',
    agents: [
      { 
        name: 'MEDIC AI', 
        role: 'Asistent Medical Virtual',
        capabilities: 'Diagnostic preliminar, monitorizare sănătate, reminder tratament',
        industries: 'Clinici & Spitale',
        power: '99% Acuratețe'
      },
      { 
        name: 'NUTRI COACH', 
        role: 'Nutriționist Personal AI',
        capabilities: 'Planuri alimentare, tracking calorii, rețete personalizate',
        industries: 'Fitness & Wellness',
        power: '10k+ Rețete'
      },
      { 
        name: 'MENTAL HEALTH', 
        role: 'Consilier Psihologic AI',
        capabilities: 'Support 24/7, tehnici relaxare, jurnaling ghidat',
        industries: 'Healthcare',
        power: 'Always Available'
      },
      { 
        name: 'FITNESS TRAINER', 
        role: 'Antrenor Personal Virtual',
        capabilities: 'Programe antrenament, form checking, progress tracking',
        industries: 'Sport & Fitness',
        power: 'Adaptive AI'
      }
    ]
  },
  {
    category: 'Educație & Training',
    description: 'Învățare personalizată și dezvoltare continuă',
    icon: '🎓',
    gradient: 'from-purple-600 to-pink-600',
    agents: [
      { 
        name: 'MISTER AI', 
        role: 'Profesor Universal',
        capabilities: 'Lecții interactive, evaluări adaptive, curriculum personalizat',
        industries: 'Educație K-12',
        power: 'Infinite Knowledge'
      },
      { 
        name: 'SKILL BUILDER', 
        role: 'Coach Dezvoltare Profesională',
        capabilities: 'Upskilling, certificări, career guidance',
        industries: 'Corporate Training',
        power: '500+ Skills'
      },
      { 
        name: 'LANGUAGE MASTER', 
        role: 'Profesor Limbi Străine',
        capabilities: 'Conversație live, gramatică, pronunție perfectă',
        industries: 'Language Learning',
        power: '50+ Limbi'
      },
      { 
        name: 'CODE MENTOR', 
        role: 'Instructor Programare',
        capabilities: 'Code review, debugging, best practices',
        industries: 'Tech Education',
        power: 'All Languages'
      }
    ]
  },
  {
    category: 'Industrie & Logistică',
    description: 'Optimizare operațională pentru business industrial',
    icon: '🏭',
    gradient: 'from-orange-600 to-red-600',
    agents: [
      { 
        name: 'LOGIS-AI', 
        role: 'Manager Logistică & Supply Chain',
        capabilities: 'Optimizare rute, inventory management, predictive maintenance',
        industries: 'Transport & Logistics',
        power: '-40% Costuri'
      },
      { 
        name: 'MECHANOX AI', 
        role: 'Inginer Șef Virtual',
        capabilities: 'Diagnosticare tehnică, maintenance scheduling, QA automation',
        industries: 'Manufacturing',
        power: 'Zero Defects'
      },
      { 
        name: 'ENERGY OPTIMIZER', 
        role: 'Manager Eficiență Energetică',
        capabilities: 'Consum optimization, green solutions, cost reduction',
        industries: 'Utilities',
        power: '-50% Energy'
      },
      { 
        name: 'QUALITY CONTROL', 
        role: 'Inspector Calitate AI',
        capabilities: 'Visual inspection, defect detection, compliance checking',
        industries: 'Production',
        power: '100% Accuracy'
      }
    ]
  },
  {
    category: 'Marketing & Creație',
    description: 'Creativitate AI pentru brand-uri de succes',
    icon: '🎨',
    gradient: 'from-pink-600 to-purple-600',
    agents: [
      { 
        name: 'BRAND GENIUS', 
        role: 'Director Creativ AI',
        capabilities: 'Logo design, brand identity, marketing strategy',
        industries: 'Toate industriile',
        power: 'Unlimited Ideas'
      },
      { 
        name: 'CONTENT CREATOR', 
        role: 'Creator Conținut Multimedia',
        capabilities: 'Video editing, copywriting, social media content',
        industries: 'Digital Marketing',
        power: '100+ Posts/zi'
      },
      { 
        name: 'AD OPTIMIZER', 
        role: 'Specialist PPC & Ads',
        capabilities: 'Campaign optimization, A/B testing, ROI maximization',
        industries: 'E-commerce',
        power: '+300% ROAS'
      },
      { 
        name: 'INFLUENCER AI', 
        role: 'Social Media Manager',
        capabilities: 'Engagement automation, trend analysis, community management',
        industries: 'Social Media',
        power: '24/7 Active'
      }
    ]
  },
  {
    category: 'Legal & Compliance',
    description: 'Asistență juridică și conformitate automată',
    icon: '⚖️',
    gradient: 'from-cyan-600 to-blue-600',
    agents: [
      { 
        name: 'LEGAL ADVISOR', 
        role: 'Consilier Juridic Virtual',
        capabilities: 'Contract review, legal research, compliance checking',
        industries: 'Toate industriile',
        power: 'EU + RO Law'
      },
      { 
        name: 'GDPR GUARDIAN', 
        role: 'Officer Protecție Date',
        capabilities: 'GDPR compliance, data audits, privacy policies',
        industries: 'Digital Business',
        power: '100% Compliant'
      },
      { 
        name: 'CONTRACT MASTER', 
        role: 'Specialist Contracte',
        capabilities: 'Contract generation, negotiation support, risk analysis',
        industries: 'B2B',
        power: 'Smart Contracts'
      },
      { 
        name: 'COMPLIANCE BOT', 
        role: 'Auditor Conformitate',
        capabilities: 'Regulatory updates, audit trails, reporting automation',
        industries: 'Finance & Healthcare',
        power: 'Auto-Update'
      }
    ]
  }
]

export default function AgentsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    // Title animation
    gsap.fromTo('.agents-header',
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
    const panels = gsap.utils.toArray('.agents-panel') as HTMLElement[]
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
    <section ref={sectionRef} id="agents" className="relative bg-black">
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black to-transparent pt-20 pb-10">
        <div className="container mx-auto px-6">
          <h2 className="agents-header text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Agenți AI</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-4">Specializați</span>
          </h2>
          <p className="agents-header text-gray-400 text-xl max-w-4xl">
            Echipa completă de asistenți AI pentru toate nevoile tale
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center space-x-2">
          {agentCategories.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 ${
                index === activeIndex ? 'w-12 bg-purple-500' : 'w-1 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Total Agents Counter */}
      <div className="fixed top-32 right-6 z-30 bg-black/80 backdrop-blur-sm px-4 py-3 rounded-full border border-gray-800">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-white">24</span>
          <div>
            <p className="text-xs text-gray-400">Agenți AI</p>
            <p className="text-xs text-purple-400">Specializați</p>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div ref={containerRef} className="flex h-screen">
        {agentCategories.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="agents-panel flex-shrink-0 w-full h-full flex items-center justify-center relative"
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
                      {category.agents.length} agenți specializați
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {category.agents.map((agent, agentIndex) => (
                  <div
                    key={agent.name}
                    className="group relative"
                    style={{
                      opacity: categoryIndex === activeIndex ? 1 : 0.3,
                      transform: `translateY(${categoryIndex === activeIndex ? 0 : 20}px) rotateY(${categoryIndex === activeIndex ? 0 : -10}deg)`,
                      transition: `all 0.5s ease ${agentIndex * 0.1}s`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}></div>
                    
                    <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full hover:border-purple-500/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <h4 className="text-2xl font-bold text-white mb-1">
                            {agent.name}
                          </h4>
                          <p className="text-purple-400 text-sm">
                            {agent.role}
                          </p>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-4 flex-grow">
                          {agent.capabilities}
                        </p>
                        
                        <div className="space-y-2 mt-auto">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Industrii:</span>
                            <span className="text-gray-300">{agent.industries}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Power:</span>
                            <span className={`text-xs font-mono px-2 py-1 rounded-full bg-gradient-to-r ${category.gradient} bg-opacity-10 text-white`}>
                              {agent.power}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category CTA */}
              <div className="mt-16 text-center">
                <button className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${category.gradient} text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-xl`}>
                  Explorează Agenții {category.category}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}