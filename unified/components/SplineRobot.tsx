import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface SplineRobotProps {
  className?: string;
  sceneUrl?: string;
}

const SplineRobot: React.FC<SplineRobotProps> = ({ 
  className = '',
  sceneUrl = 'https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode' // URL placeholder pentru robotul tău personalizat
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const splineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for cinematic effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Spline load
  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js"
        strategy="afterInteractive"
        type="module"
      />

      <div className={`relative ${className}`}>
        {/* Premium Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative">
              {/* Cinematic Loading Animation */}
              <div className="w-32 h-32">
                <div className="absolute inset-0 border-4 border-cyan-400/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-4 border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-0 border-4 border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}></div>
                
                {/* Center Glow */}
                <div className="absolute inset-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse blur-xl opacity-60"></div>
                
                {/* Loading Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm animate-pulse">LOADING</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse" 
                     style={{ width: '60%', animation: 'slideInfinite 2s linear infinite' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Cinematic Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Depth of Field Blur Layers */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40" 
               style={{ opacity: scrollProgress * 0.3 }}></div>
          
          {/* Particle System */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          {/* Cinematic Light Rays */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent transform rotate-12 blur-sm"></div>
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-blue-400/20 via-transparent to-transparent transform -rotate-12 blur-sm"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-purple-400/20 via-transparent to-transparent blur-sm"></div>
          </div>
        </div>

        {/* Spline Viewer Container */}
        <div 
          ref={splineRef}
          className="relative w-full h-full"
          style={{ 
            transform: `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * -50}px)`,
            filter: `brightness(${1.1 - scrollProgress * 0.1})`,
            transition: 'transform 0.3s ease-out, filter 0.3s ease-out'
          }}
        >
          {/* @ts-ignore - Spline viewer web component */}
          <spline-viewer 
            url={sceneUrl}
            onload={handleSplineLoad}
            style={{ width: '100%', height: '100%' }}
            events-target="global"
            mouse-target="global"
          />
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Rim Lighting Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-transparent to-transparent opacity-50"></div>
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30"></div>
        </div>

        {/* Interactive Hints */}
        {!isLoading && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-cyan-400/30">
              <p className="text-cyan-400 text-sm font-medium animate-pulse">
                🖱️ Folosește mouse-ul pentru a explora • Scroll pentru efecte cinematice
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInfinite {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(50px) scale(1.5);
            opacity: 0.8;
          }
          90% {
            opacity: 1;
          }
        }

        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 100%);
        }
      `}</style>
    </>
  );
};

export default SplineRobot;