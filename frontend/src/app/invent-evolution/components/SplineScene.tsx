'use client'

import { useCallback, useState } from 'react'
import Spline from '@splinetool/react-spline/next'

export default function SplineScene() {
  const [isLoading, setIsLoading] = useState(true)

  const onLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-white text-lg animate-pulse">Loading 3D Experience...</p>
          </div>
        </div>
      )}
      
      {/* Spline Scene */}
      <div className="w-full h-full absolute inset-0">
        <Spline
          scene="https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode"
          onLoad={onLoad}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  )
}