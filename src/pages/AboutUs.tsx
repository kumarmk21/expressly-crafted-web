import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
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
import aboutHero from "@/assets/scorpion-fleet-depot.jpg";
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
  "Anil Mishra": anilMishra,
};

const MilestonesSlider = () => {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () =>
      setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, milestones.length - perView);
  const current = Math.min(index, maxIndex);

  // The journey keeps moving on its own, and stops while someone is reading.
  useEffect(() => {
    if (paused || maxIndex === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
      4500,
    );
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  const wrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-sm border border-primary/30 bg-primary/[0.04] p-3 lg:p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        variants={wrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="overflow-hidden"
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${current * (100 / perView)}%)` }}
        >
          {milestones.map((m) => (
            <div
              key={m.year}
              className="shrink-0 px-1.5"
              style={{ width: `${100 / perView}%` }}
            >
              <motion.div
                variants={rise}
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-primary/25 bg-background p-6 shadow-sm shadow-primary/5 transition-colors duration-300 hover:border-primary/60 hover:bg-primary/[0.06] lg:p-7"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="font-display text-4xl leading-none text-primary transition-transform duration-300 group-hover:scale-105 lg:text-5xl">
                  {m.year}
                </div>
                <div className="my-3 h-px w-10 bg-primary/50 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
                <p className="text-sm leading-relaxed text-foreground/75">{m.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-primary/20 px-1 pt-3">
        <span className="font-mono-tab text-xs font-heavy text-primary">
          {current + 1} / {maxIndex + 1}
        </span>
        <div className="flex gap-2">
          <motion.button
            type="button"
            aria-label="Previous milestones"
            onClick={() => setIndex(Math.max(0, current - 1))}
            disabled={current === 0}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="border border-primary/40 bg-background p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-background disabled:hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next milestones"
            onClick={() => setIndex(Math.min(maxIndex, current + 1))}
            disabled={current === maxIndex}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="border border-primary/40 bg-background p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-background disabled:hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
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
        description="Pan-India B2B express cargo and logistics since 2000, delivered with a custodian-first promise."
        path="/about"
      />
      <TopBar />
      <Navbar />

      {/* Hero — light, minimal red */}
      <section className="relative bg-white border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 py-12 lg:py-16 relative grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">About Scorpion Express</span>
            </div>
            <h1 className="font-display uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground">
              Pan-India B2B <br /> express cargo & logistics<span className="text-primary">.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed">
              The driving force behind the Scorpion Group's ventures — founded on
              one unwavering principle: <strong className="text-foreground font-bold">Custodian First, Carrier Later.</strong>
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-3 -left-3 h-20 w-20 border-l-4 border-t-4 border-primary" aria-hidden="true" />
            <img
              src={aboutHero}
              alt="Scorpion Express last-mile fleet lined up at the company depot"
              loading="lazy"
              width={1040}
              height={485}
              className="relative w-full aspect-[4/3] object-cover border border-border"
            />
            <div className="absolute bottom-0 left-0 bg-primary px-5 py-3 text-primary-foreground font-bold uppercase text-xs tracking-widest">
              Delivering across India since 2000
            </div>
          </div>
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

          <MilestonesSlider />
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

          {/* Both directors share the same full-width portrait treatment. */}
          {leadership.slice(0, 2).map((leader) => {
            const photo = leader.photo_url || LOCAL_PHOTOS[leader.name] || null;
            const isShalini = leader.name === "Shalini Singh";
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col lg:flex-row bg-muted mb-16 shadow-xl border border-border overflow-hidden"
              >
                {/* Portrait */}
                <div className="lg:w-5/12 relative shrink-0">
                  <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[560px]">
                  {photo ? (
                    <img
                      src={photo}
                      alt={leader.name}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-muted to-white">
                      <UserIcon className="h-16 w-16 text-border" strokeWidth={1} />
                      <span className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                        Photo coming soon
                      </span>
                    </div>
                  )}
                  </div>
                  {/* Keep the mobile credo below the portrait so it never covers the photo. */}
                  <div className="relative lg:absolute lg:bottom-0 lg:left-0 bg-primary text-primary-foreground px-6 py-4 md:p-8 z-10 lg:max-w-[85%]">
                    <p className="font-display text-xl md:text-2xl uppercase leading-tight">
                      Custodian First,<br />Carrier Later
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:w-7/12 p-8 md:p-14 lg:p-20 flex flex-col justify-center relative">
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-foreground/5 pointer-events-none"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="h-px w-10 bg-primary" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Leadership</span>
                    </div>
                    <h3 className="font-display uppercase text-4xl md:text-6xl text-foreground tracking-tight leading-[0.95] mb-3">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-8">
                      {isShalini ? "Director — Scorpion Express Pvt. Ltd." : leader.role}
                    </p>
                    <div className="w-20 h-1.5 bg-foreground mb-8" aria-hidden="true" />
                    {isShalini ? (
                      <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-2xl border-l-2 border-primary pl-5">
                        “Great leadership brings strength to every journey, care to every decision, and confidence to every person.”
                      </blockquote>
                    ) : (
                      <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl">
                        The founder of the Scorpion Group, whose vision of
                        <strong className="text-foreground"> "Custodian First, Carrier Later" </strong>
                        has shaped a culture of safeguarding every consignment — building a trusted pan-India logistics network over two decades.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}


          {/* Remaining leadership in the same order */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-stretch">
            {leadership.slice(2).map((leader) => {
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
