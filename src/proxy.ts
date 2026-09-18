import { NextResponse, type NextRequest } from "next/server";
import { canonicalRedirect, publicToInternal } from "@/i18n/routes";

/**
 * Locale routing.
 * - Spanish (default) is served at the root:  /models      → /es/models (rewrite)
 * - English is prefixed:                      /en/models   → /en/models (rewrite)
 * - Legacy Spanish slugs and /es/… redirect to the canonical URL: /modelos → /models, /es/models → /models
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const redirectTo = canonicalRedirect(pathname);
  if (redirectTo && redirectTo !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url, 308);
  }

  const mapped = publicToInternal(pathname);
  if (!mapped) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = mapped.internal;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, static assets and metadata files.
  matcher: ["/((?!api|_next|images|favicon\\.ico|icon\\.svg|sitemap\\.xml|robots\\.txt|.*\\..*).*)"],
};
