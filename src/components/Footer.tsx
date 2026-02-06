import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="dark-gradient text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <div className="mb-6">
              <div className="bg-primary rounded-lg p-2 inline-block">
                <span className="text-primary-foreground font-black text-lg">SCORPION</span>
              </div>
              <span className="ml-2 text-sm font-semibold text-secondary-foreground/60">EXPRESS</span>
            </div>
            <p className="text-sm text-secondary-foreground/60 leading-relaxed mb-6">
              Custodian First, Carrier Later. India's premier freight & logistics service provider delivering excellence across 24,000+ pincodes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-9 w-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["Home", "About Us", "Services", "Network & Infra", "Technology", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm">
              {["Express Cargo", "FTL Service", "Air Service", "Cold Chain", "Sample Distribution", "Warehousing", "Clean Tech", "Smart Baggage"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <a href="tel:18002219455" className="flex items-start gap-3 text-secondary-foreground/60 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                1800 22 1945 (Toll Free)
              </a>
              <a href="mailto:Info@Scorpiongroup.in" className="flex items-start gap-3 text-secondary-foreground/60 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Info@Scorpiongroup.in
              </a>
              <div className="flex items-start gap-3 text-secondary-foreground/60">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Scorpion Express Pvt. Ltd., Mumbai, India
              </div>
            </div>

            {/* Portals */}
            <div className="mt-8 space-y-2">
              <a href="#" className="block text-sm font-semibold text-primary hover:underline">
                → Employee Portal
              </a>
              <a href="#" className="block text-sm font-semibold text-primary hover:underline">
                → Customer Portal
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/40">
          <p>© {new Date().getFullYear()} Scorpion Express Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
