'use client';

import { useEffect } from 'react';

// Supported locales
const locales = ['es', 'en', 'ca'];
const defaultLocale = 'es';

export default function LocaleDetector() {
  useEffect(() => {
    // Get browser language
    const browserLanguages = navigator.languages || [navigator.language];
    
    // Function to normalize language codes
    const normalizeLanguage = (lang: string): string => {
      // Remove region codes (e.g., 'en-US' -> 'en', 'ca-ES' -> 'ca')
      return lang.split('-')[0].toLowerCase();
    };

    // Find the best matching locale
    let detectedLocale = defaultLocale;
    
    for (const browserLang of browserLanguages) {
      const normalizedLang = normalizeLanguage(browserLang);
      
      // Direct match
      if (locales.includes(normalizedLang)) {
        detectedLocale = normalizedLang;
        break;
      }
      
      // Special handling for Catalan variants
      if (normalizedLang === 'ca' || browserLang.toLowerCase().includes('ca-')) {
        detectedLocale = 'ca';
        break;
      }
    }

    // Check if user has a previously stored locale preference
    const storedLocale = localStorage.getItem('preferred-locale');
    if (storedLocale && locales.includes(storedLocale)) {
      detectedLocale = storedLocale;
    }

    // Store the detected locale for future visits
    localStorage.setItem('preferred-locale', detectedLocale);

    // Redirect to the detected locale using window.location for static sites
    window.location.href = `/${detectedLocale}`;
  }, []);

  // Show a loading state while detecting
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p>Detectando idioma...</p>
      </div>
    </div>
  );
}