import React, { useRef } from 'react';
import Script from 'next/script';

interface SplineRobotProps {
  className?: string;
  sceneUrl?: string;
}

const SplineRobot: React.FC<SplineRobotProps> = ({ 
  className = '',
  sceneUrl = 'https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode'
}) => {
  const splineRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js" 
        type="module"
        strategy="afterInteractive"
      />
      
      <div className={`relative ${className}`}>
        {/* Spline Viewer Container */}
        <div 
          ref={splineRef}
          className="relative w-full h-full"
        >
          {/* @ts-ignore - Spline viewer web component */}
          <spline-viewer 
            url={sceneUrl}
            style={{ width: '100%', height: '100%' }}
            events-target="global"
            mouse-target="global"
          />
        </div>
      </div>
    </>
  );
};

export default SplineRobot;