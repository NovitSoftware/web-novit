/**
 * Application configuration constants
 */

// Detectar si estamos en build de producción para GitHub Pages
const isGitHubPagesBuild = process.env.DEPLOY_TARGET === 'github-pages';



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
  
  // Durante el build para GitHub Pages, Next.js ya maneja el basePath automáticamente
  // No debemos agregarlo manualmente para evitar duplicación
  if (typeof window === 'undefined' && isGitHubPagesBuild) {
    return normalizedPath;
  }
  
  // Para rutas con hash (#), mantener la estructura correcta
  if (normalizedPath.includes('#')) {
    const [pathname, hash] = normalizedPath.split('#');
    // Solo agregar basePath en runtime del cliente si estamos en GitHub Pages
    const shouldAddBasePath = typeof window !== 'undefined' && window.location.pathname.startsWith('/web-novit');
    const basePath = shouldAddBasePath ? '/web-novit' : '';
    return `${basePath}${pathname}#${hash}`;
  }
  
  // En runtime del cliente, detectar si necesitamos agregar el prefix
  const shouldAddBasePath = typeof window !== 'undefined' && window.location.pathname.startsWith('/web-novit');
  return shouldAddBasePath ? `/web-novit${normalizedPath}` : normalizedPath;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Legacy compatibility
export const BASE_PATH = isGitHubPagesBuild ? '/web-novit' : '';