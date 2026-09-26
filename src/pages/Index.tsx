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
import FraudAlertPopup from "@/components/FraudAlertPopup";
import HomeShipmentTracker from "@/components/HomeShipmentTracker";
import PincodeQuoteSection from "@/components/PincodeQuoteSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Scorpion Express — Custodian First, Carrier Later"
        description="Pan-India B2B express cargo and logistics since 2000. Part Load (LTL), Air Express, Full Truck Load (FTL), cold chain and warehousing across 25,000+ pincodes."
        path="/"
      />
      <TopBar />
      <Navbar />
      <main>
        <HomeShipmentTracker />
        <PincodeQuoteSection />
        <HeroSection />
        <ProofStrip />
        <CustodianSection />
        <AboutSection />
        <ServicesSection />

        <LeadershipSection />
        <ClientsSection />
        <CTASection />
      </main>
      <Footer />
      <FraudAlertPopup />

    </div>
  );
};

export default Index;
