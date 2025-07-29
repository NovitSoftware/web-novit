import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";

export const metadata: Metadata = {
  title: "NOVIT Software | La software factory que necesitás",
  description: "Partner tecnológico ideal para acompañar tu proceso de transformación digital. Desarrollo de software, IA, consultoría IT y más.",
  keywords: ["desarrollo software", "software factory", "transformación digital", "inteligencia artificial", "consultoría IT"],
  authors: [{ name: "NOVIT Software" }],
  creator: "NOVIT Software",
  publisher: "NOVIT Software",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://novitsoftware.com",
    title: "NOVIT Software | La software factory que necesitás",
    description: "Partner tecnológico ideal para acompañar tu proceso de transformación digital.",
    siteName: "NOVIT Software",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVIT Software | La software factory que necesitás",
    description: "Partner tecnológico ideal para acompañar tu proceso de transformación digital.",
    creator: "@novitsoftware",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="es" className="scroll-smooth dark">
      <body className="antialiased bg-slate-900 text-white font-sans">
        <Header />
        <main className="relative">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
