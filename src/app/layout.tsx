import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Miriam_Libre } from "next/font/google";
import { site } from "@/content/site";
import { brandVariablesCss, palette } from "@/lib/tokens";
import "./globals.css";

const miriam = Miriam_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  variable: "--font-miriam",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.mission,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.mission,
    type: "website",
    locale: "he_IL",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: palette.ink,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${miriam.variable} ${plexMono.variable}`}>
      <head>
        <style>{brandVariablesCss}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
