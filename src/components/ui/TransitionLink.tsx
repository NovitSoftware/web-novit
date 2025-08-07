'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({ 
  href, 
  children, 
  className = '', 
  onClick 
}: TransitionLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Asegurar que la URL actual tenga hash para activar transiciones en navegaciones futuras
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      if (!currentUrl.includes('#')) {
        window.history.replaceState(null, '', currentUrl + '#');
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  // Determinar si necesitamos agregar hash automáticamente
  const isAnchorLink = href.includes('#');
  const isExternalLink = href.startsWith('http') || href.startsWith('//');
  
  // Solo agregar hash si no es un enlace ancla y no es externo
  const processedHref = isAnchorLink || isExternalLink ? href : href + '#';

  return (
    <Link 
      href={processedHref} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
