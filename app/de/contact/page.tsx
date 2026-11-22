import { ContactView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "contact");

export default function Page() {
  return <ContactView locale="de" endpoint={process.env.NEXT_PUBLIC_FORM_ENDPOINT || ""} />;
}
