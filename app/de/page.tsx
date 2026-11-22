import { HomeView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "home");

export default function Page() {
  return <HomeView locale="de" />;
}
