import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOVIT Software - Soluciones digitales integrales',
  description: 'NOVIT Software ofrece soluciones digitales integrales: desarrollo web, aplicaciones móviles, automatización de procesos y mucho más.',
};

// Root page that immediately redirects based on language preference
export default function RootPage() {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="refresh" content="0; url=/es" />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Immediate language detection before page loads
            (function() {
              const stored = localStorage.getItem('preferred-locale');
              if (stored && ['en', 'ca', 'pt'].includes(stored)) {
                window.location.replace('/' + stored);
                return;
              }
              
              const languages = navigator.languages || [navigator.language];
              for (const lang of languages) {
                const code = lang.split('-')[0].toLowerCase();
                if (code === 'en' || code === 'ca' || code === 'pt') {
                  localStorage.setItem('preferred-locale', code);
                  window.location.replace('/' + code);
                  return;
                }
              }
              
              // Default to Spanish
              localStorage.setItem('preferred-locale', 'es');
              window.location.replace('/es');
            })();
          `
        }} />
      </head>
      <body>
        {/* Fallback content for users with JavaScript disabled */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1>NOVIT Software</h1>
          <p>Redirigiendo... / Redirecting... / Redirecionando...</p>
          <div style={{ marginTop: '2rem' }}>
            <span>Selecciona idioma: </span>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/es" style={{ margin: '0 0.5rem', color: '#3b82f6', textDecoration: 'underline' }}>Español</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/en" style={{ margin: '0 0.5rem', color: '#3b82f6', textDecoration: 'underline' }}>English</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/ca" style={{ margin: '0 0.5rem', color: '#3b82f6', textDecoration: 'underline' }}>Català</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/pt" style={{ margin: '0 0.5rem', color: '#3b82f6', textDecoration: 'underline' }}>Português</a>
          </div>
        </div>
      </body>
    </html>
  );
}