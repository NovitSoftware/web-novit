'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Send, Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PremiumQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  phone: string;
  projectSummary: string;
  specialRequirements: string;
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
  const t = useTranslations('premium_quote');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    projectSummary: '',
    specialRequirements: '',
    pdfFile: null
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): string | null => {
    if (!email) return t('form.email_required');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return t('form.email_invalid');
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
      return t('form.email_blocked');
    }
    
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return t('form.phone_required');
    
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(phone)) return t('form.phone_invalid');
    
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    if (!formData.projectSummary.trim()) {
      newErrors.projectSummary = t('form.project_summary_required');
    }
    
    if (!formData.pdfFile) {
      newErrors.pdfFile = t('form.pdf_required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors({ ...errors, pdfFile: t('form.pdf_invalid_type') });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors({ ...errors, pdfFile: t('form.pdf_too_large') });
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
      submitData.append('specialRequirements', formData.specialRequirements);
      if (formData.pdfFile) {
        submitData.append('pdfFile', formData.pdfFile);
      }
      
      // TODO: Implement API call to process the quote
      const response = await fetch('/api/premium-quote', {
        method: 'POST',
        body: submitData,
      });
      
      if (!response.ok) {
        throw new Error(t('messages.processing_error'));
      }
      
      // Success - close modal and show success message
      onClose();
      alert(t('messages.success'));
      
      // Reset form
      setFormData({
        email: '',
        phone: '',
        projectSummary: '',
        specialRequirements: '',
        pdfFile: null
      });
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert(t('messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Modal */}
          <motion.div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4
            }}
          >

            {/* Header */}
            <div className="bg-blue-600 p-6 text-white relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #06b6d4 100%)'
            }}>              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white tracking-tight">
                      {t('title')}
                    </h3>
                    <p className="text-blue-100 text-sm font-medium">
                      {t('subtitle')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 text-white/80 hover:text-white"
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('form.email_label')} {t('form.required_field')}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 bg-white shadow-sm text-gray-900 placeholder-gray-500 ${
                errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder={t('form.email_placeholder')}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1">
                <span className="text-xs">⚠️</span>
                {errors.email}
              </p>
            )}
            <p className="text-gray-600 text-xs mt-2 flex items-center gap-1">
              <span className="text-xs">ℹ️</span>
              {t('form.email_hint')}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('form.phone_label')} {t('form.required_field')}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 bg-white shadow-sm text-gray-900 placeholder-gray-500 ${
                errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder={t('form.phone_placeholder')}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1">
                <span className="text-xs">⚠️</span>
                {errors.phone}
              </p>
            )}
            <p className="text-gray-600 text-xs mt-2 flex items-center gap-1">
              <span className="text-xs">💬</span>
              {t('form.phone_hint')}
            </p>
          </div>

          {/* Project Summary */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('form.project_summary_label')} {t('form.required_field')}
            </label>
            <textarea
              required
              rows={4}
              value={formData.projectSummary}
              onChange={(e) => setFormData({ ...formData, projectSummary: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 resize-none bg-white shadow-sm text-gray-900 placeholder-gray-500 ${
                errors.projectSummary ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder={t('form.project_summary_placeholder')}
              disabled={isSubmitting}
            />
            {errors.projectSummary && (
              <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1">
                <span className="text-xs">⚠️</span>
                {errors.projectSummary}
              </p>
            )}
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('form.special_requirements_label')}
            </label>
            <textarea
              rows={3}
              value={formData.specialRequirements}
              onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
              className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 resize-none bg-white shadow-sm border-gray-300 hover:border-gray-400 text-gray-900 placeholder-gray-500"
              placeholder={t('form.special_requirements_placeholder')}
              disabled={isSubmitting}
            />
            <p className="text-gray-600 text-xs mt-2 flex items-center gap-1">
              <span className="text-xs">💡</span>
              {t('form.special_requirements_hint')}
            </p>
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('form.pdf_label')} {t('form.required_field')}
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:bg-gray-50 shadow-sm ${
                errors.pdfFile ? 'border-red-400 bg-red-50' : 'border-gray-400 hover:border-gray-500'
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
                <div className="flex items-center justify-center gap-3 text-green-700">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm font-semibold">{formData.pdfFile.name}</span>
                  <span className="text-xs">✅</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Upload className="w-6 h-6" />
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{t('form.pdf_upload_text')}</span>
                    <br />
                    <span className="text-xs text-gray-600">{t('form.pdf_max_size')}</span>
                  </div>
                </div>
              )}
            </div>
            {errors.pdfFile && (
              <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1">
                <span className="text-xs">⚠️</span>
                {errors.pdfFile}
              </p>
            )}
            <p className="text-gray-600 text-xs mt-2 flex items-center gap-1">
              <span className="text-xs">🔒</span>
              {t('form.privacy_notice')}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: 'linear-gradient(to right, #2563eb, #4f46e5)'
            }}
            className="w-full text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] border border-blue-700 shadow-lg cursor-pointer"

          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>{t('form.submit_processing')}</span>
                <span className="text-xs">🤖</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{t('form.submit_button')}</span>
                <span className="text-lg">⚡</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-4 text-center border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">🤖</span>
            <p className="text-gray-800 text-sm font-medium">
              {t('footer.ai_description')}
            </p>
          </div>
          <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
            <span className="text-xs">⏱️</span>
            {t('footer.response_time')} <span className="font-semibold text-gray-900 px-2 py-1 bg-gray-200 rounded-full">{t('footer.hours')}</span>
            <span className="text-xs">⚡</span>
          </p>
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}