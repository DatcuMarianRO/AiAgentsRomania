import React from 'react';
import Head from 'next/head';
import CaenMarketplace from '../components/CaenMarketplace';

export default function AgentsCaenPage() {
  return (
    <>
      <Head>
        <title>AI Agents pe Coduri CAEN - AI Agents România</title>
        <meta 
          name="description" 
          content="Descoperă agenții AI specializați pentru fiecare industrie din România, organizați perfect pe coduri CAEN pentru maximă relevanță și eficiență." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI agents, CAEN codes, Romania, artificial intelligence, marketplace, industrii, automatizare" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ai-agents-romania.com/agents-caen" />
        <meta property="og:title" content="AI Agents pe Coduri CAEN - AI Agents România" />
        <meta property="og:description" content="Marketplace-ul premium pentru agenți AI organizați pe industrii CAEN din România." />
        <meta property="og:image" content="/og-caen-marketplace.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ai-agents-romania.com/agents-caen" />
        <meta property="twitter:title" content="AI Agents pe Coduri CAEN - AI Agents România" />
        <meta property="twitter:description" content="Marketplace-ul premium pentru agenți AI organizați pe industrii CAEN din România." />
        <meta property="twitter:image" content="/og-caen-marketplace.jpg" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "AI Agents pe Coduri CAEN",
              "description": "Marketplace pentru agenți AI specializați pe industrii CAEN din România",
              "url": "https://ai-agents-romania.com/agents-caen",
              "publisher": {
                "@type": "Organization",
                "name": "Invent Evolution SRL",
                "url": "https://ai-agents-romania.com"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Acasă",
                    "item": "https://ai-agents-romania.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "AI Agents CAEN",
                    "item": "https://ai-agents-romania.com/agents-caen"
                  }
                ]
              }
            })
          }}
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://ai-agents-romania.com/agents-caen" />
      </Head>

      <CaenMarketplace />
    </>
  );
}