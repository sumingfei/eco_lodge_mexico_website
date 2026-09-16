import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { whatsappDefaultLink } from "@/lib/whatsapp";
import { LeadForm } from "@/components/calculator/LeadForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone, WhatsApp } from "@/components/ui/Icons";
import { fill, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "contact", title: dict.contactPage.metaTitle, description: fill(dict.contactPage.metaDescription, { hours: t(siteConfig.contact.hours, locale) }) });
}

export default async function ContactPage({ searchParams }: PageProps<"/[locale]/contacto">) {
  const params = await searchParams;
  const { locale, dict } = await getI18n();
  const cp = dict.contactPage;
  const sinTerreno = params.terreno === "no";

  return (
    <section className="container-wide grid gap-12 pb-24 pt-32 sm:pt-40 lg:grid-cols-12 lg:pb-32">
      <div className="lg:col-span-5">
        <SectionHeading as="h1" eyebrow={cp.eyebrow} title={cp.title} intro={cp.intro} />
        <ul className="mt-10 space-y-4 text-[0.9375rem]">
          <li className="flex items-center gap-3">
            <WhatsApp size={18} className="text-agave" />
            <a href={whatsappDefaultLink(locale)} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-terracotta">
              {dict.common.whatsapp}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={18} className="text-agave" />
            <a href={`mailto:${siteConfig.contact.email}`} className="text-ink hover:text-terracotta">
              {siteConfig.contact.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={18} className="text-agave" />
            <a href={`tel:${siteConfig.contact.phoneE164}`} className="text-ink hover:text-terracotta">
              {siteConfig.contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-3 text-charcoal-700/80">
            <MapPin size={18} className="text-agave" />
            {siteConfig.contact.address.city}, {siteConfig.contact.address.state} · {t(siteConfig.contact.hours, locale)}
          </li>
        </ul>
        <Button href={whatsappDefaultLink(locale)} external className="mt-8" icon={<WhatsApp size={16} />}>
          {dict.common.writeWhatsapp}
        </Button>
      </div>
      <div className="lg:col-span-7">
        <LeadForm source="contacto" titleAs="h2" title={cp.formTitle} submitLabel={cp.formSubmit} showMessage defaults={{ hasLand: sinTerreno ? "no" : undefined }} whatsappMessage={t(siteConfig.whatsapp.defaultMessage, locale)} />
      </div>
    </section>
  );
}
