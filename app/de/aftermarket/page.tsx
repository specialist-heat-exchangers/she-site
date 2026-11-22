import { AftermarketView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "aftermarket");

export default function Page() {
  return <AftermarketView locale="de" />;
}
