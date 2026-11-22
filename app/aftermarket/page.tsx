import { AftermarketView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "aftermarket");

export default function Page() {
  return <AftermarketView locale="en" />;
}
