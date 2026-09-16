import { customizationAreas } from "@/data/features";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export function DesignSection() {
  return (
    <section className="bg-limestone py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="Diseño"
            title="Prefabricada no significa prediseñada."
            intro="Cada modelo es un punto de partida. La fachada, los acabados, la cocina, las terrazas y los sistemas se eligen contigo para que la casa sea tuya y responda a su lugar."
            size="xl"
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-12 lg:mt-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] sm:col-span-7 sm:aspect-auto sm:row-span-2">
            {/* TODO: replace with real facade material photography */}
            <Picture src="/images/sections/fachada-detalle.jpg" alt="Detalle de fachada con celosía de madera y volumen blanco" fill sizes="(min-width: 640px) 58vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:col-span-5">
            <Picture src="/images/interiors/cocina-madera.jpg" alt="Cocina con carpintería de madera y cubierta clara" fill sizes="(min-width: 640px) 42vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:col-span-5">
            <Picture src="/images/interiors/bano-marmol.jpg" alt="Baño con lavabo de piedra y carpintería de madera" fill sizes="(min-width: 640px) 42vw, 100vw" className="object-cover" />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="font-serif text-3xl text-ink">Lo que decides tú</h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal-700/80">
              Opciones curadas por nuestros arquitectos. Suficientes para que la casa tenga tu carácter; no tantas como para que el proyecto se vuelva interminable.
            </p>
            <Button href="/diseño" variant="outline" className="mt-8" icon={<ArrowRight size={16} />}>
              Explorar combinaciones
            </Button>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {customizationAreas.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 2) * 0.05} className="border-t border-ink/15 pt-4">
                <h4 className="font-semibold text-ink">{c.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-700/75">{c.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
