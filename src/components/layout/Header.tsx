'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { getAssetPath } from '@/config/constants';
import PremiumQuoteModal from '@/components/ui/PremiumQuoteModal';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPremiumQuoteOpen, setIsPremiumQuoteOpen] = useState(false);
  
  const t = useTranslations('navigation');
  const locale = useLocale();

  const navigation = [
    { label: t('home'), href: `/${locale}` },
    { label: t('services'), href: `/${locale}/servicios` },
    { label: t('cases'), href: `/${locale}/casos-exito` },
    { label: t('technologies'), href: `/${locale}/tecnologias` },
    { label: t('academy'), href: `/${locale}/academia` },
    { label: t('contact'), href: `/${locale}/contacto` },
  ];

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
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src={getAssetPath("novit-logo-official.png")}
                alt="NOVIT Software"
                width={120}
                height={40}
                className="h-8 w-auto lg:h-10"
                priority
              />
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-novit-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* CTA Button and Language Switcher Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsPremiumQuoteOpen(true)}
                className="bg-gradient-novit-accent text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {t('quote')}
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
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white/90 hover:text-white font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
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
                {t('quote')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2">
          {navigation.slice(0, 5).map((item) => (
            <Link
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
            </Link>
          ))}
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
