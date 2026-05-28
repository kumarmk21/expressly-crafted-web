import { Phone, Mail, Facebook, Instagram, Linkedin, MapPin } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-primary text-white text-xs">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2.5">
        <div className="flex items-center gap-5">
          <a href="tel:18002219455" className="flex items-center gap-2 hover:text-white/80 transition-colors">
            <Phone className="h-3 w-3" />
            <span className="hidden sm:inline tracking-wide font-medium">1800 22 1945</span>
          </a>
          <span className="hidden md:inline h-3 w-px bg-white/30" />
          <a href="mailto:Info@Scorpiongroup.in" className="hidden md:flex items-center gap-2 hover:text-white/80 transition-colors">
            <Mail className="h-3 w-3" />
            <span className="tracking-wide font-medium">Info@Scorpiongroup.in</span>
          </a>
          <span className="hidden lg:inline h-3 w-px bg-white/30" />
          <span className="hidden lg:flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span className="tracking-wide font-medium">Pan-India Logistics Network</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] mr-3 text-white/70">Follow</span>
          {[
            { Icon: Facebook, href: "https://www.facebook.com/scorpiongroupmumbai/", label: "Facebook" },
            { Icon: Instagram, href: "https://www.instagram.com/scorpiongroupmumbai/", label: "Instagram" },
            { Icon: Linkedin, href: "https://www.linkedin.com/company/scorpionexpress/", label: "LinkedIn" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="h-7 w-7 flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
