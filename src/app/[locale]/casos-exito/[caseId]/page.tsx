import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import { getAssetPath } from '@/config/constants';

// Define available case studies
const CASE_STUDIES = [
  'nazca-brands',
  'consultatio', 
  'ebmetrics',
  'gamma',
  'novopath',
  'salas-bim'
];

interface CaseStudyFrontmatter {
  title: string;
  client: string;
  date: string;
  tags: string[];
  image: string;
  logoImage?: string;
  screenshotImage?: string;
}

interface CaseStudyData {
  frontmatter: CaseStudyFrontmatter;
  content: string;
}

async function getCaseStudyContent(caseId: string, locale: string): Promise<CaseStudyData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'stories', caseId, `${locale}.md`);
    
    if (!fs.existsSync(filePath)) {
      // Fallback to Spanish if locale file doesn't exist
      const fallbackPath = path.join(process.cwd(), 'content', 'stories', caseId, 'es.md');
      if (!fs.existsSync(fallbackPath)) {
        return null;
      }
      const fallbackContent = fs.readFileSync(fallbackPath, 'utf8');
      const { data, content } = matter(fallbackContent);
      return { frontmatter: data as CaseStudyFrontmatter, content };
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return { frontmatter: data as CaseStudyFrontmatter, content };
  } catch (error) {
    console.error('Error reading case study:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const locales = ['es', 'en', 'pt'];
  const params = [];
  
  for (const locale of locales) {
    for (const caseId of CASE_STUDIES) {
      params.push({ locale, caseId });
    }
  }
  
  return params;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; caseId: string }> 
}) {
  const { locale, caseId } = await params;
  
  if (!CASE_STUDIES.includes(caseId)) {
    return {
      title: 'Caso no encontrado'
    };
  }
  
  const caseData = await getCaseStudyContent(caseId, locale);
  
  if (!caseData) {
    return {
      title: 'Caso no encontrado'
    };
  }
  
  return {
    title: `${caseData.frontmatter.title} | Novit Software`,
    description: `Caso de éxito: ${caseData.frontmatter.client}. ${caseData.frontmatter.title}`,
    openGraph: {
      title: caseData.frontmatter.title,
      description: `Caso de éxito: ${caseData.frontmatter.client}`,
      images: [`https://novit.com.ar${getAssetPath(caseData.frontmatter.image)}`],
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
    <ul className="text-gray-300 mb-6 space-y-2 list-disc list-inside" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="text-gray-300 mb-6 space-y-2 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-gray-300 leading-relaxed" {...props}>
      {children}
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
      className="text-accent-cyan hover:text-accent-cyan/80 underline transition-colors inline-flex items-center gap-1"
      target={href?.startsWith('http') ? '_blank' : '_self'}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
      {href?.startsWith('http') && <ExternalLink className="w-3 h-3" />}
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

export default async function CaseStudyPage({ 
  params 
}: { 
  params: Promise<{ locale: string; caseId: string }> 
}) {
  const { locale, caseId } = await params;
  
  // Validate case study exists
  if (!CASE_STUDIES.includes(caseId)) {
    notFound();
  }
  
  const caseData = await getCaseStudyContent(caseId, locale);
  
  if (!caseData) {
    notFound();
  }
  
  const { frontmatter, content } = caseData;
  
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
              href={`/${locale}#${locale === 'en' ? 'success-stories' : locale === 'pt' ? 'casos-sucesso' : 'casos-exito'}`}
              className="inline-flex items-center text-accent-cyan hover:text-accent-cyan/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'es' ? 'Volver a casos' : locale === 'en' ? 'Back to stories' : 'Voltar aos casos'}
            </Link>
          </div>
          
          {/* Client Logo */}
          {frontmatter.logoImage && (
            <div className="mb-8">
              <div className="inline-block bg-white p-4 rounded-2xl shadow-xl">
                <Image
                  src={getAssetPath(frontmatter.logoImage)}
                  alt={`${frontmatter.client} logo`}
                  width={200}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Title and Meta */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{frontmatter.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{frontmatter.client}</span>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gradient-novit-accent text-white text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
            {locale === 'es' ? '¿Te interesa una solución similar?' : 
             locale === 'en' ? 'Interested in a similar solution?' : 
             'Interessado em uma solução similar?'}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {locale === 'es' ? 'Contanos sobre tu proyecto y te ayudamos a encontrar la mejor solución tecnológica para tu negocio.' :
             locale === 'en' ? 'Tell us about your project and we\'ll help you find the best technology solution for your business.' :
             'Conte-nos sobre seu projeto e ajudaremos você a encontrar a melhor solução tecnológica para seu negócio.'}
          </p>
          <a
            href="https://wa.me/5491131769406"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-novit-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {locale === 'es' ? 'Contáctanos' :
             locale === 'en' ? 'Contact us' :
             'Fale conosco'}
          </a>
        </div>
      </section>
    </div>
  );
}