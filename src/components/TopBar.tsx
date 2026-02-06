import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center gap-6">
          <a href="tel:18002219455" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">1800 22 1945</span>
          </a>
          <a href="mailto:Info@Scorpiongroup.in" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Info@Scorpiongroup.in</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/scorpionexpress" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/scorpionexpress" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/company/scorpionexpress" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://www.youtube.com/@scorpionexpress" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="YouTube">
            <Youtube className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
