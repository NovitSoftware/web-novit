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
  
  // Usar variable de entorno para determinar si agregar prefix
  return isGitHubPagesBuild ? `/web-novit${normalizedPath}` : normalizedPath;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Legacy compatibility
export const BASE_PATH = isGitHubPagesBuild ? '/web-novit' : '';