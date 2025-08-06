import { ReactNode } from 'react';

interface CasosExitoLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function CasosExitoLayout({ children }: CasosExitoLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}