import { defaultLocale, isLocale, locales, type Locale } from "./config";

/**
 * Route table: public slug per locale, the folder name under app/[locale] and
 * legacy slugs that redirect to the current one.
 * Spanish (default) is served without prefix: /models. English: /en/models.
 * Keep this file dependency-free: it also runs in the proxy (edge runtime).
 */
export const routes = {
  home: { es: "", en: "", dir: "" },
  models: { es: "models", en: "models", dir: "models", legacy: ["modelos"] },
  estimator: { es: "estimator", en: "estimator", dir: "estimator", legacy: ["cotizador"] },
  ecoEstimator: { es: "eco-estimator", en: "eco-estimator", dir: "eco-estimator" },
  process: { es: "how-it-works", en: "how-it-works", dir: "how-it-works", legacy: ["como-funciona"] },
  sustainability: { es: "sustainability", en: "sustainability", dir: "sustainability", legacy: ["sustentabilidad"] },
  design: { es: "design", en: "design", dir: "design", legacy: ["diseño", "diseno"] },
  developers: { es: "developers", en: "developers", dir: "developers", legacy: ["desarrolladores"] },
  faq: { es: "faq", en: "faq", dir: "faq", legacy: ["preguntas-frecuentes"] },
  projects: { es: "projects", en: "projects", dir: "projects", legacy: ["proyectos"] },
  contact: { es: "contact", en: "contact", dir: "contact", legacy: ["contacto"] },
  privacy: { es: "privacy-notice", en: "privacy-notice", dir: "privacy-notice", legacy: ["aviso-de-privacidad"] },
} as const;

export type RouteKey = keyof typeof routes;

const localePrefix = (locale: Locale) => (locale === defaultLocale ? "" : `/${locale}`);

/**
 * Public href for a route in a locale. `rest` is appended verbatim
 * (e.g. "/casa-90" or "?model=casa-90").
 */
export function href(locale: Locale, key: RouteKey, rest = ""): string {
  const slug = routes[key][locale];
  const path = `${localePrefix(locale)}${slug ? `/${slug}` : ""}${rest}`;
  return path === "" ? "/" : path;
}

/** Same as href() but percent-encoded, for canonical URLs, sitemaps and redirects. */
export function encodedHref(locale: Locale, key: RouteKey, rest = ""): string {
  return encodeURI(href(locale, key, rest));
}

function splitPath(pathname: string) {
  const decoded = decodeURIComponent(pathname);
  const segments = decoded.split("/").filter(Boolean);
  return segments;
}

/** Locale + remaining public segments for a public pathname. */
export function parsePublicPath(pathname: string): { locale: Locale; segments: string[] } {
  const segments = splitPath(pathname);
  if (segments[0] && isLocale(segments[0]) && segments[0] !== defaultLocale) {
    return { locale: segments[0], segments: segments.slice(1) };
  }
  return { locale: defaultLocale, segments };
}

function findRouteBySlug(slug: string | undefined, locale: Locale): RouteKey | null {
  const wanted = slug ?? "";
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][locale] === wanted) return key;
  }
  return null;
}

function findRouteByDir(dir: string | undefined): RouteKey | null {
  const wanted = dir ?? "";
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].dir === wanted) return key;
  }
  return null;
}

/** Matches a segment against the internal dir name, any locale's slug or a legacy slug. */
function findRouteByAnySlug(segment: string | undefined): RouteKey | null {
  const byDir = findRouteByDir(segment);
  if (byDir) return byDir;
  for (const l of locales) {
    const key = findRouteBySlug(segment, l);
    if (key) return key;
  }
  if (segment) {
    for (const key of Object.keys(routes) as RouteKey[]) {
      const route = routes[key] as { legacy?: readonly string[] };
      if (route.legacy?.includes(segment)) return key;
    }
  }
  return null;
}

/**
 * Maps a public pathname to the internal app path (/[locale]/<dir>/…).
 * Returns null when the first segment is not a known route (lets Next 404).
 */
export function publicToInternal(pathname: string): { locale: Locale; internal: string } | null {
  const { locale, segments } = parsePublicPath(pathname);
  const key = findRouteBySlug(segments[0], locale);
  if (!key) return { locale, internal: `/${locale}/${segments.join("/")}`.replace(/\/$/, "") || `/${locale}` };
  const rest = segments.slice(1).map(encodeURIComponent).join("/");
  const dir = routes[key].dir;
  return { locale, internal: `/${locale}${dir ? `/${dir}` : ""}${rest ? `/${rest}` : ""}` };
}

/**
 * If a request uses an internal path directly (/es/modelos, /en/modelos, /diseno),
 * returns the canonical public path to redirect to; otherwise null.
 */
export function canonicalRedirect(pathname: string): string | null {
  const segments = splitPath(pathname);
  const first = segments[0];

  // /es/... → strip the default-locale prefix.
  if (first === defaultLocale) {
    const rest = segments.slice(1);
    const key = findRouteByDir(rest[0]) ?? findRouteBySlug(rest[0], defaultLocale);
    const tail = rest.slice(1).map(encodeURIComponent).join("/");
    return key ? encodedHref(defaultLocale, key, tail ? `/${tail}` : "") : `/${rest.map(encodeURIComponent).join("/")}`;
  }

  // /en/<internal dir or other locale's slug> → /en/<public slug>
  if (first && isLocale(first)) {
    const locale = first;
    const rest = segments.slice(1);
    if (findRouteBySlug(rest[0], locale)) return null;
    const key = findRouteByAnySlug(rest[0]);
    if (!key) return null;
    const tail = rest.slice(1).map(encodeURIComponent).join("/");
    return encodedHref(locale, key, tail ? `/${tail}` : "");
  }

  // Default locale using a legacy Spanish slug (/como-funciona → /how-it-works).
  if (first && !findRouteBySlug(first, defaultLocale)) {
    const key = findRouteByAnySlug(first);
    if (key) {
      const tail = segments.slice(1).map(encodeURIComponent).join("/");
      return encodedHref(defaultLocale, key, tail ? `/${tail}` : "");
    }
  }
  return null;
}

/** Public path of the same page in another locale (used by the language switcher). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { locale, segments } = parsePublicPath(pathname);
  const key = findRouteBySlug(segments[0], locale);
  if (!key) return href(target, "home");
  const tail = segments.slice(1).map(encodeURIComponent).join("/");
  return href(target, key, tail ? `/${tail}` : "");
}
