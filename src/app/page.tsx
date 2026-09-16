import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedModels } from "@/components/home/FeaturedModels";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { DesignSection } from "@/components/home/DesignSection";
import { CostComparisonSection } from "@/components/home/CostComparisonSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { LeadCta } from "@/components/home/LeadCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedModels />
      <HowItWorks />
      <SustainabilitySection />
      <DesignSection />
      <CostComparisonSection />
      <ProjectsSection />
      <TrustSection />
      <LeadCta />
    </>
  );
}
