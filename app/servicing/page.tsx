import { asset } from "@/lib/config";
import { RedirectClient } from "@/components/Redirect";
import { ServicingNote } from "@/components/pages";

export const metadata = { robots: { index: false, follow: true } };

export default function Page() {
  const target = asset("/refurbishment/");
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <ServicingNote locale="en" />
      <RedirectClient href="/refurbishment/" />
    </>
  );
}
