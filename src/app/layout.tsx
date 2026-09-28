import type { Metadata, Viewport } from "next";
import { Anek_Latin, Kalam, Mukta } from "next/font/google";
import { brand, webinar } from "@/content/webinar";
import "./globals.css";

// Type from Indian foundries: Anek (Ek Type) for headlines, Mukta (Ek Type) for text,
// Kalam (Indian Type Foundry) for the handwritten notes.
const anek = Anek_Latin({ subsets: ["latin"], axes: ["wdth"], variable: "--font-anek", display: "swap" });
const mukta = Mukta({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-mukta", display: "swap" });
const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kalam", display: "swap" });

export const metadata: Metadata = {
  title: `${webinar.title} · ${brand.name}`,
  description: webinar.subtitle,
};

export const viewport: Viewport = { themeColor: "#ffc23a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${anek.variable} ${mukta.variable} ${kalam.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
