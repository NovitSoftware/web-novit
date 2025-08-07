import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownContent {
  slug: string;
  data: any;
  content: string;
}

export interface ServiceContent extends MarkdownContent {
  data: {
    title: string;
    description: string;
    icon: string;
    order: number;
    features: string[];
  };
}

export interface HeroContent extends MarkdownContent {
  data: {
    title_part1: string;
    title_highlight: string;
    title_part2: string;
    subtitle_part1: string;
    subtitle_highlight1: string;
    subtitle_middle: string;
    subtitle_highlight2: string;
    description: string;
    cta_premium: string;
    cta_work: string;
  };
}

export interface ServicesHeaderContent extends MarkdownContent {
  data: {
    section_title: string;
    section_description: string;
    included_services: string;
    see_more: string;
    see_less: string;
    cta_title: string;
    cta_description: string;
    cta_button: string;
  };
}

/**
 * Load content with fallback to Spanish if locale not found
 */
export async function loadContent(
  contentPath: string, 
  locale: string = 'es'
): Promise<MarkdownContent | null> {
  try {
    const filePath = path.join(contentDirectory, contentPath, `${locale}.md`);
    
    // Check if file exists for requested locale
    if (!fs.existsSync(filePath)) {
      // Fallback to Spanish
      if (locale !== 'es') {
        return loadContent(contentPath, 'es');
      }
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: contentPath.split('/').pop() || '',
      data,
      content,
    };
  } catch (error) {
    console.error(`Error loading content from ${contentPath}:`, error);
    return null;
  }
}

/**
 * Load hero content
 */
export async function loadHeroContent(locale: string = 'es'): Promise<HeroContent | null> {
  const content = await loadContent('home/hero', locale);
  return content as HeroContent | null;
}

export interface NavigationContent extends MarkdownContent {
  data: {
    home: string;
    services: string;
    stories: string;
    academy: string;
    quote: string;
  };
}

export interface CasesHeaderContent extends MarkdownContent {
  data: {
    section_title: string;
    section_description: string;
    view_case: string;
    view_all: string;
    stats: {
      projects: string;
      clients: string;
      countries: string;
      experience: string;
    };
  };
}

/**
 * Load cases header content
 */
/**
 * Load services header content
 */
export async function loadServicesHeaderContent(locale: string = 'es'): Promise<ServicesHeaderContent | null> {
  const content = await loadContent('home/services', locale);
  return content as ServicesHeaderContent | null;
}

/**
 * Load navigation content
 */
export async function loadNavigationContent(locale: string = 'es'): Promise<NavigationContent | null> {
  const content = await loadContent('home/navigation', locale);
  return content as NavigationContent | null;
}

/**
 * Load cases header content
 */
export async function loadCasesHeaderContent(locale: string = 'es'): Promise<CasesHeaderContent | null> {
  const content = await loadContent('home/cases', locale);
  return content as CasesHeaderContent | null;
}

/**
 * Load all services content
 */
export async function loadServicesContent(locale: string = 'es'): Promise<ServiceContent[]> {
  try {
    const servicesDir = path.join(contentDirectory, 'services');
    
    if (!fs.existsSync(servicesDir)) {
      return [];
    }

    const serviceDirs = fs.readdirSync(servicesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const services: ServiceContent[] = [];

    for (const serviceDir of serviceDirs) {
      const content = await loadContent(`services/${serviceDir}`, locale);
      if (content) {
        services.push(content as ServiceContent);
      }
    }

    // Sort by order field
    return services.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  } catch (error) {
    console.error('Error loading services content:', error);
    return [];
  }
}

/**
 * Load single service content
 */
export async function loadServiceContent(
  serviceSlug: string, 
  locale: string = 'es'
): Promise<ServiceContent | null> {
  const content = await loadContent(`services/${serviceSlug}`, locale);
  return content as ServiceContent | null;
}

export default {
  loadContent,
  loadHeroContent,
  loadNavigationContent,
  loadServicesHeaderContent,
  loadCasesHeaderContent,
  loadServicesContent,
  loadServiceContent,
};