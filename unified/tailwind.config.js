/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    '../frontend/pages/**/*.{ts,tsx}',
    '../frontend/components/**/*.{ts,tsx}',
    '../frontend/app/**/*.{ts,tsx}',
    '../frontend/src/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'display': ['Orbitron', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors pentru AI Agents Romania
        brand: {
          primary: '#0F172A',
          accent: '#3B82F6',
          light: '#F8FAFC',
          subtle: '#64748B',
          dark: '#0A0A0A',
        },
      },
      backgroundImage: {
        'hero-gradient-overlay': 'radial-gradient(circle at center, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.8) 85%, #0F172A 100%)',
        'text-gradient-accent': 'linear-gradient(135deg, #3B82F6, #0EA5E9, #A855F7)',
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'subtle-glow': '0 0 40px rgba(59, 130, 246, 0.1)',
        'button-hover': '0 10px 40px rgba(59, 130, 246, 0.4)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "subtle-glow": {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(59, 130, 246, 0.3)', 
          },
          '50%': { 
            textShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)', 
          },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "subtle-glow": "subtle-glow 3s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient-accent': {
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        },
        '.text-gradient-primary': {
          background: 'linear-gradient(135deg, #FFFFFF, #E2E8F0, #CBD5E1)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        },
        '.content-overlay': {
          background: 'radial-gradient(circle at center, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.8) 85%, rgba(15,23,42,0.9) 100%)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}