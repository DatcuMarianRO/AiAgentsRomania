'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animations
    gsap.fromTo('.contact-content',
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
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-black"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="contact-content">
              <h2 className="text-5xl font-bold mb-8">
                <span className="text-white">Despre</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-4">Noi</span>
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">INVENT EVOLUTION S.R.L.</h3>
                  <p className="leading-relaxed">
                    Suntem pionieri în dezvoltarea soluțiilor AI pentru afaceri din România. 
                    Cu o echipă de experți și tehnologii de ultimă generație, transformăm 
                    modul în care companiile operează și cresc.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">📍</span>
                    <div>
                      <p className="font-semibold">Adresă</p>
                      <p>Str. Smârdan, Nr. 9, Sector 3, București</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">📞</span>
                    <div>
                      <p className="font-semibold">Telefon</p>
                      <p>+40 727 353 353</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">✉️</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>contact@invent-evolution.ro</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">🏢</span>
                    <div>
                      <p className="font-semibold">Date Companie</p>
                      <p>CUI: 50607008</p>
                      <p>J40/11111/2024</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="contact-content">
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-1">
                <div className="bg-black rounded-2xl p-8">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Chatbot AI Integrat
                  </h3>
                  
                  <div className="bg-gray-900/50 rounded-xl p-6 mb-6 min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 animate-pulse"></div>
                      <p className="text-gray-400">Asistent AI disponibil 24/7</p>
                      <p className="text-gray-500 text-sm mt-2">Întreabă orice despre serviciile noastre</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Scrie un mesaj..."
                      className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      Trimite
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  © 2024 INVENT EVOLUTION S.R.L. Toate drepturile rezervate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}