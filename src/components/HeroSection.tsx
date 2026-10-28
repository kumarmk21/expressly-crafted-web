import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
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

  const reducedMotion = useReducedMotion();
  const featuredServices = ["ltl", "ftl", "wms", "air"]
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service) => service !== undefined);

  return (
    <section aria-label="Scorpion Express logistics" className="logistics-banner relative overflow-hidden">
      <div className="logistics-banner-scene relative">
        <img src={heroBg} alt="Red Scorpion Express truck travelling on an Indian highway" className="logistics-banner-photo absolute inset-0 h-full w-full object-cover" fetchPriority="high" decoding="async" width={1376} height={768} />
        <div className="logistics-banner-accent absolute inset-0" aria-hidden="true" />
        <div className="logistics-banner-panel absolute inset-0" aria-hidden="true" />
        <div className="container relative z-10 mx-auto">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="logistics-banner-copy max-w-xl py-8 md:py-10"
          >
            <p className="mb-3 flex items-center gap-2 text-sm text-primary-foreground/80"><span className="h-0.5 w-8 bg-primary" />{hero.eyebrow}</p>
            <h1 className="hero-headline text-4xl leading-tight text-primary-foreground md:text-5xl">Scorpion <span className="text-primary">Express</span></h1>
            <p className="mt-3 max-w-md text-xl leading-snug text-primary-foreground md:text-2xl">{hero.headline_line1} {hero.headline_line2}{hero.headline_tail ? ` ${hero.headline_tail}` : ""}.</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/75 md:text-base">{hero.subtext}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild><a href="#services">Explore services <ArrowRight className="h-4 w-4" /></a></Button>
              <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:border-primary"><a href="#contact">Talk to an expert</a></Button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="logistics-banner-services relative z-10">
        <div className="container mx-auto grid grid-cols-2 gap-3 pb-4 md:grid-cols-4 md:gap-4 md:pb-5">
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.slug} initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.15 + index * 0.08 }}>
                <Button asChild variant="outline" className="logistics-service-tile group flex h-full min-h-24 w-full justify-start gap-3 whitespace-normal rounded-md border-border bg-card p-3 text-left text-card-foreground hover:border-primary hover:bg-card hover:text-primary md:min-h-28 md:p-4">
                  <Link to={`/services/${service.slug}`}>
                    <span className={`logistics-service-icon flex h-12 w-12 shrink-0 items-center justify-center md:h-14 md:w-14 ${index % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-foreground text-background"}`}><Icon className="h-6 w-6 md:h-7 md:w-7" /></span>
                    <span className="min-w-0 flex-1 text-sm font-semibold leading-snug md:text-base">{service.title}</span>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 xl:block" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
