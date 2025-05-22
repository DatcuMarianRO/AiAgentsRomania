'use client';

import React, { useState, useEffect, useRef } from 'react';

interface InteractiveRobotProps {
  className?: string;
}

const InteractiveRobot: React.FC<InteractiveRobotProps> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [animationState, setAnimationState] = useState('idle');
  const robotRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive eye movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / 10,
          y: (e.clientY - centerY) / 10
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Random thinking animation
  useEffect(() => {
    const thinkInterval = setInterval(() => {
      setIsThinking(true);
      setTimeout(() => setIsThinking(false), 2000);
    }, Math.random() * 8000 + 5000);

    return () => clearInterval(thinkInterval);
  }, []);

  // Animation state cycling
  useEffect(() => {
    const stateInterval = setInterval(() => {
      const states = ['idle', 'wave', 'nod', 'processing'];
      const currentIndex = states.indexOf(animationState);
      const nextIndex = (currentIndex + 1) % states.length;
      setAnimationState(states[nextIndex]);
      
      // Reset to idle after 2 seconds
      setTimeout(() => setAnimationState('idle'), 2000);
    }, Math.random() * 10000 + 8000);

    return () => clearInterval(stateInterval);
  }, [animationState]);

  const handleRobotClick = () => {
    setAnimationState('excited');
    setTimeout(() => setAnimationState('idle'), 3000);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Enhanced Multi-Layer Background Glow */}
      <div className="absolute inset-0 -m-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/30 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-cyan-400 rounded-full blur-2xl opacity-30" style={{animation: 'spin 20s linear infinite'}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Holographic Ring Effects */}
      <div className="absolute inset-0 -m-4">
        <div className="absolute inset-0 border border-cyan-400/50 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute inset-0 border border-purple-400/40 rounded-full animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
      </div>
      
      {/* Main Robot Container */}
      <div 
        ref={robotRef}
        className={`relative cursor-pointer transform transition-all duration-700 hover:scale-110 ${
          isHovered ? 'animate-bounce' : ''
        } ${
          animationState === 'excited' ? 'animate-spin' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRobotClick}
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`
        }}
      >
        {/* Robot Head - Ultra Modern 3D */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          {/* Head Body - 8K Detail Level */}
          <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 rounded-3xl shadow-2xl border-4 border-slate-700 relative overflow-hidden backdrop-blur-sm">
            {/* Premium Metallic Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/20 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-200/30 via-transparent to-purple-200/30 rounded-3xl"></div>
            
            {/* High-Tech Panel Lines */}
            <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>
            <div className="absolute top-2 bottom-2 left-2 w-px bg-gradient-to-b from-transparent via-purple-400/60 to-transparent"></div>
            <div className="absolute top-2 bottom-2 right-2 w-px bg-gradient-to-b from-transparent via-pink-400/60 to-transparent"></div>
            
            {/* Multiple Shine Effects for 8K Detail */}
            <div className="absolute top-3 left-3 w-12 h-12 bg-white/50 rounded-full blur-md"></div>
            <div className="absolute top-1 left-1 w-6 h-6 bg-white/70 rounded-full blur-sm"></div>
            <div className="absolute top-4 right-6 w-3 h-3 bg-cyan-300/60 rounded-full blur-sm animate-pulse"></div>
            
            {/* Ultra-Modern 3D Eyes Container */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-6">
              {/* Left Eye - 8K Detail */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-full overflow-hidden shadow-inner border-2 border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-full"></div>
                <div 
                  className={`w-8 h-8 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 rounded-full transition-all duration-300 shadow-lg ${
                    isBlinking ? 'scale-y-0' : 'scale-y-100'
                  }`}
                  style={{
                    transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
                    marginTop: '2px',
                    marginLeft: '2px'
                  }}
                >
                  {/* Eye Pupil with Depth */}
                  <div className="w-4 h-4 bg-gradient-to-br from-indigo-600 to-blue-900 rounded-full mt-2 ml-2 shadow-inner">
                    <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1 animate-pulse shadow-lg"></div>
                    <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-200 rounded-full animate-pulse"></div>
                  </div>
                  {/* Eye Reflection */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white/60 rounded-full blur-sm"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-cyan-300/40 rounded-full blur-sm"></div>
                </div>
                {/* Eye Socket Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
              </div>
              
              {/* Right Eye - 8K Detail */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-full overflow-hidden shadow-inner border-2 border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-full"></div>
                <div 
                  className={`w-8 h-8 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 rounded-full transition-all duration-300 shadow-lg ${
                    isBlinking ? 'scale-y-0' : 'scale-y-100'
                  }`}
                  style={{
                    transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
                    marginTop: '2px',
                    marginLeft: '2px'
                  }}
                >
                  {/* Eye Pupil with Depth */}
                  <div className="w-4 h-4 bg-gradient-to-br from-indigo-600 to-blue-900 rounded-full mt-2 ml-2 shadow-inner">
                    <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1 animate-pulse shadow-lg"></div>
                    <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-200 rounded-full animate-pulse"></div>
                  </div>
                  {/* Eye Reflection */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white/60 rounded-full blur-sm"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-cyan-300/40 rounded-full blur-sm"></div>
                </div>
                {/* Eye Socket Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Enhanced Mouth/Speaker Grille */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className={`w-16 h-6 bg-gradient-to-br from-gray-900 to-black rounded-full transition-all duration-300 shadow-inner border border-gray-600 ${
                animationState === 'excited' ? 'animate-pulse bg-green-500' : ''
              }`}>
                <div className="flex justify-center items-center h-full gap-1 px-2">
                  <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-70"></div>
                  <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                  <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-70"></div>
                  <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                  <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-70"></div>
                  <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                  <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-70"></div>
                </div>
              </div>
            </div>
            
            {/* Enhanced LED Indicators */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <div className={`w-3 h-3 rounded-full border-2 border-gray-600 ${isThinking ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse' : 'bg-gray-700'}`}></div>
              <div className={`w-3 h-3 rounded-full border-2 border-gray-600 ${animationState !== 'idle' ? 'bg-green-400 shadow-lg shadow-green-400/50 animate-pulse' : 'bg-gray-700'}`}></div>
              <div className={`w-3 h-3 rounded-full border-2 border-gray-600 ${isHovered ? 'bg-blue-400 shadow-lg shadow-blue-400/50 animate-pulse' : 'bg-gray-700'}`}></div>
            </div>
          </div>
          
          {/* Enhanced Antenna */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-8 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full shadow-lg"></div>
            <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse mt-1 -ml-1 shadow-lg shadow-red-400/50 border-2 border-gray-600"></div>
          </div>
        </div>
        
        {/* Ultra-Modern 3D Robot Body */}
        <div className="relative w-32 h-40 mx-auto">
          <div className="w-full h-full bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 rounded-2xl shadow-2xl border-4 border-slate-700 relative overflow-hidden backdrop-blur-sm">
            {/* Premium Body Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-black/30 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-200/20 via-transparent to-purple-200/20 rounded-2xl"></div>
            
            {/* High-Tech Body Panel Lines */}
            <div className="absolute top-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            
            {/* Ultra-Modern Chest Panel */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl border-3 border-slate-600 shadow-inner">
              {/* Panel Frame Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl animate-pulse"></div>
              
              {/* Premium Screen Effect */}
              <div className="w-full h-full bg-gradient-to-br from-emerald-900 via-green-800 to-cyan-900 rounded-lg p-3 relative overflow-hidden">
                {/* Screen Scan Lines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent animate-pulse"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-green-400/30 animate-pulse"></div>
                
                {/* Enhanced AI Text Display */}
                <div className="text-green-300 text-sm font-mono leading-tight relative z-10">
                  <div className={`text-center font-bold text-lg ${isThinking ? 'animate-pulse text-cyan-300' : 'text-green-300'}`}>
                    AI
                  </div>
                  <div className="text-green-400 text-xs text-center mt-1 font-semibold tracking-wider">
                    ONLINE
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div className={`w-12 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full shadow-lg ${animationState !== 'idle' ? 'animate-pulse' : ''}`}>
                      <div className="w-full h-full bg-gradient-to-r from-green-300 to-cyan-300 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Additional Status Indicators */}
                  <div className="mt-2 flex justify-center gap-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                
                {/* Screen Reflection */}
                <div className="absolute top-1 left-1 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-cyan-300/30 rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Enhanced Side Panels */}
            <div className="absolute top-8 left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg opacity-80 animate-pulse shadow-lg shadow-blue-400/30"></div>
            <div className="absolute top-8 right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-lg opacity-80 animate-pulse shadow-lg shadow-red-400/30"></div>
            
            {/* Body Shine Effects */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-md"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-cyan-300/20 rounded-full blur-sm"></div>
          </div>
        </div>
        
        {/* Enhanced 3D Arms */}
        <div className="absolute top-24 -left-8 w-6 h-20 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-full transform rotate-12 shadow-xl border-2 border-slate-600">
          <div className={`w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full mt-16 -ml-1 shadow-lg border-2 border-slate-600 ${
            animationState === 'wave' ? 'animate-bounce' : ''
          }`}></div>
        </div>
        <div className="absolute top-24 -right-8 w-6 h-20 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-full transform -rotate-12 shadow-xl border-2 border-slate-600">
          <div className={`w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full mt-16 -ml-1 shadow-lg border-2 border-slate-600 ${
            animationState === 'wave' ? 'animate-bounce' : ''
          }`}></div>
        </div>
        
        {/* Enhanced 3D Legs */}
        <div className="absolute top-56 left-4 w-8 h-16 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-full shadow-xl border-2 border-slate-600">
          <div className="w-10 h-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full mt-12 -ml-1 shadow-lg border-2 border-slate-600"></div>
        </div>
        <div className="absolute top-56 right-4 w-8 h-16 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-full shadow-xl border-2 border-slate-600">
          <div className="w-10 h-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full mt-12 -ml-1 shadow-lg border-2 border-slate-600"></div>
        </div>
      </div>
      
      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full animate-ping ${
              i % 3 === 0 ? 'bg-blue-400/60' : i % 3 === 1 ? 'bg-cyan-400/60' : 'bg-purple-400/60'
            }`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Interactive Status Text */}
      {isThinking && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-cyan-300 text-sm px-4 py-2 rounded-full animate-pulse border border-cyan-400/50 shadow-lg shadow-cyan-400/25">
          🤖 Procesez date...
        </div>
      )}
      
      {animationState === 'excited' && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-600/90 text-white text-sm px-4 py-2 rounded-full animate-bounce border border-green-400/50 shadow-lg shadow-green-400/25">
          🚀 Salut! Hai să construim ceva uimitor!
        </div>
      )}
      
      {isHovered && animationState === 'idle' && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-600/90 text-white text-sm px-4 py-2 rounded-full border border-blue-400/50 shadow-lg shadow-blue-400/25">
          👋 Dă click pentru surpriză!
        </div>
      )}
    </div>
  );
};

export default InteractiveRobot;