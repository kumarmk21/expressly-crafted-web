import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import leaderPhoto from "@/assets/leader-photo.jpg";
import { Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const LeadershipSection = () => {
  const [photo, setPhoto] = useState<string>(leaderPhoto);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("value")
      .eq("key", "leadership_photo")
      .maybeSingle()
      .then(({ data }) => {
        const url = (data?.value as any)?.url;
        if (url) setPhoto(url);
      });
  }, []);

  return (
    <section className="py-12 lg:py-16 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <div className="absolute -top-3 -left-3 right-3 bottom-3 border border-primary/40" />
              <div className="relative overflow-hidden bg-background">
                <img
                  src={photo}
                  alt="JPN Singh — Founder, Scorpion Express"
                  className="w-full aspect-[3/4] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-6 py-4">
                <div className="font-display text-xl leading-none uppercase tracking-wide">Leadership</div>
                <div className="text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Custodian First</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Leadership</span>
            </div>
            <Quote className="h-12 w-12 text-primary/30 mb-4" />
            <h2 className="font-display uppercase text-4xl lg:text-6xl text-foreground leading-[0.95] mb-8">
              Driven by <span className="text-primary">vision.</span><br />Powered by excellence.
            </h2>
            <div className="space-y-5 text-foreground/70 leading-relaxed max-w-2xl">
              <p>
                Under the leadership of <strong className="text-foreground">Mr. J P N Singh</strong>, Scorpion Express has grown from a pioneering venture into one of India's most trusted logistics service providers. His vision and over two decades of deep industry expertise have shaped a culture of innovation, accountability, and customer-first thinking.
              </p>
              <p>
                The Scorpion Group's philosophy of <strong className="text-foreground">"Custodian First, Carrier Later"</strong> is more than a tagline — it's the guiding principle that shapes every operational decision and last-mile delivery.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-px bg-muted border border-border max-w-md">
              <div className="bg-background p-5">
                <div className="font-display text-2xl text-foreground">Scorpion Group</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Parent Organisation</div>
              </div>
              <div className="bg-background p-5">
                <div className="font-display text-2xl text-foreground">Pan-India</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Operational Presence</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
