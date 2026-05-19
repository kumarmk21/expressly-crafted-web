import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import scorpionLogo from "@/assets/scorpion-logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Marquee brand strip */}
      <div className="border-y border-white/10 overflow-hidden bg-primary">
        <div className="flex animate-marquee whitespace-nowrap py-4 text-white">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-6">
              <span className="font-display uppercase text-2xl tracking-wide">Scorpion Express</span>
              <span className="text-xs uppercase tracking-[0.3em] opacity-70">Custodian First · Carrier Later</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-14 w-14 bg-white rounded-sm p-1.5 flex items-center justify-center">
                <img src={scorpionLogo} alt="Scorpion Express" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="font-display text-2xl tracking-wide">SCORPION<span className="text-primary">.</span></div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mt-0.5">Express Logistics</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              India's premier freight & logistics service provider — delivering custodial excellence across 24,000+ pincodes with 100+ years of combined leadership.
            </p>
            <div className="flex gap-2 mt-8">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center border border-white/15 hover:bg-primary hover:border-primary transition-colors" aria-label="Social link">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-5">Navigate</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                { l: "Home", h: "/" },
                { l: "About", h: "#about" },
                { l: "Services", h: "#services" },
                { l: "Network", h: "#network" },
                { l: "Contact", h: "#contact" },
              ].map((link) => (
                <li key={link.l}>
                  <a href={link.h} className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    {link.l}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                ["Express", "express"],
                ["Air", "air"],
                ["Cold Chain", "cold-chain"],
                ["WMS / Warehousing", "wms"],
                ["Cleantech Solutions", "cleantech"],
                ["FTL", "ftl"],
              ].map(([label, slug]) => (
                <li key={slug}>
                  <Link to={`/services/${slug}`} className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    {label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-5">Get in touch</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <a href="tel:18002219455" className="flex items-start gap-3 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span><div className="text-[10px] uppercase tracking-wider text-white/40">Toll Free</div>1800 22 1945</span>
                </a>
              </li>
              <li>
                <a href="mailto:Info@Scorpiongroup.in" className="flex items-start gap-3 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span><div className="text-[10px] uppercase tracking-wider text-white/40">Email</div>Info@Scorpiongroup.in</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span><div className="text-[10px] uppercase tracking-wider text-white/40">Head Office</div>Scorpion Express Pvt. Ltd., Mumbai, India</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/employee-login" className="text-[10px] uppercase tracking-wider px-3 py-2 border border-white/15 hover:border-primary hover:text-primary transition-colors font-bold">
                Employee Portal
              </Link>
              <a href="http://103.211.171.59:8000/" className="text-[10px] uppercase tracking-wider px-3 py-2 bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                Customer Portal
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Scorpion Express Pvt. Ltd. · All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-wider">
            <Link to="/legal/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/legal/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/legal/disclaimer" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
