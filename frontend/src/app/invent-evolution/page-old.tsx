'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import CinematicAgentsSlider from '@/components/CinematicAgentsSlider'
import PremiumChatWidget from '@/components/PremiumChatWidget'

// Dynamic imports pentru componente grele
const SplineRobot = dynamic(() => import('@/components/SplineRobot'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black animate-pulse" />
})

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function InventEvolutionHomepage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 100,
          clipPath: 'inset(0% 0% 100% 0%)'
        },
        { 
          opacity: 1, 
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.5
        }
      )

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 1
        }
      )

      // Scroll indicator animation
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Premium Chat Widget */}
      <PremiumChatWidget />
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        {/* Background gradient effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Spline Robot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] relative">
            <SplineRobot />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            AI AGENTS ROMANIA
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Primul marketplace premium din România pentru agenți inteligenți, 
            optimizați pentru orice sector de activitate
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg width="30" height="50" viewBox="0 0 30 50" className="stroke-white/50">
            <rect x="10" y="10" width="10" height="20" rx="5" fill="none" strokeWidth="2"/>
            <circle cx="15" cy="15" r="2" fill="white"/>
          </svg>
        </div>
      </section>

      {/* TEHNOLOGII PREMIUM SECTION */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20">
            Tehnologii Premium la Bază
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* PLĂȚI & SECURITATE SECTION */}
      <section className="py-32 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20">
            Siguranță și Scalabilitate Enterprise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <SecurityCard 
              title="OpenRouter"
              description="Rulare modele AI avansate"
              icon="🚀"
            />
            <SecurityCard 
              title="Stripe" 
              description="Plăți securizate online"
              icon="💳"
            />
            <SecurityCard 
              title="n8n"
              description="Automatizarea proceselor"
              icon="⚙️"
            />
          </div>

          <div className="mt-12 flex justify-center gap-8">
            <Badge text="GDPR Compliant" />
            <Badge text="ISO 27001" />
            <Badge text="PCI DSS" />
          </div>
        </div>
      </section>

      {/* AI AGENTS SLIDER SECTION */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20">
            Marketplace Premium Adaptat pe Coduri CAEN
          </h2>
          
          <CinematicAgentsSlider />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-32 px-4 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20">
            Revoluționează-ți Afacerea Acum
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-400">INVENT EVOLUTION S.R.L.</h3>
              <div className="space-y-3 text-gray-300">
                <p><strong>Număr înregistrare:</strong> J2024000750228</p>
                <p><strong>CUI:</strong> 49679100</p>
                <p><strong>Adresa:</strong> Iași, Județ Iași</p>
                <p><strong>Data înființării:</strong> 29-02-2024</p>
                <p><strong>Email:</strong> office@inventevolution.com</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-6">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold transition-all transform hover:scale-105">
                Contactează-ne
              </button>
              <button className="px-8 py-4 border border-blue-600 hover:bg-blue-600/10 rounded-lg text-xl font-semibold transition-all">
                Programează Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}

// Tech Card Component
function TechCard({ tech, index }: { tech: Technology; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%'
        }
      }
    )
  }, [index])
  
  return (
    <div 
      ref={cardRef}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-600/50 transition-all hover:transform hover:scale-105 cursor-pointer"
    >
      <div className="text-4xl mb-4">{tech.icon}</div>
      <h3 className="font-semibold">{tech.name}</h3>
    </div>
  )
}

// Security Card Component
function SecurityCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-600/50 transition-all">
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

// Badge Component
function Badge({ text }: { text: string }) {
  return (
    <div className="px-6 py-2 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm font-medium">
      ✓ {text}
    </div>
  )
}


// Data
const technologies = [
  { name: 'Google Gemini', icon: '🧠' },
  { name: 'Claude Opus', icon: '🤖' },
  { name: 'ChatGPT Pro', icon: '💬' },
  { name: 'Kling AI', icon: '🎬' },
  { name: 'OpenRouter', icon: '🌐' },
  { name: 'n8n', icon: '🔄' }
]

const agents = [
  { name: 'MISTER AI', icon: '👨‍💼', description: 'Manager virtual pentru business' },
  { name: 'MECANIC AI', icon: '🔧', description: 'Specialist tehnic și mentenanță' },
  { name: 'CONTRIX', icon: '📊', description: 'Expert contabilitate și finanțe' },
  { name: 'MEDIC AI', icon: '⚕️', description: 'Asistent medical inteligent' },
  { name: 'LUXOR AI', icon: '💎', description: 'Consultant luxury & lifestyle' },
  { name: 'XPLOR', icon: '🗺️', description: 'Ghid turistic și explorer' }
]

interface Technology {
  name: string
  icon: string
}