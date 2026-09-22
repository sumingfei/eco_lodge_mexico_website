"use client";

import { useState } from "react";
import { facadeOptions, interiorOptions, type FacadeOption, type InteriorOption } from "@/data/finishes";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { fill, t } from "@/i18n";
import { useI18n } from "@/i18n/LocaleProvider";

/**
 * Visual explorer of facade × interior combinations.
 * Images are representative placeholders; TODO: replace with renders of each
 * actual combination on a model (e.g. CASA 90) for a true configurator.
 */
export function Configurator() {
  const { locale, dict, p } = useI18n();
  const c = dict.designPage.configurator;
  const [facade, setFacade] = useState<FacadeOption>(facadeOptions[0]);
  const [interior, setInterior] = useState<InteriorOption>(interiorOptions[1]);
  const [interiorImage, setInteriorImage] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Preview */}
      <div className="lg:col-span-7">
        <div className="grid gap-3">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-sand">
            {facadeOptions.map((f) => (
              <Picture key={f.id} src={f.image} alt={fill(c.facadeAlt, { name: t(f.name, locale) })} fill sizes="(min-width: 1024px) 58vw, 100vw" className={cn("object-cover transition-opacity duration-500", f.id === facade.id ? "opacity-100" : "opacity-0")} aria-hidden={f.id !== facade.id} />
            ))}
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-ink/60 px-3 py-1 text-xs text-limestone backdrop-blur">{fill(c.facadeCaption, { name: t(facade.name, locale) })}</figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-3">
            {interior.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setInteriorImage(i)}
                className={cn("relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-sand transition-opacity", interiorImage === i ? "" : "opacity-80 hover:opacity-100")}
                aria-label={fill(c.viewInterior, { name: t(interior.name, locale), n: i + 1 })}
              >
                <Picture src={src} alt="" fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-stone">{c.combination}</span>
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-limestone">
            {t(facade.name, locale)} + {t(interior.name, locale)}
          </span>
        </div>
      </div>

      {/* Selectors */}
      <div className="space-y-10 lg:col-span-5">
        <fieldset>
          <legend className="eyebrow">{c.facade}</legend>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {facadeOptions.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFacade(f)}
                aria-pressed={f.id === facade.id}
                className="group flex flex-col items-center gap-2"
                title={t(f.name, locale)}
              >
                <span className={cn("h-14 w-full rounded-xl border-2 transition-all", f.id === facade.id ? "border-ink" : "border-transparent ring-1 ring-ink/10 group-hover:ring-ink/40")} style={{ background: f.swatch }} aria-hidden />
                <span className={cn("text-[0.6875rem] font-medium leading-tight text-center", f.id === facade.id ? "text-ink" : "text-stone")}>{t(f.name, locale)}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-700/85">{t(facade.text, locale)}</p>
          <p className="mt-2 text-xs text-stone">{c.recommended} {facade.bestFor.map((b) => t(b, locale)).join(" · ")}</p>
        </fieldset>

        <fieldset>
          <legend className="eyebrow">{c.interior}</legend>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {interiorOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setInterior(o);
                  setInteriorImage(0);
                }}
                aria-pressed={o.id === interior.id}
                className={cn("rounded-xl border p-3 text-left transition-colors", o.id === interior.id ? "border-ink bg-white" : "border-ink/10 bg-white/60 hover:border-ink/40")}
              >
                <span className="flex gap-1" aria-hidden>
                  {o.palette.map((c) => (
                    <span key={c} className="h-5 flex-1 rounded-sm ring-1 ring-ink/10" style={{ background: c }} />
                  ))}
                </span>
                <span className="mt-2 block text-sm font-semibold text-ink">{t(o.name, locale)}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-700/85">{t(interior.text, locale)}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {interior.materials.map((m) => (
              <li key={m.es} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/80">
                {t(m, locale)}
              </li>
            ))}
          </ul>
        </fieldset>

        <div className="rounded-[1.25rem] bg-ink p-6 text-limestone">
          <p className="font-serif text-xl">{c.likeTitle}</p>
          <p className="mt-2 text-sm text-limestone/70">{c.likeText}</p>
          <Button href={p("estimator", `?facade=${facade.id}&interior=${interior.id}`)} variant="light" className="mt-5" icon={<ArrowRight size={16} />}>
            {c.likeCta}
          </Button>
        </div>
      </div>
    </div>
  );
}
