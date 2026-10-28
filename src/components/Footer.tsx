import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import scorpionLogo from "@/assets/scorpion-logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="compact-footer border-t-2 border-primary bg-secondary/40 text-foreground pb-14 md:pb-0">
      <div className="container mx-auto px-4 py-5 lg:py-6">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.4fr_1fr] lg:gap-8">
          <div>
            <img src={scorpionLogo} alt="Scorpion Express" className="h-10 w-auto rounded-sm object-contain" width={585} height={348} loading="lazy" />
            <p className="mt-2 text-xs font-semibold">Custodian First, Carrier Later</p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">Pan-India B2B express cargo and logistics since 2000.</p>
            <div className="mt-2 flex gap-1">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/scorpiongroupmumbai/", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/scorpiongroupmumbai/", label: "Instagram" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/scorpionexpress/", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <Button key={label} asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon className="h-4 w-4" /></a>
                </Button>
              ))}
            </div>
          </div>
          <div className="min-w-0 border-t border-border pt-4 md:border-t-0 md:pt-0">
            <p className="text-sm font-semibold">SCORPION EXPRESS PRIVATE LIMITED</p>
            <div className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p><span className="font-semibold text-foreground">Registered Office:</span> 404, Shah Nahar Industrial Estate, Dr E Moses Road, Worli, Mumbai 400018, Maharashtra, India</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <p><span className="font-semibold text-foreground">CIN:</span> U51109BR2006PTC012270</p>
              <p><span className="font-semibold text-foreground">GSTIN:</span> 27AAJCS7860C1Z5</p>
            </div>
          </div>
          <div className="min-w-0 border-t border-border pt-4 md:border-t-0 md:pt-0">
            <h4 className="mb-2 text-sm font-semibold">Get in touch</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <a href="tel:1800221945" className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4 shrink-0 text-primary" /><span>Toll Free: 1800 22 1945</span></a>
              <a href="mailto:Info@Scorpiongroup.in" className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4 shrink-0 text-primary" /><span className="break-all">Info@Scorpiongroup.in</span></a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="h-8 px-2.5 text-xs"><Link to="/employee-login">Employee Portal</Link></Button>
              <Button asChild size="sm" className="h-8 px-2.5 text-xs"><a href="https://cms.scorpiongroup.in/" target="_blank" rel="noopener noreferrer">Customer Portal</a></Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <p>© {year} Scorpion Express Pvt. Ltd. · All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/legal/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/legal/terms-and-conditions" className="hover:text-primary">Terms &amp; Conditions</Link>
            <Link to="/legal/disclaimer" className="hover:text-primary">Disclaimer</Link>
            <Link to="/admin" aria-label="Admin panel" title="Admin panel" className="inline-flex items-center gap-1 hover:text-primary"><Lock className="h-3 w-3" /> Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
