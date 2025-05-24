'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  servicii: [
    { name: 'Agenți AI Personalizați', href: '/servicii/agenti-personalizati' },
    { name: 'Automatizări Business', href: '/servicii/automatizari' },
    { name: 'Consultanță AI', href: '/servicii/consultanta' },
    { name: 'Integrări Enterprise', href: '/servicii/integrari' },
    { name: 'Training & Support', href: '/servicii/training' }
  ],
  tehnologii: [
    { name: 'Stack Tehnologic', href: '/tehnologii' },
    { name: 'API Documentation', href: '/docs/api' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Securitate & GDPR', href: '/securitate' },
    { name: 'Status Platform', href: 'https://status.ai-agents-romania.com' }
  ],
  companie: [
    { name: 'Despre Noi', href: '/despre' },
    { name: 'Echipa', href: '/echipa' },
    { name: 'Cariere', href: '/cariere' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' }
  ],
  legal: [
    { name: 'Termeni și Condiții', href: '/termeni' },
    { name: 'Politica Confidențialitate', href: '/confidentialitate' },
    { name: 'Politica Cookies', href: '/cookies' },
    { name: 'ANPC', href: 'https://anpc.ro' },
    { name: 'SOL', href: 'https://ec.europa.eu/consumers/odr' }
  ]
}

const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/company/ai-agents-romania',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/aiagentsromania',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/aiagentsromania',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/aiagentsro',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@aiagentsromania',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  }
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    // Animate footer elements on scroll
    gsap.fromTo('.footer-column',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1
        }
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className="bg-black border-t border-gray-900">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="footer-column lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="text-white">AI AGENTS</span>
                <span className="text-blue-500 ml-2">ROMANIA</span>
              </h3>
              <p className="text-gray-400 text-sm">by INVENT EVOLUTION S.R.L.</p>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Primul marketplace premium din România pentru agenți AI specializați. 
              Transformăm afaceri prin automatizare inteligentă și soluții AI personalizate.
            </p>
            
            <div className="space-y-2 text-sm text-gray-500">
              <p><span className="text-gray-400">CUI:</span> 50607008</p>
              <p><span className="text-gray-400">Reg. Com.:</span> J40/11111/2024</p>
              <p><span className="text-gray-400">CAEN:</span> 6201 - Activități de realizare a soft-ului la comandă</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicii */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-lg mb-4">Servicii</h4>
            <ul className="space-y-3">
              {footerLinks.servicii.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tehnologii */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-lg mb-4">Tehnologii</h4>
            <ul className="space-y-3">
              {footerLinks.tehnologii.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Companie */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-lg mb-4">Companie</h4>
            <ul className="space-y-3">
              {footerLinks.companie.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-white font-semibold text-sm mb-3">Contact Rapid</h4>
              <div className="space-y-2 text-sm">
                <a href="tel:+40727353353" className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="mr-2">📞</span> +40 727 353 353
                </a>
                <a href="mailto:contact@ai-agents-romania.com" className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="mr-2">✉️</span> contact@ai-agents-romania.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-semibold mb-2">Abonează-te la Newsletter</h4>
              <p className="text-gray-400 text-sm">Primește ultimele noutăți despre AI și automatizări</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Email-ul tău"
                className="bg-gray-900 border border-gray-800 rounded-l-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors w-full md:w-64"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg font-medium transition-colors"
              >
                Abonează-te
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div className="mb-3 md:mb-0">
              © 2024 INVENT EVOLUTION S.R.L. Toate drepturile rezervate.
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Toate sistemele operaționale
              </span>
              <span>|</span>
              <a href="/sitemap" className="hover:text-gray-400 transition-colors">Sitemap</a>
              <span>|</span>
              <span>România 🇷🇴</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}