'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón flotante principal */}
      <div className="floating-cta">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-novit text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 font-semibold"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:block">Necesito un presupuesto en 36hs</span>
          <span className="sm:hidden">Presupuesto</span>
        </button>
      </div>

      {/* Modal de contacto rápido */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-novit p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Presupuesto Rápido</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/90 mt-2">
                Recibí tu presupuesto personalizado en menos de 36 horas
              </p>
            </div>

            {/* Form */}
            <form className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de proyecto *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="">Seleccionar tipo de proyecto</option>
                  <option value="desarrollo-web">Desarrollo Web</option>
                  <option value="desarrollo-movil">Desarrollo Móvil</option>
                  <option value="inteligencia-artificial">Inteligencia Artificial</option>
                  <option value="consultoria">Consultoría IT</option>
                  <option value="qa-testing">QA & Testing</option>
                  <option value="diseno-ux-ui">Diseño UX/UI</option>
                  <option value="data-science">Data Science</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Presupuesto estimado
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                  <option value="">Seleccionar rango</option>
                  <option value="5k-15k">USD 5K - 15K</option>
                  <option value="15k-50k">USD 15K - 50K</option>
                  <option value="50k-100k">USD 50K - 100K</option>
                  <option value="100k+">USD 100K+</option>
                  <option value="no-definido">Aún no definido</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del proyecto *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  placeholder="Contanos brevemente sobre tu proyecto..."
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  Acepto la{' '}
                  <a href="/privacy" className="text-primary-500 hover:underline">
                    política de privacidad
                  </a>{' '}
                  y el tratamiento de mis datos personales
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-novit text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar solicitud
              </button>
            </form>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-sm text-gray-600">
                ⚡ Respuesta garantizada en menos de{' '}
                <span className="font-semibold text-primary-500">36 horas</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
