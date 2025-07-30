import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  const locales = ['es', 'en', 'ca'];
  if (!locales.includes(locale!)) notFound();

  return {
    locale: locale!,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});