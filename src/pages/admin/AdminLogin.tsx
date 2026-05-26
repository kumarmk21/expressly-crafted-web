import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdmin();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate("/admin", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Ask an existing admin to grant you admin role.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-border bg-card p-8">
        <Link to="/" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">← Back to site</Link>
        <h1 className="font-display uppercase text-3xl mt-4 mb-1">Admin {mode === "signup" ? "Sign Up" : "Login"}</h1>
        <p className="text-sm text-muted-foreground mb-6">Restricted area for Scorpion administrators.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-primary"
          />
          <input
            type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            className="w-full px-3 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-primary"
          />
          <button type="submit" disabled={busy} className="w-full py-3 bg-primary text-white font-black uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
