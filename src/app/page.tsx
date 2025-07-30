import LocaleDetector from '@/components/LocaleDetector';

// This page only renders when the app is built statically (output: 'export')
// It performs client-side locale detection and redirects to the appropriate language
export default function RootPage() {
  return <LocaleDetector />;
}