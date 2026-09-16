import { siteConfig } from "@/data/site";
import { transparencyPoints, trust } from "@/data/trust";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * “Cómo trabajamos” — process-based statements that need no external proof.
 * Real trust data (stats, testimonials, credentials, partners, factory, warranty)
 * only renders when the corresponding feature flag is on AND data exists.
 */
export function TrustSection() {
  const f = siteConfig.features;
  const showStats = f.showProjectCounts && trust.stats.length > 0;
  const showTestimonials = f.showTestimonials && trust.testimonials.length > 0;
  const showCredentials = f.showTrustSection && trust.engineeringCredentials.length > 0;
  const showPartners = f.showPartners && trust.partners.length > 0;
  const showWarranty = f.showWarranty && trust.warranty.summary;
  const showFactory = f.showFactory && trust.factory.description;

  return (
    <section className="bg-limestone-50 py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <SectionHeading eyebrow="Transparencia" title="Cómo trabajamos" intro="Sin letras chiquitas. Así es como te acompañamos desde la primera pregunta hasta la entrega." />
        </Reveal>

        {showStats && (
          <dl className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {trust.stats.map((s) => (
              <div key={s.label} className="border-t border-ink/15 pt-5">
                <dd className="font-serif text-5xl text-ink">{s.value}</dd>
                <dt className="mt-2 text-sm text-stone">{s.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {transparencyPoints.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="border-t border-ink/15 pt-5">
              <h3 className="font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700/80">{p.text}</p>
            </Reveal>
          ))}
        </ul>

        {showTestimonials && (
          <ul className="mt-16 grid gap-6 lg:grid-cols-3">
            {trust.testimonials.map((t) => (
              <li key={t.name} className="rounded-[1.25rem] bg-limestone p-8">
                <p className="font-serif text-xl leading-snug text-ink">“{t.quote}”</p>
                <p className="mt-6 text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-stone">
                  {t.location} · {t.model}
                </p>
              </li>
            ))}
          </ul>
        )}

        {(showCredentials || showWarranty || showFactory) && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {showCredentials && (
              <div>
                <h3 className="eyebrow">Ingeniería</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {trust.engineeringCredentials.map((c) => (
                    <li key={c.title}>
                      {c.title} — {c.issuer}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showWarranty && (
              <div>
                <h3 className="eyebrow">Garantía</h3>
                <p className="mt-4 text-sm">{trust.warranty.summary}</p>
              </div>
            )}
            {showFactory && (
              <div>
                <h3 className="eyebrow">Planta</h3>
                <p className="mt-4 text-sm">{trust.factory.description}</p>
              </div>
            )}
          </div>
        )}

        {showPartners && (
          <ul className="mt-16 flex flex-wrap items-center gap-10 opacity-70">
            {trust.partners.map((p) => (
              <li key={p.name} className="text-sm font-semibold">
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
