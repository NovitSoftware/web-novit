import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novit Software - Soluciones digitales integrales',
  description: 'Novit Software ofrece soluciones digitales integrales: desarrollo web, aplicaciones móviles, automatización de procesos y mucho más.',
};

// Root page that immediately redirects based on language preference
export default function RootPage() {
  // Determine base path for redirects - this will be replaced at build time
  const basePath = process.env.NODE_ENV === 'production' && process.env.DEPLOY_TARGET === 'github-pages' ? '/web-novit' : '';
  
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/es`} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Immediate language detection before page loads
            (function() {
              // Detect if we're running on GitHub Pages based on hostname
              const isGitHubPages = window.location.hostname === 'novitsoftware.github.io';
              const basePath = isGitHubPages ? '/web-novit' : '';
              
              const stored = localStorage.getItem('preferred-locale');
              if (stored && ['en', 'pt'].includes(stored)) {
                window.location.replace(basePath + '/' + stored);
                return;
              }
              
              const languages = navigator.languages || [navigator.language];
              for (const lang of languages) {
                const code = lang.split('-')[0].toLowerCase();
                if (code === 'en' || code === 'pt') {
                  localStorage.setItem('preferred-locale', code);
                  window.location.replace(basePath + '/' + code);
                  return;
                }
              }
              
              // Default to Spanish
              localStorage.setItem('preferred-locale', 'es');
              window.location.replace(basePath + '/es');
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
          <h1>Novit Software</h1>
          <p>Redirigiendo... / Redirecting... / Redirecionando...</p>
          <div style={{ marginTop: '2rem' }}>
            <span>Selecciona idioma: </span>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href={`${basePath}/es`} style={{ margin: '0 0.5rem', color: '#3b82f6', textDecoration: 'underline' }}>Español</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href={`${basePath}/en`} style={{ margin: '0 0.5rem', color: '#3b82f6', textDecoration: 'underline' }}>English</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href={`${basePath}/pt`} style={{ margin: '0 0.5rem', color: '#3b82f6', textDecoration: 'underline' }}>Português</a>
          </div>
        </div>
      </body>
    </html>
  );
}