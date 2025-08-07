import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CasesGrid from "@/components/sections/CasesGrid";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  
  return (
    <div className="snap-container">
      {/* Anchor point for #home */}
      <div id="home" className="absolute top-0"></div>
      
      <section className="snap-section">
        <Hero />
      </section>
      
      <section className="snap-section">
        <Services />
      </section>
      
      <section className="snap-section">
        <CasesGrid locale={locale} />
      </section>
    </div>
  );
}
