import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProviders } from "@/components/ThemeProviders";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
    default: "Bolajeee — Software Engineer & Technical Lead",
    template: "%s — Bolajeee",
  },
  description: "Omobolaji Ibrahim (Bolajeee) is a software engineer and technical lead building thoughtful digital products and solving real-world problems.",
  keywords: ["Omobolaji Ibrahim", "Bolajeee", "software engineer", "technical lead", "full-stack development"],
  authors: [{ name: "Omobolaji Ibrahim" }],
  openGraph: {
    title: "Bolajeee — Engineering ideas into experiences",
    description: "Selected product work by Omobolaji Ibrahim, software engineer and technical lead.",
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
        </ThemeProviders>
      </body>
    </html>
  );
}
