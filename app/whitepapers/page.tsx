import { WhitepapersView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "whitepapers");

export default function Page() {
  return <WhitepapersView locale="en" />;
}
