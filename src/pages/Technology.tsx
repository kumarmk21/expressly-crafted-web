import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechnologySection from "@/components/TechnologySection";
import CTASection from "@/components/CTASection";

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
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
