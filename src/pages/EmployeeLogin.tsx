import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import {
  LogIn,
  LogOut,
  User as UserIcon,
  Lock,
  ArrowLeft,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowUpRight,
  ClipboardList,
  FileText,
  Users,
  Truck,
  MessageSquareWarning,
  Plane,
  BarChart3,
  Calculator,
  Upload,
  QrCode,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import scorpionLogo from "@/assets/scorpion-logo.png";

const SESSION_KEY = "scorpion_emp_session";

const loginSchema = z.object({
  userId: z
    .string()
    .trim()
    .min(3, { message: "User ID must be at least 3 characters" })
    .max(64, { message: "User ID is too long" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(128, { message: "Password is too long" }),
});

type Module = {
  name: string;
  desc: string;
  href: string;
  icon: typeof ClipboardList;
  group: "Operations" | "Finance" | "Tools" | "MIS";
};

const modules: Module[] = [
  {
    name: "CAPA Module",
    desc: "Corrective & preventive action tracker",
    href: "http://103.211.171.59:5000/",
    icon: ClipboardList,
    group: "Operations",
  },
  {
    name: "Purchase Order",
    desc: "Create, approve and track POs",
    href: "http://103.211.171.59:5029/",
    icon: FileText,
    group: "Finance",
  },
  {
    name: "Vendor Portal",
    desc: "Vendor onboarding & management",
    href: "http://103.211.171.59:5024/",
    icon: Users,
    group: "Operations",
  },
  {
    name: "Shipment Tracking",
    desc: "Live consignment tracking",
    href: "http://103.211.171.59:8073/",
    icon: Truck,
    group: "Operations",
  },
  {
    name: "Complaint Management",
    desc: "Customer complaint tickets & SLA",
    href: "http://103.211.171.59:8000/",
    icon: MessageSquareWarning,
    group: "Operations",
  },
  {
    name: "Travel Expense Portal",
    desc: "Submit & approve travel claims",
    href: "http://103.211.171.59:8026/",
    icon: Plane,
    group: "Finance",
  },
  {
    name: "Customer Shipment Analytics",
    desc: "Customer-facing analytics dashboard",
    href: "http://103.211.171.59:8021/",
    icon: BarChart3,
    group: "MIS",
  },
  {
    name: "Rate Finder",
    desc: "Lookup live freight rates",
    href: "http://103.211.171.59:5025/",
    icon: Calculator,
    group: "Tools",
  },
  {
    name: "LR Uploader",
    desc: "Bulk upload Lorry Receipts",
    href: "http://103.211.171.59:5002/",
    icon: Upload,
    group: "Tools",
  },
  {
    name: "QR Generator",
    desc: "Generate consignment QR labels",
    href: "http://103.211.171.59:5020/",
    icon: QrCode,
    group: "Tools",
  },
  {
    name: "MIS Portal",
    desc: "Scorpion Group MIS dashboards",
    href: "https://mis.scorpiongroup.in/",
    icon: LayoutDashboard,
    group: "MIS",
  },
];

const groupOrder: Module["group"][] = ["Operations", "Finance", "Tools", "MIS"];

const ModulesDashboard = ({ userId, onLogout }: { userId: string; onLogout: () => void }) => {
  const [query, setQuery] = useState("");
  const filtered = modules.filter((m) =>
    `${m.name} ${m.desc} ${m.group}`.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white border border-border rounded-sm p-1 flex items-center justify-center">
              <img src={scorpionLogo} alt="Scorpion Express" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg text-foreground tracking-wide">
                SCORPION<span className="text-primary">.</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Employee Portal</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <UserIcon className="h-4 w-4 text-primary" />
              <span>
                Signed in as <strong className="text-foreground">{userId}</strong>
              </span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-2 border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 lg:py-14">
        {/* Welcome strip */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Dashboard</span>
            </div>
            <h1 className="font-display uppercase text-4xl md:text-5xl text-foreground leading-[0.95]">
              Welcome back, {userId}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Quick access to all Scorpion Express internal applications.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules…"
              className="pl-9 h-11 bg-white"
              maxLength={64}
            />
          </div>
        </div>

        {/* Modules grouped */}
        {groupOrder.map((group) => {
          const items = filtered.filter((m) => m.group === group);
          if (items.length === 0) return null;
          return (
            <section key={group} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/60">{group}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {items.length} {items.length === 1 ? "module" : "modules"}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((m) => {
                  const Icon = m.icon;
                  return (
                    <a
                      key={m.name}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white border border-border p-5 hover:border-primary hover:shadow-lg transition-all flex items-start gap-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold uppercase tracking-wide text-sm text-foreground group-hover:text-primary transition-colors">
                            {m.name}
                          </h3>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mt-2 truncate">
                          {m.href.replace(/^https?:\/\//, "")}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white border border-border p-10 text-center text-muted-foreground">
            No modules matched "<strong className="text-foreground">{query}</strong>".
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-white">
        <div className="container mx-auto px-4 py-5 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Scorpion Express Pvt. Ltd. — Internal use only. Unauthorized access is prohibited.
        </div>
      </footer>
    </div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: (userId: string) => void }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ userId, password });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin(result.data.userId);
      toast.success(`Welcome, ${result.data.userId}!`);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-primary text-white p-12 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 opacity-10 grain pointer-events-none" />

        <Link to="/" className="relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/80 hover:text-white">
          <ArrowLeft className="h-3 w-3" /> Back to website
        </Link>

        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-14 w-14 bg-white rounded-sm p-1.5 flex items-center justify-center">
              <img src={scorpionLogo} alt="Scorpion Express" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="font-display text-3xl tracking-wide">SCORPION.</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/80 mt-0.5">Employee Portal</div>
            </div>
          </div>
          <h2 className="font-display uppercase text-5xl xl:text-6xl leading-[0.95] max-w-md">
            One sign-in. <br /> Every internal tool.
          </h2>
          <p className="mt-6 text-white/85 max-w-md leading-relaxed">
            Access CAPA, Purchase Orders, Vendor Portal, Shipment Tracking, MIS dashboards and every other Scorpion
            Group application from a single secure dashboard.
          </p>
        </div>

        <div className="relative flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/80">
          <ShieldCheck className="h-4 w-4" />
          <span>Authorized employees only · All sessions are monitored</span>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>

          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={scorpionLogo} alt="Scorpion Express" className="h-12" />
            <div className="font-display text-2xl text-foreground">SCORPION<span className="text-primary">.</span></div>
          </div>

          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Sign In</div>
            <h1 className="font-display uppercase text-4xl text-foreground leading-tight">
              Employee <span className="text-primary">Login</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Use your Scorpion Express credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-xs uppercase tracking-wider font-bold">
                Employee ID
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="userId"
                  placeholder="e.g. EMP1024"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="pl-10 h-12 bg-white"
                  autoFocus
                  autoComplete="username"
                  maxLength={64}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs uppercase tracking-wider font-bold">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => toast.info("Please contact your IT admin to reset your password.")}
                  className="text-[11px] uppercase tracking-wider text-primary font-bold hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white"
                  autoComplete="current-password"
                  maxLength={128}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider h-12 rounded-none"
            >
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? "Signing in…" : "Sign In to Portal"}
            </Button>
          </form>

          <div className="mt-8 p-3 bg-muted/60 border border-border flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              Demo mode: any valid Employee ID with a password (4+ chars) will sign you in. Production SSO will be
              wired once authentication is enabled.
            </span>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} Scorpion Express · Internal use only.
          </p>
        </div>
      </div>
    </div>
  );
};

const EmployeeLogin = () => {
  const [session, setSession] = useState<{ userId: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.userId) setSession({ userId: parsed.userId });
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogin = (userId: string) => {
    const sess = { userId, at: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
    setSession({ userId });
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
    toast.success("Signed out");
    navigate("/employee-login");
  };

  if (session) {
    return <ModulesDashboard userId={session.userId} onLogout={handleLogout} />;
  }
  return <LoginScreen onLogin={handleLogin} />;
};

export default EmployeeLogin;
