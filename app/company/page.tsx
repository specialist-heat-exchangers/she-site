import { CompanyView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "company");

export default function Page() {
  return <CompanyView locale="en" />;
}
