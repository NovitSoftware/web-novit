import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CasesGrid from "@/components/sections/CasesGrid";

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'ca' }
  ];
}

export default function Home() {
  return (
    <div className="snap-container">
      <section className="snap-section">
        <Hero />
      </section>
      
      <section className="snap-section">
        <Services />
      </section>
      
      <section className="snap-section">
        <CasesGrid />
      </section>
    </div>
  );
}
