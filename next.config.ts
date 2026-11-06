import type { NextConfig } from "next";

/**
 * WP_EXPORT=1 npm run build  →  export statique (HTML/CSS/JS) dans .next-wp/,
 * empaqueté ensuite dans le thème WordPress (voir scripts/build-wordpress.mjs).
 */
const wpExport = process.env.WP_EXPORT === "1";

const nextConfig: NextConfig = {
  // Le pré-rendu partiel n'est pas compatible avec l'export statique.
  cacheComponents: !wpExport,
  partialPrefetching: !wpExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(wpExport
    ? {
        output: "export" as const,
        distDir: ".next-wp",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
