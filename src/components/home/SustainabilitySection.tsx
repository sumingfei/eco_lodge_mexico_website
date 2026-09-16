import { homeStrategies } from "@/data/sustainability";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { href, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function SustainabilitySection() {
  const { locale, dict } = await getI18n();
  const s = dict.home.sustainability;
  return (
    <section className="relative overflow-hidden bg-agave-700 text-limestone">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[60vw] lg:col-span-5 lg:min-h-0">
          {/* TODO: replace with a photo of a real home showing shading/ventilation strategies */}
          <Picture src="/images/interiors/sala-jardin.jpg" alt={s.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        </div>
        <div className="container-wide py-20 sm:py-28 lg:col-span-7 lg:py-36 lg:pl-16">
          <Reveal>
            <SectionHeading light eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
          </Reveal>
          <ol className="mt-14 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {homeStrategies.map((item, i) => (
              <Reveal as="li" key={item.title.es} delay={(i % 2) * 0.05} className="flex gap-4">
                <span className="mt-1 w-6 shrink-0 font-serif text-sm text-limestone/50">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold text-limestone">{t(item.title, locale)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-limestone/70">{t(item.text, locale)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14">
            <Button href={href(locale, "sustainability")} variant="light" icon={<ArrowRight size={16} />}>
              {s.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
