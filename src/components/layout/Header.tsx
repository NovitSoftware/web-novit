'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavigationItem } from '@/types';

const navigation: NavigationItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Qué hacemos', href: '/servicios' },
  { label: 'Casos de Éxito', href: '/casos-exito' },
  { label: 'Tecnologías', href: '/tecnologias' },
  { label: 'Academia Novit', href: '/academia' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-novit rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">N</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold gradient-text">
                NOVIT
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-novit transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/contacto"
                className="bg-gradient-novit text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Necesito un presupuesto
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 transition-colors"
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
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary-500 font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                className="block bg-gradient-novit text-white px-6 py-3 rounded-full font-medium text-center mt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Necesito un presupuesto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 sticky-nav safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2">
          {navigation.slice(0, 5).map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center p-2 text-xs font-medium text-gray-600 hover:text-primary-500 transition-colors"
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
    </>
  );
}
