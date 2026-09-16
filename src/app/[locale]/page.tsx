import type { Metadata } from "next";
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
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { fill, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "home", title: fill(dict.seo.siteTitle, { name: siteConfig.name }), description: t(siteConfig.description, locale) });
}

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
