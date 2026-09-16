import Link from "next/link";
import { siteConfig } from "@/data/site";
import { footerNav } from "@/data/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";

export function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);
  return (
    <footer className="bg-ink text-limestone">
      <div className="container-wide grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <Logo light />
          <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-limestone/90">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-limestone/60">
            Casas prefabricadas de diseño contemporáneo para tu terreno en México. Menos desperdicio, menos tiempo, costos más predecibles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/cotizador" variant="light" size="sm">
              Cotizar mi casa
            </Button>
            <Button href={whatsappLink()} external variant="outline-light" size="sm" icon={<WhatsApp size={16} />}>
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="eyebrow text-limestone/50">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-limestone/80 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3">
            <h3 className="eyebrow text-limestone/50">Contacto</h3>
            <ul className="mt-5 space-y-2 text-sm text-limestone/80">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phoneE164}`} className="hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-limestone/50">{siteConfig.contact.hours}</li>
              <li className="text-limestone/50">
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
              </li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-4">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm capitalize text-limestone/70 hover:text-white">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-3 py-6 text-xs text-limestone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p>Precios en MXN. Las estimaciones en línea son preliminares y no constituyen una cotización.</p>
        </div>
      </div>
    </footer>
  );
}
