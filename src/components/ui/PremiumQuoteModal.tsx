'use client';

import { useState, useRef } from 'react';
import { X, Upload, FileText, Send, Loader } from 'lucide-react';

interface PremiumQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  phone: string;
  projectSummary: string;
  pdfFile: File | null;
}

const BLOCKED_EMAIL_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'live.com',
  'msn.com',
  'protonmail.com',
  'icloud.com'
];

export default function PremiumQuoteModal({ isOpen, onClose }: PremiumQuoteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    projectSummary: '',
    pdfFile: null
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): string | null => {
    if (!email) return 'El email es requerido';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Formato de email inválido';
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
      return 'Debe usar un email corporativo (no se permiten Gmail, Outlook, etc.)';
    }
    
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return 'El teléfono es requerido';
    
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(phone)) return 'Formato de teléfono inválido';
    
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    if (!formData.projectSummary.trim()) {
      newErrors.projectSummary = 'El resumen del proyecto es requerido';
    }
    
    if (!formData.pdfFile) {
      newErrors.pdfFile = 'Debe adjuntar un archivo PDF con los requerimientos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors({ ...errors, pdfFile: 'Solo se permiten archivos PDF' });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors({ ...errors, pdfFile: 'El archivo no puede superar los 10MB' });
        return;
      }
      
      setFormData({ ...formData, pdfFile: file });
      setErrors({ ...errors, pdfFile: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('projectSummary', formData.projectSummary);
      if (formData.pdfFile) {
        submitData.append('pdfFile', formData.pdfFile);
      }
      
      // TODO: Implement API call to process the quote
      const response = await fetch('/api/premium-quote', {
        method: 'POST',
        body: submitData,
      });
      
      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }
      
      // Success - close modal and show success message
      onClose();
      alert('¡Solicitud enviada con éxito! Recibirá su cotización premium en las próximas 24 horas.');
      
      // Reset form
      setFormData({
        email: '',
        phone: '',
        projectSummary: '',
        pdfFile: null
      });
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error al enviar la solicitud. Por favor, inténtelo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-xl transform translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-300 rounded-full blur-lg transform -translate-x-12 translate-y-12" />
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Cotización Premium en 24hs
              </h3>
              <p className="text-blue-100 mt-1 text-sm font-medium">
                Powered by IA - Propuesta comercial personalizada
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-gradient-to-b from-gray-50 to-white">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Corporativo *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white ${
                errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="nombre@suempresa.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-2 font-medium">{errors.email}</p>
            )}
            <p className="text-gray-500 text-xs mt-2">
              No se permiten emails personales (Gmail, Outlook, etc.)
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono/WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white ${
                errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="+54 9 11 1234-5678"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-2 font-medium">{errors.phone}</p>
            )}
            <p className="text-gray-500 text-xs mt-2">
              Solo para mensajes de WhatsApp si es necesario (no llamaremos)
            </p>
          </div>

          {/* Project Summary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resumen del Proyecto *
            </label>
            <textarea
              required
              rows={4}
              value={formData.projectSummary}
              onChange={(e) => setFormData({ ...formData, projectSummary: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none bg-white ${
                errors.projectSummary ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Describe brevemente qué tipo de solución necesitás, tecnologías involucradas, alcance estimado, etc."
              disabled={isSubmitting}
            />
            {errors.projectSummary && (
              <p className="text-red-600 text-xs mt-2 font-medium">{errors.projectSummary}</p>
            )}
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Requerimientos (PDF) *
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                errors.pdfFile ? 'border-red-400 bg-red-50' : 'border-blue-300 hover:border-blue-400'
              } ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={isSubmitting}
              />
              
              {formData.pdfFile ? (
                <div className="flex items-center justify-center gap-3 text-green-600">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm font-semibold">{formData.pdfFile.name}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-blue-600">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm font-medium">Hacer clic para adjuntar PDF (máx. 10MB)</span>
                </div>
              )}
            </div>
            {errors.pdfFile && (
              <p className="text-red-600 text-xs mt-2 font-medium">{errors.pdfFile}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Procesando con IA...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Generar Cotización Premium
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 text-center border-t border-blue-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🤖</span>
            <p className="text-gray-700 font-semibold">
              IA generará una propuesta comercial completa con branding Novit
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Respuesta garantizada en menos de <span className="font-bold text-blue-600">24 horas</span>
          </p>
        </div>
      </div>
    </div>
  );
}