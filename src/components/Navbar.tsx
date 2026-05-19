import { useState } from "react";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import scorpionLogo from "@/assets/scorpion-logo.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Express Cargo", href: "#" },
      { label: "FTL Service", href: "#" },
      { label: "Air Service", href: "#" },
      { label: "Cold Chain", href: "#" },
      { label: "Sample Distribution", href: "#" },
      { label: "Warehousing", href: "#" },
      { label: "Clean Tech Solutions", href: "#" },
      { label: "Smart Baggage", href: "#" },
      { label: "E-Waste Management", href: "#" },
      { label: "Stockiest Distribution", href: "#" },
    ],
  },
  { label: "Network & Infra", href: "#" },
  { label: "Technology", href: "#" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0" aria-label="Scorpion Express Home">
          <img
            src={scorpionLogo}
            alt="Scorpion Express logo"
            className="h-12 lg:h-14 w-auto object-contain"
          />
          <span className="hidden md:flex flex-col leading-tight border-l border-border pl-3">
            <span className="text-base font-black text-foreground tracking-tight">Scorpion Express</span>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Custodian First, Carrier Later</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-popover-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Portal buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Employee Portal
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold red-gradient text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <User className="h-4 w-4" />
            Customer Portal
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-foreground"
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {servicesOpen && (
                    <div className="pl-6 space-y-1">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-semibold text-foreground hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
            <div className="pt-4 space-y-2 border-t border-border">
              <a href="#" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-foreground hover:text-primary">
                <LogIn className="h-4 w-4" /> Employee Portal
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary">
                <User className="h-4 w-4" /> Customer Portal
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
