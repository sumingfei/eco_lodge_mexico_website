import type { NextConfig } from "next";

/**
 * Locale routing (Spanish at the root, English under /en with translated
 * slugs) is handled in src/proxy.ts and src/i18n/routes.ts.
 */
const nextConfig: NextConfig = {
  experimental: {
    // Next 16 compares a client-computed hash in `?_rsc=` with one recomputed
    // from request headers and 307-redirects on mismatch. Behind the OpenNext
    // Cloudflare adapter the hashes never match, which turns every client-side
    // navigation into a redirect loop. The check only matters for CDNs that
    // cache dynamic responses while ignoring `Vary`; Workers does not.
    validateRSCRequestHeaders: false,
  },
  images: {
    // Pre-generated static variants (scripts/generate-responsive-images.mjs)
    // served via image-loader.ts — no runtime optimization on the Worker.
    loader: "custom",
    loaderFile: "./image-loader.ts",
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [256],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
