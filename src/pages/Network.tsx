import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkSection from "@/components/NetworkSection";
import CTASection from "@/components/CTASection";

const Network = () => {
  return (
    <div className="min-h-screen bg-background">
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
