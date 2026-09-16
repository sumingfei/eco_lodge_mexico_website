import type { Metadata } from "next";
import { customizationAreas } from "@/data/features";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Configurator } from "@/components/design/Configurator";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Diseño y personalización: fachadas, interiores y acabados",
  description:
    "Explora combinaciones de fachada (madera, metal, estuco, concreto, piedra) e interiores (minimal, cálido, natural, contemporáneo) para tu casa prefabricada. Arquitectura contemporánea mexicana, adaptada a tu terreno.",
  path: "/diseño",
  image: "/images/sections/fachada-detalle.jpg",
});

export default function DesignPage() {
  return (
    <>
      <PageHero
        eyebrow="Diseño"
        title="Prefabricada no significa prediseñada."
        intro="Los modelos son el punto de partida. La fachada, la paleta interior, la cocina y las terrazas hacen que cada casa responda a su lugar y a quien la habita."
        image="/images/sections/fachada-detalle.jpg"
        alt="Detalle de fachada con celosía de madera y volumen blanco"
      />

      <section className="container-wide py-16 sm:py-24" aria-labelledby="configurador">
        <Reveal>
          <SectionHeading as="h2" eyebrow="Explora combinaciones" title="Elige fachada e interior." intro="Cinco materiales de fachada y cuatro paletas interiores curadas por nuestros arquitectos. Cualquier combinación funciona con cualquier modelo." className="mb-12" />
        </Reveal>
        <Reveal>
          <Configurator />
        </Reveal>
      </section>

      <section className="bg-limestone-50 py-20 sm:py-28" aria-labelledby="inspiracion">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Referencias"
              title="Modernismo mexicano, en clave ligera."
              intro="Muros que enmarcan el paisaje, patios que ventilan, materiales que envejecen bien. Tomamos la tradición de la casa mexicana contemporánea y la resolvemos con una estructura ligera que se fabrica en planta."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              { src: "/images/sections/recamara-terraza.jpg", alt: "Recámara con puertas de vidrio hacia una terraza de madera", caption: "Interior y exterior continuos" },
              { src: "/images/sections/comedor.jpg", alt: "Comedor con ventanal de piso a techo y piso de madera", caption: "Luz controlada, vistas abiertas" },
              { src: "/images/sections/sala-vidrio.jpg", alt: "Sala con muro de vidrio y sillones de piel", caption: "Materiales honestos" },
            ].map((img, i) => (
              <Reveal key={img.src} delay={i * 0.08} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand">
                  {/* TODO: replace with renders of the company’s own models */}
                  <Picture src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 text-sm text-charcoal-700/80">{img.caption}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-20 sm:py-28" aria-labelledby="decides">
        <Reveal>
          <SectionHeading eyebrow="Lo que decides tú" title="Diez decisiones. Cero proyecto ejecutivo desde cero." />
        </Reveal>
        <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {customizationAreas.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 0.05} className="border-t border-ink/15 pt-5">
              <span className="font-serif text-sm text-stone">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-700/75">{c.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
