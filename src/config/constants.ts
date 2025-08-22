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
  
  // Para GitHub Pages, necesitamos agregar el basePath para assets estáticos
  // tanto en build time como en runtime
  const isGitHub = isOnGitHubPages();
  
  if (isGitHub) {
    return `/web-novit${normalizedPath}`;
  }
  
  // Para desarrollo local u otros entornos
  return normalizedPath;
}

/**
 * Get the correct navigation path - should NOT include basePath as Next.js handles this automatically
 */
export function getNavigationPath(path: string): string {
  // Las rutas de navegación no necesitan basePath porque Next.js las maneja automáticamente
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedPath;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Legacy compatibility
export const BASE_PATH = isGitHubPagesBuild ? '/web-novit' : '';