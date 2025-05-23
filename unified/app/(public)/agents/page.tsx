import { AgentsCatalog } from '@/components/agents/AgentsCatalog';
import { AgentsHero } from '@/components/agents/AgentsHero';

export const metadata = {
  title: 'Agenți AI - AI Agents România',
  description: 'Descoperă și activează agenți AI specializați pentru business-ul tău. Suport clienți, vânzări, HR, contabilitate și multe altele.',
};

export default function AgentsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <AgentsHero />
      <AgentsCatalog />
    </div>
  );
}