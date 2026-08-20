import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProofStrip from "@/components/ProofStrip";
import CustodianSection from "@/components/CustodianSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsSection from "@/components/ClientsSection";

import LeadershipSection from "@/components/LeadershipSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Scorpion Express — Custodian First, Carrier Later"
        description="India's premier freight and logistics provider — express, cold chain, FTL, air freight and warehousing across 25,000+ pincodes."
        path="/"
      />
      <TopBar />
      <Navbar />
      <main>
        <HeroSection />
        <ProofStrip />
        <CustodianSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />

        <LeadershipSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
