import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/ui/StructuredData";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {locales} from '../../i18n';
import { PageTransitionProvider } from "@/components/ui/PageTransition";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { loadNavigationContent, loadServicesContent } from "@/lib/contentLoader";
import { getAssetPath } from "@/config/constants";

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  // SEO optimized metadata por idioma
  const metadataByLocale = {
    es: {
      title: {
        default: 'NOVIT Software | Desarrollo de Software a Medida en Argentina',
        template: '%s | NOVIT Software'
      },
      description: 'Software factory líder en Argentina. Desarrollo de aplicaciones web, móviles, IA y consultoría IT. +10 años transformando empresas digitalmente. Casos de éxito comprobados.',
      keywords: ['desarrollo software argentina', 'software factory', 'desarrollo web', 'aplicaciones móviles', 'inteligencia artificial', 'consultoría IT', 'transformación digital', 'ERP', 'CRM', 'desarrollo a medida'],
      openGraph: {
        title: 'NOVIT Software - Tu Partner Tecnológico en Argentina',
        description: 'Transformamos tus ideas en soluciones digitales. Desarrollo de software, IA, y consultoría IT con +10 años de experiencia.',
        images: [getAssetPath('/images/og-image-es.png')],
        locale: 'es_AR',
      }
    },
    en: {
      title: {
        default: 'NOVIT Software | Custom Software Development in Argentina', 
        template: '%s | NOVIT Software'
      },
      description: 'Leading software factory in Argentina. Web & mobile app development, AI solutions, and IT consulting. 10+ years digitally transforming businesses. Proven success stories.',
      keywords: ['software development argentina', 'software factory', 'web development', 'mobile apps', 'artificial intelligence', 'IT consulting', 'digital transformation', 'ERP', 'CRM', 'custom development'],
      openGraph: {
        title: 'NOVIT Software - Your Technology Partner in Argentina',
        description: 'We transform your ideas into digital solutions. Software development, AI, and IT consulting with 10+ years of experience.',
        images: [getAssetPath('/images/og-image-en.png')],
        locale: 'en_US',
      }
    },
    pt: {
      title: {
        default: 'NOVIT Software | Desenvolvimento de Software Personalizado na Argentina',
        template: '%s | NOVIT Software'
      },
      description: 'Software factory líder na Argentina. Desenvolvimento de aplicações web, móveis, IA e consultoria TI. +10 anos transformando empresas digitalmente. Casos de sucesso comprovados.',
      keywords: ['desenvolvimento software argentina', 'software factory', 'desenvolvimento web', 'aplicações móveis', 'inteligência artificial', 'consultoria TI', 'transformação digital', 'ERP', 'CRM'],
      openGraph: {
        title: 'NOVIT Software - Seu Parceiro Tecnológico na Argentina',
        description: 'Transformamos suas ideias em soluções digitais. Desenvolvimento de software, IA e consultoria TI com +10 anos de experiência.',
        images: [getAssetPath('/images/og-image-pt.png')],
        locale: 'pt_BR',
      }
    }
  };

  const currentMetadata = metadataByLocale[locale as keyof typeof metadataByLocale] || metadataByLocale.es;

  return {
    metadataBase: new URL('https://novit.com.ar'),
    ...currentMetadata,
    authors: [{ name: "NOVIT Software" }],
    creator: "NOVIT Software",
    publisher: "NOVIT Software",
    category: 'Technology',
    classification: 'Software Development',
    alternates: {
      canonical: `https://novit.com.ar/${locale}`,
      languages: {
        'es': 'https://novit.com.ar/es',
        'en': 'https://novit.com.ar/en',
        'pt': 'https://novit.com.ar/pt',
        'x-default': 'https://novit.com.ar/es',
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-code', // Reemplazar con código real
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-site-verification-code',
    },
    icons: {
      icon: [
        { url: getAssetPath('/favicon.png'), sizes: '32x32', type: 'image/png' },
        { url: getAssetPath('/favicon.png'), sizes: '16x16', type: 'image/png' }
      ],
      shortcut: getAssetPath('/favicon.png'),
      apple: [
        { url: getAssetPath('/favicon.png'), sizes: '180x180', type: 'image/png' }
      ],
    },
    manifest: '/site.webmanifest',
    // Twitter Card optimizado
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.openGraph.title,
      description: currentMetadata.openGraph.description,
      images: currentMetadata.openGraph.images,
      creator: '@novitsoftware',
      site: '@novitsoftware',
    },
    // Open Graph mejorado
    openGraph: {
      ...currentMetadata.openGraph,
      type: 'website',
      url: `https://novit.com.ar/${locale}`,
      siteName: 'NOVIT Software',
      countryName: 'Argentina',
    },
    // Otros metadatos importantes
    other: {
      'application-name': 'NOVIT Software',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'NOVIT Software',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#0A089B',
      'theme-color': '#0A089B',
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
  
  // Load navigation content and services
  const navigationContent = await loadNavigationContent(locale);
  const servicesContent = await loadServicesContent(locale);
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  // Get Google Analytics ID from environment
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={locale} className="scroll-smooth dark">
      <head>
        <StructuredData type="organization" locale={locale} />
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
      </head>
      <body className="antialiased bg-slate-900 text-white font-sans">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Header locale={locale} navigationContent={navigationContent} />
            <PageTransitionProvider>
              <main className="relative">
                {children}
              </main>
            </PageTransitionProvider>
            <Footer locale={locale} services={servicesContent} />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
