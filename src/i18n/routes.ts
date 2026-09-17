import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Route table: public slug per locale + the folder name under app/[locale].
 * Spanish (default) is served without prefix: /modelos. English: /en/models.
 * Keep this file dependency-free: it also runs in the proxy (edge runtime).
 */
export const routes = {
  home: { es: "", en: "", dir: "" },
  models: { es: "modelos", en: "models", dir: "modelos" },
  estimator: { es: "cotizador", en: "estimator", dir: "cotizador" },
  process: { es: "como-funciona", en: "how-it-works", dir: "como-funciona" },
  sustainability: { es: "sustentabilidad", en: "sustainability", dir: "sustentabilidad" },
  design: { es: "diseño", en: "design", dir: "diseno" },
  developers: { es: "desarrolladores", en: "developers", dir: "desarrolladores" },
  faq: { es: "preguntas-frecuentes", en: "faq", dir: "preguntas-frecuentes" },
  projects: { es: "proyectos", en: "projects", dir: "proyectos" },
  contact: { es: "contacto", en: "contact", dir: "contacto" },
  privacy: { es: "aviso-de-privacidad", en: "privacy-notice", dir: "aviso-de-privacidad" },
} as const;

export type RouteKey = keyof typeof routes;

const localePrefix = (locale: Locale) => (locale === defaultLocale ? "" : `/${locale}`);

/**
 * Public href for a route in a locale. `rest` is appended verbatim
 * (e.g. "/casa-110" or "?modelo=casa-110").
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

  // /en/<spanish dir> → /en/<english slug>
  if (first && isLocale(first)) {
    const locale = first;
    const rest = segments.slice(1);
    if (findRouteBySlug(rest[0], locale)) return null;
    const key = findRouteByDir(rest[0]);
    if (!key) return null;
    const tail = rest.slice(1).map(encodeURIComponent).join("/");
    return encodedHref(locale, key, tail ? `/${tail}` : "");
  }

  // Default locale using an internal dir name that differs from the slug (/diseno → /diseño).
  if (first && !findRouteBySlug(first, defaultLocale)) {
    const key = findRouteByDir(first);
    if (key && routes[key].dir !== routes[key][defaultLocale]) {
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
