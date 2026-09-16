import Link from "next/link";
import type { HomeModel } from "@/data/models";
import { getModelStartingPrice } from "@/lib/pricing";
import { formatArea, formatBathrooms, formatBedrooms, formatMXN, formatWeeks } from "@/lib/format";
import { Picture } from "@/components/ui/Picture";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function ModelCard({ model, className, priority }: { model: HomeModel; className?: string; priority?: boolean }) {
  const cover = model.images[0];
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link href={`/modelos/${model.slug}`} className="relative block overflow-hidden rounded-[1.25rem] bg-sand" aria-label={`Ver modelo ${model.name}`}>
        <div className="relative aspect-[4/3]">
          <Picture
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            priority={priority}
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-limestone/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
          {model.stories === 2 ? "Dos niveles" : "Un nivel"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[1.75rem] leading-none tracking-[-0.01em] text-ink">
            <Link href={`/modelos/${model.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {model.name}
            </Link>
          </h3>
          <span className="text-sm text-stone">{formatArea(model.areaM2)}</span>
        </div>
        <p className="mt-2 text-sm text-charcoal-700/75">{model.tagline}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/10 pt-5 text-sm">
          <div>
            <dt className="eyebrow">Programa</dt>
            <dd className="mt-1 text-ink">
              {formatBedrooms(model.bedrooms)} · {formatBathrooms(model.bathrooms)}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Tiempo estimado</dt>
            <dd className="mt-1 text-ink">{formatWeeks(model.buildWeeks.min, model.buildWeeks.max)}</dd>
          </div>
          <div className="col-span-2 pt-1">
            <dt className="eyebrow">Desde</dt>
            <dd className="mt-1 flex items-end justify-between gap-4">
              <span className="text-lg font-semibold tracking-tight text-ink">{formatMXN(getModelStartingPrice(model))}</span>
              <span className="inline-flex items-center gap-1.5 pb-0.5 text-sm font-semibold text-ink transition-colors group-hover:text-terracotta">
                Ver modelo <ArrowRight size={16} />
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
