'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pricingPlans = [
  {
    name: 'Starter',
    price: '299',
    currency: '€',
    period: 'lunar',
    description: 'Perfect pentru startup-uri și afaceri mici',
    gradient: 'from-gray-600 to-gray-700',
    popular: false,
    features: [
      '1 Agent AI personalizat',
      '5.000 interacțiuni/lună',
      'Suport email',
      'Actualizări automate',
      'Dashboard analytics',
      'Integrare API basic'
    ],
    limitations: [
      'Fără white-label',
      'Fără training custom',
      'Timp răspuns 24h'
    ]
  },
  {
    name: 'Professional',
    price: '999',
    currency: '€',
    period: 'lunar',
    description: 'Ideal pentru afaceri în creștere',
    gradient: 'from-blue-600 to-purple-600',
    popular: true,
    features: [
      '5 Agenți AI personalizați',
      '50.000 interacțiuni/lună',
      'Suport prioritar 24/7',
      'Training AI custom',
      'Analytics avansat',
      'Integrări illimitate',
      'White-label option',
      'API calls nelimitate'
    ],
    limitations: []
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    currency: '',
    period: '',
    description: 'Soluții scalabile pentru corporații',
    gradient: 'from-purple-600 to-pink-600',
    popular: false,
    features: [
      'Agenți AI nelimitați',
      'Interacțiuni nelimitate',
      'Dedicated account manager',
      'SLA 99.9% uptime',
      'Training & onboarding',
      'Infrastructură dedicată',
      'Securitate enterprise',
      'Compliance GDPR/ISO',
      'Custom development'
    ],
    limitations: []
  }
]

const addons = [
  {
    name: 'Extra Interacțiuni',
    price: '50€ / 10.000 interacțiuni',
    icon: '💬'
  },
  {
    name: 'Training Premium',
    price: '500€ / sesiune',
    icon: '🎓'
  },
  {
    name: 'Integrare Custom',
    price: '1.000€ / integrare',
    icon: '🔌'
  },
  {
    name: 'Suport Dedicat',
    price: '2.000€ / lună',
    icon: '🛡️'
  }
]

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [billingPeriod, setBillingPeriod] = useState<'lunar' | 'anual'>('lunar')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate pricing cards
    gsap.fromTo('.pricing-card',
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        }
      }
    )
  }, [])

  const getPrice = (price: string) => {
    if (price === 'Custom') return price
    const numPrice = parseInt(price)
    return billingPeriod === 'anual' ? Math.floor(numPrice * 10) : price
  }

  const getPeriod = (price: string) => {
    if (price === 'Custom') return ''
    return billingPeriod === 'anual' ? '/ an' : '/ lună'
  }

  return (
    <section ref={sectionRef} id="pricing" className="min-h-screen bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Planuri &</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-4">Prețuri</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Investiție transparentă în automatizarea afacerii tale. 
            ROI garantat din prima lună.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full p-1">
            <button
              onClick={() => setBillingPeriod('lunar')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingPeriod === 'lunar' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Lunar
            </button>
            <button
              onClick={() => setBillingPeriod('anual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingPeriod === 'anual' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Anual
              <span className="ml-2 text-green-400">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`pricing-card relative group ${
                plan.popular ? 'md:scale-110 z-10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-4 py-1 rounded-full font-medium">
                    Cel mai popular
                  </span>
                </div>
              )}

              <div className={`h-full bg-gradient-to-br ${plan.gradient} p-1 rounded-2xl`}>
                <div className="h-full bg-black rounded-2xl p-8 flex flex-col">
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-gray-400 text-2xl">{plan.currency}</span>
                      <span className="text-5xl font-bold text-white mx-1">{getPrice(plan.price)}</span>
                      <span className="text-gray-400">{getPeriod(plan.price)}</span>
                    </div>
                    {billingPeriod === 'anual' && plan.price !== 'Custom' && (
                      <p className="text-green-400 text-sm mt-2">
                        Economisești {parseInt(plan.price) * 2}€
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-3">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-start space-x-3">
                            <span className="text-gray-600 mt-0.5">✗</span>
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    {plan.price === 'Custom' ? 'Contactează-ne' : 'Începe Acum'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="text-white">Servicii</span>
            <span className="text-gray-500 ml-2">Adiționale</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon) => (
              <div key={addon.name} className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-all duration-300">
                <div className="text-3xl mb-3">{addon.icon}</div>
                <h4 className="text-white font-semibold mb-1">{addon.name}</h4>
                <p className="text-blue-400 text-sm">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-white font-semibold mb-2">Plată Securizată</h4>
            <p className="text-gray-400 text-sm">Stripe & PayPal. Anulezi oricând.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-white font-semibold mb-2">Setup Instant</h4>
            <p className="text-gray-400 text-sm">Activare în 5 minute. Zero cod.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-white font-semibold mb-2">ROI Garantat</h4>
            <p className="text-gray-400 text-sm">Sau îți returnăm banii în 30 zile.</p>
          </div>
        </div>
      </div>
    </section>
  )
}