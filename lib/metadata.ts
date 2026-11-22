import type { Metadata } from "next";
import { absoluteAsset, absoluteUrl, ogImagePath } from "./config";
import { getSite, localePath, type Locale } from "./i18n";

const PAGE_PATHS = {
  home: "/",
  products: "/products/",
  aftermarket: "/aftermarket/",
  finTube: "/fin-tube/",
  automotive: "/automotive/",
  refurbishment: "/refurbishment/",
  manufacturing: "/manufacturing/",
  company: "/company/",
  whitepapers: "/whitepapers/",
  contact: "/contact/",
  privacy: "/privacy/",
  notFound: "/",
} as const;

export type PageKey = keyof typeof PAGE_PATHS;

export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const site = getSite(locale);
  const meta = site.pages[page].meta;
  return pageMeta(locale, {
    title: meta.title,
    description: meta.description,
    path: localePath(locale, PAGE_PATHS[page]),
  });
}

export function pageMeta(
  locale: Locale,
  opts: { title: string; description: string; path: string },
): Metadata {
  const site = getSite(locale);
  const full = opts.title.includes(site.meta.siteName)
    ? opts.title
    : `${opts.title} · ${site.meta.siteName}`;
  const url = absoluteUrl(opts.path);
  const image = absoluteAsset(ogImagePath);
  const enPath = localePath("en", opts.path.replace(/^\/de(?=\/|$)/, "") || "/");
  const dePath = localePath("de", enPath);

  return {
    title: { absolute: full },
    description: opts.description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(enPath),
        de: absoluteUrl(dePath),
        "x-default": absoluteUrl(enPath),
      },
    },
    openGraph: {
      title: full,
      description: opts.description,
      url,
      type: "website",
      siteName: site.meta.siteName,
      locale: locale === "de" ? "de_DE" : "en_GB",
      alternateLocale: locale === "de" ? ["en_GB"] : ["de_DE"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: site.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description: opts.description,
      images: [image],
    },
  };
}
