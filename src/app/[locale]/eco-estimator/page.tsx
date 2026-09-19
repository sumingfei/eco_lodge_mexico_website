import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { EcoEstimator } from "@/components/calculator/EcoEstimator";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "ecoEstimator", title: dict.ecoEstimator.metaTitle, description: dict.ecoEstimator.metaDescription });
}

export default async function EcoEstimatorPage({ searchParams }: PageProps<"/[locale]/eco-estimator">) {
  const params = await searchParams;
  const { dict } = await getI18n();
  const e = dict.ecoEstimator;
  const model = typeof params.model === "string" ? params.model : undefined;
  return (
    <>
      <section className="container-wide pb-12 pt-32 sm:pt-40">
        <SectionHeading as="h1" eyebrow={e.eyebrow} title={e.title} intro={e.intro} />
      </section>
      <section className="container-wide pb-24 sm:pb-32">
        <EcoEstimator defaultModel={model} />
      </section>
    </>
  );
}
