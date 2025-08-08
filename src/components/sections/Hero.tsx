'use client';

import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useScrollAnimation, useParallax } from '@/hooks/useAnimations';
import PremiumQuoteModal from '@/components/ui/PremiumQuoteModal';
import BackgroundVideo from '@/components/ui/BackgroundVideo';
import { HeroContent } from '@/lib/contentLoader';

interface HeroProps {
  content: HeroContent | null;
}

export default function Hero({ content }: HeroProps) {
  const { ref: heroRef, isVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.3);
  const [isPremiumQuoteOpen, setIsPremiumQuoteOpen] = useState(false);
  
  // Fallback content if not loaded
  if (!content) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="text-white">Cargando...</div>
      </section>
    );
  }

  const { data } = content;

  return (
    <div ref={heroRef as any}>
      <BackgroundVideo 
        pageName="home"
        className="min-h-screen flex items-center justify-center"
        overlayOpacity={0.95}
      >
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Título principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {data.title_part1}{' '}
              <span className="text-accent-cyan font-black drop-shadow-lg">
                {data.title_highlight}
              </span>{' '}
              {data.title_part2}
            </h1>

            {/* Subtítulo */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              {data.subtitle_part1}{' '}
              <span className="text-accent-cyan font-semibold">{data.subtitle_highlight1}</span>{' '}
              {data.subtitle_middle}{' '}
              <span className="text-accent-cyan font-semibold">{data.subtitle_highlight2}</span>
              {data.subtitle_part3 && ` ${data.subtitle_part3}`}
            </p>

            {/* Descripción */}
            <p className="text-lg lg:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              {data.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setIsPremiumQuoteOpen(true)}
                className="group bg-gradient-to-r from-accent-cyan to-secondary-500 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-transparent hover:border-white/30 cursor-pointer"
              >
                {data.cta_premium}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-transparent border-2 border-gray-300 text-gray-300 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-lg hover:bg-gray-300 hover:text-slate-900 transition-all duration-300 flex items-center gap-3 cursor-pointer">
                <Play className="w-5 h-5" />
                {data.cta_work}
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

        {/* Premium Quote Modal */}
        <PremiumQuoteModal 
          isOpen={isPremiumQuoteOpen}
          onClose={() => setIsPremiumQuoteOpen(false)}
        />
      </BackgroundVideo>
    </div>
  );
}
