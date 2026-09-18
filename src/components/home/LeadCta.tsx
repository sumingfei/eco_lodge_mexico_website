import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { whatsappDefaultLink } from "@/lib/whatsapp";
import { href } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function LeadCta() {
  const { locale, dict } = await getI18n();
  const c = dict.home.leadCta;
  return (
    <section className="relative overflow-hidden bg-charcoal text-limestone">
      {/* TODO: replace with landscape photography of a real client site */}
      <Picture src="/images/landscapes/campo-colinas.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" aria-hidden />
      <div className="container-wide relative py-28 sm:py-36 lg:py-48">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-limestone/60">{c.eyebrow}</p>
          <h2 className="display mt-6 text-[2.75rem] text-limestone sm:text-[4rem] lg:text-[5rem]">{c.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-limestone/80">{c.text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={href(locale, "estimator")} variant="light" size="lg" icon={<ArrowRight size={18} />}>
              {dict.common.quoteProject}
            </Button>
            <Button href={href(locale, "estimator", "?land=no")} variant="outline-light" size="lg">
              {c.noLand}
            </Button>
          </div>
          <a href={whatsappDefaultLink(locale)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-limestone/70 transition-colors hover:text-white">
            <WhatsApp size={16} /> {dict.common.orWhatsapp}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
