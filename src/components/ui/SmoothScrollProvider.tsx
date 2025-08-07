'use client';

import { useSmoothScrolling } from '@/hooks/useSmoothScrolling';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScrolling();
  return <>{children}</>;
}