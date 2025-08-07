'use client';

import { useEffect } from 'react';

export function useSmoothScrolling() {
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        const hash = url.hash;
        
        // Check if this is an anchor link on the same page
        if (hash && url.pathname === window.location.pathname) {
          e.preventDefault();
          
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            // Use JavaScript smooth scrolling for reliable behavior
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            
            // Update URL without triggering page reload
            history.pushState(null, '', url.href);
          }
        }
      }
    };

    // Handle clicks on anchor links
    document.addEventListener('click', handleAnchorClick);
    
    // Handle initial page load with hash
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait a bit for the page to fully load
        setTimeout(() => {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    };

    // Handle hash on page load
    if (document.readyState === 'complete') {
      handleInitialHash();
    } else {
      window.addEventListener('load', handleInitialHash);
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', handleInitialHash);
    };
  }, []);
}