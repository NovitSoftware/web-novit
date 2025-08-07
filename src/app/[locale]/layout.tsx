import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {locales} from '../../i18n';
import { PageTransitionProvider } from "@/components/ui/PageTransition";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { loadNavigationContent } from "@/lib/contentLoader";

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = (messages as Record<string, unknown>).metadata as Record<string, unknown> || {};
  
  return {
    title: (metadata.title as string) || "NOVIT Software | La software factory que necesitás",
    description: (metadata.description as string) || "Partner tecnológico ideal para acompañar tu proceso de transformación digital. Desarrollo de software, IA, consultoría IT y más.",
    keywords: metadata.keywords ? (metadata.keywords as string).split(', ') : ["desarrollo software", "software factory", "transformación digital", "inteligencia artificial", "consultoría IT"],
    authors: [{ name: "NOVIT Software" }],
    creator: "NOVIT Software",
    publisher: "NOVIT Software",
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      type: "website",
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : 'pt_BR',
      url: "https://novitsoftware.com",
      title: (metadata.title as string) || "NOVIT Software | La software factory que necesitás",
      description: (metadata.description as string) || "Partner tecnológico ideal para acompañar tu proceso de transformación digital.",
      siteName: "NOVIT Software",
    },
    twitter: {
      card: "summary_large_image",
      title: (metadata.title as string) || "NOVIT Software | La software factory que necesitás",
      description: (metadata.description as string) || "Partner tecnológico ideal para acompañar tu proceso de transformación digital.",
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
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // Load navigation content
  const navigationContent = await loadNavigationContent(locale);
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth dark">
      <body className="antialiased bg-slate-900 text-white font-sans">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Header locale={locale} navigationContent={navigationContent} />
            <PageTransitionProvider>
              <main className="relative">
                {children}
              </main>
            </PageTransitionProvider>
            <Footer locale={locale} />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
