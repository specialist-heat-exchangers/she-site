import fs from "node:fs";
import path from "node:path";

const pages = [
  ["home", "/", "HomeView"],
  ["products", "products", "ProductsView"],
  ["aftermarket", "aftermarket", "AftermarketView"],
  ["finTube", "fin-tube", "FinTubeView"],
  ["automotive", "automotive", "AutomotiveView"],
  ["refurbishment", "refurbishment", "RefurbishmentView"],
  ["manufacturing", "manufacturing", "ManufacturingView"],
  ["company", "company", "CompanyView"],
  ["whitepapers", "whitepapers", "WhitepapersView"],
  ["privacy", "privacy", "PrivacyView"],
];

function write(file, source) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, source);
}

for (const [key, route, view] of pages) {
  for (const locale of ["en", "de"]) {
    const dir = locale === "en" ? (route === "/" ? "app" : `app/${route}`) : route === "/" ? "app/de" : `app/de/${route}`;
    write(
      `${dir}/page.tsx`,
      `import { ${view} } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("${locale}", "${key}");

export default function Page() {
  return <${view} locale="${locale}" />;
}
`,
    );
  }
}

for (const locale of ["en", "de"]) {
  const dir = locale === "en" ? "app/contact" : "app/de/contact";
  write(
    `${dir}/page.tsx`,
    `import { ContactView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("${locale}", "contact");

export default function Page() {
  return <ContactView locale="${locale}" endpoint={process.env.NEXT_PUBLIC_FORM_ENDPOINT || ""} />;
}
`,
  );
}

for (const locale of ["en", "de"]) {
  const dir = locale === "en" ? "app/servicing" : "app/de/servicing";
  const target = locale === "en" ? "/refurbishment/" : "/de/refurbishment/";
  write(
    `${dir}/page.tsx`,
    `import { asset } from "@/lib/config";
import { RedirectClient } from "@/components/Redirect";
import { ServicingNote } from "@/components/pages";

export const metadata = { robots: { index: false, follow: true } };

export default function Page() {
  const target = asset("${target}");
  return (
    <>
      <meta httpEquiv="refresh" content={\`0; url=\${target}\`} />
      <ServicingNote locale="${locale}" />
      <RedirectClient href="${target}" />
    </>
  );
}
`,
  );
}

for (const locale of ["en", "de"]) {
  const dir = locale === "en" ? "app/downloads/[slug]" : "app/de/downloads/[slug]";
  const pathPrefix = locale === "en" ? "/downloads" : "/de/downloads";
  write(
    `${dir}/page.tsx`,
    `import { notFound } from "next/navigation";
import { DownloadView } from "@/components/pages";
import { getSite } from "@/lib/i18n";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return getSite("${locale}").downloads.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getSite("${locale}").downloads.find((download) => download.slug === slug);
  if (!item) return {};
  return pageMeta("${locale}", {
    title: item.title,
    description: item.summary,
    path: \`${pathPrefix}/\${slug}/\`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSite("${locale}").downloads.some((download) => download.slug === slug)) notFound();
  return <DownloadView locale="${locale}" slug={slug} />;
}
`,
  );
}

console.log("routes written");
