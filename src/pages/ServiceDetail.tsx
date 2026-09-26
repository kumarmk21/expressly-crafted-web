import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, CheckCircle2, FileText, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Seo from "@/components/Seo";
import { getServiceBySlug, services } from "@/data/services";
import { useQuote } from "@/context/QuoteContext";
import ColdChainExtras from "@/components/services/ColdChainExtras";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const { openQuote } = useQuote();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Navbar />
        <main className="container mx-auto px-4 py-24 text-center flex-1">
          <h1 className="text-3xl font-black mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
          <Link to="/#services" className="inline-flex items-center gap-2 text-primary font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={`${service.title} | Scorpion Express`}
        description={service.desc.slice(0, 158)}
        path={`/services/${service.slug}`}
        image={service.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.desc,
          provider: { "@type": "Organization", name: "Scorpion Express Pvt. Ltd.", url: "https://expressly-crafted-web.lovable.app" },
          areaServed: "IN",
        }}
      />
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={`${service.title} service`}
            className="h-full w-full object-cover"
            width={1280}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="container mx-auto px-4 py-20 lg:py-28 relative">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className={`h-12 w-12 rounded-xl ${service.iconColor} flex items-center justify-center shadow-lg`}>
                <Icon className="h-6 w-6 text-primary-foreground" />
              </span>
              <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Service — {service.no}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">{service.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openQuote(service.title)}
                className="inline-flex items-center gap-2 px-5 py-3 red-gradient text-primary-foreground font-bold rounded-lg shadow hover:opacity-95"
              >
                <FileText className="h-4 w-4" /> Get a Quote
              </button>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-3 border border-border bg-background font-bold rounded-lg hover:border-primary/50"
              >
                <Phone className="h-4 w-4" /> Talk to an Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Overview</span>
              <h2 className="text-2xl lg:text-3xl font-black mt-2 mb-4">What we deliver</h2>
              <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              {service.content?.length > 0 && (
                <div className="mt-5 space-y-4">
                  {service.content.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.gallery && service.gallery.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">In the Field</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {service.gallery.map((g) => (
                    <figure key={g.src} className="rounded-xl overflow-hidden border border-border bg-card">
                      <img
                        src={g.src}
                        alt={g.caption}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="w-full aspect-[16/9] object-cover"
                      />
                      <figcaption className="p-3 text-xs text-muted-foreground leading-snug">
                        {g.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}


            <div>
              <h3 className="text-xl font-bold mb-4">Capabilities</h3>
              <div className="space-y-3">
                {service.capabilities.map((c) => (
                  <div key={c.title} className="p-5 rounded-xl border border-border bg-card">
                    <h4 className="font-bold text-foreground mb-1">{c.title}</h4>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl overflow-hidden border border-border">
              <img
                src={service.image}
                alt={`${service.title} operations`}
                loading="lazy"
                width={1280}
                height={800}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h4 className="font-bold mb-3">Industries We Serve</h4>
              <div className="flex flex-wrap gap-2">
                {service.industries.map((i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-foreground border border-border">
                    {i}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl red-gradient text-primary-foreground">
              <h4 className="font-black text-lg mb-2">Need a custom solution?</h4>
              <p className="text-sm opacity-90 mb-4">
                Our team will design a {service.title} plan tailored to your network.
              </p>
              <button
                onClick={() => openQuote(service.title)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-background text-foreground font-bold rounded-lg text-sm hover:opacity-95"
              >
                <FileText className="h-4 w-4" /> Request a Quote
              </button>
            </div>
          </aside>
        </div>
      </section>

      {service.slug === "cold-chain" && <ColdChainExtras />}

      <section className="py-16 border-t border-border bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-black mb-8">Explore other services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServices.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group bg-card rounded-xl p-5 border border-border hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className={`h-10 w-10 rounded-lg ${s.iconColor} flex items-center justify-center mb-3`}>
                    <SIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold group-hover:text-primary transition-colors">{s.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
