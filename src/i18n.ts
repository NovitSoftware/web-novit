import {getRequestConfig} from 'next-intl/server';

// Define available locales
export const locales = ['es', 'en', 'ca'] as const;
export const defaultLocale = 'es' as const;

export default getRequestConfig(async ({locale}) => {
  // Fallback to default locale if undefined during static generation
  const actualLocale = locale || defaultLocale;
  
  return {
    locale: actualLocale,
    messages: (await import(`./locales/${actualLocale}.json`)).default
  };
});