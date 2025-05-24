'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Import dinamic pentru a evita probleme SSR
const Spline = dynamic(
  () => import('@splinetool/react-spline').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-white animate-pulse">Loading 3D Scene...</div>
      </div>
    )
  }
)

export default function SplineScene3D() {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-white animate-pulse">Loading 3D Scene...</div>
      </div>
    }>
      <Spline 
        scene="https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </Suspense>
  )
}