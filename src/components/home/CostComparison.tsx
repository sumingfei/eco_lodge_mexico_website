"use client";

import { useState } from "react";
import { comparisonCriteria } from "@/data/features";
import { pricing } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { fill, t } from "@/i18n";
import { useI18n } from "@/i18n/LocaleProvider";

/** Interactive comparison: pick a criterion, see both approaches side by side. */
export function CostComparison() {
  const { locale, dict } = useI18n();
  const c = dict.home.comparison;
  const [activeId, setActiveId] = useState(comparisonCriteria[0].id);
  const active = comparisonCriteria.find((x) => x.id === activeId)!;
  const claims = Object.values(pricing.comparisonClaims).filter(Boolean);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-4">
        <ul role="tablist" aria-label={c.criteriaAria} className="flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
          {comparisonCriteria.map((crit) => {
            const selected = crit.id === activeId;
            return (
              <li key={crit.id} role="presentation" className="snap-start shrink-0 lg:shrink">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`comparison-${crit.id}`}
                  id={`tab-${crit.id}`}
                  onClick={() => setActiveId(crit.id)}
                  className={cn(
                    "w-full rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:rounded-none lg:border-t lg:border-ink/10 lg:px-0 lg:py-4 lg:text-base",
                    selected ? "bg-ink text-limestone lg:bg-transparent lg:text-ink" : "bg-ink/5 text-ink/60 hover:text-ink lg:bg-transparent",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    {t(crit.title, locale)}
                    <span className={cn("hidden h-1.5 w-1.5 rounded-full lg:block", selected ? "bg-terracotta" : "bg-transparent")} aria-hidden />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div id={`comparison-${active.id}`} role="tabpanel" aria-labelledby={`tab-${active.id}`} className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-8">
        <Column label={c.traditional} text={t(active.traditional, locale)} score={active.score.traditional} tone="stone" scoreAria={c.scoreAria} />
        <Column label={c.prefab} text={t(active.prefab, locale)} score={active.score.prefab} tone="terracotta" scoreAria={c.scoreAria} />
        <p className="text-xs leading-relaxed text-stone sm:col-span-2">
          {c.note} {claims.length > 0 && claims.join(" · ")}
        </p>
      </div>
    </div>
  );
}

function Column({ label, text, score, tone, scoreAria }: { label: string; text: string; score: number; tone: "stone" | "terracotta"; scoreAria: string }) {
  return (
    <div className={cn("rounded-[1.25rem] p-6 sm:p-8", tone === "terracotta" ? "bg-ink text-limestone" : "bg-limestone-50 text-ink")}>
      <p className={cn("eyebrow", tone === "terracotta" ? "text-limestone/60" : "")}>{label}</p>
      <div className="mt-5 flex gap-1.5" aria-label={fill(scoreAria, { score })}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < score ? (tone === "terracotta" ? "bg-terracotta" : "bg-stone-300") : tone === "terracotta" ? "bg-white/15" : "bg-ink/10")} />
        ))}
      </div>
      <p className={cn("mt-6 text-[0.9375rem] leading-relaxed", tone === "terracotta" ? "text-limestone/85" : "text-charcoal-700/80")}>{text}</p>
    </div>
  );
}
