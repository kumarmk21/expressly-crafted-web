import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechnologySection from "@/components/TechnologySection";
import CTASection from "@/components/CTASection";
import Seo from "@/components/Seo";

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Logistics Technology & Tracking | Scorpion Express"
        description="Real-time tracking, WMS, route intelligence and digital PODs powering Scorpion Express's pan-India operations."
        path="/technology"
      />
      <TopBar />
      <Navbar />
      <main>
        <TechnologySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
