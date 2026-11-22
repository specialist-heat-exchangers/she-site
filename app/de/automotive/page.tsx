import { AutomotiveView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "automotive");

export default function Page() {
  return <AutomotiveView locale="de" />;
}
