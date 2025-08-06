'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionContextType {
  triggerTransition: (direction: 'forward' | 'back') => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'back'>('forward');
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerTransition = (direction: 'forward' | 'back') => {
    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    setTransitionDirection(direction);
    setIsTransitioning(true);
    
    // Reset transition after animation completes
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    // Skip initial load
    if (previousPathname.current === pathname) {
      return;
    }

    // Detect navigation direction based on URL patterns
    const isDetailPage = (path: string) => 
      path.includes('/casos-exito/') && path.split('/').length > 3 ||
      path.includes('/academia');
    
    const isHomePage = (path: string) => 
      path.split('/').length <= 2 || path.endsWith('#cases') || path.endsWith('#services');

    const current = pathname;
    const previous = previousPathname.current;

    if (isDetailPage(current) && !isDetailPage(previous)) {
      // Going to detail page (forward)
      triggerTransition('forward');
    } else if (isHomePage(current) && isDetailPage(previous)) {
      // Going back to home/section (back)
      triggerTransition('back');
    } else if (current !== previous) {
      // Default for other navigations
      triggerTransition('forward');
    }
    
    previousPathname.current = pathname;
  }, [pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PageTransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
      <div 
        className={`page-transition-container ${
          isTransitioning 
            ? transitionDirection === 'forward' 
              ? 'page-enter page-enter-active' 
              : 'page-back-enter page-back-enter-active'
            : ''
        }`}
      >
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
}