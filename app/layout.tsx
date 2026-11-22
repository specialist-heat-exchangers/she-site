import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Chrome } from "@/components/Chrome";
import { siteOrigin } from "@/lib/config";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "Specialist Heat Exchangers", template: "%s · Specialist Heat Exchangers" },
  description:
    "Bespoke heat exchangers designed and manufactured in Lincoln, UK since 1968.",
};

const localeScript = `(function(){var p=location.pathname;var de=/\\/de(\\/|$)/.test(p);document.documentElement.lang=de?"de":"en";document.documentElement.dataset.locale=de?"de":"en";})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      </head>
      <body>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
