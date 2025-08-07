'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade-out transition
    setIsVisible(false);
    
    // After fade-out completes, fade back in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250); // Longer delay to make fade effect more visible

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div 
      className={`relative w-full transition-opacity duration-500 ease-in-out ${
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