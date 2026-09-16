"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, switchLocalePath } from "@/i18n";
import { useI18n } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

/** Español / English toggle linking to the same page in the other locale. */
export function LanguageSwitcher({ light, className }: { light?: boolean; className?: string }) {
  const pathname = usePathname();
  const { locale, dict } = useI18n();

  return (
    <nav aria-label={dict.header.language} className={cn("flex items-center rounded-full border p-0.5 text-[0.75rem] font-semibold", light ? "border-white/30" : "border-ink/15", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              active ? (light ? "bg-white text-ink" : "bg-ink text-limestone") : light ? "text-limestone/80 hover:text-white" : "text-stone hover:text-ink",
            )}
          >
            {localeNames[l]}
          </Link>
        );
      })}
    </nav>
  );
}
