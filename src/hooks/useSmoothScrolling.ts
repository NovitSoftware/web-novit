'use client';

import { useEffect } from 'react';

export function useSmoothScrolling() {
  useEffect(() => {
    // Ensure smooth scrolling is enabled globally
    const ensureSmoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    };

    const smoothScrollTo = (targetElement: Element) => {
      // Force smooth scrolling even if CSS is overridden
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    };

    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        const hash = url.hash;
        
        // Check if this is an anchor link (same origin)
        if (hash && url.origin === window.location.origin) {
          const isCurrentPage = url.pathname === window.location.pathname;
          
          if (isCurrentPage) {
            // Same page anchor - handle with smooth scroll
            e.preventDefault();
            
            // Manejar #home como scroll al top
            if (hash === '#home') {
              ensureSmoothScroll();
              requestAnimationFrame(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              });
              history.pushState(null, '', url.href);
              return;
            }
            
            // Para otros hashes, buscar el elemento
            const targetElement = document.querySelector(hash);
            if (targetElement) {
              ensureSmoothScroll();
              
              // Small delay to ensure any page transitions don't interfere
              requestAnimationFrame(() => {
                smoothScrollTo(targetElement);
              });
              
              // Update URL without page reload
              history.pushState(null, '', url.href);
            }
          } else {
            // Different page - let it navigate and handle hash after load
            // No preventDefault here to allow normal navigation
          }
        }
      }
    };

    // Handle initial page load with hash
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        ensureSmoothScroll();
        
        // Manejar #home como scroll al top
        if (hash === '#home') {
          const tryScrollToTop = (delay: number) => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }, delay);
          };

          tryScrollToTop(100);
          tryScrollToTop(300);
          return;
        }
        
        // Para otros hashes, progressive delays to handle various loading states
        const tryScroll = (delay: number) => {
          setTimeout(() => {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
              smoothScrollTo(targetElement);
            }
          }, delay);
        };

        // Try multiple times with increasing delays
        tryScroll(100);  // Quick try
        tryScroll(300);  // After images might load
        tryScroll(500);  // After all content settles
      }
    };

    // Initialize immediately
    ensureSmoothScroll();

    // Enhanced event listeners
    document.addEventListener('click', handleAnchorClick, { passive: false });
    
    // Handle various loading states
    if (document.readyState === 'complete') {
      handleInitialHash();
    } else {
      window.addEventListener('load', handleInitialHash);
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(handleInitialHash, 50);
      });
    }

    // Also listen for hash changes from browser navigation
    const handleHashChange = () => {
      setTimeout(handleInitialHash, 50);
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', handleInitialHash);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}