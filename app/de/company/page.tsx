import { CompanyView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "company");

export default function Page() {
  return <CompanyView locale="de" />;
}
