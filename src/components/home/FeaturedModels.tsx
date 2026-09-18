import { featuredModels } from "@/data/models";
import { ModelCard } from "@/components/models/ModelCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { href } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function FeaturedModels() {
  const { locale, dict } = await getI18n();
  return (
    <section className="bg-limestone-50 py-20 sm:py-28 lg:py-36" id="models">
      <div className="container-wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow={dict.home.models.eyebrow} title={dict.home.models.title} intro={dict.home.models.intro} />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={href(locale, "models")} variant="outline" icon={<ArrowRight size={16} />}>
              {dict.common.allModels}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 xl:grid-cols-3">
          {featuredModels.map((model, i) => (
            <Reveal key={model.slug} delay={(i % 3) * 0.08}>
              <ModelCard model={model} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
