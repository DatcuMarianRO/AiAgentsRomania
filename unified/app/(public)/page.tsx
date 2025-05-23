import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { AgentsShowcase } from '@/components/home/AgentsShowcase';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSection />
      <FeaturesSection />
      <AgentsShowcase />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}