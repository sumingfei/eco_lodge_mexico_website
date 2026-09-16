import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { LeadForm } from "@/components/calculator/LeadForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone, WhatsApp } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description: `Escríbenos por WhatsApp, correo o teléfono. ${siteConfig.contact.hours}. Te ayudamos a elegir el modelo adecuado para tu terreno.`,
  path: "/contacto",
});

export default async function ContactPage({ searchParams }: PageProps<"/contacto">) {
  const params = await searchParams;
  const sinTerreno = params.terreno === "no";

  return (
    <section className="container-wide grid gap-12 pb-24 pt-32 sm:pt-40 lg:grid-cols-12 lg:pb-32">
      <div className="lg:col-span-5">
        <SectionHeading as="h1" eyebrow="Contacto" title="Hablemos de tu casa." intro="Sin compromiso. Cuéntanos qué tienes en mente y te decimos con claridad qué modelo, qué costo aproximado y qué pasos siguen." />
        <ul className="mt-10 space-y-4 text-[0.9375rem]">
          <li className="flex items-center gap-3">
            <WhatsApp size={18} className="text-agave" />
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-terracotta">
              WhatsApp
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
            {siteConfig.contact.address.city}, {siteConfig.contact.address.state} · {siteConfig.contact.hours}
          </li>
        </ul>
        <Button href={whatsappLink()} external className="mt-8" icon={<WhatsApp size={16} />}>
          Escribir por WhatsApp
        </Button>
      </div>
      <div className="lg:col-span-7">
        <LeadForm source="contacto" titleAs="h2" title="Envíanos un mensaje" submitLabel="Enviar mensaje" showMessage defaults={{ hasLand: sinTerreno ? "no" : undefined }} whatsappMessage={siteConfig.whatsapp.defaultMessage} />
      </div>
    </section>
  );
}
