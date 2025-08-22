'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { getNavigationPath } from '@/config/constants';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('floating_cta');
  const locale = useLocale();

  return (
    <>
      {/* Botón flotante principal */}
      <div className="floating-cta">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-novit-accent text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 font-semibold cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:block">{t('button_text')}</span>
          <span className="sm:hidden">{t('button_text_short')}</span>
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
            <div className="bg-gradient-novit-accent p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Presupuesto Rápido</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-cyan focus:border-accent-cyan transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('lastname')} *
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
                  {t('email')} *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder={t('email_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('company')}
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
                  <option value="">{t('services.select_project')}</option>
                  <option value="desarrollo-web">{t('services.web_development')}</option>
                  <option value="desarrollo-movil">{t('services.mobile_development')}</option>
                  <option value="inteligencia-artificial">{t('services.artificial_intelligence')}</option>
                  <option value="consultoria">{t('services.consulting')}</option>
                  <option value="qa-testing">{t('services.qa_testing')}</option>
                  <option value="diseno-ux-ui">{t('services.ux_ui_design')}</option>
                  <option value="data-science">{t('services.data_science')}</option>
                  <option value="otro">{t('services.other')}</option>
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
                  {t('privacy_acceptance')}{' '}
                  <Link href={getNavigationPath(`/${locale}/privacy`)} className="text-accent-cyan hover:underline">
                    {t('privacy_policy')}
                  </Link>{' '}
                  {t('privacy_text')}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-novit-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Enviar solicitud
              </button>
            </form>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-sm text-gray-600">
                ⚡ Respuesta garantizada en menos de{' '}
                <span className="font-semibold text-accent-cyan">36 horas</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
