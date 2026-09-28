import type { Metadata, Viewport } from "next";
import { Archivo, Doto, Schibsted_Grotesk } from "next/font/google";
import { brand, webinar } from "@/content/webinar";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", display: "swap" });
const doto = Doto({ subsets: ["latin"], variable: "--font-doto", display: "swap" });

export const metadata: Metadata = {
  title: `${webinar.title} · ${brand.name}`,
  description:
    "A two-hour live session where we build your course launch together: the registration page, the WhatsApp reminders and the pitch.",
};

export const viewport: Viewport = { themeColor: "#eceef1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${schibsted.variable} ${doto.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
