'use client';

import { useEffect, useRef, useState } from 'react';

import { ArrowRight, Play } from 'lucide-react';
import { useScrollAnimation, useParallax } from '@/hooks/useAnimations';
import PremiumQuoteModal from '@/components/ui/PremiumQuoteModal';

export default function Hero() {
  const { ref: heroRef, isVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.3);
  const [isPremiumQuoteOpen, setIsPremiumQuoteOpen] = useState(false);


  return (
    <section
      ref={heroRef as any}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Background with Dark Theme Professional Look */}
      <div className="absolute inset-0 z-0">
        {/* Dark professional gradient background */}
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
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
            <span className="text-accent-cyan font-black drop-shadow-lg">
              software factory
            </span>{' '}
            que necesitás
          </h1>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Para que tus ideas se hagan realidad de forma{' '}
            <span className="text-accent-cyan font-semibold">simple</span> y{' '}
            <span className="text-accent-cyan font-semibold">práctica</span>
          </p>

          {/* Descripción */}
          <p className="text-lg lg:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            El partner tecnológico ideal para acompañar tu proceso de transformación digital
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <button 
              onClick={() => setIsPremiumQuoteOpen(true)}
              className="group bg-gradient-to-r from-accent-cyan to-secondary-500 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-transparent hover:border-white/30 cursor-pointer"
            >
              ⚡ Cotización Premium en 24hs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-transparent border-2 border-gray-300 text-gray-300 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-lg hover:bg-gray-300 hover:text-slate-900 transition-all duration-300 flex items-center gap-3 cursor-pointer">
              <Play className="w-5 h-5" />
              Ver nuestro trabajo
            </button>
          </div>
        </div>
      </div>

      {/* Elementos decorativos con parallax */}
      <div
        ref={parallaxRef as any}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {/* Círculos decorativos más sutiles */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl" />
        <div className="absolute top-1/3 right-16 w-48 h-48 bg-accent-cyan/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gray-400/10 rounded-full blur-lg" />
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

      {/* Premium Quote Modal */}
      <PremiumQuoteModal 
        isOpen={isPremiumQuoteOpen}
        onClose={() => setIsPremiumQuoteOpen(false)}
      />
    </section>
  );
}
