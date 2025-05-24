'use client'

import { useEffect, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string
      }, HTMLElement>
    }
  }
}

interface SplineViewerProps {
  url: string
  className?: string
}

export default function SplineViewer({ url, className = '' }: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Verifică dacă elementul custom este definit
    if (typeof window !== 'undefined' && !customElements.get('spline-viewer')) {
      // Așteaptă puțin pentru ca scriptul să se încarce
      const checkInterval = setInterval(() => {
        if (customElements.get('spline-viewer')) {
          clearInterval(checkInterval)
        }
      }, 100)

      // Cleanup după 5 secunde
      setTimeout(() => clearInterval(checkInterval), 5000)
    }
  }, [])

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <spline-viewer 
        url={url}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  )
}