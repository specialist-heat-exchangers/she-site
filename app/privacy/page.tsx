import { PrivacyView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "privacy");

export default function Page() {
  return <PrivacyView locale="en" />;
}
