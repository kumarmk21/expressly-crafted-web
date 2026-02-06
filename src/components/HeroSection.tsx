import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TicketPlus, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import gptwBadge from "@/assets/gptw-badge.png";

const HeroSection = () => {
  const [lrNumber, setLrNumber] = useState("");

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-primary-foreground"
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={gptwBadge} alt="Great Place to Work Certified" className="h-16" />
              <span className="text-xs font-semibold bg-primary-foreground/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                Great Place to Work® Certified
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
              Scorpion Express
            </h1>
            <p className="text-xl md:text-2xl font-light mb-2 text-primary-foreground/90">
              Custodian First, Carrier Later
            </p>
            <p className="text-base text-primary-foreground/70 mb-8 max-w-lg">
              India's premier freight & logistics service provider. From express cargo to cold chain — delivering with precision across 24,000+ pincodes.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="http://103.211.171.59:8000/"
                target="_blank"
                rel="noopener noreferrer"
                className="red-gradient inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg hover:opacity-90 transition-opacity text-primary-foreground"
              >
                <TicketPlus className="h-5 w-5" />
                Raise a Ticket
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
              >
                Our Services
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Right: Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-background/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-foreground mb-2">Track Your Shipment</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your LR number to get real-time updates on your shipment.
              </p>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter LR Number"
                    value={lrNumber}
                    onChange={(e) => setLrNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-muted rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="red-gradient px-6 py-3.5 rounded-lg font-bold text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap">
                  Track
                </button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-gold" />
                  Live tracking available
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-gold" />
                  24/7 Support
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
