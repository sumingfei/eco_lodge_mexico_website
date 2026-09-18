import type { Metadata } from "next";
import { getModelBySlug } from "@/data/models";
import { pricing } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import { Estimator, type EstimatorDefaults } from "@/components/calculator/Estimator";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SizeRangeId } from "@/lib/estimator";
import { fill } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "estimator", title: dict.estimator.metaTitle, description: dict.estimator.metaDescription });
}

function sizeRangeForArea(areaM2: number): SizeRangeId {
  const ranges = pricing.sizeRanges;
  if (areaM2 <= 60) return ranges[0].id;
  if (areaM2 <= 90) return ranges[1].id;
  if (areaM2 <= 120) return ranges[2].id;
  if (areaM2 <= 160) return ranges[3].id;
  return ranges[4].id;
}

export default async function EstimatorPage({ searchParams }: PageProps<"/[locale]/estimator">) {
  const params = await searchParams;
  const { dict } = await getI18n();
  const modelSlug = typeof params.model === "string" ? params.model : undefined;
  const land = typeof params.land === "string" ? params.land : undefined;
  const model = modelSlug ? getModelBySlug(modelSlug) : undefined;

  const defaults: EstimatorDefaults = {
    sizeRange: model ? sizeRangeForArea(model.areaM2) : undefined,
    bedrooms: model?.bedrooms,
    hasLand: land === "no" ? "no" : undefined,
    modelName: model?.name,
  };

  return (
    <>
      <section className="container-wide pb-12 pt-32 sm:pt-40">
        <SectionHeading as="h1" eyebrow={dict.estimator.eyebrow} title={model ? fill(dict.estimator.titleModel, { model: model.name }) : dict.estimator.titleDefault} intro={dict.estimator.intro} />
      </section>
      <section className="container-wide pb-24 sm:pb-32">
        <Estimator defaults={defaults} key={modelSlug ?? "default"} />
      </section>
    </>
  );
}
