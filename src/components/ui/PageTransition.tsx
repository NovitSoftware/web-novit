'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface PageTransitionContextType {
  triggerTransition: (direction: 'forward' | 'back') => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'back'>('forward');
  const pathname = usePathname();
  const router = useRouter();
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
    }, 600);
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

  // Enhanced click handler to trigger visual transition
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href.includes(window.location.origin)) {
        e.preventDefault();
        
        const href = link.getAttribute('href') || '';
        const currentPath = window.location.pathname;
        
        // Detect direction
        const isDetailPage = (path: string) => 
          path.includes('/casos-exito/') && path.split('/').length > 3 ||
          path.includes('/academia');
        
        let direction: 'forward' | 'back' = 'forward';
        
        if (isDetailPage(href) && !isDetailPage(currentPath)) {
          direction = 'forward';
        } else if (!isDetailPage(href) && isDetailPage(currentPath)) {
          direction = 'back';
        }
        
        // Start visual transition
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.style.transform = direction === 'forward' ? 'translateX(-100%)' : 'translateX(100%)';
          mainElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          
          // Navigate after a short delay to allow animation to start
          setTimeout(() => {
            router.push(href);
            // Reset transform after navigation
            setTimeout(() => {
              if (mainElement) {
                mainElement.style.transform = '';
                mainElement.style.transition = '';
              }
            }, 100);
          }, 50);
        } else {
          // Fallback to normal navigation
          router.push(href);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router]);

  return (
    <PageTransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
      <div 
        className="relative w-full min-h-screen"
        style={{
          overflow: 'hidden'
        }}
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