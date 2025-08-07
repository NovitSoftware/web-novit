'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface HomeLinkProps {
  locale: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function HomeLink({ 
  locale, 
  children, 
  className = '', 
  onClick 
}: HomeLinkProps) {
  const pathname = usePathname();
  
  const handleClick = (e: React.MouseEvent) => {
    // Verificar si ya estamos en la página home
    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    const targetUrl = `/${locale}/#home`;
    
    if (isHomePage) {
      // Si estamos en home, hacer scroll suave hacia arriba SIN cambiar URL
      e.preventDefault();
      
      // Si no estamos ya en #home, navegar a #home
      if (currentHash !== '#home') {
        window.location.href = targetUrl;
        return;
      }
      
      // Si ya estamos en #home, solo hacer scroll suave
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
    } else {
      // Si no estamos en home, asegurar que tenga hash para transiciones
      if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        if (!currentUrl.includes('#')) {
          window.history.replaceState(null, '', currentUrl + '#');
        }
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link 
      href={`/${locale}/#home`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
