'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import NeuralBackground from './NeuralBackground';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const CinematicHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide all elements
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: 45,
        transformPerspective: 1000,
      });

      // Create master timeline
      const tl = gsap.timeline({
        delay: 1.5, // Wait for 3D scene to load
        onStart: () => setTextVisible(true)
      });

      // Cinematic title animation with 3D effects
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 2,
        ease: "power4.out",
        onComplete: () => {
          // Add typing effect to highlight text
          gsap.to(".highlight-text", {
            text: "AI Agents",
            duration: 1,
            ease: "none",
            delay: 0.5
          });
        }
      })

      // Subtitle with parallax effect
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
      }, "-=1")

      // CTA buttons with stagger and 3D transform
      .to(ctaRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
      }, "-=0.8")

      // Stats counter animation
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5")

      // Continuous floating animation for title
      .to(titleRef.current, {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      }, "+=1");

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Parallax effect for content
          gsap.to([titleRef.current, subtitleRef.current], {
            y: progress * 50,
            opacity: 1 - progress * 0.5,
            duration: 0.3,
            ease: "none"
          });
          
          // Scale and fade CTA
          gsap.to(ctaRef.current, {
            scale: 1 - progress * 0.2,
            opacity: 1 - progress,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, heroRef);

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Stats data
  const stats = [
    { value: "1000+", label: "AI Agents" },
    { value: "50K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* 3D Neural Background */}
      <NeuralBackground className="absolute inset-0 z-0" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Title with 3D Text Effects */}
        <div 
          ref={titleRef}
          className="mb-8"
          style={{ 
            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 50px rgba(59,130,246,0.3)',
            filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.4))'
          }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Revoluția
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              <span className="highlight-text"></span>
            </span>
            <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              începe aici
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div 
          ref={subtitleRef}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
             style={{ textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>
            Marketplace-ul premium de{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">
              AI Agents România
            </span>
            {' '}- Invent Evolution SRL
            <br />
            Descoperă, cumpără și folosește cei mai avansați agenți AI din România
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <span className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Explorează Agenții
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          </button>

          <button className="group relative px-8 py-4 border-2 border-white/20 backdrop-blur-sm rounded-full text-white font-bold text-lg hover:border-white/40 transition-all duration-300 transform hover:scale-105">
            <span className="flex items-center gap-3">
              <Play className="w-5 h-5" />
              Vezi Demo
            </span>
          </button>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group cursor-pointer"
              style={{
                filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
              }}
            >
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium mt-1 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none z-5"></div>
    </section>
  );
};

export default CinematicHero;