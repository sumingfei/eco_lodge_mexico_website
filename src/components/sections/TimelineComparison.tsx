import { timelineComparison, type TimelinePhase } from "@/data/process";
import { cn } from "@/lib/utils";
import { t, type Locale } from "@/i18n";
import { getI18n } from "@/i18n/server";

/**
 * Illustrative Gantt-style comparison. The prefab row uses several tracks to show
 * that site preparation, factory fabrication and permits happen in parallel.
 */
export async function TimelineComparison({ className, headingLevel: Heading = "h3" }: { className?: string; headingLevel?: "h2" | "h3" }) {
  const { locale, dict } = await getI18n();
  const { totalWeeks, traditional, prefab } = timelineComparison;
  const pct = (w: number) => `${(w / totalWeeks) * 100}%`;
  const ticks = Array.from({ length: totalWeeks / 4 + 1 }, (_, i) => i * 4);

  return (
    <div className={cn("rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-5 sm:p-8", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Heading className="font-serif text-2xl text-ink">{dict.timeline.title}</Heading>
        <p className="text-xs text-stone">{dict.timeline.example}</p>
      </div>

      <div className="mt-8 space-y-10">
        <Row label={t(traditional.label, locale)} total={t(traditional.totalLabel, locale)} tone="stone" phases={traditional.phases} locale={locale}>
          {traditional.phases.map((p) => (
            <Bar key={p.label.es} left={pct(p.start)} width={pct(p.end - p.start)} label={t(p.label, locale)} className="bg-stone-300 text-ink" />
          ))}
        </Row>

        <Row label={t(prefab.label, locale)} total={t(prefab.totalLabel, locale)} tone="terracotta" tracks={prefab.tracks.length} trackLabels={prefab.tracks.map((l) => t(l, locale))} phases={prefab.phases} locale={locale}>
          {prefab.phases.map((p) => (
            <Bar
              key={p.label.es}
              left={pct(p.start)}
              width={pct(p.end - p.start)}
              label={t(p.label, locale)}
              track={p.track}
              className={p.track === 1 ? "bg-terracotta text-white" : p.track === 2 ? "bg-sand-300 text-ink" : "bg-agave text-white"}
            />
          ))}
        </Row>
      </div>

      {/* Axis */}
      <div className="relative mt-6 h-6 border-t border-ink/15 text-[0.625rem] text-stone">
        {ticks.map((tick) => (
          <span key={tick} className="absolute top-1.5 -translate-x-1/2" style={{ left: pct(tick) }}>
            {tick}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-stone">{dict.timeline.note}</p>
    </div>
  );
}

function Row({ label, total, children, tracks = 1, trackLabels, tone, phases, locale }: { label: string; total: string; children: React.ReactNode; tracks?: number; trackLabels?: string[]; tone: "stone" | "terracotta"; phases: TimelinePhase[]; locale: Locale }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className={cn("text-sm font-semibold", tone === "terracotta" ? "text-terracotta" : "text-stone")}>{total}</p>
      </div>
      <div className="flex gap-2">
        {trackLabels && (
          <div className="hidden w-16 shrink-0 flex-col text-[0.625rem] uppercase tracking-wider text-stone sm:flex">
            {trackLabels.map((tl) => (
              <span key={tl} className="flex h-9 items-center">
                {tl}
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
          <li key={p.label.es}>
            {t(p.label, locale)} <span className="text-stone-300">({p.start}–{p.end})</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Bar({ left, width, label, track = 0, className }: { left: string; width: string; label: string; track?: number; className?: string }) {
  return (
    <div className={cn("absolute flex h-7 items-center overflow-hidden rounded-md px-2 text-[0.6875rem] font-medium leading-none whitespace-nowrap", className)} style={{ left, width, top: `${track * 2.25}rem` }} title={label}>
      <span className="truncate">{label}</span>
    </div>
  );
}
