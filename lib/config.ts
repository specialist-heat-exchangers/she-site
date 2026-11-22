/**
 * Base path and absolute URLs.
 * Defaults match https://specialist-heat-exchangers.github.io/she-site/
 * Set NEXT_PUBLIC_BASE_PATH="" and NEXT_PUBLIC_SITE_URL for a custom domain.
 */
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH === undefined
    ? "/she-site"
    : process.env.NEXT_PUBLIC_BASE_PATH;

export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://specialist-heat-exchangers.github.io"
).replace(/\/$/, "");

function joinBase(path: string) {
  const base = basePath.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Root-relative URL including basePath, for img src and raw anchors. */
export function asset(path: string) {
  return joinBase(path);
}

/** Absolute page URL, always with a trailing slash. */
export function absoluteUrl(pathname: string) {
  if (!pathname || pathname === "/") {
    return `${siteOrigin}${basePath.replace(/\/$/, "")}/`;
  }
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withSlash = p.endsWith("/") ? p : `${p}/`;
  return `${siteOrigin}${basePath.replace(/\/$/, "")}${withSlash}`;
}

/** Absolute file URL (no trailing slash added). */
export function absoluteAsset(pathname: string) {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteOrigin}${basePath.replace(/\/$/, "")}${p}`;
}

export const ogImagePath = "/og-image.png";
