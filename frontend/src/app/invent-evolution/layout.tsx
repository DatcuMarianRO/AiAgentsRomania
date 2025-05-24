import Script from 'next/script'
import { Inter, Space_Grotesk, Roboto_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono'
})

export default function InventEvolutionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script 
        src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />
      <div className={`${inter.variable} ${spaceGrotesk.variable} ${robotoMono.variable}`}>
        {children}
      </div>
    </>
  )
}