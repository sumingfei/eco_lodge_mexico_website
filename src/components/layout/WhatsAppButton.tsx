"use client";

import { usePathname } from "next/navigation";
import { getModelBySlug } from "@/data/models";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { parsePublicPath, routes } from "@/i18n/routes";
import { useI18n } from "@/i18n/LocaleProvider";
import { t } from "@/i18n";
import { WhatsApp } from "@/components/ui/Icons";

/**
 * Floating WhatsApp button. On model pages the prefilled message references the model.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const { locale, dict } = useI18n();
  const { segments } = parsePublicPath(pathname);
  const model = segments[0] === routes.models[locale] && segments[1] ? getModelBySlug(segments[1]) : undefined;
  const message = model ? siteConfig.whatsapp.modelMessage(model.name, locale) : t(siteConfig.whatsapp.defaultMessage, locale);

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.whatsappAria}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#147a42] pr-1 text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.03] focus-visible:outline-offset-4 sm:bottom-6 sm:right-6 [.has-sticky-cta_&]:bottom-24 lg:[.has-sticky-cta_&]:bottom-6 [.menu-open_&]:hidden"
    >
      <span className="hidden pl-5 text-sm font-semibold sm:inline">{dict.common.whatsapp}</span>
      <span className="flex h-14 w-14 items-center justify-center">
        <WhatsApp size={28} />
      </span>
    </a>
  );
}
