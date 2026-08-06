import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Zap, ShieldCheck, Globe2, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_HERO = {
  eyebrow: "Custodian First · Carrier Later",
  headline_line1: "We move",
  headline_line2: "India",
  headline_tail: "Reliably.",
  subtext: "India's premier freight & logistics partner — Express Cargo, Cold Chain, Air, FTL and Warehousing engineered with absolute custodial discipline.",
};

const HeroSection = () => {
  const [lr, setLr] = useState("");
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "hero").maybeSingle().then(({ data }) => {
      if (data?.value) setHero({ ...DEFAULT_HERO, ...(data.value as any) });
    });
  }, []);

  return (
    <section className="relative bg-background overflow-hidden border-b border-border">
      {/* BG layers */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-30" fetchPriority="high" decoding="async" width={1920} height={1080} />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grain opacity-50" />
      </div>
      {/* red spotlight */}
      <div className="absolute right-0 top-0 h-full w-1/2 spotlight" />

      <div className="container mx-auto px-4 relative z-10 pt-16 lg:pt-24 pb-12">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-12 bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* Massive display headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display uppercase text-[14vw] sm:text-[10vw] lg:text-[8.5rem] xl:text-[10rem] leading-[0.85] text-foreground max-w-6xl"
        >
          {hero.headline_line1}
          <br />
          {hero.headline_line2}<span className="text-primary">.</span> <span className="text-muted-foreground/50">{hero.headline_tail}</span>
        </motion.h1>

        {/* Sub + CTAs */}
        <div className="grid lg:grid-cols-12 gap-8 mt-10 lg:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-2xl">
              {hero.subtext}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-primary text-white font-black uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-4 border border-border text-foreground font-black uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-colors"
              >
                Talk to an Expert
              </a>
            </div>

            {/* Trust badges row */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Time-Definite</div>
              <div className="h-3 w-px bg-white/15 hidden sm:block" />
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> GPTW Certified</div>
              <div className="h-3 w-px bg-white/15 hidden sm:block" />
              <div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-primary" /> Pan-India + Intl</div>
            </div>
          </motion.div>

          {/* Tracker card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="bg-card border border-border p-6 lg:p-7 red-glow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Live Tracking</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  Active
                </span>
              </div>
              <h2 className="font-display uppercase text-3xl text-foreground mb-2">Track Shipment</h2>
              <p className="text-sm text-muted-foreground mb-5">Enter your LR / Docket number for real-time status.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const id = lr.trim();
                  if (!id) return;
                  window.open(`http://103.211.171.59:8073/?lr=${encodeURIComponent(id)}`, "_blank", "noopener");
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={lr}
                    onChange={(e) => setLr(e.target.value)}
                    placeholder="e.g. SX1234567890"
                    aria-label="Shipment tracking number"
                    className="w-full pl-10 pr-3 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground font-mono-tab text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <button type="submit" className="px-5 py-3 bg-primary text-white font-black uppercase text-xs tracking-wider hover:bg-primary/90 transition-colors">
                  Track
                </button>
              </form>
              <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="font-display text-2xl text-foreground">24/7</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Support</div>
                </div>
                <div className="border-x border-border">
                  <div className="font-display text-2xl text-foreground">Live</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Visibility</div>
                </div>
                <div>
                  <div className="font-display text-2xl text-foreground">PoD</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Digital</div>
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
