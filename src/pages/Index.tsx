import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { BenefitCard } from "@/components/landing/BenefitCard";
import { Plans } from "@/components/landing/Plans";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LeadSection } from "@/components/landing/LeadSection";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        <Hero />
        <BenefitCard />
        <Plans />
        <HowItWorks />
        <LeadSection />
        <TrustStrip />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
