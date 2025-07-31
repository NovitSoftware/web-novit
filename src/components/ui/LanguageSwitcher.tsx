'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ca', name: 'Català', flag: '🇪🇸' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname for static generation compatibility
  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] && languages.some(lang => lang.code === pathSegments[1]) 
    ? pathSegments[1] 
    : 'es'; // fallback to Spanish

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Get the current path without the locale
    const segments = pathname.split('/');
    const pathWithoutLocale = segments.slice(2).join('/');
    
    // Construct new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
    
    // Store the user's language preference for future visits
    localStorage.setItem('preferred-locale', newLocale);
    
    setIsOpen(false);
    router.push(newPath);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <span className="sm:hidden text-sm">
          {currentLanguage.flag}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-slate-700 transition-colors ${
                  lang.code === currentLocale ? 'bg-slate-700 text-accent-cyan' : 'text-white/90'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {lang.code === currentLocale && (
                  <span className="ml-auto w-2 h-2 bg-accent-cyan rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}