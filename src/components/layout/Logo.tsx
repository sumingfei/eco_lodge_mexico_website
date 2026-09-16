import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark + mark.
 * TODO: replace with the company’s final logo (SVG) if different.
 */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} — inicio`} className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-7 w-7", light ? "text-limestone" : "text-ink")} />
      <span className={cn("font-serif text-[1.375rem] font-medium tracking-[-0.01em]", light ? "text-limestone" : "text-ink")}>{siteConfig.name}</span>
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="2" y="12" width="28" height="18" stroke="currentColor" strokeWidth="1.75" />
      <path d="M2 12 18 2l12 10" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 30V20h8v10" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}
