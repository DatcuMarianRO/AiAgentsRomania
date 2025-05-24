'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techCategories = [
  {
    id: 'google-ai-ultra',
    category: 'Ecosistem Google AI Ultra',
    description: 'Motorul principal al platformei noastre - ultimele modele AI de la Google',
    icon: '🚀',
    gradient: 'from-blue-600 to-purple-600',
    count: 5,
    mainTechnologies: [
      { name: 'Gemini 2.5 Pro', capability: 'Model de gândire avansat cu 1M tokeni', power: 'Deep Think Mode' },
      { name: 'Project Mariner', capability: 'AI agentic bazat pe browser', power: '10 sarcini simultan' },
      { name: 'Veo 3', capability: 'Generare video cu audio integrat', power: 'Cinematografie AI' },
      { name: 'Imagen 4', capability: 'Imagini 2K cu claritate remarcabilă', power: 'Fotorealism' }
    ],
    details: {
      overview: 'Powered by Google AI Ultra - cel mai avansat ecosistem AI disponibil pentru dezvoltarea de agenți inteligenți și multimodali.',
      capabilities: [
        'Raționament complex și programare avansată cu Gemini 2.5 Pro',
        'Automatizare web cu Project Mariner - până la 10 sarcini simultan',
        'Generare video cinematografică cu Veo 3 și Flow',
        'Creație vizuală de înaltă calitate cu Imagen 4',
        'Integrare nativă cu Google Workspace pentru IMM-uri'
      ],
      keyFeatures: {
        'Context Window': '1 milion tokeni (2M în curând)',
        'Multimodalitate': 'Audio, Imagine, Video, Text',
        'Knowledge Cutoff': 'Ianuarie 2025',
        'Disponibilitate': 'Google AI Ultra Subscription'
      }
    }
  },
  {
    id: 'llm-foundation',
    category: 'Modele Fundamentale LLM',
    description: 'Cele mai puternice modele lingvistice pentru diverse cazuri de utilizare',
    icon: '🧠',
    gradient: 'from-purple-600 to-pink-600',
    count: 6,
    mainTechnologies: [
      { name: 'Claude 4 Opus', capability: 'Raționament hibrid de frontieră', power: '200K context' },
      { name: 'GPT-4.5 Orion', capability: 'Cunoștințe vaste și interacțiune naturală', power: '128K context' },
      { name: 'Llama 4 Maverick', capability: 'Open-weight MoE multimodal', power: '1M context' },
      { name: 'Llama 4 Scout', capability: 'Context extrem de lung', power: '10M tokeni!' }
    ],
    details: {
      overview: 'Accesăm cele mai avansate modele LLM globale pentru a oferi agenților AI capacități optime pentru fiecare sarcină.',
      capabilities: [
        'Claude 4 pentru programare complexă și utilizare computer',
        'GPT-4.5 pentru conversații naturale și cunoștințe enciclopedice',
        'Llama 4 cu arhitectură MoE pentru eficiență și scalabilitate',
        'Modele specializate pentru fiecare industrie și caz de utilizare'
      ],
      comparison: 'Selectăm automat cel mai potrivit model pentru fiecare sarcină specifică.'
    }
  },
  {
    id: 'agent-frameworks',
    category: 'Cadre Dezvoltare Agenți',
    description: 'Framework-uri avansate pentru construirea agenților AI autonomi',
    icon: '⚡',
    gradient: 'from-green-600 to-teal-600',
    count: 5,
    mainTechnologies: [
      { name: 'LangGraph', capability: 'Agenți stateful cu fluxuri complexe', power: 'Platform GA' },
      { name: 'CrewAI', capability: 'Sisteme multi-agent colaborative', power: 'Enterprise Ready' },
      { name: 'LlamaIndex', capability: 'RAG specializat pentru date proprietare', power: 'Knowledge Base' },
      { name: 'Google ADK', capability: 'Optimizat pentru Gemini și Vertex AI', power: 'Native Integration' }
    ],
    details: {
      overview: 'Utilizăm cele mai avansate framework-uri pentru a construi agenți AI sofisticați, cu memorie, capabili să colaboreze și să acceseze date specifice.',
      capabilities: [
        'Agenți cu memorie persistentă și gestionare avansată a stării',
        'Sisteme multi-agent pentru sarcini complexe',
        'RAG (Retrieval Augmented Generation) pentru acuratețe maximă',
        'Integrare nativă cu infrastructura Google Cloud'
      ]
    }
  },
  {
    id: 'multimodal-ai',
    category: 'AI Generativ Multimodal',
    description: 'Tehnologii pentru generare voce, video și imagine la nivel profesional',
    icon: '🎨',
    gradient: 'from-orange-600 to-red-600',
    count: 8,
    mainTechnologies: [
      { name: 'ElevenLabs', capability: 'Voce naturală în limba română', power: '32 limbi' },
      { name: 'Hume AI Octave', capability: 'TTS cu expresivitate emoțională', power: 'Voice Cloning 5s' },
      { name: 'Pollo AI', capability: 'Platformă all-in-one video/imagine', power: '4K Upscaling' },
      { name: 'Stable Diffusion 3', capability: 'Generare imagini open-source', power: 'Customizable' }
    ],
    details: {
      overview: 'Oferim agenților capacitatea de a genera conținut multimedia profesional - de la voci naturale în română la video și imagini.',
      capabilities: [
        'Text-to-Speech natural cu accente și dialecte românești',
        'Clonare vocală pentru brand voices personalizate',
        'Generare video cu Veo 3, Runway Gen-3, Kling AI',
        'Creație imagini cu DALL-E 3, Midjourney, Stable Diffusion',
        'Muzică și efecte sonore cu Suno AI și Udio'
      ]
    }
  },
  {
    id: 'data-intelligence',
    category: 'Procesare Date & BI',
    description: 'AI pentru analiză avansată, transcriere și business intelligence',
    icon: '📊',
    gradient: 'from-cyan-600 to-blue-600',
    count: 7,
    mainTechnologies: [
      { name: 'Sonix', capability: 'Transcriere română de înaltă acuratețe', power: '99%+ accuracy' },
      { name: 'Julius AI', capability: 'Agent specializat analiză date', power: 'Auto-workflows' },
      { name: 'Tableau AI', capability: 'Vizualizări și insights automate', power: 'Natural Language' },
      { name: 'Whisper v3', capability: 'Transcriere open-source 98 limbi', power: '680K ore training' }
    ],
    details: {
      overview: 'Transformăm date brute în insights acționabile prin AI avansat pentru transcriere, analiză și vizualizare.',
      capabilities: [
        'Transcriere automată cu acuratețe superioară pentru limba română',
        'Analiză predictivă și forecasting cu ML avansat',
        'Dashboard-uri interactive și rapoarte automate',
        'Integrare cu sisteme BI existente (Power BI, Tableau)',
        'Procesare documente și extragere informații'
      ]
    }
  },
  {
    id: 'automation-integration',
    category: 'Automatizare & Integrări',
    description: 'Platforme pentru orchestrarea fluxurilor complexe și conectare sisteme',
    icon: '🔄',
    gradient: 'from-pink-600 to-purple-600',
    count: 6,
    mainTechnologies: [
      { name: 'n8n.io', capability: 'Open-source cu 70+ noduri AI', power: 'Self-hosted' },
      { name: 'Make.com', capability: 'Visual workflow cu AI Tools', power: 'GPT-4.1 nano' },
      { name: 'Zapier Agents', capability: 'Automatizare agentică la scară', power: '6000+ apps' },
      { name: 'Model Context Protocol', capability: 'Standard pentru comunicare agenți', power: 'Universal Tools' }
    ],
    details: {
      overview: 'Conectăm agenții AI cu toate sistemele business existente prin platforme de automatizare de ultimă generație.',
      capabilities: [
        'Integrări native cu sisteme românești (ANAF, bănci locale)',
        'Orchestrare fluxuri complexe cu logică condiționată',
        'Conectare la peste 6000 de aplicații business',
        'API-uri robuste pentru integrări custom',
        'Automatizare end-to-end fără cod'
      ]
    }
  }
]

