'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureProps {
  title: string;
  description: string;
  icon: '🚀' | '⚡' | '🎯' | '🔒';
  index: number;
}

const Feature3D: React.FC<FeatureProps> = ({ title, description, icon, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.Mesh;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create 3D scene for icon
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(120, 120);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create different geometries for different icons
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;

    switch (icon) {
      case '🚀':
        geometry = new THREE.ConeGeometry(0.5, 1.5, 8);
        material = new THREE.MeshPhongMaterial({ 
          color: 0x3b82f6,
          shininess: 100,
          transparent: true,
          opacity: 0.8
        });
        break;
      case '⚡':
        geometry = new THREE.OctahedronGeometry(0.8);
        material = new THREE.MeshPhongMaterial({ 
          color: 0xfbbf24,
          shininess: 100,
          transparent: true,
          opacity: 0.8
        });
        break;
      case '🎯':
        geometry = new THREE.SphereGeometry(0.8, 16, 16);
        material = new THREE.MeshPhongMaterial({ 
          color: 0x8b5cf6,
          shininess: 100,
          transparent: true,
          opacity: 0.8
        });
        break;
      case '🔒':
        geometry = new THREE.BoxGeometry(1, 1, 1);
        material = new THREE.MeshPhongMaterial({ 
          color: 0x10b981,
          shininess: 100,
          transparent: true,
          opacity: 0.8
        });
        break;
    }

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    camera.position.z = 3;

    // Store scene reference
    sceneRef.current = {
      scene,
      camera,
      renderer,
      mesh,
      animationId: 0
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      sceneRef.current.animationId = requestAnimationFrame(animate);
      
      // Rotate mesh
      sceneRef.current.mesh.rotation.x += 0.01;
      sceneRef.current.mesh.rotation.y += 0.01;
      
      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
    };

    animate();

    // GSAP animations
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.8
      });

      // Scroll trigger animation
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            delay: index * 0.2
          });
        }
      });

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });

        if (sceneRef.current) {
          gsap.to(sceneRef.current.mesh.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });

        if (sceneRef.current) {
          gsap.to(sceneRef.current.mesh.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      cardRef.current?.addEventListener('mouseenter', handleMouseEnter);
      cardRef.current?.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cardRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        cardRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, cardRef);

    return () => {
      ctx.revert();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, [icon, index]);

  return (
    <div 
      ref={cardRef}
      className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group cursor-pointer"
      style={{
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 40px rgba(59,130,246,0.1)'
      }}
    >
      {/* 3D Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="w-30 h-30"
            style={{
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

const ValueProposition3D: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Performanță Extremă",
      description: "Next.js 15 + React 19 pentru viteze incredibile și experiență de utilizare optimă.",
      icon: "🚀" as const
    },
    {
      title: "AI de Ultimă Generație",
      description: "Integrare OpenRouter cu acces la cele mai avansate modele AI din lume.",
      icon: "⚡" as const
    },
    {
      title: "Experiență Premium",
      description: "Design 3D cinematic și animații GSAP pentru o experiență vizuală memorabilă.",
      icon: "🎯" as const
    },
    {
      title: "Securitate Absolută",
      description: "Platformă securizată enterprise-grade cu protecție avansată a datelor.",
      icon: "🔒" as const
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 50
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-500 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-500 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-pink-500 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text mb-6">
            De ce AI Agents România?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Marketplace-ul premium care combină tehnologia de vârf cu experiența cinematică pentru a redefinei interacțiunea cu AI-ul.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature3D
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ValueProposition3D;