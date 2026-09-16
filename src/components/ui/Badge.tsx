import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({ children, className, tone = "neutral" }: { children: ReactNode; className?: string; tone?: "neutral" | "terracotta" | "agave" | "light" }) {
  const tones = {
    neutral: "bg-ink/5 text-ink",
    terracotta: "bg-terracotta-100 text-terracotta-600",
    agave: "bg-agave-100 text-agave-700",
    light: "bg-white/85 text-ink backdrop-blur",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]", tones[tone], className)}>{children}</span>;
}
