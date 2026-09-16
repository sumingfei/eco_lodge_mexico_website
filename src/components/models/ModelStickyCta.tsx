"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { whatsappModelLink } from "@/lib/whatsapp";
import { formatMXN } from "@/lib/format";

/**
 * Mobile sticky bottom bar for model pages. Adds a body class so the floating
 * WhatsApp button moves out of the way.
 */
export function ModelStickyCta({ slug, name, price }: { slug: string; name: string; price: number }) {
  useEffect(() => {
    document.body.classList.add("has-sticky-cta");
    return () => document.body.classList.remove("has-sticky-cta");
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-limestone/95 backdrop-blur lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="container-wide flex items-center gap-3 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-stone">Desde</p>
          <p className="truncate text-sm font-semibold text-ink">{formatMXN(price, { suffix: false })}</p>
        </div>
        <a href={whatsappModelLink(name)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp sobre ${name}`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink">
          <WhatsApp size={20} />
        </a>
        <Button href={`/cotizador?modelo=${slug}`} size="sm" className="h-11 px-4">
          Cotizar este modelo
        </Button>
      </div>
    </div>
  );
}
