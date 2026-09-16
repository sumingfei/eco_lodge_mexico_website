import type { Metadata } from "next";
import { models } from "@/data/models";
import { getModelStartingPrice, getStartingPricePerM2 } from "@/lib/pricing";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { formatMXN } from "@/lib/format";
import { ModelsExplorer } from "@/components/models/ModelsExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { fill, href } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "models", title: dict.modelsPage.title, description: dict.modelsPage.description, image: "/images/models/casa-85-01.jpg" });
}

export default async function ModelsPage() {
  const { locale, dict } = await getI18n();
  const m = dict.modelsPage;
  const withPrices = models.map((model) => ({ ...model, priceFrom: getModelStartingPrice(model) }));

  return (
    <>
      <JsonLd data={itemListJsonLd(models, locale)} />
      <section className="container-wide pb-12 pt-32 sm:pt-40">
        <SectionHeading as="h1" eyebrow={m.eyebrow} title={m.heading} intro={fill(m.intro, { price: formatMXN(getStartingPricePerM2()) })} />
      </section>
      <section className="container-wide pb-24 sm:pb-32">
        <ModelsExplorer models={withPrices} />
      </section>
      <section className="bg-limestone-50 py-20">
        <div className="container-narrow text-center">
          <h2 className="display text-3xl text-ink sm:text-4xl">{m.ctaTitle}</h2>
          <p className="mt-4 text-charcoal-700/80">{m.ctaText}</p>
          <Button href={href(locale, "estimator")} className="mt-8" icon={<ArrowRight size={16} />}>
            {dict.common.goToEstimator}
          </Button>
        </div>
      </section>
    </>
  );
}
