import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Seo from "@/components/Seo";
import { getIndustryBySlug, industries } from "@/data/industries";
import { useQuote } from "@/context/QuoteContext";
import NotFound from "./NotFound";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;
  const { openQuote } = useQuote();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!industry) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${industry.name} Logistics | Scorpion Express`}
        description={`${industry.tagline} See how Scorpion Express handles ${industry.name.toLowerCase()} cargo across India.`}
        path={`/industries/${industry.slug}`}
      />
      <TopBar />
      <Navbar />

      <section className="relative overflow-hidden border-b border-border">
        <img src={industry.image} alt={`${industry.name} logistics`} width={1280} height={720} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Industries We Serve</div>
          <h1 className="font-display uppercase text-4xl md:text-6xl text-background leading-[0.95]">{industry.name}</h1>
          <p className="mt-4 max-w-2xl text-background/85 text-base md:text-lg">{industry.tagline}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed">{industry.intro}</p>
          <h2 className="mt-8 font-display uppercase text-xl text-foreground mb-3">Key challenges</h2>
          <ul className="space-y-2">
            {industry.challenges.map((c) => (
              <li key={c} className="flex gap-2 text-foreground/80"><AlertTriangle className="h-4 w-4 mt-1 text-primary shrink-0" />{c}</li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border p-6 md:p-8">
          <h2 className="font-display uppercase text-xl text-foreground mb-4">How we handle it</h2>
          <ul className="space-y-3">
            {industry.howWeHandle.map((h) => (
              <li key={h} className="flex gap-2 text-foreground/80"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" />{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3"><Quote className="h-4 w-4" /> Example from our operations</div>
          <h2 className="font-display text-2xl md:text-3xl text-foreground">{industry.example.title}</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">The need</div>
              <p className="text-foreground/80 text-sm leading-relaxed">{industry.example.situation}</p>
            </div>
            <div className="bg-card border border-border p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">What we did</div>
              <ul className="space-y-2 text-sm text-foreground/80">
                {industry.example.approach.map((a) => (<li key={a} className="flex gap-2"><span className="text-primary font-bold">•</span>{a}</li>))}
              </ul>
            </div>
            <div className="bg-primary text-primary-foreground p-5">
              <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-2">Result</div>
              <p className="text-sm leading-relaxed">{industry.example.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-2">Related services</div>
            <div className="flex flex-wrap gap-2">
              {industry.services.map((s) => (
                <Link key={s.to} to={s.to} className="px-4 py-2 border border-border text-sm font-bold hover:border-primary hover:text-primary">{s.label}</Link>
              ))}
            </div>
          </div>
          <button onClick={() => openQuote()} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-black uppercase tracking-wider hover:bg-primary/90">
            Get a quote <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-10 border-t border-border pt-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">Other industries</div>
          <div className="flex flex-wrap gap-2">
            {industries.filter((i) => i.slug !== industry.slug).map((i) => (
              <Link key={i.slug} to={`/industries/${i.slug}`} className="px-4 py-2 bg-muted text-sm font-semibold hover:text-primary">{i.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryDetail;
