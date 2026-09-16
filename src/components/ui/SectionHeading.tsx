import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

const sizes = {
  md: "text-[2rem] sm:text-[2.5rem] lg:text-[3rem]",
  lg: "text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]",
  xl: "text-[2.75rem] sm:text-[3.75rem] lg:text-[5rem]",
};

export function SectionHeading({ eyebrow, title, intro, align = "left", size = "lg", light, className, as: Tag = "h2" }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-5", light && "text-limestone/60")}>{eyebrow}</p>}
      <Tag className={cn("display", sizes[size], light ? "text-limestone" : "text-ink")}>{title}</Tag>
      {intro && (
        <div className={cn("mt-6 text-base leading-relaxed sm:text-lg", light ? "text-limestone/75" : "text-charcoal-700/80", align === "center" && "mx-auto max-w-2xl")}>
          {intro}
        </div>
      )}
    </div>
  );
}
