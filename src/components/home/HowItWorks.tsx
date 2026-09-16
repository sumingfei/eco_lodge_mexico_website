import { homeSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TimelineComparison } from "@/components/sections/TimelineComparison";
import { ArrowRight } from "@/components/ui/Icons";
import { href, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function HowItWorks() {
  const { locale, dict } = await getI18n();
  return (
    <section className="bg-limestone py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <SectionHeading eyebrow={dict.home.process.eyebrow} title={dict.home.process.title} intro={dict.home.process.intro} />
        </Reveal>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5 lg:gap-6">
          {homeSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.06} className="relative border-t border-ink/15 pt-6">
              <span className="font-serif text-4xl leading-none text-terracotta">{step.number}</span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{t(step.title, locale)}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{t(step.text, locale)}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 lg:mt-24">
          <TimelineComparison />
        </Reveal>

        <Reveal className="mt-10">
          <Button href={href(locale, "process")} variant="outline" icon={<ArrowRight size={16} />}>
            {dict.home.process.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
