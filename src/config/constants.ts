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
  
  // Para rutas con hash (#), mantener la estructura correcta
  if (normalizedPath.includes('#')) {
    const [pathname, hash] = normalizedPath.split('#');
    // No aplicar base path durante build de GitHub Pages, Next.js ya lo maneja
    // Solo aplicar en desarrollo o cuando no estamos en modo build
    const basePath = (isGitHubPagesBuild && typeof window === 'undefined') ? '' : (isGitHubPagesBuild ? '/web-novit' : '');
    return `${basePath}${pathname}#${hash}`;
  }
  
  // No aplicar base path durante build de GitHub Pages, Next.js ya lo maneja  
  // Solo aplicar en desarrollo o cuando no estamos en modo build
  const basePath = (isGitHubPagesBuild && typeof window === 'undefined') ? '' : (isGitHubPagesBuild ? '/web-novit' : '');
  return `${basePath}${normalizedPath}`;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Legacy compatibility
export const BASE_PATH = isGitHubPagesBuild ? '/web-novit' : '';