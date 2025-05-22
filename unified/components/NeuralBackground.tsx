'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface NeuralBackgroundProps {
  className?: string;
}

const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Neural Network Creation
    const nodes = [];
    const connections = [];
    const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 6);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8
    });

    // Create nodes in 3D space
    for (let i = 0; i < 100; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      node.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      nodes.push(node);
      scene.add(node);
    }

    // Create connections between nearby nodes
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x6366f1,
      transparent: true,
      opacity: 0.3
    });

    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && node.position.distanceTo(otherNode.position) < 8) {
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

    // Ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Point lights for dramatic effect
    const light1 = new THREE.PointLight(0x3b82f6, 1, 100);
    light1.position.set(20, 20, 20);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 0.8, 100);
    light2.position.set(-20, -20, 20);
    scene.add(light2);

    // Particle system for extra atmosphere
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.5,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Animate nodes
      nodes.forEach((node, i) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
        
        // Pulsing effect
        const scale = 1 + Math.sin(Date.now() * 0.001 + i) * 0.2;
        node.scale.setScalar(scale);
        
        // Color animation
        const material = node.material as THREE.MeshBasicMaterial;
        material.opacity = 0.5 + Math.sin(Date.now() * 0.002 + i) * 0.3;
      });

      // Animate connections
      connections.forEach((connection, i) => {
        const material = connection.material as THREE.LineBasicMaterial;
        material.opacity = 0.1 + Math.sin(Date.now() * 0.003 + i) * 0.2;
      });

      // Rotate particles
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;

      // Animate lights
      light1.position.x = Math.sin(Date.now() * 0.001) * 30;
      light1.position.z = Math.cos(Date.now() * 0.001) * 30;
      
      light2.position.x = Math.cos(Date.now() * 0.0008) * 25;
      light2.position.z = Math.sin(Date.now() * 0.0008) * 25;

      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.clear();
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 ${className}`}
      style={{ 
        background: 'radial-gradient(circle at center, rgba(15,23,42,0.8) 0%, rgba(0,0,0,0.95) 70%)',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 2s ease-in-out'
      }}
    />
  );
};

export default NeuralBackground;