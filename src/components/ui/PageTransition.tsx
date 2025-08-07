'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasInitializedHash, setHasInitializedHash] = useState(false);

  useEffect(() => {
    // En la primera carga, redirigir a #home si estamos en la página principal
    if (isInitialLoad && !hasInitializedHash) {
      const currentUrl = window.location.href;
      const currentHash = window.location.hash;
      const isHomePage = /\/[a-z]{2}\/?$/.test(pathname); // Detecta páginas como /es, /en, etc.
      
      if (isHomePage) {
        // Si estamos en home sin hash o con hash diferente a #home, redirigir a #home
        if (!currentHash || currentHash !== '#home') {
          // Detect basePath for GitHub Pages
          const isGitHubPages = window.location.hostname === 'novitsoftware.github.io';
          const basePath = isGitHubPages ? '/web-novit' : '';
          const newUrl = window.location.origin + basePath + pathname + '/#home';
          window.location.replace(newUrl);
          return;
        }
      } else {
        // Para otras páginas, agregar hash genérico si no existe
        if (!currentHash) {
          window.history.replaceState(null, '', currentUrl + '#');
        }
      }
      
      setHasInitializedHash(true);
      setIsInitialLoad(false);
      setIsVisible(true);
      return;
    }

    // Para navegaciones subsecuentes, hacer la transición
    if (!isInitialLoad) {
      setIsVisible(false);
      setKey(prev => prev + 1);
      
      // Fade in después de un delay más corto para mejor UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad, hasInitializedHash]);

  return (
    <div 
      key={key}
      className={`relative w-full transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

export function usePageTransition() {
  return { triggerTransition: () => {}, isTransitioning: false };
}