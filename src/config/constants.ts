/**
 * Application configuration constants
 */

// Detectar si estamos en build de producción para GitHub Pages
const isGitHubPagesBuild = process.env.DEPLOY_TARGET === 'github-pages';

/**
 * Detectar si estamos en GitHub Pages en runtime
 */
function isGitHubPagesRuntime(): boolean {
  // En el servidor (build time), usar la variable de entorno
  if (typeof window === 'undefined') {
    return isGitHubPagesBuild;
  }
  
  // En el cliente (runtime), detectar por la URL
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
  
  // Para rutas con hash (#), mantener la estructura correcta
  if (normalizedPath.includes('#')) {
    const [pathname, hash] = normalizedPath.split('#');
    const basePath = isGitHubPagesRuntime() ? '/web-novit' : '';
    return `${basePath}${pathname}#${hash}`;
  }
  
  // Detectar si necesitamos agregar el prefix tanto en build como en runtime
  return isGitHubPagesRuntime() ? `/web-novit${normalizedPath}` : normalizedPath;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Legacy compatibility
export const BASE_PATH = isGitHubPagesBuild ? '/web-novit' : '';