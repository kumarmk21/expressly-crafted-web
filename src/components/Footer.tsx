import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Lock } from "lucide-react";
import scorpionLogo from "@/assets/scorpion-logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-foreground relative overflow-hidden border-t border-border pb-14 md:pb-0">
      {/* Brand strip — red band */}
      <div className="overflow-hidden bg-primary">
        <div className="flex animate-marquee whitespace-nowrap py-1.5 text-white">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-5 px-5">
              <span className="font-display text-sm tracking-wide">Scorpion Express</span>
              <span className="text-[9px] tracking-[0.3em] opacity-80">Custodian First · Carrier Later</span>
              <span className="h-1 w-1 rounded-full bg-white/70" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-7">
        <div className="grid lg:grid-cols-2 gap-7 lg:gap-12">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-4 mb-3">
              <img
                src={scorpionLogo}
                alt="Scorpion Express"
                className="h-10 w-auto object-contain"
                width={585}
                height={348}
              />
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground">Custodian First, Carrier Later</div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              Pan-India B2B express cargo and logistics since 2000. Custodian First, Carrier Later.
            </p>
            <div className="flex gap-2 mt-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/scorpiongroupmumbai/", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/scorpiongroupmumbai/", label: "Instagram" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/scorpionexpress/", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center border border-border text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact block */}
          <div className="lg:border-l lg:border-border lg:pl-16">
            <h4 className="text-[11px] font-semibold text-muted-foreground mb-3">Get in touch</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a href="tel:18002219455" className="flex items-start gap-3 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span><span className="block text-[10px] tracking-wider text-muted-foreground/70">Toll Free</span>1800 22 1945</span>
                </a>
              </li>
              <li>
                <a href="mailto:Info@Scorpiongroup.in" className="flex items-start gap-3 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span><span className="block text-[10px] tracking-wider text-muted-foreground/70">Email</span>Info@Scorpiongroup.in</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span><span className="block text-[10px] tracking-wider text-muted-foreground/70">Registered Office</span>404, Shah Nahar Industrial Estate, Dr E Moses Road, Worli, Mumbai 400018, Maharashtra, India</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/employee-login" className="text-xs px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors font-semibold">
                Employee Portal
              </Link>
              <a href="https://cms.scorpiongroup.in/" className="text-xs px-4 py-2 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                Customer Portal
              </a>
            </div>
          </div>
        </div>

        {/* Statutory company information — legal requirement */}
        <div className="mt-10 border-t border-border pt-6">
          <div className="text-[11px] font-semibold text-primary mb-3">Company Information</div>
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
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Scorpion Express Pvt. Ltd. · All rights reserved.</p>
          <div className="flex gap-6">
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
