import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

/** Zero-JS accordion using native <details>. */
export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-ink/10 border-y border-ink/10", className)}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium text-ink [&::-webkit-details-marker]:hidden sm:py-6">
            <span>{item.q}</span>
            <span aria-hidden className="relative mt-1.5 h-4 w-4 shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink" />
              <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink transition-transform duration-300 group-open:rotate-90" />
            </span>
          </summary>
          <div className="pb-6 pr-10 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
