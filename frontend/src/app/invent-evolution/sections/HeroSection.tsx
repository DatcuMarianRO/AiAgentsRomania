'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Simple GSAP animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Spline 3D Scene - Using Viewer Web Component */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="w-full h-full" dangerouslySetInnerHTML={{
          __html: `
            <spline-viewer 
              url="https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode"
              style="width: 100%; height: 100%; display: block;"
            ></spline-viewer>
          `
        }} />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-7xl mx-auto">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            AI AGENTS
          </span>
          <br />
          <span className="text-white">ROMANIA</span>
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
          Primul marketplace premium din România pentru agenți inteligenți
        </p>
        
        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-xl">
            Explorează Agenții
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-200">
            Vezi Demo
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}