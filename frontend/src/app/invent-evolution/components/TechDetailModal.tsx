'use client'

import { useEffect } from 'react'

interface TechDetailModalProps {
  category: any
  isOpen: boolean
  onClose: () => void
}

// Extended technology details based on the comprehensive document
const extendedTechDetails = {
  'google-ai-ultra': {
    fullTechnologies: [
      {
        name: 'Gemini 2.5 Pro',
        fullCapabilities: [
          'Model de gândire de ultimă generație cu Deep Think mode',
          'Procesare multimodală: audio, imagine, video și text',
          'Context window de 1 milion tokeni (extindere la 2M în curând)',
          'Data limită cunoștințe: Ianuarie 2025',
          'Integrare nativă cu Google Workspace'
        ],
        useCases: [
          'Luare decizii complexe pentru agenți enterprise',
          'Analiză date multidimensională',
          'Programare avansată și debugging',
          'Înțelegere contextuală profundă'
        ]
      },
      {
        name: 'Project Mariner',
        fullCapabilities: [
          'AI agentic bazat pe browser cu Gemini 2.0',
          'Automatizare până la 10 sarcini simultan',
          'Înțelegere și interacțiune cu pagini web',
          'Răspuns la instrucțiuni vocale',
          'Disponibil prin Google AI Ultra'
        ],
        useCases: [
          'Automatizare rezervări online',
          'Research și analiză competiție',
          'Shopping automation',
          'Interacțiune cu ANAF și platforme guvernamentale'
        ]
      },
      {
        name: 'Veo 3',
        fullCapabilities: [
          'Cel mai avansat model video de la Google',
          'Generare audio sincronizată (dialog, efecte)',
          'Controale cameră și extindere cadru',
          'Adăugare/eliminare obiecte din video'
        ],
        useCases: [
          'Videoclipuri demonstrative produse',
          'Training videos pentru HR',
          'Conținut marketing dinamic',
          'Prezentări interactive'
        ]
      },
      {
        name: 'Imagen 4',
        fullCapabilities: [
          'Claritate remarcabilă și detalii fine',
          'Redare texturi complexe (țesături, blană)',
          'Rezoluție până la 2K',
          'Tipografie îmbunătățită'
        ],
        useCases: [
          'Vizualuri personalizate pentru rapoarte',
          'Imagini produse e-commerce',
          'Materiale marketing',
          'Ilustrații tehnice'
        ]
      },
      {
        name: 'Flow',
        fullCapabilities: [
          'Instrument creație cinematografică AI',
          'Construit pe Veo, Imagen și Gemini',
          'Control personaje și scene',
          'Export profesional'
        ],
        useCases: [
          'Materiale prezentare premium',
          'Storytelling pentru brand',
          'Demo-uri produs cinematice'
        ]
      }
    ],
    partnerships: ['Google Cloud', 'Google Workspace', 'Vertex AI'],
    pricing: 'Inclus în abonamentul Google AI Ultra',
    integration: 'API nativ, SDK-uri pentru toate limbajele majore'
  },
  'llm-foundation': {
    fullTechnologies: [
      {
        name: 'Claude 4 Opus',
        fullCapabilities: [
          'Model de raționament hibrid de frontieră',
          'Performanțe excepționale în programare',
          'Context window 200K tokeni',
          'Computer use capabilities',
          'Disponibil prin Anthropic, Amazon Bedrock'
        ],
        benchmarks: {
          'Programare': '95%+',
          'Raționament': '92%',
          'Creativitate': '89%'
        }
      },
      {
        name: 'GPT-4.5 (Orion)',
        fullCapabilities: [
          'Cel mai mare model OpenAI (Feb 2025)',
          'Învățare nesupervizată avansată',
          'Context 128K tokeni',
          'Inteligență emoțională (EQ) îmbunătățită',
          'Cunoștințe enciclopedice vaste'
        ],
        benchmarks: {
          'Conversație': '96%',
          'Cunoștințe': '94%',
          'Multimodal': '91%'
        }
      },
      {
        name: 'Llama 4 Maverick',
        fullCapabilities: [
          'Arhitectură Mixture of Experts (MoE)',
          '400 miliarde parametri totali',
          'Multimodal și multilingv (12 limbi)',
          'Context 1M tokeni (512K pe OCI)',
          'Open-weight cu licență comunitară'
        ],
        benchmarks: {
          'Eficiență': '98%',
          'Multilingv': '93%',
          'Scalabilitate': '97%'
        }
      },
      {
        name: 'Llama 4 Scout',
        fullCapabilities: [
          'Fereastră context record: 10 milioane tokeni!',
          '109 miliarde parametri, 16 experți',
          'Optimizat pentru eficiență',
          'Perfect pentru documente masive'
        ],
        benchmarks: {
          'Long Context': '99%',
          'Viteză': '95%',
          'Acuratețe': '91%'
        }
      }
    ],
    comparison: 'Fiecare model are puncte forte unice - selectăm automat cel mai potrivit pentru sarcina specifică'
  },
  'agent-frameworks': {
    fullTechnologies: [
      {
        name: 'LangChain/LangGraph',
        fullCapabilities: [
          'LangGraph Platform acum în GA (Mai 2025)',
          'Agenți stateful cu checkpointing',
          'Fluxuri deterministe complexe',
          'Vast ecosistem de integrări',
          'Suport pentru toate LLM-urile majore'
        ],
        features: [
          'Memory management avansat',
          'Tool calling sofisticat',
          'Debugging și monitoring',
          'Deployment ready'
        ]
      },
      {
        name: 'CrewAI',
        fullCapabilities: [
          'Orchestrare multi-agent intuitivă',
          'Metaforă "echipă" cu roluri',
          'Suport MCP pentru instrumente',
          'Bus de evenimente pentru extensibilitate',
          'Versiune Enterprise disponibilă'
        ],
        features: [
          'Detecție halucinații',
          'Depozite private instrumente',
          'RAG agentic integrat',
          'Context sharing între agenți'
        ]
      },
      {
        name: 'LlamaIndex',
        fullCapabilities: [
          'Specializat în RAG avansat',
          'Conectare LLM-uri la date externe',
          'Suport GPT 4.1 și Gemini 2.5 Pro',
          'Indexare vectorială și grafuri',
          'Parsare documente inteligentă'
        ],
        features: [
          'Multi-modal indexing',
          'Hybrid search',
          'Knowledge graphs',
          'Production optimizations'
        ]
      },
      {
        name: 'Google ADK & Vertex AI',
        fullCapabilities: [
          'Agent Development Kit open-source',
          'Python GA, Java v0.1.0',
          'Streaming audio/video bidirecțional',
          'Integrare cu LangGraph și CrewAI',
          'UI pentru deployment în Vertex AI'
        ],
        features: [
          'Native Gemini optimization',
          'Enterprise scaling',
          'Model versioning',
          'A/B testing pentru agenți'
        ]
      },
      {
        name: 'Microsoft AG2 (AutoGen)',
        fullCapabilities: [
          'Arhitectură multi-agent asincronă',
          'Design bazat pe evenimente',
          'Automatizare generare cod',
          'Integrare ecosistem Microsoft'
        ],
        features: [
          'Code generation',
          'Workflow automation',
          'Azure integration',
          'Enterprise support'
        ]
      }
    ]
  },
  'multimodal-ai': {
    fullTechnologies: [
      {
        name: 'Text-to-Speech Premium',
        technologies: [
          {
            name: 'ElevenLabs',
            features: [
              'Suport confirmat limba română',
              'Nuanțe regionale și dialecte',
              'Clonare vocală de înaltă fidelitate',
              'Control ton și emoții',
              '32 limbi suportate total'
            ],
            pricing: 'De la $5/lună'
          },
          {
            name: 'Hume AI Octave',
            features: [
              'Expresivitate emoțională de vârf',
              'Clonare voce din 5 secunde audio',
              'Înțelegere contextuală profundă',
              'Română planificată în curând'
            ]
          },
          {
            name: 'Alte soluții TTS',
            options: ['WellSaid Labs', 'Listnr (1000+ voci)', 'Play.ht (900+ voci)', 'Murf AI', 'Speechify']
          }
        ]
      },
      {
        name: 'Generare Video AI',
        technologies: [
          {
            name: 'Google Veo 3',
            features: ['Audio sincronizat', 'Control cinematic', 'Parte din Google AI Ultra']
          },
          {
            name: 'Pollo AI Platform',
            features: [
              'Integrare Runway Gen-3, Kling 1.6',
              'Sincronizare buze automată',
              '4K upscaling',
              '40+ efecte vizuale'
            ]
          },
          {
            name: 'Alte generatoare',
            options: ['Synthesia (avatare AI)', 'Pictory', 'Luma AI', 'Runway Gen-3']
          }
        ]
      },
      {
        name: 'Generare Imagini',
        technologies: [
          {
            name: 'DALL-E 3',
            features: ['Prompturi complexe', 'Inpainting', 'API disponibil']
          },
          {
            name: 'Midjourney v6',
            features: ['Calitate artistică superioară', 'Stiluri diverse']
          },
          {
            name: 'Stable Diffusion 3',
            features: ['Open-source', 'Customizable', 'Self-hosted']
          }
        ]
      },
      {
        name: 'Generare Audio & Muzică',
        technologies: [
          { name: 'Suno AI', capability: 'Full tracks cu voce' },
          { name: 'Udio AI', capability: 'Competiție Suno' },
          { name: 'Aiva AI', capability: 'Muzică clasică' },
          { name: 'Beatoven AI', capability: 'Background music' }
        ]
      }
    ]
  },
  'data-intelligence': {
    fullTechnologies: [
      {
        name: 'Transcriere AI Română',
        technologies: [
          {
            name: 'Sonix',
            features: [
              'Acuratețe confirmată pentru română',
              'Conversie rapidă (ore în minute)',
              'Editor online integrat',
              'Traducere 53+ limbi'
            ],
            accuracy: '99%+ pentru română'
          },
          {
            name: 'Trint',
            features: [
              'Până la 99.8% acuratețe',
              'Backend Whisper AI',
              'Transcriere timp real',
              'Recunoaștere vorbitori'
            ],
            pricing: 'De la $48/lună'
          },
          {
            name: 'OpenAI Whisper v3',
            features: [
              'Open-source',
              '98 limbi suportate',
              '680K ore training data',
              'Poate fi self-hosted'
            ],
            accuracy: 'Excelentă pentru română'
          }
        ]
      },
      {
        name: 'Business Intelligence AI',
        technologies: [
          {
            name: 'Tableau AI',
            features: [
              'Ask Data - interogări naturale',
              'Explain Data - insights automate',
              'Tableau Pulse - personalizare AI',
              'Tableau Agent conversațional'
            ]
          },
          {
            name: 'Julius AI',
            features: [
              'Agent specializat analiză date',
              'Workflow-uri automate',
              'Conectare surse multiple',
              'Prognoze predictive'
            ]
          },
          {
            name: 'Power BI + Copilot',
            features: [
              'Integrare Microsoft ecosystem',
              'Natural language queries',
              'Real-time dashboards'
            ]
          }
        ]
      }
    ]
  },
  'automation-integration': {
    fullTechnologies: [
      {
        name: 'n8n.io',
        features: [
          'Open-source și self-hostable',
          '70+ noduri specifice AI prin LangChain',
          'Cod custom JS/Python',
          'Model preț per workflow',
          'Perfect pentru volum mare'
        ],
        integrări: '500+ aplicații',
        deployment: 'Cloud sau on-premise'
      },
      {
        name: 'Make.com',
        features: [
          'Make AI Tools cu GPT-4.1 nano',
          'Builder vizual avansat',
          'Transformări date complexe',
          'Logic branching sofisticat'
        ],
        integrări: '1500+ aplicații',
        pricing: 'Per operațiune'
      },
      {
        name: 'Zapier',
        features: [
          'Zapier Agents (nou în Mai 2025)',
          'Focus pe automatizare vs chat',
          'Cel mai mare catalog integrări',
          'No-code friendly'
        ],
        integrări: '6000+ aplicații',
        pricing: 'Per task'
      },
      {
        name: 'Platforme Specializate',
        options: [
          {
            name: 'Bardeen AI',
            focus: 'Browser automation local'
          },
          {
            name: 'Empler AI',
            focus: 'Go-to-market automation cu echipe de agenți'
          },
          {
            name: 'Jasper AI',
            focus: 'Marketing content automation'
          }
        ]
      }
    ],
    romanianIntegrations: [
      'ANAF API',
      'Bănci locale (BT, BCR, BRD)',
      'eFactura',
      'SPV (Verificare firme)',
      'Transfond'
    ]
  }
}

