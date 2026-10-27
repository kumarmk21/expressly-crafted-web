import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Globe2 } from "lucide-react";
import heroBg from "@/assets/hero-bg-rbg.jpg";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_HERO = {
  eyebrow: "Custodian First · Carrier Later",
  headline_line1: "We Scorpions strive",
  headline_line2: "to make the world happy",
  headline_tail: "",
  subtext: "Pan-India B2B express cargo and logistics since 2000.",
};

const HeroSection = () => {
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "hero").maybeSingle().then(({ data }) => {
      if (data?.value) setHero({ ...DEFAULT_HERO, ...(data.value as any) });
    });
  }, []);

  return (
    <section className="relative bg-background overflow-hidden border-b border-border">
      {/* BG layers — tablet and desktop only; phones get the truck as its own card */}
      <div className="absolute inset-0 hidden md:block">
        <img src={heroBg} alt="" className="h-full w-full object-cover" fetchPriority="high" decoding="async" width={1376} height={768} />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grain opacity-50" />
      </div>
      {/* red spotlight */}
      <div className="absolute right-0 top-0 h-full w-1/2 spotlight hidden md:block" />

      <div className="container mx-auto px-4 relative z-10 pt-4 lg:pt-8 pb-8">
        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-headline text-[30px] sm:text-5xl lg:text-6xl xl:text-[64px] leading-[1.12] text-foreground max-w-5xl"
        >
          {hero.headline_line1}
          <br />
          {hero.headline_line2}<span className="text-primary">.</span> <span className="text-muted-foreground">{hero.headline_tail}</span>
        </motion.h1>

        {/* Sub + CTAs */}
        <div className="mt-6 lg:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl"
          >
            <p className="text-base lg:text-xl text-foreground/70 leading-relaxed max-w-2xl">
              {hero.subtext}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-4 bg-primary text-white font-black uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-4 border border-border text-foreground font-black uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-colors"
              >
                Talk to an Expert
              </a>
            </div>

            {/* Trust badges row */}
            <div className="mt-5 flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Time-Definite</div>
              <div className="h-3 w-px bg-white/15 hidden sm:block" />
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> GPTW Certified</div>
              <div className="h-3 w-px bg-white/15 hidden sm:block" />
              <div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-primary" /> Pan-India + Intl</div>
            </div>

            {/* Phones: the branded truck sits in its own card so nothing overlaps it */}
            <div className="md:hidden mt-5 overflow-hidden rounded-lg border border-primary/25 shadow-sm">
              <img
                src={heroBg}
                alt="Scorpion Express truck on the highway"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={1376}
                height={768}
              />
            </div>
          </motion.div>

        </div>
      </div>



    </section>
  );
};

export default HeroSection;
