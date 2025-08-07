'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple fade-in animation for page changes
    setIsVisible(false);
    
    // Small delay to allow for smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div 
      className={`relative w-full transition-opacity duration-300 ease-in-out ${
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