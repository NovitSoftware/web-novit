'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Add event listener for link clicks to intercept navigation
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && link.href.includes(window.location.origin)) {
        const href = link.getAttribute('href') || '';
        
        // Don't intercept hash links or external links
        if (href.startsWith('#') || href.startsWith('http') && !href.includes(window.location.origin)) {
          return;
        }

        e.preventDefault();
        
        // Detect navigation direction
        const currentPath = window.location.pathname;
        const isDetailPage = (path: string) => 
          path.includes('/casos-exito/') && path.split('/').length > 3 ||
          path.includes('/academia');
        
        let direction: 'forward' | 'back' = 'forward';
        
        if (isDetailPage(href) && !isDetailPage(currentPath)) {
          direction = 'forward';
        } else if (!isDetailPage(href) && isDetailPage(currentPath)) {
          direction = 'back';
        }
        
        // Create transition effect
        const body = document.body;
        const main = document.querySelector('main');
        
        if (main) {
          // Create a clone of the current page for the exit animation
          const exitPage = main.cloneNode(true) as HTMLElement;
          exitPage.style.position = 'fixed';
          exitPage.style.top = '0';
          exitPage.style.left = '0';
          exitPage.style.width = '100%';
          exitPage.style.zIndex = '1000';
          exitPage.style.background = '#0f172a';
          
          // Insert the clone
          body.appendChild(exitPage);
          
          // Hide the original main during transition
          main.style.opacity = '0';
          
          // Start exit animation
          exitPage.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          
          // Apply transform based on direction
          if (direction === 'forward') {
            exitPage.style.transform = 'translateX(-100%)';
          } else {
            exitPage.style.transform = 'translateX(100%)';
          }
          
          // Navigate after a short delay
          setTimeout(() => {
            router.push(href);
            
            // Clean up after navigation
            setTimeout(() => {
              if (body.contains(exitPage)) {
                body.removeChild(exitPage);
              }
              if (main) {
                main.style.opacity = '';
              }
            }, 100);
          }, 300);
        } else {
          // Fallback to normal navigation
          router.push(href);
        }
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router]);

  // Add entrance animation for new pages
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      // Detect if this is a detail page or home page
      const isDetailPage = pathname.includes('/casos-exito/') && pathname.split('/').length > 3 ||
                          pathname.includes('/academia');
      
      // Set initial position based on expected entrance direction
      main.style.transform = isDetailPage ? 'translateX(100%)' : 'translateX(-100%)';
      main.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // Animate to normal position
      setTimeout(() => {
        main.style.transform = 'translateX(0)';
        
        // Clean up transition after animation
        setTimeout(() => {
          main.style.transition = '';
          main.style.transform = '';
        }, 600);
      }, 50);
    }
  }, [pathname]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {children}
    </div>
  );
}

export function usePageTransition() {
  return { triggerTransition: () => {}, isTransitioning: false };
}