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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Express", to: "/services/express", icon: PackageCheck, desc: "Time-definite surface delivery" },
      { label: "Air", to: "/services/air", icon: Plane, desc: "Priority air freight" },
      { label: "MRConnect", to: "/services/mrconnect", icon: Stethoscope, desc: "Pharma field-force logistics" },
      { label: "Cold Chain", to: "/services/cold-chain", icon: Snowflake, desc: "Temperature-controlled logistics", tone: "sky" },
      { label: "Warehousing", to: "/services/wms", icon: Warehouse, desc: "Warehousing & fulfilment" },
      { label: "Cleantech", to: "/services/cleantech", icon: Recycle, desc: "Sustainable reverse logistics", tone: "emerald" },
      { label: "FTL", to: "/services/ftl", icon: Truck, desc: "Dedicated full truckload" },
    ],
  },
  { label: "Network & Infra", href: "/network" },
  { label: "Technology", href: "#tech" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { openQuote } = useQuote();

  return (
    <nav className="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="Scorpion Express Home">
          <div className="h-12 w-12 lg:h-14 lg:w-14 bg-white rounded-sm flex items-center justify-center p-1.5 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
            <img src={scorpionLogo} alt="Scorpion Express logo" className="h-full w-full object-contain" />
          </div>
          <div className="hidden md:flex flex-col leading-none">
            <span className="font-display text-2xl text-foreground tracking-wide">
              SCORPION<span className="text-primary">.</span>
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.25em] mt-1">
              Custodian First · Carrier Later
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold tracking-wide uppercase text-foreground/80 border border-border bg-card hover:bg-primary hover:text-white hover:border-primary transition-colors">
                    {link.label}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </button>
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
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
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
                        <button onClick={() => openQuote()} className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider hover:underline">
                          <FileText className="h-3.5 w-3.5" /> Request a Quote
                        </button>
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
                className="px-3.5 py-2 text-xs font-bold tracking-wide uppercase text-foreground/80 border border-border bg-card hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Portals */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary bg-card hover:bg-primary hover:text-white transition-colors"
          >
            <Shield className="h-3.5 w-3.5" /> Admin
          </Link>
          <Link
            to="/employee-login"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-foreground/80 border border-border bg-card hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <LogIn className="h-3.5 w-3.5" /> Employee
          </Link>
          <Link
            to="/customer-portal"
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <User className="h-3.5 w-3.5" /> Customer Portal
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-foreground hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border max-h-[calc(100vh-90px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label} className="border border-border">
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold uppercase tracking-wider text-foreground bg-muted"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
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
                              <span className="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-bold uppercase tracking-wide">{child.label}</span>
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
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wider text-foreground/80 bg-card border border-border hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 mt-3 grid grid-cols-2 gap-2 border-t border-border">
              <Link
                to="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="col-span-2 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider border border-primary text-primary"
              >
                <Shield className="h-3.5 w-3.5" /> Admin Login
              </Link>
              <Link
                to="/employee-login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider border border-border"
              >
                <LogIn className="h-3.5 w-3.5" /> Employee
              </Link>
              <Link
                to="/customer-portal"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider bg-primary text-white"
              >
                <User className="h-3.5 w-3.5" /> Customer
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
