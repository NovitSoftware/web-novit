'use client';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  // Simple container without complex transitions that break navigation
  return (
    <div className="relative w-full">
      {children}
    </div>
  );
}

export function usePageTransition() {
  return { triggerTransition: () => {}, isTransitioning: false };
}