import { notFound } from "next/navigation";
import { DownloadView } from "@/components/pages";
import { getSite } from "@/lib/i18n";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return getSite("de").downloads.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getSite("de").downloads.find((download) => download.slug === slug);
  if (!item) return {};
  return pageMeta("de", {
    title: item.title,
    description: item.summary,
    path: `/de/downloads/${slug}/`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSite("de").downloads.some((download) => download.slug === slug)) notFound();
  return <DownloadView locale="de" slug={slug} />;
}
