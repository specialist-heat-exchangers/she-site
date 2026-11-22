import type { NextConfig } from "next";

/**
 * GitHub Pages project site: https://specialist-heat-exchangers.github.io/she-site/
 * Custom domain later: set NEXT_PUBLIC_BASE_PATH to an empty string and
 * NEXT_PUBLIC_SITE_URL to the domain (see README and .env.example).
 * An unset variable keeps the project-site default. An explicit empty
 * string means the site is served from the domain root.
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH === undefined
    ? "/she-site"
    : process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