export default function TechDetailModal({ category, isOpen, onClose }: TechDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!category) return null

  const extendedDetails = extendedTechDetails[category.id as keyof typeof extendedTechDetails]

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative h-full flex items-center justify-center p-4 md:p-8">
        <div className={`relative bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
          {/* Header */}
          <div className={`sticky top-0 z-10 bg-gradient-to-r ${category.gradient} p-6 md:p-8`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-5xl md:text-6xl">{category.icon}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{category.category}</h2>
                <p className="text-white/80">{category.count} tehnologii integrate</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 md:p-8">
            <div className="space-y-12">
              {/* Overview */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Prezentare Generală</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {category.details.overview}
                </p>
              </div>

              {/* Extended Technologies */}
              {extendedDetails?.fullTechnologies && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Tehnologii Detaliate</h3>
                  <div className="space-y-8">
                    {extendedDetails.fullTechnologies.map((tech: any, index: number) => (
                      <div key={index} className="bg-black/50 border border-gray-800 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-white mb-4">{tech.name}</h4>
                        
                        {tech.fullCapabilities && (
                          <div className="mb-4">
                            <h5 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Capabilități</h5>
                            <ul className="space-y-2">
                              {tech.fullCapabilities.map((cap: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span className="text-gray-300">{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {tech.useCases && (
                          <div className="mt-4">
                            <h5 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Cazuri de Utilizare</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {tech.useCases.map((useCase: string, i: number) => (
                                <div key={i} className="text-gray-400 text-sm">→ {useCase}</div>
                              ))}
                            </div>
                          </div>
                        )}

                        {tech.benchmarks && (
                          <div className="mt-4">
                            <h5 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Performanță</h5>
                            <div className="grid grid-cols-3 gap-4">
                              {Object.entries(tech.benchmarks).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-2xl font-bold text-white">{value}</div>
                                  <div className="text-xs text-gray-500">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {tech.technologies && (
                          <div className="space-y-4">
                            {tech.technologies.map((subTech: any, i: number) => (
                              <div key={i} className="bg-gray-900/50 rounded-xl p-4">
                                <h5 className="font-semibold text-white mb-2">{subTech.name}</h5>
                                {subTech.features && (
                                  <ul className="space-y-1 text-sm text-gray-400">
                                    {subTech.features.map((feat: string, j: number) => (
                                      <li key={j}>• {feat}</li>
                                    ))}
                                  </ul>
                                )}
                                {subTech.pricing && (
                                  <p className="text-blue-400 text-sm mt-2">{subTech.pricing}</p>
                                )}
                                {subTech.accuracy && (
                                  <p className="text-green-400 text-sm mt-2">{subTech.accuracy}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Romanian Integrations */}
              {extendedDetails?.romanianIntegrations && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Integrări Românești</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {extendedDetails.romanianIntegrations.map((integration: string) => (
                      <div key={integration} className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4 text-center">
                        <span className="text-blue-400 font-semibold">{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="text-center pt-8">
                <button className={`px-8 py-4 bg-gradient-to-r ${category.gradient} text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-xl`}>
                  Începe cu {category.category}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}