import type { NextConfig } from "next";

/** Public (canonical) path for the design page and the ASCII folder that serves it. */
const DESIGN_PUBLIC_PATH = "/dise%C3%B1o"; // "/diseño"
const DESIGN_FILE_PATH = "/diseno";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [64, 96, 128, 256, 384, 512],
    qualities: [60, 75],
  },
  async rewrites() {
    return [
      // The public URL is /diseño; the route lives in an ASCII folder so the
      // filesystem router matches reliably.
      { source: "/diseño", destination: DESIGN_FILE_PATH },
      { source: DESIGN_PUBLIC_PATH, destination: DESIGN_FILE_PATH },
    ];
  },
  async redirects() {
    return [
      // Keep a single canonical URL for the design page.
      { source: DESIGN_FILE_PATH, destination: DESIGN_PUBLIC_PATH, permanent: true },
    ];
  },
};

export default nextConfig;
