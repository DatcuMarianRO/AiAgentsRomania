'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutCategories = [
  {
    category: 'Povestea Noastră',
    description: 'De la viziune la realitate în lumea AI',
    icon: '📖',
    gradient: 'from-blue-600 to-purple-600',
    content: {
      title: 'Fondată în 2024',
      story: 'INVENT EVOLUTION S.R.L. s-a născut din dorința de a democratiza accesul la tehnologii AI avansate pentru businessurile din România. Am început cu o echipă mică de pasionați AI și am crescut rapid într-o companie care deservește sute de clienți.',
      milestones: [
        { year: '2024', event: 'Înființare companie & primul agent AI', metric: 'Ianuarie' },
        { year: '2024', event: 'Lansare platformă AI Agents Romania', metric: 'Martie' },
        { year: '2024', event: '100+ clienți activi', metric: 'Iunie' },
        { year: '2024', event: 'Parteneriat OpenRouter & Stripe', metric: 'Octombrie' }
      ],
      vision: 'Să devenim liderul pieței de automatizare AI în Europa de Est până în 2026'
    }
  },
  {
    category: 'Echipa Noastră',
    description: 'Experții din spatele tehnologiei',
    icon: '👥',
    gradient: 'from-purple-600 to-pink-600',
    content: {
      title: '15+ Specialiști AI',
      departments: [
        { name: 'AI Development', members: '5 ingineri', expertise: 'Machine Learning, NLP, Computer Vision' },
        { name: 'Product Design', members: '3 designeri', expertise: 'UX/UI, 3D Design, Motion Graphics' },
        { name: 'Business Development', members: '4 consultanți', expertise: 'Strategy, Sales, Partnerships' },
        { name: 'Customer Success', members: '3 specialiști', expertise: 'Support, Training, Onboarding' }
      ],
      culture: 'Remote-first, învățare continuă, inovație constantă',
      benefits: 'Salarii competitive, equity, conferințe internaționale, work-life balance'
    }
  },
  {
    category: 'Valorile Noastre',
    description: 'Principiile care ne ghidează',
    icon: '💎',
    gradient: 'from-green-600 to-teal-600',
    content: {
      title: 'Ce ne definește',
      values: [
        { name: 'Inovație', description: 'Împingem constant limitele tehnologiei AI', icon: '🚀' },
        { name: 'Transparență', description: 'Comunicare deschisă cu clienții și echipa', icon: '🔍' },
        { name: 'Impact', description: 'Măsurăm succesul prin rezultatele clienților', icon: '📈' },
        { name: 'Etică', description: 'AI responsabil și protecția datelor', icon: '🛡️' }
      ],
      commitment: 'Ne angajăm să folosim AI pentru a îmbunătăți viețile oamenilor și eficiența afacerilor'
    }
  },
  {
    category: 'Infrastructura',
    description: 'Tehnologie de clasă mondială',
    icon: '🏢',
    gradient: 'from-orange-600 to-red-600',
    content: {
      title: 'Enterprise Grade',
      infrastructure: [
        { component: 'Cloud Servers', details: 'AWS Multi-Region, 99.99% uptime garantat' },
        { component: 'AI Computing', details: 'GPU clusters pentru training și inference' },
        { component: 'Data Centers', details: 'EU-based, GDPR compliant, ISO 27001' },
        { component: 'API Gateway', details: '10M+ requests/zi, <50ms latență' }
      ],
      certifications: ['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant', 'PCI DSS'],
      partners: ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure', 'Cloudflare']
    }
  },
  {
    category: 'Responsabilitate',
    description: 'Impact pozitiv în comunitate',
    icon: '🌍',
    gradient: 'from-cyan-600 to-blue-600',
    content: {
      title: 'CSR & Sustenabilitate',
      initiatives: [
        { program: 'AI pentru Educație', impact: '1000+ studenți instruiți gratuit', icon: '🎓' },
        { program: 'Green Computing', impact: '100% energie regenerabilă', icon: '🌱' },
        { program: 'Startup Accelerator', impact: '10 startup-uri finanțate', icon: '🚀' },
        { program: 'Open Source', impact: '20+ proiecte publice', icon: '💻' }
      ],
      future: 'Țintim carbon neutral până în 2025 și 10.000 locuri de muncă create prin automatizare'
    }
  },
  {
    category: 'Contact Direct',
    description: 'Suntem aici pentru tine',
    icon: '📞',
    gradient: 'from-pink-600 to-purple-600',
    content: {
      title: 'Hai să vorbim',
      offices: [
        { 
          location: 'Sediu Central București',
          address: 'Str. Smârdan, Nr. 9, Sector 3',
          phone: '+40 727 353 353',
          email: 'contact@ai-agents-romania.com'
        }
      ],
      availability: 'Luni - Vineri: 9:00 - 18:00',
      support: '24/7 Support pentru clienți Enterprise',
      channels: {
        linkedin: 'linkedin.com/company/ai-agents-romania',
        github: 'github.com/ai-agents-romania',
        discord: 'discord.gg/ai-agents-ro'
      }
    }
  }
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    // Title animation
    gsap.fromTo('.about-header',
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
    const panels = gsap.utils.toArray('.about-panel') as HTMLElement[]
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
    <section ref={sectionRef} id="about" className="relative bg-black">
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black to-transparent pt-20 pb-10">
        <div className="container mx-auto px-6">
          <h2 className="about-header text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Despre</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-4">Noi</span>
          </h2>
          <p className="about-header text-gray-400 text-xl max-w-4xl">
            INVENT EVOLUTION S.R.L. - Pionieri în democratizarea AI pentru business
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center space-x-2">
          {aboutCategories.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 ${
                index === activeIndex ? 'w-12 bg-blue-500' : 'w-1 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Company Stats */}
      <div className="fixed top-32 right-6 z-30">
        <div className="space-y-2">
          <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
            <p className="text-sm text-gray-400">Clienți activi</p>
            <p className="text-2xl font-bold text-white">500+</p>
          </div>
          <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
            <p className="text-sm text-gray-400">Agenți AI</p>
            <p className="text-2xl font-bold text-white">24</p>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div ref={containerRef} className="flex h-screen">
        {aboutCategories.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="about-panel flex-shrink-0 w-full h-full flex items-center justify-center relative"
          >
            <div className="container mx-auto px-6 py-20">
              {/* Category Header */}
              <div className="mb-12 text-center">
                <div className="inline-flex items-center space-x-4 mb-6">
                  <span className="text-7xl">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {category.category}
                    </h3>
                    <p className="text-gray-500 text-lg">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Content Based on Category */}
              <div className="max-w-6xl mx-auto">
                {categoryIndex === 0 && (
                  // Povestea Noastră
                  <div className="space-y-8">
                    <div className="text-center mb-12">
                      <h4 className="text-3xl font-bold text-white mb-4">{category.content.title}</h4>
                      <p className="text-gray-400 text-lg max-w-3xl mx-auto">{category.content.story}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.content.milestones.map((milestone, index) => (
                        <div key={index} className={`bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300`}>
                          <p className="text-blue-400 text-sm mb-2">{milestone.metric}</p>
                          <p className="text-white font-semibold">{milestone.event}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 text-center">
                      <p className="text-xl text-gray-300 italic">"{category.content.vision}"</p>
                    </div>
                  </div>
                )}

                {categoryIndex === 1 && (
                  // Echipa Noastră
                  <div className="space-y-8">
                    <div className="text-center mb-12">
                      <h4 className="text-3xl font-bold text-white mb-4">{category.content.title}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.content.departments.map((dept, index) => (
                        <div key={index} className={`bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300`}>
                          <h5 className="text-xl font-bold text-white mb-2">{dept.name}</h5>
                          <p className="text-purple-400 mb-2">{dept.members}</p>
                          <p className="text-gray-400 text-sm">{dept.expertise}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-8 border border-purple-500/30">
                      <p className="text-lg text-gray-300 mb-4"><strong>Cultura noastră:</strong> {category.content.culture}</p>
                      <p className="text-lg text-gray-300"><strong>Beneficii:</strong> {category.content.benefits}</p>
                    </div>
                  </div>
                )}

                {categoryIndex === 2 && (
                  // Valorile Noastre
                  <div className="space-y-8">
                    <div className="text-center mb-12">
                      <h4 className="text-3xl font-bold text-white mb-4">{category.content.title}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.content.values.map((value, index) => (
                        <div key={index} className={`bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 group`}>
                          <div className="flex items-start space-x-4">
                            <span className="text-4xl">{value.icon}</span>
                            <div>
                              <h5 className="text-xl font-bold text-white mb-2">{value.name}</h5>
                              <p className="text-gray-400">{value.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 text-center">
                      <p className="text-xl text-gray-300 max-w-3xl mx-auto">{category.content.commitment}</p>
                    </div>
                  </div>
                )}

                {categoryIndex === 3 && (
                  // Infrastructura
                  <div className="space-y-8">
                    <div className="text-center mb-12">
                      <h4 className="text-3xl font-bold text-white mb-4">{category.content.title}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      {category.content.infrastructure.map((item, index) => (
                        <div key={index} className={`bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300`}>
                          <h5 className="text-xl font-bold text-white mb-2">{item.component}</h5>
                          <p className="text-gray-400">{item.details}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      {category.content.certifications.map((cert) => (
                        <span key={cert} className="px-4 py-2 bg-orange-600/10 border border-orange-600/30 rounded-full text-orange-400">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {categoryIndex === 4 && (
                  // Responsabilitate
                  <div className="space-y-8">
                    <div className="text-center mb-12">
                      <h4 className="text-3xl font-bold text-white mb-4">{category.content.title}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.content.initiatives.map((initiative, index) => (
                        <div key={index} className={`bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300`}>
                          <div className="flex items-start space-x-4">
                            <span className="text-4xl">{initiative.icon}</span>
                            <div>
                              <h5 className="text-xl font-bold text-white mb-2">{initiative.program}</h5>
                              <p className="text-cyan-400">{initiative.impact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 text-center">
                      <p className="text-xl text-gray-300 max-w-3xl mx-auto">{category.content.future}</p>
                    </div>
                  </div>
                )}

                {categoryIndex === 5 && (
                  // Contact Direct
                  <div className="space-y-8">
                    <div className="text-center mb-12">
                      <h4 className="text-3xl font-bold text-white mb-4">{category.content.title}</h4>
                    </div>
                    {category.content.offices.map((office, index) => (
                      <div key={index} className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-2xl p-8 border border-purple-500/30 max-w-2xl mx-auto">
                        <h5 className="text-2xl font-bold text-white mb-6">{office.location}</h5>
                        <div className="space-y-3 text-lg">
                          <p className="text-gray-300">📍 {office.address}</p>
                          <p className="text-gray-300">📞 <a href={`tel:${office.phone}`} className="text-purple-400 hover:text-purple-300">{office.phone}</a></p>
                          <p className="text-gray-300">✉️ <a href={`mailto:${office.email}`} className="text-purple-400 hover:text-purple-300">{office.email}</a></p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-800">
                          <p className="text-gray-400">{category.content.availability}</p>
                          <p className="text-purple-400 mt-2">{category.content.support}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center space-x-6 mt-8">
                      <a href={`https://${category.content.channels.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">LinkedIn</a>
                      <a href={`https://${category.content.channels.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">GitHub</a>
                      <a href={`https://${category.content.channels.discord}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">Discord</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}