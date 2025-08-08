'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLocale } from 'next-intl';

import { getAssetPath } from '@/config/constants';
import PremiumQuoteModal from '@/components/ui/PremiumQuoteModal';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import TransitionLink from '@/components/ui/TransitionLink';
import HomeLink from '@/components/ui/HomeLink';
import { NavigationContent } from '@/lib/contentLoader';

interface HeaderProps {
  locale?: string;
  navigationContent?: NavigationContent | null;
}

export default function Header({ locale: localeParam, navigationContent }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPremiumQuoteOpen, setIsPremiumQuoteOpen] = useState(false);
  
  const localeFromHook = useLocale();
  // Use the prop locale if provided, otherwise fall back to useLocale hook
  const locale = localeParam || localeFromHook;

  // Default navigation if no content provided (fallback)
  const defaultNavigation = [
    { label: 'Inicio', href: getAssetPath(`/${locale}/#home`), isHome: true },
    { label: 'Qué hacemos', href: getAssetPath(`/${locale}/#services`) },
    { label: 'Casos de Éxito', href: getAssetPath(`/${locale}/#${locale === 'en' ? 'success-stories' : locale === 'pt' ? 'casos-sucesso' : 'casos-exito'}`) },
    { label: 'Academia Novit', href: getAssetPath(`/${locale}/academia`) },
    { label: 'Carreras', href: getAssetPath(`/${locale}/carreras`) },
  ];

  const navigation = navigationContent ? [
    { label: navigationContent.data.home, href: getAssetPath(`/${locale}/#home`), isHome: true },
    { label: navigationContent.data.services, href: getAssetPath(`/${locale}/#services`) },
    { 
      label: navigationContent.data.stories, 
      href: getAssetPath(`/${locale}/#${locale === 'en' ? 'success-stories' : locale === 'pt' ? 'casos-sucesso' : 'casos-exito'}`) 
    },
    { label: navigationContent.data.academy, href: getAssetPath(`/${locale}/academia`) },
    { label: navigationContent.data.careers, href: getAssetPath(`/${locale}/carreras`) },
  ] : defaultNavigation;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Desktop */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 lg:h-20">
            {/* Logo */}
            <HomeLink 
              locale={locale}
              className="flex items-center"
            >
              <Image
                src={getAssetPath("novit-logo-official.png")}
                alt="Novit Software"
                width={120}
                height={40}
                className="h-8 w-auto lg:h-10"
                priority
              />
            </HomeLink>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                if (item.isHome) {
                  return (
                    <HomeLink
                      key={item.href}
                      locale={locale}
                      href={item.href}
                      className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-novit-accent transition-all duration-300 group-hover:w-full" />
                    </HomeLink>
                  );
                }
                
                return (
                  <TransitionLink
                    key={item.href}
                    href={item.href}
                    className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-novit-accent transition-all duration-300 group-hover:w-full" />
                  </TransitionLink>
                );
              })}
            </nav>

            {/* CTA Button and Language Switcher Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsPremiumQuoteOpen(true)}
                className="bg-gradient-novit-accent text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {navigationContent?.data.quote || 'Necesito un presupuesto'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => {
                if (item.isHome) {
                  return (
                    <HomeLink
                      key={item.href}
                      locale={locale}
                      href={item.href}
                      className="block text-white/90 hover:text-white font-medium py-2 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </HomeLink>
                  );
                }
                
                return (
                  <TransitionLink
                    key={item.href}
                    href={item.href}
                    className="block text-white/90 hover:text-white font-medium py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </TransitionLink>
                );
              })}
              <div className="border-t border-slate-700 pt-4">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => {
                  setIsPremiumQuoteOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block bg-gradient-novit-accent text-white px-6 py-3 rounded-full font-medium text-center mt-6 cursor-pointer w-full"
              >
                {navigationContent?.data.quote || 'Necesito un presupuesto'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2">
          {navigation.slice(0, 5).map((item) => {
            if (item.isHome) {
              return (
                <HomeLink
                  key={item.href}
                  locale={locale}
                  href={item.href}
                  className="flex flex-col items-center p-2 text-xs font-medium text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-6 h-6 mb-1 flex items-center justify-center">
                    {/* Aquí puedes agregar iconos específicos para cada navegación */}
                    <div className="w-2 h-2 bg-current rounded-full" />
                  </div>
                  <span className="text-[10px] leading-none">
                    {item.label.split(' ')[0]}
                  </span>
                </HomeLink>
              );
            }
            
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                className="flex flex-col items-center p-2 text-xs font-medium text-white/80 hover:text-white transition-colors"
              >
                <div className="w-6 h-6 mb-1 flex items-center justify-center">
                  {/* Aquí puedes agregar iconos específicos para cada navegación */}
                  <div className="w-2 h-2 bg-current rounded-full" />
                </div>
                <span className="text-[10px] leading-none">
                  {item.label.split(' ')[0]}
                </span>
              </TransitionLink>
            );
          })}
        </div>
      </nav>

      {/* Premium Quote Modal */}
      <PremiumQuoteModal 
        isOpen={isPremiumQuoteOpen}
        onClose={() => setIsPremiumQuoteOpen(false)}
      />
    </>
  );
}
