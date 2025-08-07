interface StructuredDataProps {
  type?: 'organization' | 'website' | 'article' | 'service';
  data?: any;
  locale?: string;
}

export default function StructuredData({ type = 'organization', data, locale = 'es' }: StructuredDataProps) {

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NOVIT Software",
    "alternateName": "NOVIT",
    "url": "https://novit.com.ar",
    "logo": "https://novit.com.ar/novit-logo-official.png",
    "image": "https://novit.com.ar/novit-logo-official.png",
    "description": locale === 'es' 
      ? "Software factory líder en Argentina especializada en desarrollo de aplicaciones web, móviles, inteligencia artificial y consultoría IT."
      : locale === 'en'
      ? "Leading software factory in Argentina specialized in web development, mobile apps, artificial intelligence and IT consulting."
      : "Software factory líder na Argentina especializada em desenvolvimento de aplicações web, móveis, inteligência artificial e consultoria TI.",
    "foundingDate": "2010",
    "founders": [
      {
        "@type": "Person",
        "name": "NOVIT Team"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/novit-software",
      "https://www.instagram.com/novit.software",
      "https://github.com/novitsoftware",
      "https://www.facebook.com/novitsoftware"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Córdoba 1351, piso #3",
      "addressLocality": "Buenos Aires",
      "addressRegion": "CABA",
      "postalCode": "C1055AAG",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-34.6037",
      "longitude": "-58.3816"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+54-11-3176-9406",
        "contactType": "sales",
        "areaServed": "AR",
        "availableLanguage": ["Spanish", "English", "Portuguese"]
      },
      {
        "@type": "ContactPoint",
        "email": "info@novitsoftware.com",
        "contactType": "customer service",
        "areaServed": ["AR", "US", "BR"],
        "availableLanguage": ["Spanish", "English", "Portuguese"]
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-34.6037",
        "longitude": "-58.3816"
      },
      "geoRadius": "50000"
    },
    "knowsAbout": [
      "Software Development",
      "Web Development", 
      "Mobile Development",
      "Artificial Intelligence",
      "Machine Learning",
      "IT Consulting",
      "Digital Transformation",
      "ERP Systems",
      "CRM Systems",
      "Data Analytics"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": locale === 'es' ? "Desarrollo de Software" : locale === 'en' ? "Software Development" : "Desenvolvimento de Software",
          "description": locale === 'es' 
            ? "Desarrollo de aplicaciones web y móviles a medida"
            : locale === 'en'
            ? "Custom web and mobile application development"
            : "Desenvolvimento de aplicações web e móveis personalizadas"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": locale === 'es' ? "Inteligencia Artificial" : locale === 'en' ? "Artificial Intelligence" : "Inteligência Artificial",
          "description": locale === 'es'
            ? "Soluciones de IA y Machine Learning personalizadas"
            : locale === 'en'
            ? "Custom AI and Machine Learning solutions" 
            : "Soluções de IA e Machine Learning personalizadas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": locale === 'es' ? "Consultoría IT" : locale === 'en' ? "IT Consulting" : "Consultoria TI",
          "description": locale === 'es'
            ? "Asesoramiento estratégico para transformación digital"
            : locale === 'en'
            ? "Strategic consulting for digital transformation"
            : "Consultoria estratégica para transformação digital"
        }
      }
    ]
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NOVIT Software",
    "url": "https://novit.com.ar",
    "description": locale === 'es'
      ? "Software factory líder en Argentina. Desarrollo de aplicaciones web, móviles, IA y consultoría IT."
      : locale === 'en'
      ? "Leading software factory in Argentina. Web & mobile development, AI solutions, and IT consulting."
      : "Software factory líder na Argentina. Desenvolvimento web, móvel, IA e consultoria TI.",
    "inLanguage": [
      {
        "@type": "Language",
        "name": "Spanish",
        "alternateName": "es"
      },
      {
        "@type": "Language", 
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "Portuguese", 
        "alternateName": "pt"
      }
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://novit.com.ar/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NOVIT Software",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novit.com.ar/novit-logo-official.png"
      }
    }
  });

  const getServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service", 
    "serviceType": "Software Development",
    "provider": {
      "@type": "Organization",
      "name": "NOVIT Software"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Argentina"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Custom web application development"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile Development",
            "description": "Native and cross-platform mobile apps"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "AI Solutions",
            "description": "Artificial Intelligence and Machine Learning implementation"
          }
        }
      ]
    }
  });

  const getBreadcrumbSchema = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://novit.com.ar/${locale}`
      }
    ]
  });

  const getSchemaData = () => {
    switch (type) {
      case 'website':
        return getWebsiteSchema();
      case 'service':
        return getServiceSchema();
      case 'article':
        return data || {};
      default:
        return getOrganizationSchema();
    }
  };

  const schemaData = getSchemaData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {type === 'organization' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteSchema()) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema()) }}
      />
    </>
  );
}
