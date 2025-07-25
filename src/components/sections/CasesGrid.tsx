'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useAnimations';
import { CaseStudy } from '@/types';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';

const cases: CaseStudy[] = [
  {
    id: 'nazca-brands',
    title: 'Data analytics con IA para impulsar una app de fidelización en EE.UU.',
    client: 'Nazca Brands',
    description: 'Desarrollo de dashboards interactivos embebidos con KPIs estratégicos usando Power BI y Microsoft Copilot para análisis conversacional.',
    image: '/images/cases/nazca.svg',
    tags: ['Power BI', 'Microsoft Copilot'],
    year: 2024,
    hasDetailPage: true,
    results: [
      { metric: 'Integración exitosa', value: '100%' },
      { metric: 'Métricas en tiempo real', value: 'Activo' },
      { metric: 'Solución escalable', value: 'Nacional' },
    ],
  },
  {
    id: 'consultatio',
    title: 'Sistema de Gestión Inmobiliaria',
    client: 'Consultatio',
    description: 'Plataforma integral para gestión de proyectos inmobiliarios con análisis avanzado y dashboards de control.',
    image: '/images/cases/consultatio.svg',
    tags: ['Desarrollo Web', 'ERP'],
    year: 2024,
    hasDetailPage: true,
    results: [
      { metric: 'Propiedades gestionadas', value: '1000+' },
      { metric: 'Usuarios activos', value: '200+' },
      { metric: 'Reducción de tiempo', value: '60%' },
    ],
  },
  {
    id: 'ebmetrics',
    title: 'Plataforma de Analytics',
    client: 'EB Metrics',
    description: 'Sistema avanzado de análisis de datos y métricas empresariales para optimización de procesos de negocio.',
    image: '/images/cases/ebmetrics.svg',
    tags: ['Analytics', 'Data Science'],
    year: 2023,
    hasDetailPage: false,
  },
  {
    id: 'gamma',
    title: 'Sistema de Visualización de Datos',
    client: 'Gamma',
    description: 'Plataforma integral de dashboards y KPIs para análisis empresarial con visualizaciones interactivas avanzadas.',
    image: '/images/cases/gamma.svg',
    tags: ['Data Visualization', 'KPIs'],
    year: 2023,
    hasDetailPage: false,
  },
  {
    id: 'novopath',
    title: 'Aplicación de Gestión de Procesos',
    client: 'NovoPath',
    description: 'Desarrollo de aplicación empresarial para gestión y análisis de flujos de procesos internos y optimización.',
    image: '/images/cases/novopath.svg',
    tags: ['Gestión', 'Procesos'],
    year: 2023,
    hasDetailPage: false,
  },
  {
    id: 'salas-bim',
    title: 'Aplicación BIM Web',
    client: 'Grupo Salas',
    description: 'Desarrollo de aplicación web para visualización y gestión de modelos BIM en proyectos de construcción e infraestructura.',
    image: '/images/cases/salas.svg',
    tags: ['BIM', 'Construcción'],
    year: 2024,
    hasDetailPage: true,
  },
];

function CaseCard({ caseStudy, index }: { caseStudy: CaseStudy; index: number }) {
  const { ref: cardRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={cardRef as any}
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
        isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500">
        <Image
          src={caseStudy.image}
          alt={caseStudy.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105 p-8"
        />
        
        {/* Year Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center text-gray-700 text-sm font-medium">
            <Calendar className="w-3 h-3 mr-1" />
            {caseStudy.year}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {caseStudy.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full border border-primary-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Client Name */}
        <div className="text-accent-cyan font-bold text-lg">
          {caseStudy.client}
        </div>

        {/* Title */}
        <h3 className="text-gray-900 font-bold text-xl leading-tight">
          {caseStudy.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {caseStudy.description}
        </p>

        {/* Results Grid - Solo para casos con página detalle */}
        {caseStudy.hasDetailPage && caseStudy.results && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border">
            {caseStudy.results.slice(0, 2).map((result, idx) => (
              <div key={idx} className="text-center">
                <div className="text-primary-600 font-bold text-lg">
                  {result.value}
                </div>
                <div className="text-gray-500 text-xs font-medium">
                  {result.metric}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        {caseStudy.hasDetailPage && (
          <div className="pt-2">
            <Link
              href={`/casos-exito/${caseStudy.id}`}
              className="inline-flex items-center justify-center w-full bg-gradient-novit text-white px-4 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 group/btn"
            >
              Ver caso completo
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
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

        {/* Cases Grid - Clean Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}