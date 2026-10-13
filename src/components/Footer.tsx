import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowUpRight, Lock } from "lucide-react";
import scorpionLogo from "@/assets/scorpion-logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-foreground relative overflow-hidden border-t border-border pb-14 md:pb-0">
      {/* Marquee brand strip — red band */}
      <div className="overflow-hidden bg-primary">
        <div className="flex animate-marquee whitespace-nowrap py-4 text-white">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-6">
              <span className="font-display uppercase text-2xl tracking-wide">Scorpion Express</span>
              <span className="text-xs uppercase tracking-[0.3em] opacity-80">Custodian First · Carrier Later</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={scorpionLogo}
                alt="Scorpion Express"
                className="h-14 w-auto object-contain"
                width={585}
                height={348}
              />
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">Custodian First, Carrier Later</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Pan-India B2B express cargo and logistics since 2000. <strong className="text-foreground">Custodian First, Carrier Later.</strong>
            </p>
            <div className="flex gap-2 mt-8">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/scorpiongroupmumbai/", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/scorpiongroupmumbai/", label: "Instagram" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/scorpionexpress/", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-3">
            <div className="border border-primary/30 bg-primary/[0.04] p-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Navigate</h4>
              <ul className="space-y-2">
                {[
                  { l: "Home", h: "/" },
                  { l: "About", h: "/about" },
                  { l: "Services", h: "#services" },
                  { l: "Network & Infra", h: "/network" },
                  { l: "Careers", h: "/careers" },
                  { l: "Contact", h: "#contact" },
                ].map((link) => (
                  <li key={link.l}>
                    <a
                      href={link.h}
                      className="group inline-flex w-full items-center justify-between gap-2 border border-border bg-background px-3 py-2.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      {link.l}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <div className="border border-primary/30 bg-primary/[0.04] p-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Services</h4>
              <ul className="space-y-2">
                {[
                  ["Part Load (LTL)", "ltl"],
                  ["Express", "express"],
                  ["Air Express", "air"],
                  ["Cold Chain", "cold-chain"],
                  ["Warehousing", "wms"],
                  ["Cleantech Solutions", "cleantech"],
                  ["Full Truck Load (FTL)", "ftl"],
                ].map(([label, slug]) => (
                  <li key={slug}>
                    <Link
                      to={`/services/${slug}`}
                      className="group inline-flex w-full items-center justify-between gap-2 border border-border bg-background px-3 py-2.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      {label}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-5">Get in touch</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="tel:18002219455" className="flex items-start gap-3 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span><div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Toll Free</div>1800 22 1945</span>
                </a>
              </li>
              <li>
                <a href="mailto:Info@Scorpiongroup.in" className="flex items-start gap-3 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span><div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Email</div>Info@Scorpiongroup.in</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span><div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Registered Office</div>404, Shah Nahar Industrial Estate, Dr E Moses Road, Worli, Mumbai 400018, Maharashtra, India</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/employee-login" className="text-[10px] uppercase tracking-wider px-3 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors font-bold">
                Employee Portal
              </Link>
              <a href="https://cms.scorpiongroup.in/" className="text-[10px] uppercase tracking-wider px-3 py-2 bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                Customer Portal
              </a>
            </div>
          </div>
        </div>

        {/* Statutory company information — legal requirement */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-4">Company Information</div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-xs text-muted-foreground leading-relaxed">
            <div>
              <p className="text-sm font-semibold text-foreground">SCORPION EXPRESS PRIVATE LIMITED</p>
              <p className="mt-2">Registered Office: 404, Shah Nahar Industrial Estate,<br />Dr E Moses Road, Worli, Mumbai 400018, Maharashtra, India</p>
            </div>
            <div className="space-y-1.5">
              <p><span className="text-foreground font-semibold">CIN:</span> U51109BR2006PTC012270</p>
              <p><span className="text-foreground font-semibold">GSTIN:</span> 27AAJCS7860C1Z5</p>
              <p><span className="text-foreground font-semibold">Toll Free:</span> 1800 22 1945 &nbsp;·&nbsp; <span className="text-foreground font-semibold">Email:</span> Info@Scorpiongroup.in</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-muted/40">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Scorpion Express Pvt. Ltd. · All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-wider">
            <Link to="/legal/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/legal/terms-and-conditions" className="hover:text-primary">Terms &amp; Conditions</Link>
            <Link to="/legal/disclaimer" className="hover:text-primary">Disclaimer</Link>
            <Link to="/admin" aria-label="Admin panel" title="Admin panel" className="inline-flex items-center gap-1 hover:text-primary">
              <Lock className="h-3.5 w-3.5" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
