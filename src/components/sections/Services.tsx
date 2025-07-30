'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, useGSAP } from '@/hooks/useAnimations';
import { useTranslations } from 'next-intl';
import { Service } from '@/types';
import { 
  Code2, 
  Brain, 
  Settings, 
  TestTube, 
  Palette, 
  BarChart3,
  ArrowRight 
} from 'lucide-react';

const services: Service[] = [
  {
    id: 'desarrollo-software',
    title: 'Desarrollo de Software',
    description: 'Soluciones tecnológicas a medida que transforman tu negocio y optimizan tus procesos.',
    icon: 'Code2',
    features: [
      'Aplicaciones web y móviles',
      'Sistemas de gestión empresarial',
      'APIs y microservicios',
      'Integración de sistemas'
    ],
  },
  {
    id: 'inteligencia-artificial',
    title: 'Inteligencia Artificial',
    description: 'Implementamos IA para automatizar procesos y generar insights valiosos para tu empresa.',
    icon: 'Brain',
    features: [
      'Machine Learning',
      'Procesamiento de lenguaje natural',
      'Computer Vision',
      'Chatbots inteligentes'
    ],
  },
  {
    id: 'consultoria-it',
    title: 'Consultoría IT',
    description: 'Asesoramiento estratégico para optimizar tu infraestructura tecnológica.',
    icon: 'Settings',
    features: [
      'Auditoría tecnológica',
      'Arquitectura de software',
      'Optimización de procesos',
      'Transformación digital'
    ],
  },
  {
    id: 'qa-testing',
    title: 'QA & Testing',
    description: 'Garantizamos la calidad de tu software con procesos de testing automatizados.',
    icon: 'TestTube',
    features: [
      'Testing automatizado',
      'Testing manual',
      'Performance testing',
      'Security testing'
    ],
  },
  {
    id: 'diseno-ux-ui',
    title: 'Diseño UX/UI',
    description: 'Creamos experiencias digitales intuitivas que conectan con tus usuarios.',
    icon: 'Palette',
    features: [
      'Investigación de usuarios',
      'Prototipado',
      'Diseño de interfaces',
      'Testing de usabilidad'
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Convertimos tus datos en insights accionables para la toma de decisiones.',
    icon: 'BarChart3',
    features: [
      'Análisis de datos',
      'Dashboards interactivos',
      'Modelos predictivos',
      'Big Data'
    ],
  },
];

const iconMap = {
  Code2,
  Brain,
  Settings,
  TestTube,
  Palette,
  BarChart3,
};

export default function Services() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const gsap = useGSAP();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const t = useTranslations('services');

  useEffect(() => {
    if (gsap && isVisible && cardsRef.current.length > 0) {
      // Animación de entrada tipo "tarjetero"
      gsap.fromTo(
        cardsRef.current,
        {
          y: 100,
          rotationX: -15,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [gsap, isVisible]);

  const handleCardClick = (index: number) => {
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
      if (gsap && cardsRef.current[index]) {
        gsap.to(cardsRef.current[index], {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  };

  return (
    <section 
      ref={sectionRef as any}
      className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-cyan rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-novit-accent rounded-2xl mb-6">
            <div className="w-8 h-8 bg-slate-900 rounded-lg" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
            <span className="gradient-text">Qué hacemos</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos soluciones tecnológicas integrales para transformar tu negocio
            y llevarlo al siguiente nivel
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            const isActive = activeCard === index;
            
            return (
              <div
                key={service.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`card-stack-item group cursor-pointer ${
                  isActive ? 'active' : ''
                }`}
                onClick={() => handleCardClick(index)}
              >
                <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 border border-slate-700 relative overflow-hidden group-hover:border-accent-cyan/30">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-novit-accent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-novit-accent rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features - Se expande al hacer click */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-t border-slate-700 pt-6">
                      <h4 className="font-semibold text-white mb-3">
                        {t('included_services')}
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-gradient-novit-accent rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="flex items-center text-accent-cyan font-semibold hover:text-secondary-500 transition-colors cursor-pointer">
                      {isActive ? 'Ver menos' : 'Conocer más'}
                      <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-novit-accent rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              ¿Necesitás una solución personalizada?
            </h3>
            <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Contanos sobre tu proyecto y te ayudamos a encontrar la mejor solución tecnológica
            </p>
            <button className="bg-white text-slate-900 px-8 py-4 lg:px-10 lg:py-5 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
              Solicitar asesoría
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-stack-item {
          opacity: 0;
          transform: translateY(100px) rotateX(-15deg);
        }
        
        .card-stack-item.animate {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }
      `}</style>
    </section>
  );
}
