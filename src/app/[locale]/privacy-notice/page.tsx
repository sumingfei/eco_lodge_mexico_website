import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { fill } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return {
    ...buildMetadata({ locale, route: "privacy", title: dict.privacyPage.metaTitle, description: fill(dict.privacyPage.metaDescription, { company: siteConfig.legalName }) }),
    robots: { index: false, follow: true },
  };
}

/**
 * TODO: replace with the company’s legal privacy notice reviewed by counsel
 * (Ley Federal de Protección de Datos Personales en Posesión de los Particulares).
 */
export default async function PrivacyPage() {
  const { dict } = await getI18n();
  const pv = dict.privacyPage;
  const city = `${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}`;
  return (
    <article className="container-narrow prose-sm pb-24 pt-32 sm:pt-40">
      <p className="eyebrow">{pv.eyebrow}</p>
      <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">{pv.title}</h1>
      <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal-700/85">
        <p>{fill(pv.p1, { company: siteConfig.legalName, city })}</p>
        <h2 className="font-serif text-2xl text-ink">{pv.h2a}</h2>
        <p>{pv.p2}</p>
        <h2 className="font-serif text-2xl text-ink">{pv.h2b}</h2>
        <p>{pv.p3}</p>
        <h2 className="font-serif text-2xl text-ink">{pv.h2c}</h2>
        <p>
          {pv.p4a}{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="underline">
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <p className="text-xs text-stone">{pv.note}</p>
      </div>
    </article>
  );
}
