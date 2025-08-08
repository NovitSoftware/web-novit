/**
 * Application configuration constants
 */

// Detectar si estamos en build de producción para GitHub Pages
const isGitHubPagesBuild = process.env.DEPLOY_TARGET === 'github-pages';

/**
 * Detect if we're currently running on GitHub Pages (client-side detection)
 */
function isOnGitHubPages(): boolean {
  if (typeof window === 'undefined') {
    // Server-side: use build-time environment variable
    return isGitHubPagesBuild;
  }
  
  // Client-side: detect GitHub Pages by checking if URL contains /web-novit
  return window.location.pathname.startsWith('/web-novit');
}

/**
 * Get the correct asset path with base path for deployment
 */
export function getAssetPath(path: string): string {
  // Normalizar el path para que siempre comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Si el path ya incluye el basePath, no lo duplicamos
  if (normalizedPath.startsWith('/web-novit')) {
    return normalizedPath;
  }
  
  // Durante build time para GitHub Pages, Next.js maneja automáticamente el basePath
  // En el cliente, si ya estamos en GitHub Pages, no necesitamos agregar basePath
  // porque Next.js ya lo ha aplicado a las rutas
  const isGitHub = isOnGitHubPages();
  
  // Si estamos en build de GitHub Pages (server-side) o ya estamos en GitHub Pages (client-side),
  // no agregamos basePath porque Next.js ya lo maneja
  if (isGitHub) {
    return normalizedPath;
  }
  
  // Solo para desarrollo local u otros entornos que no sean GitHub Pages
  return normalizedPath;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Legacy compatibility
export const BASE_PATH = isGitHubPagesBuild ? '/web-novit' : '';