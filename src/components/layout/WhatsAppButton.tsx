"use client";

import { usePathname } from "next/navigation";
import { getModelBySlug } from "@/data/models";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsApp } from "@/components/ui/Icons";

/**
 * Floating WhatsApp button. On model pages the prefilled message references the model.
 * Hidden on the estimator result/lead form (which has its own WhatsApp CTA) via CSS class hooks if needed.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const match = pathname.match(/^\/modelos\/([^/]+)/);
  const model = match ? getModelBySlug(match[1]) : undefined;
  const message = model ? siteConfig.whatsapp.modelMessage(model.name) : siteConfig.whatsapp.defaultMessage;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#147a42] pr-1 text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.03] focus-visible:outline-offset-4 sm:bottom-6 sm:right-6 [.has-sticky-cta_&]:bottom-24 lg:[.has-sticky-cta_&]:bottom-6 [.menu-open_&]:hidden"
    >
      <span className="hidden pl-5 text-sm font-semibold sm:inline">WhatsApp</span>
      <span className="flex h-14 w-14 items-center justify-center">
        <WhatsApp size={28} />
      </span>
    </a>
  );
}
