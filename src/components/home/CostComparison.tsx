"use client";

import { useState } from "react";
import { comparisonCriteria } from "@/data/features";
import { pricing } from "@/data/pricing";
import { cn } from "@/lib/utils";

/** Interactive comparison: pick a criterion, see both approaches side by side. */
export function CostComparison() {
  const [activeId, setActiveId] = useState(comparisonCriteria[0].id);
  const active = comparisonCriteria.find((c) => c.id === activeId)!;
  const claims = Object.values(pricing.comparisonClaims).filter(Boolean);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-4">
        <ul role="tablist" aria-label="Criterios de comparación" className="flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
          {comparisonCriteria.map((c) => {
            const selected = c.id === activeId;
            return (
              <li key={c.id} role="presentation" className="snap-start shrink-0 lg:shrink">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`comparison-${c.id}`}
                  id={`tab-${c.id}`}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "w-full rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:rounded-none lg:border-t lg:border-ink/10 lg:px-0 lg:py-4 lg:text-base",
                    selected ? "bg-ink text-limestone lg:bg-transparent lg:text-ink" : "bg-ink/5 text-ink/60 hover:text-ink lg:bg-transparent",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    {c.title}
                    <span className={cn("hidden h-1.5 w-1.5 rounded-full lg:block", selected ? "bg-terracotta" : "bg-transparent")} aria-hidden />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div id={`comparison-${active.id}`} role="tabpanel" aria-labelledby={`tab-${active.id}`} className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-8">
        <Column label="Construcción tradicional" text={active.traditional} score={active.score.traditional} tone="stone" />
        <Column label="Nuestro proceso prefabricado" text={active.prefab} score={active.score.prefab} tone="terracotta" />
        <p className="text-xs leading-relaxed text-stone sm:col-span-2">
          Escala cualitativa de referencia (1–5) según nuestra experiencia de proceso; no representa porcentajes de ahorro. {claims.length > 0 && claims.join(" · ")}
        </p>
      </div>
    </div>
  );
}

function Column({ label, text, score, tone }: { label: string; text: string; score: number; tone: "stone" | "terracotta" }) {
  return (
    <div className={cn("rounded-[1.25rem] p-6 sm:p-8", tone === "terracotta" ? "bg-ink text-limestone" : "bg-limestone-50 text-ink")}>
      <p className={cn("eyebrow", tone === "terracotta" ? "text-limestone/60" : "")}>{label}</p>
      <div className="mt-5 flex gap-1.5" aria-label={`Puntuación ${score} de 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < score ? (tone === "terracotta" ? "bg-terracotta" : "bg-stone-300") : tone === "terracotta" ? "bg-white/15" : "bg-ink/10")} />
        ))}
      </div>
      <p className={cn("mt-6 text-[0.9375rem] leading-relaxed", tone === "terracotta" ? "text-limestone/85" : "text-charcoal-700/80")}>{text}</p>
    </div>
  );
}
