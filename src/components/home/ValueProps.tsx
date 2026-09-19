import { valueProps } from "@/data/features";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconDesign, IconPrice, IconRain, IconTime } from "@/components/ui/Icons";
import { t } from "@/i18n";
import { getI18n } from "@/i18n/server";

const icons = { ecologia: IconRain, diseno: IconDesign, precio: IconPrice, tiempo: IconTime };

export async function ValueProps() {
  const { locale, dict } = await getI18n();
  return (
    <section className="bg-limestone py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <SectionHeading eyebrow={dict.home.valueProps.eyebrow} title={t(siteConfig.tagline, locale)} intro={dict.home.valueProps.intro} />
        </Reveal>
        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {valueProps.map((item, i) => {
            const Icon = icons[item.id];
            return (
              <Reveal as="li" key={item.id} delay={i * 0.08} className="border-t border-ink/15 pt-6">
                <div className="flex items-center justify-between">
                  <Icon className="text-terracotta" />
                  <span className="font-serif text-sm text-stone">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-serif text-[1.75rem] leading-none text-ink">{t(item.title, locale)}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{t(item.text, locale)}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
