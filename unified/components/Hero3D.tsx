'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero3D: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create AI Brain Network
    const nodes = [];
    const connections = [];
    
    // Node geometry and materials
    const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const nodeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 })
    ];

    // Create neural network nodes
    for (let i = 0; i < 120; i++) {
      const material = nodeMaterials[i % nodeMaterials.length].clone();
      const node = new THREE.Mesh(nodeGeometry, material);
      
      node.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 60
      );
      
      nodes.push(node);
      scene.add(node);
    }

    // Create connections
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x6366f1,
      transparent: true,
      opacity: 0.2
    });

    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && node.position.distanceTo(otherNode.position) < 12) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            node.position,
            otherNode.position
          ]);
          const line = new THREE.Line(geometry, connectionMaterial.clone());
          connections.push(line);
          scene.add(line);
        }
      });
    });

    // Floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 1,
      transparent: true,
      opacity: 0.4
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Dynamic lights
    const lights = [
      new THREE.PointLight(0x3b82f6, 2, 100),
      new THREE.PointLight(0x8b5cf6, 1.5, 100),
      new THREE.PointLight(0x06b6d4, 1.8, 100)
    ];

    lights[0].position.set(30, 30, 30);
    lights[1].position.set(-30, -30, 30);
    lights[2].position.set(0, 40, -30);

    lights.forEach(light => scene.add(light));

    camera.position.set(0, 0, 40);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Camera movement based on mouse
      camera.position.x += (mouse.x * 8 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Animate nodes
      nodes.forEach((node, i) => {
        node.rotation.x += 0.02;
        node.rotation.y += 0.015;
        
        // Pulsing effect
        const scale = 1 + Math.sin(Date.now() * 0.003 + i) * 0.3;
        node.scale.setScalar(scale);
        
        // Floating movement
        node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.02;
      });

      // Animate connections
      connections.forEach((connection, i) => {
        const material = connection.material as THREE.LineBasicMaterial;
        material.opacity = 0.1 + Math.sin(Date.now() * 0.004 + i) * 0.2;
      });

      // Rotate particles
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Animate lights
      const time = Date.now() * 0.001;
      lights[0].position.x = Math.sin(time) * 40;
      lights[0].position.z = Math.cos(time) * 40;
      
      lights[1].position.x = Math.cos(time * 0.8) * 35;
      lights[1].position.z = Math.sin(time * 0.8) * 35;

      lights[2].position.x = Math.sin(time * 1.2) * 25;
      lights[2].position.y = 20 + Math.cos(time * 1.2) * 20;

      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();
    setIsLoaded(true);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
        opacity: 0,
        y: 100,
        scale: 0.9
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 1 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2,
        ease: "elastic.out(1, 0.7)"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1")
      .to(ctaRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2
      }, "-=0.8")
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");

      // Continuous floating
      gsap.to(titleRef.current, {
        y: -15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Scroll effects
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to([titleRef.current, subtitleRef.current, ctaRef.current], {
            y: progress * 100,
            opacity: 1 - progress * 0.8,
            duration: 0.3
          });
        }
      });
    }, heroRef);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      // Dispose Three.js resources
      scene.clear();
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterials.forEach(mat => mat.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-gray-950">
      {/* 3D Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 2s ease-in-out' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto">
          
          {/* Main Title */}
          <div ref={titleRef} className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AI Agents
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                România
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Marketplace-ul premium pentru agenți AI de ultimă generație
              <br />
              <span className="text-blue-400 font-semibold">Invent Evolution SRL</span> - 
              Revoluționăm viitorul cu inteligența artificială
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Explorează Agenții AI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="group px-8 py-4 border-2 border-gray-600 hover:border-blue-400 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-3">
                <Play className="w-5 h-5" />
                Vezi Demo Live
              </span>
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "AI Agents" },
              { value: "25K+", label: "Utilizatori Activi" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Suport Tehnic" }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium mt-1 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-transparent to-gray-950/50 pointer-events-none"></div>
    </section>
  );
};

export default Hero3D;