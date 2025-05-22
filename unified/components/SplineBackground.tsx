import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import pentru Spline pentru a evita problemele SSR
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SplineLoader />
});

// Loading component elegant pentru Spline - Premium Design
const SplineLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-dark via-slate-900 to-brand-primary">
    <div className="text-center relative">
      {/* Logo AI Agents Romania animat */}
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-accent/30 animate-spin" style={{ animationDuration: '3s' }}></div>
          
          {/* Inner pulsing core */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-brand-accent to-sky-400 animate-pulse"></div>
          
          {/* Center logo/icon */}
          <div className="absolute inset-6 rounded-full bg-brand-primary flex items-center justify-center">
            <div className="text-brand-accent font-display font-bold text-lg animate-subtle-glow">AI</div>
          </div>
        </div>
        
        {/* Glow effect behind logo */}
        <div className="absolute inset-0 rounded-full bg-brand-accent/20 blur-xl animate-pulse"></div>
      </div>
      
      {/* Brand text */}
      <div className="space-y-3">
        <h3 className="text-brand-light font-display font-bold text-2xl animate-pulse">
          AI Agents Romania
        </h3>
        <p className="text-brand-subtle text-sm font-medium tracking-wide">
          Loading 3D Experience...
        </p>
      </div>
      
      {/* Elegant progress indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {/* Loading progress bar */}
      <div className="mt-8 w-48 h-1 bg-brand-subtle/20 rounded-full overflow-hidden mx-auto">
        <div className="h-full bg-gradient-to-r from-brand-accent to-sky-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

interface SplineBackgroundProps {
  className?: string;
}

const SplineBackground: React.FC<SplineBackgroundProps> = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Fallback pentru erori
  if (hasError) {
    return (
      <div className={`spline-container ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-900 to-brand-primary">
          {/* Gradient animat ca fallback */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/20 via-purple-500/20 to-cyan-500/20 animate-pulse"></div>
          
          {/* Pattern geometric ca backup */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-brand-accent rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-500 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-cyan-500 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
          </div>
        </div>
        
        {/* Overlay gradient pentru text readability */}
        <div className="absolute inset-0 bg-hero-gradient-overlay"></div>
      </div>
    );
  }

  return (
    <div className={`spline-container ${className}`}>
      {/* Spline Scene */}
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene="https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
        />
      </Suspense>
      
      {/* Overlay gradient subtil pentru lizibilitatea textului */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/30 pointer-events-none"></div>
      
      {/* Loading overlay care dispare când Spline se încarcă */}
      {!isLoaded && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <SplineLoader />
        </div>
      )}
    </div>
  );
};

export default SplineBackground;