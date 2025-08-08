import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Users, Award, Target } from 'lucide-react';
import { getAssetPath } from '@/config/constants';

interface AcademiaFrontmatter {
  title: string;
  subtitle: string;
  description: string;
  heroImage?: string;
  features: string[];
}

interface AcademiaData {
  frontmatter: AcademiaFrontmatter;
  content: string;
}

async function getAcademiaContent(locale: string): Promise<AcademiaData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'academia', `${locale}.md`);
    
    if (!fs.existsSync(filePath)) {
      // Fallback to Spanish if locale file doesn't exist
      const fallbackPath = path.join(process.cwd(), 'content', 'academia', 'es.md');
      if (!fs.existsSync(fallbackPath)) {
        return null;
      }
      const fallbackContent = fs.readFileSync(fallbackPath, 'utf8');
      const { data, content } = matter(fallbackContent);
      return { frontmatter: data as AcademiaFrontmatter, content };
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return { frontmatter: data as AcademiaFrontmatter, content };
  } catch (error) {
    console.error('Error reading academia content:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const locales = ['es', 'en', 'pt'];
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  const academiaData = await getAcademiaContent(locale);
  
  if (!academiaData) {
    return {
      title: 'Academia Novit | Novit Software'
    };
  }
  
  return {
    title: `${academiaData.frontmatter.title} | Novit Software`,
    description: academiaData.frontmatter.description,
    openGraph: {
      title: academiaData.frontmatter.title,
      description: academiaData.frontmatter.description,
      images: academiaData.frontmatter.heroImage ? [academiaData.frontmatter.heroImage] : [],
    }
  };
}

// Custom components for markdown rendering
const MarkdownComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 mt-12 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl lg:text-2xl font-bold text-accent-cyan mb-4 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-300 mb-6 leading-relaxed text-lg" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="text-gray-300 mb-6 space-y-3 list-none" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="text-gray-300 mb-6 space-y-3 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-gray-300 leading-relaxed flex items-start" {...props}>
      <span className="w-2 h-2 bg-accent-cyan rounded-full mt-3 mr-3 flex-shrink-0"></span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="text-white font-bold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="text-accent-cyan" {...props}>
      {children}
    </em>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-accent-cyan bg-slate-800 p-6 my-8 rounded-r-lg" {...props}>
      <div className="text-gray-300 italic text-lg">
        {children}
      </div>
    </blockquote>
  ),
  img: ({ src, alt, ...props }: any) => (
    <div className="my-8 rounded-2xl overflow-hidden bg-slate-800 p-4">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="w-full h-auto object-contain rounded-lg"
        {...props}
      />
    </div>
  ),
  a: ({ href, children, ...props }: any) => (
    <a 
      href={href} 
      className="text-accent-cyan hover:text-accent-cyan/80 underline transition-colors"
      target={href?.startsWith('http') ? '_blank' : '_self'}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-slate-800 text-accent-cyan px-2 py-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto mb-6 border border-slate-700" {...props}>
      <code className="text-gray-300 text-sm font-mono">
        {children}
      </code>
    </pre>
  ),
};

export default async function AcademiaPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  const academiaData = await getAcademiaContent(locale);
  
  if (!academiaData) {
    notFound();
  }
  
  const { frontmatter, content } = academiaData;
  
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-cyan rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href={getAssetPath(`/${locale}`)}
              className="inline-flex items-center text-accent-cyan hover:text-accent-cyan/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'es' ? 'Volver al inicio' : locale === 'en' ? 'Back to home' : 'Voltar ao início'}
            </Link>
          </div>
          
          {/* Title and Subtitle */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-novit-accent rounded-2xl mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {frontmatter.title}
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {frontmatter.subtitle}
            </p>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {frontmatter.description}
            </p>
          </div>
          
          {/* Features Grid */}
          {frontmatter.features && frontmatter.features.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {frontmatter.features.map((feature, index) => {
                const icons = [BookOpen, Users, Award, Target];
                const Icon = icons[index % icons.length];
                
                return (
                  <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-accent-cyan/50 transition-colors">
                    <Icon className="w-8 h-8 text-accent-cyan mb-4" />
                    <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {locale === 'es' ? '¿Listo para comenzar tu formación?' : 
             locale === 'en' ? 'Ready to start your training?' : 
             'Pronto para começar seu treinamento?'}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {locale === 'es' ? 'Contáctanos para conocer más sobre nuestros programas de formación y cómo pueden impulsar tu carrera profesional.' :
             locale === 'en' ? 'Contact us to learn more about our training programs and how they can boost your professional career.' :
             'Entre em contato conosco para saber mais sobre nossos programas de treinamento e como eles podem impulsionar sua carreira profissional.'}
          </p>
          <a
            href={`mailto:academia@novit.com.ar?subject=${
              locale === 'es' ? 'Info próxima edición' :
              locale === 'en' ? 'Next edition info' :
              'Info próxima edição'
            }`}
            className="inline-flex items-center bg-gradient-novit-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {locale === 'es' ? 'Inscríbete' :
             locale === 'en' ? 'Sign up' :
             'Inscreva-se'}
          </a>
        </div>
      </section>
    </div>
  );
}