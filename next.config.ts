import type { NextConfig } from "next";

/**
 * Locale routing (Spanish at the root, English under /en with translated
 * slugs) is handled in src/proxy.ts and src/i18n/routes.ts.
 */
const nextConfig: NextConfig = {
  images: {
    // WebP only: Cloudflare Images falls back from AVIF to WebP for large
    // renditions while keeping an image/avif content-type, which browsers reject.
    formats: ["image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [64, 96, 128, 256, 384, 512],
    qualities: [60, 75],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
