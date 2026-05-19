import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, FileText, Scale, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import scorpionLogo from "@/assets/scorpion-logo.png";

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: ReactNode;
}

const legalNav = [
  { to: "/legal/privacy-policy", label: "Privacy Policy", icon: ShieldAlert },
  { to: "/legal/terms-and-conditions", label: "Terms & Conditions", icon: Scale },
  { to: "/legal/disclaimer", label: "Disclaimer", icon: FileText },
];

const LegalLayout = ({ title, subtitle, lastUpdated, children }: LegalLayoutProps) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <TopBar />
      <Navbar />

      {/* Red header band */}
      <header className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 grain pointer-events-none" />
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>
          <div className="flex items-start gap-5">
            <div className="h-14 w-14 bg-white rounded-sm p-2 hidden sm:flex items-center justify-center shrink-0">
              <img src={scorpionLogo} alt="Scorpion Express" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/70 mb-2">Legal</div>
              <h1 className="font-display text-4xl md:text-6xl uppercase">{title}</h1>
              {subtitle && <p className="mt-3 text-white/85 max-w-2xl text-base md:text-lg">{subtitle}</p>}
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/70">
                Last updated · {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 border border-neutral-200 bg-neutral-50">
              <div className="px-4 py-3 border-b border-neutral-200 bg-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Legal Center</div>
              </div>
              <nav className="p-2">
                {legalNav.map(({ to, label, icon: Icon }) => {
                  const active = pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center gap-3 px-3 py-3 text-sm border-l-2 transition-colors ${
                        active
                          ? "border-primary bg-white text-primary font-bold"
                          : "border-transparent text-neutral-700 hover:bg-white hover:text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-9">
            <div
              className="prose prose-neutral max-w-none
                prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-neutral-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-neutral-200
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-neutral-700 prose-p:leading-relaxed
                prose-strong:text-neutral-900
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-li:text-neutral-700 prose-ul:my-3"
            >
              {children}
            </div>

            <div className="mt-12 border-t border-neutral-200 pt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
              <p className="text-neutral-500">
                Questions? Email{" "}
                <a href="mailto:Info@Scorpiongroup.in" className="text-primary font-semibold hover:underline">
                  Info@Scorpiongroup.in
                </a>
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary/90"
              >
                Back to home
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
