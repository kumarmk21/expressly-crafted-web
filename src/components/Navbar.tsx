import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  Home,
  Info,
  Package,
  Network,
  Cpu,
  PhoneCall,
  Truck,
  Plane,
  Snowflake,
  FlaskConical,
  Warehouse,
  Sparkles,
  Luggage,
  Recycle,
  Boxes,
  Wind,
  FileText,
} from "lucide-react";
import scorpionLogo from "@/assets/scorpion-logo.png";
import { useQuote } from "@/context/QuoteContext";

type ChildLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: ChildLink[];
};

const navLinks: NavItem[] = [
  { label: "Home", href: "#", icon: Home },
  { label: "About Us", href: "#about", icon: Info },
  {
    label: "Services",
    href: "#services",
    icon: Package,
    children: [
      { label: "Express Cargo", href: "#", icon: Truck, desc: "Time-definite surface delivery" },
      { label: "FTL Service", href: "#", icon: Boxes, desc: "Dedicated full truckload" },
      { label: "Air Service", href: "#", icon: Plane, desc: "Priority air freight" },
      { label: "Cold Chain", href: "#", icon: Snowflake, desc: "Temperature-controlled logistics" },
      { label: "Sample Distribution", href: "#", icon: FlaskConical, desc: "Pharma & lab samples" },
      { label: "Warehousing", href: "#", icon: Warehouse, desc: "Storage & fulfillment" },
      { label: "Clean Tech Solutions", href: "#", icon: Sparkles, desc: "Sustainable logistics" },
      { label: "Smart Baggage", href: "#", icon: Luggage, desc: "Door-to-door baggage" },
      { label: "E-Waste Management", href: "#", icon: Recycle, desc: "Responsible disposal" },
      { label: "Stockiest Distribution", href: "#", icon: Wind, desc: "Channel partner network" },
    ],
  },
  { label: "Network & Infra", href: "#", icon: Network },
  { label: "Technology", href: "#", icon: Cpu },
  { label: "Contact Us", href: "#contact", icon: PhoneCall },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0" aria-label="Scorpion Express Home">
          <img
            src={scorpionLogo}
            alt="Scorpion Express logo"
            className="h-12 lg:h-14 w-auto object-contain"
          />
          <span className="hidden md:flex flex-col leading-tight border-l border-border pl-3">
            <span className="text-base font-black text-foreground tracking-tight">
              Scorpion Express
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Custodian First, Carrier Later
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1.5 bg-muted/40 border border-border rounded-xl p-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            if (link.children) {
              return (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-foreground bg-background border border-border shadow-sm hover:border-primary/50 hover:text-primary transition-all">
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  {/* Mega menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-[640px] bg-popover border border-border rounded-xl shadow-2xl p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {link.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <a
                              key={child.label}
                              href={child.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group/item"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                                <ChildIcon className="h-4 w-4" />
                              </span>
                              <span className="flex flex-col">
                                <span className="text-sm font-semibold text-foreground">
                                  {child.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {child.desc}
                                </span>
                              </span>
                            </a>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Looking for tailored logistics?
                        </span>
                        <a
                          href="#contact"
                          className="font-semibold text-primary hover:underline"
                        >
                          Talk to an expert →
                        </a>
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-foreground bg-background border border-border shadow-sm hover:border-primary/50 hover:text-primary transition-all whitespace-nowrap"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Portal buttons */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href="#"
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold border border-border rounded-lg hover:bg-muted hover:border-primary/40 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Employee
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold red-gradient text-primary-foreground rounded-lg shadow-sm hover:shadow-md hover:opacity-95 transition-all"
          >
            <User className="h-4 w-4" />
            Customer Portal
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-foreground rounded-md hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              if (link.children) {
                return (
                  <div key={link.label} className="rounded-lg border border-border overflow-hidden">
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-foreground bg-muted/40"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        {link.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-2 bg-background">
                        {link.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <a
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <ChildIcon className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {child.label}
                              </span>
                            </a>
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
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-foreground hover:bg-muted border border-transparent hover:border-border"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 mt-3 grid grid-cols-2 gap-2 border-t border-border">
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold border border-border rounded-lg hover:bg-muted"
              >
                <LogIn className="h-4 w-4" /> Employee
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold red-gradient text-primary-foreground rounded-lg"
              >
                <User className="h-4 w-4" /> Customer
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
