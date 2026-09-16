import type { Metadata } from "next";
import { fullProcess, responsibilities } from "@/data/process";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { TimelineComparison } from "@/components/sections/TimelineComparison";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Cómo funciona la construcción modular, paso a paso",
  description:
    "De la consulta inicial a la entrega en 12 pasos: evaluación del terreno, selección del modelo, ingeniería, permisos, cimentación, fabricación en planta, transporte, montaje y conexiones. Qué hacemos nosotros y qué depende de ti.",
  path: "/como-funciona",
  image: "/images/hero/hero-dusk.jpg",
});

const ownerLabel = { empresa: "Nosotros", cliente: "Cliente / autoridad", compartido: "Compartido" } as const;
const ownerTone = { empresa: "terracotta", cliente: "neutral", compartido: "agave" } as const;

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Cómo funciona"
        title="Doce pasos. Un solo equipo."
        intro="Así construimos tu casa: de la primera conversación a la entrega de llaves, con claridad sobre qué hacemos nosotros y qué depende de ti o de tu municipio."
        image="/images/hero/hero-dusk.jpg"
        alt="Casa prefabricada con cubierta volada iluminada al anochecer"
      />

      <section className="container-wide py-16 sm:py-24">
        <Reveal>
          <TimelineComparison headingLevel="h2" />
        </Reveal>
      </section>

      <section className="container-wide pb-20 sm:pb-28" aria-labelledby="proceso">
        <h2 id="proceso" className="display text-3xl text-ink sm:text-5xl">
          El proceso completo
        </h2>
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-stone">
          <span className="inline-flex items-center gap-2">
            <Badge tone="terracotta">Nosotros</Badge> lo ejecuta nuestro equipo
          </span>
          <span className="inline-flex items-center gap-2">
            <Badge tone="agave">Compartido</Badge> lo resolvemos juntos
          </span>
          <span className="inline-flex items-center gap-2">
            <Badge>Cliente / autoridad</Badge> depende del cliente o del municipio
          </span>
        </div>

        <ol className="relative mt-12 border-l border-ink/15 lg:mt-16">
          {fullProcess.map((step, i) => (
            <Reveal as="li" key={step.number} delay={Math.min(i, 4) * 0.04} className="relative pb-12 pl-8 last:pb-0 sm:pl-14">
              <span className={cn("absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full", step.owner === "empresa" ? "bg-terracotta" : step.owner === "compartido" ? "bg-agave" : "bg-stone-300")} aria-hidden />
              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <span className="font-serif text-4xl text-stone-300">{step.number}</span>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge tone={ownerTone[step.owner]}>{ownerLabel[step.owner]}</Badge>
                    {step.duration && <span className="text-xs text-stone">{step.duration}</span>}
                  </div>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="font-serif text-2xl text-ink sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-charcoal-700/85">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-limestone-50 py-20 sm:py-28" aria-labelledby="responsabilidades">
        <div className="container-wide">
          <h2 id="responsabilidades" className="display text-3xl text-ink sm:text-5xl">
            Quién hace qué
          </h2>
          <p className="mt-4 max-w-2xl text-charcoal-700/80">Para que no haya sorpresas: estas son las responsabilidades de cada parte. Los alcances exactos se detallan en tu cotización formal y contrato.</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <ResponsibilityCard title="Nuestro equipo" items={responsibilities.empresa} tone="terracotta" />
            <ResponsibilityCard title="Compartido" items={responsibilities.compartido} tone="agave" />
            <ResponsibilityCard title="Cliente y autoridades" items={responsibilities.cliente} tone="neutral" />
          </div>
          <p className="mt-8 text-xs leading-relaxed text-stone">
            Los tiempos de permisos y trámites municipales varían por localidad y están fuera de nuestro control. Los tiempos de fabricación se cuentan a partir de ingeniería aprobada y anticipo recibido.
          </p>
        </div>
      </section>

      <section className="container-wide py-20 sm:py-28">
        <div className="rounded-[1.5rem] bg-ink px-6 py-14 text-center text-limestone sm:px-12 sm:py-20">
          <h2 className="display text-3xl sm:text-5xl">¿Empezamos con el paso 01?</h2>
          <p className="mx-auto mt-4 max-w-lg text-limestone/75">Una estimación preliminar en minutos, y después una conversación sin compromiso sobre tu terreno.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/cotizador" variant="light" icon={<ArrowRight size={16} />}>
              Cotizar mi casa
            </Button>
            <Button href="/modelos" variant="outline-light">
              Explorar modelos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function ResponsibilityCard({ title, items, tone }: { title: string; items: string[]; tone: "terracotta" | "agave" | "neutral" }) {
  return (
    <div className="rounded-[1.25rem] border border-ink/10 bg-limestone p-7">
      <Badge tone={tone}>{title}</Badge>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal-700/85">
            <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", tone === "terracotta" ? "bg-terracotta" : tone === "agave" ? "bg-agave" : "bg-stone-300")} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
