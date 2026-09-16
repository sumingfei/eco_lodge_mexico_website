import type { Metadata } from "next";
import { developerAdvantages, developerProcess, developerSegments } from "@/data/developers";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { LeadForm } from "@/components/calculator/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Construcción modular para desarrolladores, hoteles y eco resorts",
  description:
    "Vivienda y hospitalidad modular en México: modelos repetibles, entregas por fase y calendario predecible para desarrolladores inmobiliarios, hoteles boutique, eco resorts, conjuntos de renta vacacional y propietarios de tierra.",
  path: "/desarrolladores",
  image: "/images/sections/desarrollo-resort.jpg",
});

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Desarrolladores"
        title="Una casa bien resuelta, multiplicada."
        intro="Para desarrollos inmobiliarios, hoteles boutique, eco resorts y conjuntos de renta vacacional: la repetición de un modelo bien diseñado reduce costo, riesgo y tiempo por unidad."
        image="/images/sections/desarrollo-resort.jpg"
        alt="Conjunto de villas alrededor de un espejo de agua con palmeras"
      >
        <Button href={whatsappLink(siteConfig.whatsapp.developerMessage)} external variant="light" size="lg" icon={<WhatsApp size={18} />}>
          Hablar sobre un desarrollo
        </Button>
      </PageHero>

      <section className="container-wide py-20 sm:py-28" aria-labelledby="para-quien">
        <Reveal>
          <SectionHeading eyebrow="Para quién" title="Proyectos con más de una unidad." />
        </Reveal>
        <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {developerSegments.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.05} className="border-t border-ink/15 pt-5">
              <h3 className="font-serif text-2xl text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{s.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-ink py-20 text-limestone sm:py-28" aria-labelledby="ventajas">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading light eyebrow="Ventajas" title="Lo que cambia cuando se repite un modelo." intro="La construcción modular escala mejor que la tradicional: lo que se resuelve una vez en ingeniería y planta, se aprovecha en cada unidad." />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.25rem]">
              {/* TODO: replace with photography of a multi-unit project */}
              <Picture src="/images/sections/desarrollo-lobby.jpg" alt="Lobby de hotel con celosías de madera y mobiliario de diseño" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {developerAdvantages.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 2) * 0.05} className="border-t border-white/15 pt-5">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-limestone/70">{a.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-wide py-20 sm:py-28" aria-labelledby="proceso-dev">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow="Proceso" title="Cómo trabajamos un desarrollo." />
            </Reveal>
            <ol className="mt-10 space-y-6">
              {developerProcess.map((p) => (
                <Reveal as="li" key={p.number} className="flex gap-5 border-t border-ink/10 pt-5">
                  <span className="font-serif text-3xl text-terracotta">{p.number}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-700/80">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <LeadForm
                source="desarrolladores"
                title="Hablar sobre un desarrollo"
                intro="Cuéntanos del terreno, el número de unidades y el uso previsto. Te contactamos para una reunión técnica."
                submitLabel="Enviar solicitud"
                showMessage
                whatsappMessage={siteConfig.whatsapp.developerMessage}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
