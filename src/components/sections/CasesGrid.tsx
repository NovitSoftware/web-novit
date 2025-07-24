'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation, useImageEffect } from '@/hooks/useAnimations';
import { CaseStudy } from '@/types';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';

const cases: CaseStudy[] = [
  {
    id: 'consultatio-nordelta',
    title: 'Sistema de Gestión Inmobiliaria',
    client: 'Consultatio',
    description: 'Desarrollo de plataforma integral para gestión de proyectos inmobiliarios con más de 1000 propiedades.',
    image: '/images/cases/consultatio.svg',
    tags: ['Desarrollo Web', 'ERP'],
    year: 2024,
    hasDetailPage: true,
    results: [
      { metric: 'Reducción de tiempo', value: '60%' },
      { metric: 'Propiedades gestionadas', value: '1000+' },
      { metric: 'Usuarios activos', value: '200+' },
    ],
  },
  {
    id: 'nazca-brands',
    title: 'E-commerce de Lujo',
    client: 'Nazca Brands',
    description: 'Desarrollo de plataforma e-commerce para marcas de lujo con experiencia premium.',
    image: '/images/cases/nazca.svg',
    tags: ['E-commerce', 'UX/UI'],
    year: 2023,
    hasDetailPage: true,
    results: [
      { metric: 'Conversión mejorada', value: '45%' },
      { metric: 'Tiempo de carga', value: '<2s' },
    ],
  },
  {
    id: 'tecnovoz',
    title: 'Plataforma de Comunicaciones VoIP',
    client: 'Tecnovoz',
    description: 'Sistema de gestión de comunicaciones empresariales con integración VoIP y funcionalidades avanzadas.',
    image: '/images/cases/tecnovoz.svg',
    tags: ['VoIP', 'Comunicaciones'],
    year: 2023,
    hasDetailPage: false,
  },
  {
    id: 'indec',
    title: 'Sistema Estadístico Nacional',
    client: 'INDEC',
    description: 'Modernización de sistemas de recolección y procesamiento de datos estadísticos nacionales.',
    image: '/images/cases/indec.svg',
    tags: ['Data Science', 'Gobierno'],
    year: 2023,
    hasDetailPage: false,
  },
  {
    id: 'salas-bim',
    title: 'Aplicación BIM Web',
    client: 'Grupo Salas',
    description: 'Desarrollo de aplicación web para visualización y gestión de modelos BIM en proyectos de construcción.',
    image: '/images/cases/salas.svg',
    tags: ['BIM', 'Construcción'],
    year: 2024,
    hasDetailPage: true,
  },
  {
    id: 'eb-metrics',
    title: 'Plataforma de Analytics',
    client: 'EB Metrics',
    description: 'Sistema de análisis y métricas empresariales para optimización de procesos.',
    image: '/images/cases/consultatio.svg',
    tags: ['Analytics', 'Data Science'],
    year: 2023,
    hasDetailPage: false,
  },
  {
    id: 'gamma',
    title: 'Sistema de Gestión',
    client: 'Gamma',
    description: 'Plataforma integral de gestión empresarial con módulos especializados.',
    image: '/images/cases/nazca.svg',
    tags: ['ERP', 'Gestión'],
    year: 2023,
    hasDetailPage: false,
  },
];

function CaseCard({ caseStudy, index }: { caseStudy: CaseStudy; index: number }) {
  const { ref, isGrayscale, setIsHovered } = useImageEffect();
  const { ref: cardRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={cardRef as any}
      className={`group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 h-80 ${
        isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={caseStudy.image}
          alt={caseStudy.title}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            isGrayscale ? 'grayscale' : 'grayscale-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Top Section - Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {caseStudy.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Section - Main Content */}
        <div className="space-y-3">
          {/* Client */}
          <p className="text-accent-cyan font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
            {caseStudy.client}
          </p>

          {/* Title */}
          <h3 className="text-white font-bold text-xl group-hover:text-accent-cyan transition-colors duration-300 leading-tight">
            {caseStudy.title}
          </h3>

          {/* Description */}
          <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-200">
            {caseStudy.description}
          </p>

          {/* Bottom Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-white/60 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {caseStudy.year}
            </div>

            {caseStudy.hasDetailPage && (
              <Link
                href={`/casos-exito/${caseStudy.id}`}
                className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-accent-cyan hover:text-primary-500 transition-all duration-300 group/btn"
              >
                <ArrowUpRight className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              </Link>
            )}
          </div>

          {/* Results Preview - Solo para casos con página detalle */}
          {caseStudy.hasDetailPage && caseStudy.results && (
            <div className="mt-4 p-3 bg-black/30 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-300">
              <div className="grid grid-cols-2 gap-2 text-center">
                {caseStudy.results.slice(0, 2).map((result, idx) => (
                  <div key={idx}>
                    <div className="text-accent-cyan font-bold text-lg">
                      {result.value}
                    </div>
                    <div className="text-white/60 text-xs">
                      {result.metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-novit opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </div>
  );
}

export default function CasesGrid() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={sectionRef as any}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-novit rounded-2xl mb-6">
            <Tag className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Casos de <span className="gradient-text">Éxito</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conocé algunos de los proyectos que hemos desarrollado y cómo hemos 
            ayudado a nuestros clientes a alcanzar sus objetivos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { number: '50+', label: 'Proyectos completados' },
            { number: '35+', label: 'Clientes satisfechos' },
            { number: '31+', label: 'Países alcanzados' },
            { number: '8+', label: 'Años de experiencia' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Cases Grid - Improved Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((caseStudy, index) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/casos-exito"
            className="inline-flex items-center bg-gradient-novit text-white px-8 py-4 lg:px-10 lg:py-5 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Ver todos los casos de éxito
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </Link>
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
  );
}
