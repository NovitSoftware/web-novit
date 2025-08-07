'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                custom_parameter_1: 'locale',
                custom_parameter_2: 'user_type'
              }
            });
            
            // Enhanced ecommerce tracking for premium quotes
            gtag('config', '${GA_MEASUREMENT_ID}', {
              custom_map: {
                'custom_parameter_1': 'premium_quote_requested'
              }
            });
            
            // Performance tracking
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  );
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
};

export const trackPremiumQuote = (email: string, projectType?: string) => {
  trackEvent('premium_quote_request', {
    event_category: 'engagement',
    event_label: 'premium_quote',
    custom_parameter_1: projectType || 'unknown',
    user_id: email
  });
};

export const trackNewsletterSignup = (email: string) => {
  trackEvent('newsletter_signup', {
    event_category: 'engagement', 
    event_label: 'newsletter',
    user_id: email
  });
};

export const trackPageView = (page_title: string, page_location: string) => {
  trackEvent('page_view', {
    page_title,
    page_location,
    event_category: 'engagement'
  });
};

export const trackLanguageChange = (from_language: string, to_language: string) => {
  trackEvent('language_change', {
    event_category: 'engagement',
    event_label: 'language_switch',
    custom_parameter_1: from_language,
    custom_parameter_2: to_language
  });
};
