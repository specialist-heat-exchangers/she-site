import en from "@/content/en.json";
import de from "@/content/de.json";
import { hyphenateTree } from "@/lib/hyphenate";

export type Locale = "en" | "de";
export type SiteContent = typeof en;

const catalogs: Record<Locale, SiteContent> = {
  en,
  de: hyphenateTree(de) as SiteContent,
};

export const LOCALES: Locale[] = ["en", "de"];

export const ROUTES = [
  "/",
  "/products/",
  "/aftermarket/",
  "/fin-tube/",
  "/automotive/",
  "/refurbishment/",
  "/manufacturing/",
  "/company/",
  "/whitepapers/",
  "/contact/",
  "/privacy/",
  "/servicing/",
] as const;

export function getSite(locale: Locale): SiteContent {
  return catalogs[locale];
}

export function localeFromPath(pathname: string): Locale {
  const bare = stripBase(pathname);
  return bare === "/de" || bare.startsWith("/de/") ? "de" : "en";
}

export function stripBase(pathname: string) {
  let p = pathname || "/";
  const base = (process.env.NEXT_PUBLIC_BASE_PATH === undefined
    ? "/she-site"
    : process.env.NEXT_PUBLIC_BASE_PATH
  ).replace(/\/$/, "");
  if (base && (p === base || p.startsWith(`${base}/`))) {
    p = p.slice(base.length) || "/";
  }
  if (!p.startsWith("/")) p = `/${p}`;
  return p;
}

/** Locale-agnostic path such as /products/ or /contact/?application=...#x */
export function barePath(pathname: string) {
  let p = stripBase(pathname);
  if (p === "/de") p = "/";
  else if (p.startsWith("/de/")) p = p.slice(3) || "/";
  const hash = p.includes("#") ? p.slice(p.indexOf("#")) : "";
  const before = hash ? p.slice(0, p.indexOf("#")) : p;
  const q = before.includes("?") ? before.slice(before.indexOf("?")) : "";
  let path = q ? before.slice(0, before.indexOf("?")) : before;
  if (!path.startsWith("/")) path = `/${path}`;
  if (!path.endsWith("/")) path = `${path}/`;
  return `${path}${q}${hash}`;
}

export function localePath(locale: Locale, href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
  const beforeHash = hash ? href.slice(0, href.indexOf("#")) : href;
  const query = beforeHash.includes("?")
    ? beforeHash.slice(beforeHash.indexOf("?"))
    : "";
  let path = query ? beforeHash.slice(0, beforeHash.indexOf("?")) : beforeHash;
  if (!path.startsWith("/")) path = `/${path}`;
  if (!path.endsWith("/")) path = `${path}/`;
  const prefixed = locale === "de" ? (path === "/" ? "/de/" : `/de${path}`) : path;
  return `${prefixed}${query}${hash}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}

export function equivalentPath(pathname: string, target: Locale) {
  const bare = barePath(pathname);
  const pathOnly = bare.split("?")[0].split("#")[0];
  const known = (ROUTES as readonly string[]).includes(pathOnly) || pathOnly.startsWith("/downloads/");
  return localePath(target, known ? bare : "/");
}
