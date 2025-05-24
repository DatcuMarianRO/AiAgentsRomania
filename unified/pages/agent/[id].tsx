import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import AgentDetailPage from '../../components/AgentDetailPage';
import { COMPREHENSIVE_CAEN_DATA } from '../../data/inventEvolutionAgents';
import { AgentByCaen } from '../../types/caen';

interface AgentPageProps {
  agent: AgentByCaen;
}

export default function AgentPage({ agent }: AgentPageProps) {
  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agent nu a fost găsit</h1>
          <a href="/agents-caen" className="text-blue-400 hover:text-blue-300">
            ← Înapoi la marketplace
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{agent.name} - AI Agent {agent.type} | AI Agents România</title>
        <meta 
          name="description" 
          content={`${agent.description} Cod CAEN ${agent.caenCode}. ${agent.useCase}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={`${agent.name}, AI agent, ${agent.type}, CAEN ${agent.caenCode}, ${agent.tags.join(', ')}, Invent Evolution`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://ai-agents-romania.com/agent/${agent.id}`} />
        <meta property="og:title" content={`${agent.name} - AI Agent ${agent.type}`} />
        <meta property="og:description" content={agent.shortDescription} />
        <meta property="og:image" content={agent.thumbnail || '/og-agent-default.jpg'} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://ai-agents-romania.com/agent/${agent.id}`} />
        <meta property="twitter:title" content={`${agent.name} - AI Agent ${agent.type}`} />
        <meta property="twitter:description" content={agent.shortDescription} />
        <meta property="twitter:image" content={agent.thumbnail || '/og-agent-default.jpg'} />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": agent.name,
              "description": agent.description,
              "brand": {
                "@type": "Organization",
                "name": "Invent Evolution SRL"
              },
              "category": `AI Agent - ${agent.type}`,
              "offers": {
                "@type": "Offer",
                "price": agent.pricing.startingPrice || 0,
                "priceCurrency": agent.pricing.currency,
                "availability": "https://schema.org/InStock",
                "priceValidUntil": "2024-12-31"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": agent.rating,
                "reviewCount": agent.reviewCount,
                "bestRating": 5,
                "worstRating": 1
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "Invent Evolution SRL",
                "url": "https://inventevolution.com"
              }
            })
          }}
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`https://ai-agents-romania.com/agent/${agent.id}`} />
      </Head>

      <AgentDetailPage agentId={agent.id} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = COMPREHENSIVE_CAEN_DATA.agents.map((agent) => ({
    params: { id: agent.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const agent = COMPREHENSIVE_CAEN_DATA.agents.find(
    (agent) => agent.id === params?.id
  );

  if (!agent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      agent,
    },
  };
};