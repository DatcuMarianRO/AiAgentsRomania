'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Alexandru Popescu',
    role: 'CEO, TechStart Solutions',
    company: 'Software Development',
    image: '👨‍💼',
    content: 'AI Agents Romania a transformat complet modul în care operăm. Am automatizat 80% din procesele repetitive și am crescut productivitatea cu 300%.',
    rating: 5,
    results: '+300% productivitate',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    name: 'Maria Ionescu',
    role: 'Director Marketing',
    company: 'E-commerce Fashion',
    image: '👩‍💼',
    content: 'Agenții AI personalizați ne-au ajutat să creăm campanii de marketing ultra-targetate. ROI-ul nostru a crescut cu 450% în doar 3 luni.',
    rating: 5,
    results: '+450% ROI',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Dr. Andrei Mihăilescu',
    role: 'Director Medical',
    company: 'Clinică Privată',
    image: '👨‍⚕️',
    content: 'MEDIC AI a revoluționat modul în care gestionăm pacienții. Diagnostice mai rapide, tratamente personalizate și satisfacție maximă.',
    rating: 5,
    results: '-60% timp diagnostic',
    gradient: 'from-green-600 to-teal-600'
  },
  {
    name: 'Cristina Dumitrescu',
    role: 'CFO',
    company: 'Grup Financiar',
    image: '👩‍💼',
    content: 'CONTRIX AI ne-a automatizat complet contabilitatea. Erori zero, rapoarte instant și economii de peste 100.000€ anual.',
    rating: 5,
    results: '100.000€ economii/an',
    gradient: 'from-orange-600 to-red-600'
  },
  {
    name: 'Mihai Constantinescu',
    role: 'Operations Manager',
    company: 'Logistică & Transport',
    image: '👨‍💼',
    content: 'LOGIS-AI optimizează rutele în timp real. Am redus costurile cu combustibil cu 40% și timpul de livrare cu 35%.',
    rating: 5,
    results: '-40% costuri',
    gradient: 'from-cyan-600 to-blue-600'
  },
  {
    name: 'Elena Radu',
    role: 'Director HR',
    company: 'Multinațională IT',
    image: '👩‍💼',
    content: 'Procesul de recrutare este acum 10x mai rapid. AI-ul nostru analizează mii de CV-uri și identifică candidații perfecți instant.',
    rating: 5,
    results: '10x mai rapid',
    gradient: 'from-pink-600 to-purple-600'
  }
]

const caseStudies = [
  {
    client: 'Bancă Top 5 România',
    industry: 'Financial Services',
    challenge: 'Procesare manuală a mii de cereri de credit zilnic',
    solution: 'Agent AI specializat pentru analiză risc și aprobare automată',
    results: [
      '95% reducere timp procesare',
      '99.9% acuratețe decizii',
      '2.5M€ economii anuale',
      'Zero erori umane'
    ],
    technologies: ['GPT-4', 'Claude Opus', 'Custom ML Models'],
    duration: '3 luni implementare'
  },
  {
    client: 'Retailer Fashion National',
    industry: 'E-commerce',
    challenge: 'Personalizare experiență pentru 500k+ clienți',
    solution: 'Ecosistem AI pentru recomandări și suport client 24/7',
    results: [
      '+67% conversie',
      '+120% valoare medie comandă',
      '24/7 suport instant',
      '4.9/5 satisfacție clienți'
    ],
    technologies: ['Kling AI', 'DALL-E 3', 'ElevenLabs'],
    duration: '2 luni implementare'
  },
  {
    client: 'Spital Privat Premium',
    industry: 'Healthcare',
    challenge: 'Diagnostic și tratamente personalizate pentru pacienți',
    solution: 'MEDIC AI integrat cu toate departamentele',
    results: [
      '-70% timp așteptare',
      '+90% acuratețe diagnostic',
      '1000+ pacienți/lună',
      '100% GDPR compliant'
    ],
    technologies: ['Gemini 1.5 Pro', 'Custom Medical AI'],
    duration: '6 luni implementare'
  }
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeCaseStudy, setActiveCaseStudy] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Title animations
    gsap.fromTo('.testimonials-title',
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

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="min-h-screen bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Povești de</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-4">Succes</span>
          </h2>
          <p className="testimonials-title text-gray-400 text-xl max-w-3xl mx-auto">
            Companiile care au ales AI Agents Romania cresc exponențial
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${testimonial.gradient} p-1 rounded-3xl`}>
                    <div className="bg-black rounded-3xl p-8 md:p-12">
                      <div className="flex items-start space-x-6">
                        <div className="text-6xl">{testimonial.image}</div>
                        <div className="flex-1">
                          <p className="text-xl text-gray-300 mb-6 italic">
                            "{testimonial.content}"
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                              <p className="text-gray-400">{testimonial.role}</p>
                              <p className="text-gray-500 text-sm">{testimonial.company}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex space-x-1 mb-2">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <span key={i} className="text-yellow-500">⭐</span>
                                ))}
                              </div>
                              <span className={`text-lg font-bold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                                {testimonial.results}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 transition-all duration-300 ${
                    index === activeTestimonial ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-32">
          <h3 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">Case Studies</span>
            <span className="text-gray-500 ml-3">Enterprise</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setActiveCaseStudy(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 h-full">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{study.client}</h4>
                    <p className="text-blue-400 text-sm">{study.industry}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Challenge</p>
                      <p className="text-gray-400">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-gray-300">{study.solution}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-gray-500 text-sm uppercase tracking-wider">Results</p>
                    {study.results.map((result, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-300 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-800">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {study.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">{study.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-6">Vrei să fii următoarea poveste de succes?</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-blue-500/25">
            Solicită Demo Gratuit
          </button>
        </div>
      </div>
    </section>
  )
}