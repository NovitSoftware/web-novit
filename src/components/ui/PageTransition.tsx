'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Simple entrance animation for page changes
    const main = document.querySelector('main');
    if (main) {
      // Detect if this is a detail page (like cases or academia)
      const isDetailPage = 
        pathname.includes('/casos-exito/') && pathname.split('/').length > 3 ||
        pathname.includes('/academia') && pathname !== pathname.replace('/academia', '');
      
      // Only apply transition for detail pages
      if (isDetailPage) {
        // Set initial state for entrance animation
        main.style.opacity = '0';
        main.style.transform = 'translateX(30px)';
        main.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        
        // Trigger entrance animation
        requestAnimationFrame(() => {
          main.style.opacity = '1';
          main.style.transform = 'translateX(0)';
          
          // Clean up after animation
          setTimeout(() => {
            main.style.transition = '';
            main.style.transform = '';
            main.style.opacity = '';
          }, 300);
        });
      }
    }
  }, [pathname]);

  return (
    <div className="relative w-full">
      {children}
    </div>
  );
}

export function usePageTransition() {
  return { triggerTransition: () => {}, isTransitioning: false };
}