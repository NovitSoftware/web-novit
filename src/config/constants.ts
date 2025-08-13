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
  
  // Next.js maneja automáticamente el basePath cuando está configurado
  // Solo necesitamos devolver el path normalizado y Next.js se encarga del resto
  return normalizedPath;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Legacy compatibility
export const BASE_PATH = isGitHubPagesBuild ? '/web-novit' : '';