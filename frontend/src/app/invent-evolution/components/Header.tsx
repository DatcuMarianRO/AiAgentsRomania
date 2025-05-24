'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    
    // GSAP animation for header items
    gsap.fromTo('.header-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.5 }
    )

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <div className="header-item">
            <Link href="/invent-evolution" className="text-2xl font-bold">
              <span className="text-white">INVENT</span>
              <span className="text-blue-500 ml-2">EVOLUTION</span>
            </Link>
          </div>
          
          <ul className="hidden md:flex items-center space-x-8">
            <li className="header-item">
              <a href="#hero" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm uppercase tracking-wider">
                Acasă
              </a>
            </li>
            <li className="header-item">
              <a href="#technologies" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm uppercase tracking-wider">
                Tehnologii
              </a>
            </li>
            <li className="header-item">
              <a href="#security" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm uppercase tracking-wider">
                Securitate
              </a>
            </li>
            <li className="header-item">
              <a href="#agents" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm uppercase tracking-wider">
                Agenți AI
              </a>
            </li>
            <li className="header-item">
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm uppercase tracking-wider">
                Contact
              </a>
            </li>
          </ul>
          
          <div className="header-item">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Începe Acum
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}