import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Award, Building2, Users, Truck, Shield, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import jpnSingh from "@/assets/leadership/jpn-singh.jpg";
import shaliniSingh from "@/assets/leadership/shalini-singh.jpg";
import rajLalan from "@/assets/leadership/raj-lalan.jpg";
import manojKumar from "@/assets/leadership/manoj-kumar.jpg";
import anilTiwari from "@/assets/leadership/anil-tiwari.jpg";
import poojaPatelKalia from "@/assets/leadership/pooja-patel-kalia.jpg";
import rakeshSahoo from "@/assets/leadership/rakesh-sahoo.jpg";
import anilMishra from "@/assets/leadership/anil-mishra.jpg";
import companyShowcase from "@/assets/services/express.jpg";
import { supabase } from "@/integrations/supabase/client";

const milestones = [
  { year: "2000", text: "Scorpion Group founded by Mr. J P N Singh" },
  { year: "2001", text: "Scorpion Express launched in India" },
  { year: "2005", text: "Scorpion Containers Pvt. Ltd. established" },
  { year: "2015", text: "Expanded to a true pan-India operating network" },
  { year: "2020", text: "Deepened reverse logistics & cold-chain capability" },
  { year: "2024", text: "Modernized technology infrastructure with real-time tracking and intelligent analytics." },
];

// Local photo fallbacks for seeded leaders (matched by name)
const LOCAL_PHOTOS: Record<string, string> = {
  "J P N Singh": jpnSingh,
  "Shalini Singh": shaliniSingh,
  "Raj Lalan Dwivedi": rajLalan,
  "Manoj Kumar": manojKumar,
  "Anil Tiwari": anilTiwari,
  "Pooja Patel Kalia": poojaPatelKalia,
  "Rakesh Sahoo": rakeshSahoo,
};

type Leader = { id: string; name: string; role: string; photo_url: string | null; display_order: number };

const values = [
  { icon: Shield, label: "Custodian First", desc: "Goods safeguarded above all else." },
  { icon: Truck, label: "Reliability", desc: "Time-bound, damage-free delivery." },
  { icon: Users, label: "People-Driven", desc: "Strong internal culture builds lasting external trust." },
  { icon: Award, label: "Excellence", desc: "Performance always outweighs ambition." },
];

