// Detectar si estamos en GitHub Pages en tiempo de ejecución
function isGitHubPages(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'novitsoftware.github.io';
}

// Detectar si estamos en build de producción para GitHub Pages
function isGitHubPagesBuild(): boolean {
  return process.env.NODE_ENV === 'production' && process.env.DEPLOY_TARGET === 'github-pages';
}

export function getAssetPath(path: string): string {
  // Normalizar el path para que siempre comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // En cliente, usar detección en tiempo real
  if (typeof window !== 'undefined') {
    return isGitHubPages() ? `/web-novit${normalizedPath}` : normalizedPath;
  }
  
  // En servidor/build, usar variable de entorno
  return isGitHubPagesBuild() ? `/web-novit${normalizedPath}` : normalizedPath;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}

// Para usar en markdown o contenido estático
export function getStaticImagePath(imageName: string): string {
  // Esta función devuelve ambos paths para que podamos elegir en markdown
  const basePath = getImagePath(imageName);
  return basePath;
}
