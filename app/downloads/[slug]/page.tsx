import { notFound } from "next/navigation";
import { DownloadView } from "@/components/pages";
import { getSite } from "@/lib/i18n";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return getSite("en").downloads.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getSite("en").downloads.find((download) => download.slug === slug);
  if (!item) return {};
  return pageMeta("en", {
    title: item.title,
    description: item.summary,
    path: `/downloads/${slug}/`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSite("en").downloads.some((download) => download.slug === slug)) notFound();
  return <DownloadView locale="en" slug={slug} />;
}