export default function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<typeof techCategories[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    // Title animation
    gsap.fromTo('.tech-header',
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
    const panels = gsap.utils.toArray('.tech-panel') as HTMLElement[]
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

  const handleCategoryClick = (category: typeof techCategories[0]) => {
    setSelectedCategory(category)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setTimeout(() => setSelectedCategory(null), 300)
  }

  return (
    <section ref={sectionRef} id="technologies" className="relative bg-black">
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black to-transparent pt-20 pb-10">
        <div className="container mx-auto px-6">
          <h2 className="tech-header text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Stack</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-4">Tehnologic</span>
          </h2>
          <p className="tech-header text-gray-400 text-xl max-w-4xl">
            Powered by Google AI Ultra • 30+ modele AI premium • Infrastructură enterprise
          </p>
        </div>
      </div>

      {/* Tech Stats */}
      <div className="fixed top-32 right-6 z-30 space-y-2">
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
          <p className="text-xs text-gray-400">Total Tech</p>
          <p className="text-2xl font-bold text-white">30+</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center space-x-2">
          {techCategories.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 ${
                index === activeIndex ? 'w-12 bg-blue-500' : 'w-1 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div ref={containerRef} className="flex h-screen">
        {techCategories.map((category, categoryIndex) => (
          <div
            key={category.id}
            className="tech-panel flex-shrink-0 w-full h-full flex items-center justify-center relative"
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
                      {category.count} tehnologii integrate
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Technologies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {category.mainTechnologies.map((tech, techIndex) => (
                  <div
                    key={tech.name}
                    className="group relative cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      opacity: categoryIndex === activeIndex ? 1 : 0.3,
                      transform: `translateY(${categoryIndex === activeIndex ? 0 : 20}px)`,
                      transition: `all 0.5s ease ${techIndex * 0.1}s`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300`}></div>
                    
                    <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full hover:border-gray-700 transition-all duration-300 group-hover:transform group-hover:scale-105">
                      <div className="flex flex-col h-full">
                        <h4 className="text-2xl font-bold text-white mb-3">
                          {tech.name}
                        </h4>
                        
                        <p className="text-gray-400 mb-6 flex-grow">
                          {tech.capability}
                        </p>
                        
                        <div className="mt-auto">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${category.gradient} bg-opacity-10`}>
                            <span className="text-sm font-mono text-gray-300">
                              {tech.power}
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
                <button 
                  onClick={() => handleCategoryClick(category)}
                  className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${category.gradient} text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-xl`}
                >
                  Explorează {category.category}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedCategory && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 ${showDetails ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeDetails}></div>
          
          <div className={`relative bg-gray-900 border border-gray-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${showDetails ? 'scale-100' : 'scale-95'}`}>
            {/* Modal Header */}
            <div className={`sticky top-0 bg-gradient-to-r ${selectedCategory.gradient} p-8 rounded-t-3xl`}>
              <button
                onClick={closeDetails}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-6xl">{selectedCategory.icon}</span>
                <div>
                  <h3 className="text-3xl font-bold text-white">{selectedCategory.category}</h3>
                  <p className="text-white/80">{selectedCategory.count} tehnologii integrate</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Overview */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">Prezentare Generală</h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedCategory.details.overview}
                </p>
              </div>

              {/* Capabilities */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">Capabilități Principale</h4>
                <ul className="space-y-3">
                  {selectedCategory.details.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">▸</span>
                      <span className="text-gray-300">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features (if available) */}
              {selectedCategory.details.keyFeatures && (
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">Specificații Tehnice</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedCategory.details.keyFeatures).map(([key, value]) => (
                      <div key={key} className="bg-black/50 border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-500 text-sm">{key}</p>
                        <p className="text-white font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Technologies */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">Toate Tehnologiile</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCategory.mainTechnologies.map((tech) => (
                    <div key={tech.name} className="bg-black/50 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                      <h5 className="text-lg font-semibold text-white mb-1">{tech.name}</h5>
                      <p className="text-gray-400 text-sm mb-2">{tech.capability}</p>
                      <span className={`text-xs font-mono px-3 py-1 rounded-full bg-gradient-to-r ${selectedCategory.gradient} bg-opacity-10 text-white`}>
                        {tech.power}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integration CTA */}
              <div className="text-center pt-8">
                <button className={`px-8 py-4 bg-gradient-to-r ${selectedCategory.gradient} text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-xl`}>
                  Integrează {selectedCategory.category}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}