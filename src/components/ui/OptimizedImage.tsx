import { getImagePath } from '@/config/constants';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

export function OptimizedImage({ src, alt, className, ...props }: OptimizedImageProps) {
  // Si la src ya incluye http o ya tiene el prefijo, no modificar
  const imageSrc = src.startsWith('http') || src.startsWith('/web-novit') 
    ? src 
    : getImagePath(src.startsWith('/') ? src.slice(1) : src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
