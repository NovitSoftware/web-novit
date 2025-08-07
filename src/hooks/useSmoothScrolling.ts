'use client';

import { useEffect } from 'react';

export function useSmoothScrolling() {
  useEffect(() => {
    // Ensure smooth scrolling is enabled in CSS
    const ensureSmoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

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
            // Ensure smooth scrolling is enabled
            ensureSmoothScroll();
            
            // Use scrollIntoView with smooth behavior
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

    // Handle initial page load with hash
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Ensure smooth scrolling is available
        ensureSmoothScroll();
        
        // Wait a bit longer for the page to fully load and render
        setTimeout(() => {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 300); // Increased delay to ensure DOM is ready
      }
    };

    // Initialize smooth scrolling immediately
    ensureSmoothScroll();

    // Handle clicks on anchor links
    document.addEventListener('click', handleAnchorClick);
    
    // Handle hash on page load with multiple trigger points
    if (document.readyState === 'complete') {
      handleInitialHash();
    } else {
      window.addEventListener('load', handleInitialHash);
      // Also try on DOMContentLoaded for faster response
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(handleInitialHash, 100);
        });
      }
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', handleInitialHash);
    };
  }, []);
}