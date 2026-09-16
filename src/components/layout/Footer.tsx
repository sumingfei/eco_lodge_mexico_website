import Link from "next/link";
import { siteConfig } from "@/data/site";
import { footerNav } from "@/data/navigation";
import { whatsappDefaultLink } from "@/lib/whatsapp";
import { href, t } from "@/i18n";
import { getI18n } from "@/i18n/server";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";

export async function Footer() {
  const { locale, dict } = await getI18n();
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);
  return (
    <footer className="bg-ink text-limestone">
      <div className="container-wide grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <Logo light homeHref={href(locale, "home")} />
          <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-limestone/90">{t(siteConfig.tagline, locale)}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-limestone/60">{dict.footer.blurb}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={href(locale, "estimator")} variant="light" size="sm">
              {dict.common.quoteMyHome}
            </Button>
            <Button href={whatsappDefaultLink(locale)} external variant="outline-light" size="sm" icon={<WhatsApp size={16} />}>
              {dict.common.whatsapp}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {footerNav.map((group) => (
            <div key={group.group}>
              <p className="eyebrow text-limestone/50">{dict.footer.groups[group.group]}</p>
              <ul className="mt-5 space-y-3">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link href={href(locale, l.route)} className="text-sm text-limestone/80 transition-colors hover:text-white">
                      {dict.footer.links[l.label]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3">
            <p className="eyebrow text-limestone/50">{dict.footer.contact}</p>
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
              <li className="text-limestone/50">{t(siteConfig.contact.hours, locale)}</li>
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
            © {new Date().getFullYear()} {siteConfig.legalName}. {dict.footer.rights}
          </p>
          <p>{dict.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
