'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    // Detect navigation direction based on URL patterns
    const isDetailPage = 
      pathname.includes('/casos-exito/') && pathname.split('/').length > 3 ||
      pathname.endsWith('/academia');
    
    const isHomePage = pathname.match(/^\/[a-z]{2}(\/)?$/);
    
    // Determine direction based on page type
    if (isDetailPage) {
      setDirection('forward'); // Going to detail page
    } else if (isHomePage) {
      setDirection('backward'); // Going back to home
    }

    // Only apply transition for page changes (not initial load)
    if (isDetailPage || (isHomePage && document.referrer)) {
      setIsTransitioning(true);
      
      const container = document.querySelector('[data-page-container]');
      if (container) {
        // Set initial state based on direction
        const initialTransform = direction === 'forward' ? 'translateX(100%)' : 'translateX(-100%)';
        
        (container as HTMLElement).style.transform = initialTransform;
        (container as HTMLElement).style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Trigger slide animation
        requestAnimationFrame(() => {
          (container as HTMLElement).style.transform = 'translateX(0)';
          
          // Clean up after animation
          setTimeout(() => {
            (container as HTMLElement).style.transition = '';
            (container as HTMLElement).style.transform = '';
            setIsTransitioning(false);
          }, 600);
        });
      }
    }
  }, [pathname, direction]);

  return (
    <div 
      data-page-container 
      className="relative w-full"
      style={{ 
        transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : undefined 
      }}
    >
      {children}
    </div>
  );
}

export function usePageTransition() {
  return { triggerTransition: () => {}, isTransitioning: false };
}