'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';
import SplineBackground from './SplineBackground';
import Button from './Button';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, scrollIndicatorRef.current], {
        y: 70,
        opacity: 0,
        scale: 0.9,
      });

      // Create timeline pentru animații secvențiale
      const tl = gsap.timeline({ delay: 0.5 });

      // Animație titlu - efect cinematic cu elastic ease (exact timing conform specificațiilor)
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)",
      })
      
      // Animație subtitle - overlap cu titlul pentru fluiditate
      .to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      }, "-=1.0")
      
      // Animație butoane cu bounce effect - exact back.out(1.7)
      .to(buttonsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "back.out(1.7)",
      }, "-=0.6")
      
      // Animație scroll indicator - final
      .to(scrollIndicatorRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.3");

      // Animație hover pentru hero container
      const heroElement = heroRef.current;
      if (heroElement) {
        gsap.set(heroElement, { 
          transformPerspective: 1000,
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Spline Background 3D - Full Screen */}
      <SplineBackground className="absolute inset-0 w-full h-full z-0" />
      
      {/* Content Overlay - Reduced opacity pentru mai multă vizibilitate 3D */}
      <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(15,23,42,0.8)' }}
          >
            <span className="text-gradient-primary bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            <span className="text-gradient-accent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-subtle-glow drop-shadow-lg">
              AI Agents
            </span>
            <br />
            <span className="text-gradient-primary bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          
          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl font-sans text-brand-light mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(15,23,42,0.9)' }}
          >
            Browse, purchase, and use the best AI agents on the market. 
            <br className="hidden sm:block" />
            Create and sell your own custom agents powered by OpenRouter.
          </p>
          
          {/* Call to Action Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
            style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.4))' }}
          >
            <Button
              variant="primary"
              size="lg"
              icon={Sparkles}
              className="w-full sm:w-auto text-lg font-bold shadow-accent-glow hover:shadow-2xl"
            >
              Browse Agents
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              icon={Zap}
              iconPosition="right"
              className="w-full sm:w-auto text-lg font-bold"
            >
              Create Your Agent
            </Button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 opacity-80">
            <div className="bg-brand-light/10 backdrop-blur-sm border border-brand-light/20 rounded-full px-4 py-2">
              <span className="text-brand-light text-sm font-medium">🚀 Next.js 15</span>
            </div>
            <div className="bg-brand-light/10 backdrop-blur-sm border border-brand-light/20 rounded-full px-4 py-2">
              <span className="text-brand-light text-sm font-medium">⚡ OpenRouter API</span>
            </div>
            <div className="bg-brand-light/10 backdrop-blur-sm border border-brand-light/20 rounded-full px-4 py-2">
              <span className="text-brand-light text-sm font-medium">🎯 Premium Experience</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-brand-light/60 animate-float cursor-pointer hover:text-brand-light transition-colors duration-300"
        onClick={() => {
          window.scrollTo({ 
            top: window.innerHeight, 
            behavior: 'smooth' 
          });
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>
      
      {/* Gradient Vignette Effect - Minimal pentru 3D visibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-brand-dark/20"></div>
    </section>
  );
};

export default HeroSection;