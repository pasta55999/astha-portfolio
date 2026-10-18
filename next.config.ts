import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. The Pages workflow sets NEXT_PUBLIC_BASE_PATH
 * to "/<repo-name>" (project page) — leave it unset for local dev or a custom domain.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
