'use client'

export default function SplineEmbed() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        src="https://my.spline.design/robot3dcopy-81e951a92c951f3ad0bb0e29ad12e834/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto'
        }}
        allow="autoplay"
        allowFullScreen
      />
    </div>
  )
}