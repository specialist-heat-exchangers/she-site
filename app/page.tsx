import { HomeView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
