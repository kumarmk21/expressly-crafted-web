import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Shield,
  LogIn,
  Truck,
  Plane,
  Snowflake,
  Warehouse,
  Recycle,
  PackageCheck,
  FileText,
  ArrowUpRight,
  Stethoscope,
} from "lucide-react";
import scorpionLogo from "@/assets/scorpion-logo.png";
import { useQuote } from "@/context/QuoteContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Part Load (LTL)", to: "/services/ltl", icon: PackageCheck, desc: "Pan-India B2B part-load cargo" },
      { label: "Express", to: "/services/express", icon: PackageCheck, desc: "Time-definite surface delivery" },
      { label: "Air Express", to: "/services/air", icon: Plane, desc: "Priority air cargo delivery" },
      { label: "MRConnect", to: "/services/mrconnect", icon: Stethoscope, desc: "Pharma field-force logistics" },
      { label: "Cold Chain", to: "/services/cold-chain", icon: Snowflake, desc: "Temperature-controlled logistics", tone: "sky" },
      { label: "Warehousing", to: "/services/wms", icon: Warehouse, desc: "Warehousing & fulfilment" },
      { label: "Cleantech", to: "/services/cleantech", icon: Recycle, desc: "Sustainable reverse logistics", tone: "emerald" },
      { label: "Full Truck Load (FTL)", to: "/services/ftl", icon: Truck, desc: "Dedicated full truck load" },
    ],
  },
  {
    label: "Industries",
    href: "#industries",
    children: [
      { label: "Pharma & Healthcare", to: "/industries/pharma", icon: Stethoscope, desc: "Temperature-safe medicines" },
      { label: "Auto Parts", to: "/industries/auto-parts", icon: Truck, desc: "Spares to plants & dealers" },
      { label: "Electronics", to: "/industries/electronics", icon: PackageCheck, desc: "Secure high-value devices" },
      { label: "FMCG", to: "/industries/fmcg", icon: Warehouse, desc: "High-volume distribution" },
      { label: "E-commerce", to: "/industries/ecommerce", icon: PackageCheck, desc: "Line-haul & returns" },
    ],
  },
  { label: "Network & Infra", href: "/network" },
  { label: "Technology", href: "/technology" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { openQuote } = useQuote();

  return (
    <nav className="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-4 px-3 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="Scorpion Express Home">
          <div className="flex items-center gap-2.5">
            <img
              src={scorpionLogo}
              alt="Scorpion Express logo"
              className="h-11 w-auto lg:h-12 rounded-md object-contain transition-transform group-hover:scale-[1.03]"
              width={585}
              height={348}
            />
            <span className="hidden sm:block border-l-2 border-primary pl-2.5 text-[11px] font-semibold leading-tight text-foreground/80">
              Custodian First,<br />
              <span className="text-primary">Carrier Later</span>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden nav:flex flex-1 items-center justify-center gap-1 min-w-0">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="relative group">
                  <Button variant="outline" className="flex items-center gap-1 h-auto rounded-none px-1.5 py-2.5 2xl:px-3 text-[12px] navmd:text-[13px] 2xl:text-[15px] font-heavy text-primary border border-primary/55 bg-primary/[0.05] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors whitespace-nowrap">
                    {link.label}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-[640px] bg-card border border-border shadow-2xl">
                      <div className="grid grid-cols-2">
                        {link.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <Link
                              key={child.label}
                              to={child.to}
                              className="flex items-start gap-3 p-4 border-b border-r border-border last:border-r-0 hover:bg-primary/5 transition-colors group/item"
                            >
                              <span className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors ${
                                child.tone === "sky"
                                  ? "bg-sky-500/10 text-sky-600 group-hover/item:bg-sky-500 group-hover/item:text-white"
                                  : child.tone === "emerald"
                                  ? "bg-emerald-500/10 text-emerald-600 group-hover/item:bg-emerald-500 group-hover/item:text-white"
                                  : "bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white"
                              }`}>
                                <Icon className="h-4 w-4" />
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-foreground uppercase tracking-wide">{child.label}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover/item:text-primary" />
                                </div>
                                <p className="text-xs text-muted-foreground">{child.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="p-3 flex items-center justify-between bg-muted">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Custom requirement?</span>
                        <Button variant="link" onClick={() => openQuote()} className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider hover:underline">
                          <FileText className="h-3.5 w-3.5" /> Request a Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className="h-auto rounded-none px-1.5 py-2.5 2xl:px-3 text-[12px] navmd:text-[13px] 2xl:text-[15px] font-heavy text-primary border border-primary/55 bg-primary/[0.05] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Portals */}
        <div className="hidden nav:flex items-center gap-1.5 shrink-0">
          <Link
            to="/employee-login"
            className="flex items-center gap-2 px-2 py-2.5 2xl:px-2.5 text-[12px] navmd:text-[13px] 2xl:text-[15px] font-heavy text-primary border border-primary/55 bg-primary/[0.05] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors whitespace-nowrap"
          >
            <LogIn className="h-4 w-4 shrink-0" /> Employee
          </Link>
          <Link
            to="/customer-portal"
            className="flex items-center gap-2 px-2.5 py-2.5 2xl:px-3 text-[12px] navmd:text-[13px] 2xl:text-[15px] font-heavy bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            <User className="h-4 w-4 shrink-0" /> Customer Portal
          </Link>



        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="nav:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav:hidden bg-background border-t border-border max-h-[calc(100vh-90px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label} className="border border-border">
                    <Button
                      variant="outline"
                      className="flex h-auto items-center justify-between w-full rounded-none px-4 py-3.5 text-base font-heavy text-primary bg-primary/[0.05] border-primary/55"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >

                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </Button>
                    {mobileServicesOpen && (
                      <div>
                        {link.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <Link
                              key={child.label}
                              to={child.to}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 border-t border-border hover:bg-primary/5"
                            >
                              <span className={`flex h-8 w-8 items-center justify-center ${
                                child.tone === "sky"
                                  ? "bg-sky-500/10 text-sky-600"
                                  : child.tone === "emerald"
                                  ? "bg-emerald-500/10 text-emerald-600"
                                  : "bg-primary/10 text-primary"
                              }`}>
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-heavy text-primary">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 text-base font-heavy text-primary bg-primary/[0.05] border border-primary/55 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </a>

              );
            })}
            <div className="pt-3 mt-3 grid grid-cols-2 gap-2 border-t border-border">
              <Link
                to="/employee-login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-3 text-sm font-heavy text-primary border border-primary/55 bg-primary/[0.05]"
              >
                <LogIn className="h-4 w-4" /> Employee
              </Link>
              <Link
                to="/customer-portal"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-3 text-sm font-heavy bg-primary text-primary-foreground"
              >
                <User className="h-4 w-4" /> Customer
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
