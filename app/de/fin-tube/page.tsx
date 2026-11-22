import { FinTubeView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "finTube");

export default function Page() {
  return <FinTubeView locale="de" />;
}
