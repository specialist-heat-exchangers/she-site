import { ProductsView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("de", "products");

export default function Page() {
  return <ProductsView locale="de" />;
}
