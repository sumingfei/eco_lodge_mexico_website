import { timelineComparison, type TimelinePhase } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * Illustrative Gantt-style comparison. The prefab row uses two tracks to show
 * that site preparation and factory fabrication happen in parallel.
 */
export function TimelineComparison({ className, headingLevel: Heading = "h3" }: { className?: string; headingLevel?: "h2" | "h3" }) {
  const { totalWeeks, traditional, prefab } = timelineComparison;
  const pct = (w: number) => `${(w / totalWeeks) * 100}%`;
  const ticks = Array.from({ length: totalWeeks / 4 + 1 }, (_, i) => i * 4);

  return (
    <div className={cn("rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-5 sm:p-8", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Heading className="font-serif text-2xl text-ink">Dos calendarios para una misma casa</Heading>
        <p className="text-xs text-stone">Ejemplo ilustrativo · casa de ≈ 85 m² · {timelineComparison.unit}</p>
      </div>

      <div className="mt-8 space-y-10">
        <Row label={traditional.label} total={traditional.totalLabel} tone="stone" phases={traditional.phases}>
          {traditional.phases.map((p) => (
            <Bar key={p.label} left={pct(p.start)} width={pct(p.end - p.start)} label={p.label} className="bg-stone-300 text-ink" />
          ))}
        </Row>

        <Row label={prefab.label} total={prefab.totalLabel} tone="terracotta" tracks={prefab.tracks.length} trackLabels={prefab.tracks} phases={prefab.phases}>
          {prefab.phases.map((p) => (
            <Bar
              key={p.label}
              left={pct(p.start)}
              width={pct(p.end - p.start)}
              label={p.label}
              track={p.track}
              className={p.track === 1 ? "bg-terracotta text-white" : p.track === 2 ? "bg-sand-300 text-ink" : "bg-agave text-white"}
            />
          ))}
        </Row>
      </div>

      {/* Axis */}
      <div className="relative mt-6 h-6 border-t border-ink/15 text-[0.625rem] text-stone">
        {ticks.map((t) => (
          <span key={t} className="absolute top-1.5 -translate-x-1/2" style={{ left: pct(t) }}>
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-stone">
        En el proceso prefabricado, la fabricación en planta y la cimentación en sitio avanzan al mismo tiempo. Los tiempos reales dependen de permisos, clima y condiciones del terreno.
      </p>
    </div>
  );
}

function Row({ label, total, children, tracks = 1, trackLabels, tone, phases }: { label: string; total: string; children: React.ReactNode; tracks?: number; trackLabels?: string[]; tone: "stone" | "terracotta"; phases: TimelinePhase[] }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className={cn("text-sm font-semibold", tone === "terracotta" ? "text-terracotta" : "text-stone")}>{total}</p>
      </div>
      <div className="flex gap-2">
        {trackLabels && (
          <div className="hidden w-16 shrink-0 flex-col text-[0.625rem] uppercase tracking-wider text-stone sm:flex">
            {trackLabels.map((t) => (
              <span key={t} className="flex h-9 items-center">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="relative flex-1" style={{ height: `${tracks * 2.25}rem` }}>
          {children}
        </div>
      </div>
      {/* Bars truncate their labels on narrow screens; list the phases underneath. */}
      <ol className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.6875rem] text-stone sm:hidden">
        {phases.map((p) => (
          <li key={p.label}>
            {p.label} <span className="text-stone-300">({p.start}–{p.end})</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Bar({ left, width, label, track = 0, className }: { left: string; width: string; label: string; track?: number; className?: string }) {
  return (
    <div
      className={cn("absolute flex h-7 items-center overflow-hidden rounded-md px-2 text-[0.6875rem] font-medium leading-none whitespace-nowrap", className)}
      style={{ left, width, top: `${track * 2.25}rem` }}
      title={label}
    >
      <span className="truncate">{label}</span>
    </div>
  );
}
