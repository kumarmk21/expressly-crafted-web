import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, User, Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import scorpionLogo from "@/assets/scorpion-logo.png";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      toast.error("Please enter both User ID and Password.");
      return;
    }
    setLoading(true);
    // Dummy auth — any user id and any non-empty password is accepted.
    setTimeout(() => {
      localStorage.setItem("scorpion_emp_session", JSON.stringify({ userId, at: Date.now() }));
      toast.success(`Welcome, ${userId}!`);
      setLoading(false);
      navigate("/");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <img src={scorpionLogo} alt="Scorpion Express" className="h-14 mb-4" />
            <h1 className="text-2xl font-black text-foreground">Employee Portal</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in with your Scorpion Express credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="userId"
                  placeholder="e.g. EMP1024"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full red-gradient text-primary-foreground font-bold h-11"
            >
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-muted/60 border border-border flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              Demo mode: any User ID with any password will sign you in. Production auth will be wired once Lovable Cloud is enabled.
            </span>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Scorpion Express. Internal use only.
        </p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
