'use client';

import { useEffect, useRef, useState } from 'react';
import { getAssetPath } from '@/config/constants';

interface BackgroundVideoProps {
  children: React.ReactNode;
  videoSrc?: string;
  pageName?: string; // New prop for automatic video detection
  posterSrc?: string;
  className?: string;
  overlayOpacity?: number;
}

export default function BackgroundVideo({ 
  children, 
  videoSrc,
  pageName,
  posterSrc,
  className = '',
  overlayOpacity = 0.7 // Reduced default for better lighting effect visibility
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoExists, setVideoExists] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallbackImage, setFallbackImage] = useState<string | null>(null);

  // Auto-generate video source based on pageName if videoSrc not provided
  const finalVideoSrc = videoSrc || (pageName ? `/video/hero-${pageName}.mp4` : null);
  // Auto-generate fallback image source based on pageName
  const fallbackImageSrc = pageName ? getAssetPath(`/images/hero-${pageName}.png`) : null;

  useEffect(() => {
    const checkVideoExists = async () => {
      if (!finalVideoSrc) {
        if (fallbackImageSrc) {
          setFallbackImage(fallbackImageSrc);
        }
        setVideoExists(false);
        return;
      }
      
      try {
        const response = await fetch(getAssetPath(finalVideoSrc), { method: 'HEAD' });
        if (response.ok) {
          setVideoExists(true);
          setFallbackImage(null);
        } else {
          // Video 404, use fallback image
          setVideoExists(false);
          if (fallbackImageSrc) {
            setFallbackImage(fallbackImageSrc);
          }
        }
      } catch (error) {
        setVideoExists(false);
        if (fallbackImageSrc) {
          setFallbackImage(fallbackImageSrc);
        }
      }
    };

    checkVideoExists();
  }, [finalVideoSrc, fallbackImageSrc]);

  const handleVideoError = () => {
    setVideoExists(false);
    setIsLoaded(false);
    if (fallbackImageSrc) {
      setFallbackImage(fallbackImageSrc);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoExists) {
      const handleCanPlay = () => {
        setIsLoaded(true);
        video.play().catch(error => {
          console.log('Video autoplay failed:', error);
        });
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleVideoError);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleVideoError);
      };
    }
  }, [videoExists]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Video Background - render at lowest layer */}
      {videoExists && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          poster={posterSrc ? getAssetPath(posterSrc) : undefined}
        >
          <source src={getAssetPath(finalVideoSrc!)} type="video/mp4" />
        </video>
      )}

      {/* Fallback background when no video */}
      {!videoExists && !fallbackImage && (
        <div className="absolute inset-0">
          {/* Dark professional gradient background */}
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        </div>
      )}

      {/* Fallback image background when no video but image exists */}
      {!videoExists && fallbackImage && (
        <div className="absolute inset-0">
          <img
            src={fallbackImage}
            alt="Background"
            className="w-full h-full object-cover"
            onError={() => {
              setFallbackImage(null);
            }}
          />
        </div>
      )}

      {/* Text readability overlay - when video OR image exists */}
      {(videoExists || fallbackImage) && (
        <div 
          className="absolute inset-0 z-10" 
          style={{ opacity: videoExists ? overlayOpacity : 0.8 }}
        >
          {/* Exact same background as fallback - replicate the no-video state */}
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          
          {/* Replicate the same lighting effects that appear in fallback */}
          <div className="absolute inset-0">
            {/* Same accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/10 to-accent-cyan/20" />
            
            {/* Same grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px'
                }}
              />
            </div>

            {/* Same floating particles */}
            <div className="absolute inset-0 opacity-30">
              <div className="particles-container">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${4 + Math.random() * 6}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Always render lighting effects over video/background - but only when no video overlay */}
      {!videoExists && !fallbackImage && (
        <div className="absolute inset-0 z-10">
          {/* Subtle accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/10 to-accent-cyan/20" />
          
          {/* Professional grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          {/* Subtle animated particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="particles-container">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${4 + Math.random() * 6}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>

      {/* Styles for particles animation */}
      <style jsx>{`
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #3b82f6;
          border-radius: 50%;
          animation: float infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}
