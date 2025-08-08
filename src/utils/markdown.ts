import { getAssetPath } from '@/config/constants';

export function processMarkdownImages(markdownContent: string): string {
  // Reemplazar todas las referencias de imágenes en markdown
  const processed = markdownContent.replace(
    /!\[([^\]]*)\]\(\/images\/([^)]+)\)/g,
    (match, altText, imagePath) => {
      const fullPath = getAssetPath(`/images/${imagePath}`);
      return `![${altText}](${fullPath})`;
    }
  );
  
  // También procesar referencias HTML de imágenes
  const processedHtml = processed.replace(
    /<img([^>]*)\ssrc="\/images\/([^"]+)"([^>]*)>/g,
    (match, beforeSrc, imagePath, afterSrc) => {
      const fullPath = getAssetPath(`/images/${imagePath}`);
      return `<img${beforeSrc} src="${fullPath}"${afterSrc}>`;
    }
  );
  
  return processedHtml;
}

// Para uso en componentes que renderizan markdown
export function useProcessedMarkdown(content: string): string {
  return processMarkdownImages(content);
}
