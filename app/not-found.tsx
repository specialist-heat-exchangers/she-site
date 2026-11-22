import { NotFoundView } from "@/components/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "notFound");

export default function NotFound() {
  return (
    <>
      <div className="only-en">
        <NotFoundView locale="en" />
      </div>
      <div className="only-de">
        <NotFoundView locale="de" />
      </div>
    </>
  );
}
