import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./showcase.css";
import { ThemeProviders } from "@/components/ThemeProviders";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Cursor from "@/components/Cursor";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});



export const metadata: Metadata = {
  title: {
    default: "Omobolaji Ibrahim (Bolajeee) — Full-Stack Engineer",
    template: "%s — Bolajeee",
  },
  description: "Omobolaji Ibrahim is a full-stack engineer who designs and ships web, mobile and AI products end to end: CivicAI, Builders’ Liability, Leaders CV Checker and Furrow.",
  keywords: ["Omobolaji Ibrahim", "Bolajeee", "full-stack engineer", "software engineer", "Next.js", "React", "Flutter"],
  authors: [{ name: "Omobolaji Ibrahim" }],
  openGraph: {
    title: "Omobolaji Ibrahim — I build the systems behind products people rely on.",
    description: "Full-stack engineer. Web, mobile and AI products, end to end.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviders>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Cursor />
        </ThemeProviders>
      </body>
    </html>
  );
}
