import type { RouteKey } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries/es";

/** Main navigation: route key + dictionary label key. */
export const mainNav: { route: RouteKey; label: keyof Dictionary["nav"] }[] = [
  { route: "home", label: "home" },
  { route: "models", label: "models" },
  { route: "process", label: "process" },
  { route: "design", label: "design" },
  { route: "sustainability", label: "sustainability" },
  { route: "developers", label: "developers" },
  { route: "faq", label: "faq" },
];

type FooterLink = { route: RouteKey; label: keyof Dictionary["footer"]["links"] };

export const footerNav: { group: keyof Dictionary["footer"]["groups"]; links: FooterLink[] }[] = [
  {
    group: "homes",
    links: [
      { route: "models", label: "allModels" },
      { route: "estimator", label: "estimator" },
      { route: "design", label: "design" },
      { route: "projects", label: "projects" },
    ],
  },
  {
    group: "process",
    links: [
      { route: "process", label: "process" },
      { route: "sustainability", label: "sustainability" },
      { route: "ecoEstimator", label: "ecoEstimator" },
      { route: "faq", label: "faq" },
      { route: "developers", label: "developers" },
    ],
  },
  {
    group: "contact",
    links: [
      { route: "estimator", label: "quote" },
      { route: "contact", label: "contact" },
      { route: "privacy", label: "privacy" },
    ],
  },
];
