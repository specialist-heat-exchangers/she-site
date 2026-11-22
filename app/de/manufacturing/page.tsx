import { ManufacturingView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "manufacturing");

export default function Page() {
  return <ManufacturingView locale="de" />;
}
