import type { Metadata } from "next";
import { sustainabilitySections } from "@/data/sustainability";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { ArrowRight } from "@/components/ui/Icons";
import { CrossVentilationDiagram, InsulationDiagram, RainwaterDiagram, RoofShadingDiagram, SolarOrientationDiagram } from "@/components/diagrams/Diagrams";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Casas sustentables: diseño pasivo, energía, agua y materiales",
  description:
    "Estrategias concretas de sustentabilidad en nuestras casas prefabricadas: orientación solar, ventilación cruzada, sombreado, aislamiento continuo, captación pluvial, energía solar y reducción de residuos.",
  path: "/sustentabilidad",
  image: "/images/interiors/sala-jardin.jpg",
});

const diagrams = {
  orientation: SolarOrientationDiagram,
  ventilation: CrossVentilationDiagram,
  shading: RoofShadingDiagram,
  insulation: InsulationDiagram,
  rainwater: RainwaterDiagram,
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustentabilidad"
        title="Menos impacto. Más casa."
        intro="Sustentabilidad medible en decisiones de arquitectura: orientación, sombra, aislamiento, agua y energía. Sin hojas, sin promesas que no podamos sostener."
        image="/images/interiors/sala-jardin.jpg"
        alt="Estancia con muros de madera abierta hacia un jardín sombreado"
      />

      <nav aria-label="Secciones" className="sticky top-[var(--header-h)] z-30 border-b border-ink/10 bg-limestone/90 backdrop-blur">
        <div className="container-wide flex gap-6 overflow-x-auto py-3 text-sm">
          {sustainabilitySections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 whitespace-nowrap text-ink/70 hover:text-ink">
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-wide divide-y divide-ink/10">
        {sustainabilitySections.map((section, i) => {
          const Diagram = section.diagram ? diagrams[section.diagram] : null;
          return (
            <section key={section.id} id={section.id} className="scroll-mt-32 py-16 sm:py-24" aria-labelledby={`${section.id}-title`}>
              <div className={cn("grid gap-10 lg:grid-cols-12 lg:gap-16")}>
                <Reveal className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2")}>
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                  <h2 id={`${section.id}-title`} className="display mt-4 text-[2.25rem] text-ink sm:text-[3rem]">
                    {section.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-charcoal-700/85">{section.intro}</p>
                  <ul className="mt-8 space-y-5 border-t border-ink/10 pt-6">
                    {section.points.map((p) => (
                      <li key={p.title}>
                        <h3 className="font-semibold text-ink">{p.title}</h3>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{p.text}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                {Diagram ? (
                  <Reveal delay={0.1} className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
                    <div className="rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-4 sm:p-8">
                      <Diagram className="h-auto w-full" />
                    </div>
                  </Reveal>
                ) : section.image ? (
                  <Reveal delay={0.1} className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sand lg:aspect-[16/10]">
                      <Picture src={section.image.src} alt={section.image.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                    </div>
                  </Reveal>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-agave-700 py-20 text-limestone sm:py-28">
        <div className="container-narrow text-center">
          <h2 className="display text-3xl sm:text-5xl">Cada casa se adapta a su clima.</h2>
          <p className="mx-auto mt-5 max-w-xl text-limestone/80">Costa, desierto, bosque o ciudad: las estrategias se calibran en la adaptación de cada proyecto. Cuéntanos dónde está tu terreno.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/cotizador" variant="light" icon={<ArrowRight size={16} />}>
              Cotizar mi casa
            </Button>
            <Button href="/modelos" variant="outline-light">
              Ver modelos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
