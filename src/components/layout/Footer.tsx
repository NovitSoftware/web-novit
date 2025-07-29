'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  MessageSquare,
  ArrowUp
} from 'lucide-react';
import { getAssetPath } from '@/config/constants';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-cyan rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src={getAssetPath("novit-logo-official.png")}
                  alt="NOVIT Software"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                La software factory que necesitás para que tus ideas se hagan realidad 
                de forma simple y práctica.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-3 text-accent-cyan" />
                  <span className="text-sm">
                    Av. Córdoba 1351, piso #3<br />
                    Ciudad de Buenos Aires
                  </span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-accent-cyan" />
                  <a 
                    href="tel:+541131769406" 
                    className="text-sm hover:text-accent-cyan transition-colors"
                  >
                    +54 11 3176 9406
                  </a>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-accent-cyan" />
                  <a 
                    href="mailto:info@novitsoftware.com" 
                    className="text-sm hover:text-accent-cyan transition-colors"
                  >
                    info@novitsoftware.com
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Servicios
              </h3>
              <ul className="space-y-3">
                {[
                  'Desarrollo de Software',
                  'Inteligencia Artificial',
                  'Consultoría IT',
                  'QA & Testing',
                  'Diseño UX/UI',
                  'Data Science',
                ].map((service) => (
                  <li key={service}>
                    <Link 
                      href="/servicios"
                      className="text-gray-300 hover:text-accent-cyan transition-colors text-sm"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Empresa
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Nosotros', href: '/nosotros' },
                  { label: 'Casos de Éxito', href: '/casos-exito' },
                  { label: 'Tecnologías', href: '/tecnologias' },
                  { label: 'Academia Novit', href: '/academia' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Carreras', href: '/carreras' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href}
                      className="text-gray-300 hover:text-accent-cyan transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Conectá con nosotros
              </h3>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-300 text-sm">
                  Seguinos en nuestras redes sociales para estar al día con las 
                  últimas novedades del mundo tech.
                </p>
                
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/5491131769406"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all duration-300"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                  
                  <a
                    href="https://www.instagram.com/novit.software"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/company/novit-software"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">
                  Newsletter Tech
                </h4>
                <p className="text-gray-300 text-xs mb-3">
                  Recibí insights y tendencias del mundo tecnológico.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-sm focus:outline-none focus:border-accent-cyan"
                  />
                  <button className="px-4 py-2 bg-gradient-novit-accent rounded-r-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                    Suscribirse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400 text-center md:text-left">
                © 2024 NOVIT | Todos los derechos reservados.
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <Link 
                  href="/privacy"
                  className="hover:text-accent-cyan transition-colors"
                >
                  Política de Privacidad
                </Link>
                <Link 
                  href="/terms"
                  className="hover:text-accent-cyan transition-colors"
                >
                  Términos de Uso
                </Link>
                <button
                  onClick={scrollToTop}
                  className="flex items-center space-x-1 hover:text-accent-cyan transition-colors group"
                >
                  <span>Volver arriba</span>
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
