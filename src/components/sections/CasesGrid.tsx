'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useAnimations';
import { useTranslations, useLocale } from 'next-intl';
import { CaseStudy } from '@/types';
import { CasesHeaderContent, StoryContent } from '@/lib/contentLoader';

import { ArrowUpRight, Tag } from 'lucide-react';
import { calculateYearsOfExperience } from '@/utils/experience';
import { getAssetPath } from '@/config/constants';
import BackgroundVideo from '@/components/ui/BackgroundVideo';

// Function to convert StoryContent to CaseStudy format
function storyToCaseStudy(story: StoryContent): CaseStudy {
  return {
    id: story.slug,
    titleKey: story.data.title, // Use direct title from markdown
    descriptionKey: story.data.description, // Use direct description from markdown
    client: story.data.client,
    image: story.data.image,
    logoImage: story.data.logoImage,
    screenshotImage: story.data.screenshotImage,
    tags: story.data.tags || [],
    year: parseInt(story.data.date) || new Date().getFullYear(),
    hasDetailPage: true,
  };
}

function CaseCard({ caseStudy, index, locale: localeParam, headerContent }: { 
  caseStudy: CaseStudy; 
  index: number; 
  locale?: string;
  headerContent?: CasesHeaderContent | null;
}) {
  const t = useTranslations();
  const localeFromHook = useLocale();
  // Use the prop locale if provided, otherwise fall back to useLocale hook
  const locale = localeParam || localeFromHook;
  const { ref: cardRef, isVisible } = useScrollAnimation();
  const [showScreenshot, setShowScreenshot] = useState(false);

  return (
    <div
      ref={cardRef as any}
      className={`group bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-700 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
        }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div
        className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 cursor-pointer"
        onMouseEnter={() => setShowScreenshot(true)}
        onMouseLeave={() => setShowScreenshot(false)}
        onTouchStart={() => setShowScreenshot(!showScreenshot)}
      >
        {/* Logo Image */}
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${showScreenshot ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}>
          <Image
            src={getAssetPath(caseStudy.logoImage || caseStudy.image)}
            alt={`${caseStudy.client} logo`}
            fill
            className="object-contain p-6"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            }}
          />
        </div>

        {/* Screenshot Image */}
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${showScreenshot ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
          <Image
            src={getAssetPath(caseStudy.screenshotImage || caseStudy.image)}
            alt={`${caseStudy.client} screenshot`}
            fill
            className="object-contain p-4"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />

      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gradient-novit-accent text-white text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Client and Title */}
        <div className="mb-4">
          <p className="text-accent-cyan font-semibold text-sm mb-2">
            {caseStudy.client}
          </p>
          <h3 className="text-white font-bold text-xl leading-tight mb-3">
            {caseStudy.titleKey}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {caseStudy.descriptionKey}
          </p>
        </div>

        {/* Results Section for Featured Cases */}
        {caseStudy.results && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-600">
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.results.slice(0, 2).map((result, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-accent-cyan font-bold text-lg">
                    {result.value}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {t(result.metricKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Action Button */}
        <div className="flex justify-end">
          <Link
            href={getAssetPath(`/${locale}/casos-exito/${caseStudy.id}`)}
            className="inline-flex items-center bg-gradient-novit-accent text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {headerContent?.data.view_case || 'Ver caso completo'}
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

    </div>
  );
}

interface CasesGridProps {
  locale?: string;
  headerContent?: CasesHeaderContent | null;
  storiesContent?: StoryContent[];
}

export default function CasesGrid({ locale: localeParam, headerContent, storiesContent }: CasesGridProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const localeFromHook = useLocale();
  // Use the prop locale if provided, otherwise fall back to useLocale hook
  const locale = localeParam || localeFromHook;
  
  // Convert stories content to cases format
  const cases: CaseStudy[] = storiesContent ? storiesContent.map(story => storyToCaseStudy(story)) : [];
  
  // Dynamic section ID based on locale for better SEO and navigation
  const sectionId = locale === 'en' ? 'success-stories' : 
                   locale === 'pt' ? 'casos-sucesso' : 
                   'casos-exito';

  // Fallback content if not loaded
  if (!headerContent) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-slate-800">
        <div className="text-gray-300">Cargando casos...</div>
      </section>
    );
  }

  return (
    <BackgroundVideo
      pageName="cases"
      className="py-20 lg:py-32"
      overlayOpacity={0.85}
    >
      <section
        id={sectionId}
        ref={sectionRef as any}        className="relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-novit-accent rounded-2xl mb-6">
            <Tag className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
            {headerContent.data.section_title.split(' ').map((word, index) =>
              index === headerContent.data.section_title.split(' ').length - 1 ? (
                <span key={index} className="gradient-text">{word}</span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {headerContent.data.section_description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { number: '50+', label: headerContent.data.stats.projects },
            { number: '35+', label: headerContent.data.stats.clients },
            { number: '8+', label: headerContent.data.stats.countries },
            { number: calculateYearsOfExperience(), label: headerContent.data.stats.experience },

          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Cases Grid - Clean Grid Layout (not masonry) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} index={index} locale={locale} headerContent={headerContent} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      </section>
    </BackgroundVideo>
  );
}