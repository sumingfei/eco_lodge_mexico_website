import { featuredModels } from "@/data/models";
import { ModelCard } from "@/components/models/ModelCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export function FeaturedModels() {
  return (
    <section className="bg-limestone-50 py-20 sm:py-28 lg:py-36" id="modelos">
      <div className="container-wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Modelos"
              title="Seis casas. Infinitos terrenos."
              intro="Desde un refugio de 45 m² hasta una casa familiar de dos niveles. Cada modelo se adapta a tu terreno, tu clima y tu forma de vivir."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/modelos" variant="outline" icon={<ArrowRight size={16} />}>
              Ver todos los modelos
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
