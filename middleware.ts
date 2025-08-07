import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false // Disable automatic locale detection to ensure consistency
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|en|pt)/:path*',
    // Enable redirects that add missing locales
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};