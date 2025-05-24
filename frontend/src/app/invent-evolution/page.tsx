'use client'

import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import TechnologiesSection from './sections/TechnologiesSection'
import SecuritySection from './sections/SecuritySection'
import AgentsSection from './sections/AgentsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import PricingSection from './sections/PricingSection'
import AboutSection from './sections/AboutSection'
import PremiumChatWidget from '@/components/PremiumChatWidget'

export default function InventEvolutionPage() {
  useEffect(() => {
    // Supress Spline viewer console errors that don't affect functionality
    const originalError = console.error
    console.error = (...args) => {
      if (args[0]?.toString().includes('Missing property') || 
          args[0]?.toString().includes('spline-viewer')) {
        return
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])
  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-10deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to));
        }
      `}</style>
      
      <div className="bg-black min-h-screen">
        {/* Header - Premium transparent navigation */}
        <Header />
        
        {/* Chat Widget - always visible */}
        <PremiumChatWidget />
        
        {/* Hero Section with Spline 3D */}
        <HeroSection />
        
        {/* Technologies Section */}
        <TechnologiesSection />
        
        {/* Security & Payments Section */}
        <SecuritySection />
        
        {/* AI Agents Section */}
        <AgentsSection />
        
        {/* Testimonials & Case Studies */}
        <TestimonialsSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* About Us Section */}
        <AboutSection />
        
        {/* Ultra Premium Footer */}
        <Footer />
      </div>
    </>
  )
}