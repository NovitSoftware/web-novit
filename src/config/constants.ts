/**
 * Application configuration constants
 */

// Base path for static deployment (GitHub Pages)
export const BASE_PATH = process.env.GITHUB_ACTIONS === 'true' ? '/web-novit' : '';

/**
 * Get the correct asset path with base path for deployment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to normalize
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return the path with base path if configured
  return BASE_PATH ? `${BASE_PATH}/${normalizedPath}` : `/${normalizedPath}`;
}