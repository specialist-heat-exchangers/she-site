import { ContactView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "contact");

export default function Page() {
  return <ContactView locale="en" endpoint={process.env.NEXT_PUBLIC_FORM_ENDPOINT || ""} />;
}
