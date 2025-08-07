import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CasesGrid from "@/components/sections/CasesGrid";
import { loadHeroContent, loadServicesContent, loadServicesHeaderContent, loadCasesHeaderContent } from "@/lib/contentLoader";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  
  // Load content from markdown files
  const heroContent = await loadHeroContent(locale);
  const servicesContent = await loadServicesContent(locale);
  const servicesHeaderContent = await loadServicesHeaderContent(locale);
  const casesHeaderContent = await loadCasesHeaderContent(locale);
  
  return (
    <div className="snap-container">
      {/* Anchor point for #home */}
      <div id="home" className="absolute top-0"></div>
      
      <section className="snap-section">
        <Hero content={heroContent} />
      </section>
      
      <section className="snap-section">
        <Services content={servicesContent} headerContent={servicesHeaderContent} />
      </section>
      
      <section className="snap-section">
        <CasesGrid locale={locale} headerContent={casesHeaderContent} />
      </section>
    </div>
  );
}
