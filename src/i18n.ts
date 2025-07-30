import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Define available locales
export const locales = ['es', 'en', 'ca'] as const;
export const defaultLocale = 'es' as const;

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale: locale!,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});