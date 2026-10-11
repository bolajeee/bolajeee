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
    default: "Bolajeee — Engineer at Heart, Builder by Practice",
    template: "%s — Bolajeee",
  },
  description: "Omobolaji Ibrahim (Bolajeee) is an interdisciplinary engineer working across food engineering, software, research, and technical leadership.",
  keywords: ["Omobolaji Ibrahim", "Bolajeee", "food engineering", "software engineer", "engineering research", "technical lead"],
  authors: [{ name: "Omobolaji Ibrahim" }],
  openGraph: {
    title: "Bolajeee — An engineer at heart. A builder by practice.",
    description: "Food engineering research and software product work by Omobolaji Ibrahim.",
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
