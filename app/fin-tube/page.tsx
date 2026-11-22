import { FinTubeView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "finTube");

export default function Page() {
  return <FinTubeView locale="en" />;
}
