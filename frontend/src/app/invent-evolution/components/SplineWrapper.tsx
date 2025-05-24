'use client'

import React from 'react'

export default function SplineWrapper() {
  return (
    <div className="w-full h-full absolute inset-0">
      <React.Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-white text-lg animate-pulse">Loading 3D Experience...</p>
          </div>
        </div>
      }>
        <SplineContent />
      </React.Suspense>
    </div>
  )
}

// Separate component for lazy loading
function SplineContent() {
  const [SplineComponent, setSplineComponent] = React.useState<any>(null)
  
  React.useEffect(() => {
    import('@splinetool/react-spline/next').then((module) => {
      setSplineComponent(() => module.default)
    }).catch((error) => {
      console.error('Failed to load Spline:', error)
    })
  }, [])

  if (!SplineComponent) {
    return null
  }

  return (
    <SplineComponent 
      scene="https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  )
}