const AboutUs = () => {
  const [leadership, setLeadership] = useState<Leader[]>([]);

  useEffect(() => {
    supabase
      .from("leadership_members" as any)
      .select("*")
      .order("display_order")
      .then(({ data }) => setLeadership(((data as any[]) ?? []) as Leader[]));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Seo
        title="About Scorpion Express | Custodian First, Carrier Later"
        description="Founded in 2000, Scorpion Express delivers pan-India freight, cold chain and warehousing with a custodian-first promise."
        path="/about"
      />
      <TopBar />
      <Navbar />

      {/* Hero — light, minimal red */}
      <section className="relative bg-white border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">About Scorpion Express</span>
          </div>
          <h1 className="font-display uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-5xl text-foreground">
            India's premier <br /> freight & logistics<span className="text-primary">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed">
            The driving force behind the Scorpion Group's ventures — founded on
            one unwavering principle: <strong className="text-foreground font-bold">Custodian First, Carrier Later.</strong>
          </p>
        </div>
      </section>

      {/* Company Showcase Image */}
      <section className="bg-white">
        <div className="container mx-auto px-4 -mt-2">
          <div className="relative overflow-hidden border border-border">
            <img
              src={companyShowcase}
              alt="Scorpion Express logistics network — fleet, warehouses, and operations across India"
              className="w-full h-[320px] md:h-[460px] lg:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <div className="max-w-2xl">
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/80 mb-2">A Glimpse Inside</div>
                <h3 className="font-display uppercase text-2xl md:text-4xl leading-tight">
                  Precision-engineered networks. Disciplined execution. One uncompromising commitment to trust.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Story */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-foreground/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/70">Our Story</span>
            </div>
            <h2 className="font-display uppercase text-4xl lg:text-5xl leading-[0.95] text-foreground">
              From 4 offices to a <span className="text-primary">nation-wide</span> network.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-foreground/75 leading-relaxed text-[15px]">
            <p>
              Established in <strong>2000</strong> by <strong>Mr. J P N Singh</strong>, the Scorpion Group set out to
              redefine industry benchmarks in Express Cargo. Its flagship venture, <strong>Scorpion Express</strong>,
              grew rapidly into a trusted pan-India logistics partner.
            </p>
            <p>
              In <strong>2005</strong>, the group expanded into specialized pharmaceutical packaging with{" "}
              <strong>Scorpion Containers Pvt. Ltd.</strong>, operating 9 manufacturing units across 5 states and
              international trading offices in China and Korea.
            </p>
            <p>
              Today, Scorpion Express operates across India with both asset-based and non-asset 3PL solutions —
              tailored for B2B, B2C and B2D sectors, and engineered to exceed every supply chain goal.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-24 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-foreground/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/70">What Drives Us</span>
              <span className="h-px w-10 bg-foreground/30" />
            </div>
            <h2 className="font-display uppercase text-4xl lg:text-5xl text-foreground leading-tight">
              Vision &amp; Mission
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white border border-border p-8 lg:p-10"
            >
              <div className="absolute top-0 left-0 h-1 w-16 bg-primary" />
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 bg-foreground/5 text-foreground flex items-center justify-center">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-display uppercase text-2xl text-foreground">Our Vision</h3>
              </div>
              <p className="text-foreground/75 leading-relaxed">
                "To redefine the landscape of Express Cargo and Logistics Services in India and beyond, by setting the
                highest standards in <strong className="text-foreground">service excellence, innovation, and sustainability</strong>.
                We aim to become the most trusted partner for businesses across the nation, empowering their growth and
                success with our reliable, efficient, and cutting-edge logistics solutions."
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-white border border-border p-8 lg:p-10"
            >
              <div className="absolute top-0 left-0 h-1 w-16 bg-primary" />
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 bg-foreground/5 text-foreground flex items-center justify-center">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-display uppercase text-2xl text-foreground">Our Mission</h3>
              </div>
              <p className="text-foreground/75 leading-relaxed">
                "Our mission is to deliver <strong className="text-foreground">unparalleled logistics and express cargo services</strong> to
                our B2B and B2C clients across India, ensuring timely, safe, and cost-effective solutions. We are dedicated to
                continuously enhancing our operations through technological innovation, customer service excellence, and a deep
                understanding of the unique needs of each sector we serve. By fostering strong, trust-based relationships with
                our clients, we commit to being an integral part of their success story, driving positive change in the logistics
                industry with every shipment we handle."
              </p>
            </motion.div>
          </div>

          {/* Core values strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mt-8">
            {values.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white p-6 transition-colors">
                <Icon className="h-6 w-6 text-foreground/80 mb-3" />
                <div className="font-bold uppercase tracking-wide text-sm text-foreground">{label}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-foreground/30" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/70">Milestones</span>
              </div>
              <h2 className="font-display uppercase text-4xl lg:text-6xl text-foreground leading-[0.9]">
                Two decades.<br /> One relentless journey.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Some of the key moments that have shaped Scorpion Express into what it is today.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {milestones.map((m) => (
              <div key={m.year} className="bg-white p-7">
                <div className="font-display text-5xl text-foreground leading-none">{m.year}</div>
                <div className="h-px w-10 bg-primary my-3" />
                <p className="text-sm text-foreground/75 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-24 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-foreground/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/70">Leadership</span>
              <span className="h-px w-10 bg-foreground/30" />
            </div>
            <h2 className="font-display uppercase text-4xl lg:text-5xl text-foreground leading-tight">
              The people behind the promise
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {leadership.map((leader) => {
              const photo = leader.photo_url || LOCAL_PHOTOS[leader.name] || null;
              return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-border group overflow-hidden flex flex-col h-full"
              >
                <div className="relative aspect-[1464/1920] w-full bg-muted overflow-hidden shrink-0">
                  {photo ? (
                    <img
                      src={photo}
                      alt={leader.name}
                      className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-muted to-white">
                      <UserIcon className="h-14 w-14 text-border" strokeWidth={1} />
                      <span className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                        Photo coming soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 border-t border-border flex-1 flex flex-col justify-start min-h-[104px]">
                  <h3 className="font-bold uppercase tracking-wide text-foreground text-sm">{leader.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{leader.role}</p>
                </div>
              </motion.div>
            );})}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-4 py-14 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="h-5 w-5" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">Partner with us</span>
            </div>
            <h2 className="font-display uppercase text-3xl md:text-5xl leading-tight max-w-2xl">
              Ready to ship with India's custodian-first logistics partner?
            </h2>
          </div>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-3 bg-white text-primary font-black uppercase tracking-wider px-7 py-4 hover:bg-white/90 transition-colors shrink-0"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
