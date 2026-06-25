import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkSection from "@/components/NetworkSection";
import CTASection from "@/components/CTASection";
import Seo from "@/components/Seo";

const Network = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Pan-India Logistics Network | Scorpion Express"
        description="70+ branches across 5 zones serving 24,000+ pincodes. Explore Scorpion Express's pan-India freight and delivery network."
        path="/network"
      />
      <TopBar />
      <Navbar />
      <main>
        <NetworkSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Network;
