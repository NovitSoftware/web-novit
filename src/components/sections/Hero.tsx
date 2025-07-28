'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useScrollAnimation, useParallax } from '@/hooks/useAnimations';
import PremiumQuoteModal from '@/components/ui/PremiumQuoteModal';

export default function Hero() {
  const { ref: heroRef, isVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPremiumQuoteOpen, setIsPremiumQuoteOpen] = useState(false);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.play().catch(() => {
  //       // Fallback si el video no puede reproducirse automáticamente
  //     });
  //   }
  // }, []);

  return (
    <section
      ref={heroRef as any}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video o Gradient de fallback */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient background */}
        <div className="w-full h-full bg-gradient-novit" />
        
        {/* Video Background - comentado hasta tener el video */}
        {/* <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video> */}
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/60 via-primary-500/40 to-transparent" />
        
        {/* Patrón de partículas animado */}
        <div className="absolute inset-0 opacity-20">
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            La{' '}
            <span className="bg-gradient-to-r from-accent-cyan to-secondary-500 bg-clip-text text-transparent">
              software factory
            </span>{' '}
            que necesitás
          </h1>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Para que tus ideas se hagan realidad de forma{' '}
            <span className="text-accent-cyan font-semibold">simple</span> y{' '}
            <span className="text-accent-cyan font-semibold">práctica</span>
          </p>

          {/* Descripción */}
          <p className="text-lg lg:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            El partner tecnológico ideal para acompañar tu proceso de transformación digital
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsPremiumQuoteOpen(true)}
              className="group bg-gradient-to-r from-accent-cyan to-secondary-500 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-transparent hover:border-white/30"
            >
              ⚡ Cotización Premium en 24hs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white text-primary-500 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
              Contanos sobre tu proyecto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-transparent border-2 border-white text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-500 transition-all duration-300 flex items-center gap-3">
              <Play className="w-5 h-5" />
              Ver nuestro trabajo
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Elementos decorativos con parallax */}
      <div
        ref={parallaxRef as any}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {/* Círculos decorativos */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-accent-cyan/10 rounded-full blur-xl" />
        <div className="absolute top-1/3 right-16 w-48 h-48 bg-secondary-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg" />
      </div>

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
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: float infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Premium Quote Modal */}
      <PremiumQuoteModal 
        isOpen={isPremiumQuoteOpen}
        onClose={() => setIsPremiumQuoteOpen(false)}
      />
    </section>
  );
}
