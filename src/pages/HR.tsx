import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, LogOut, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useJobAccess } from "@/hooks/useJobAccess";
import JobsPanel from "@/pages/admin/JobsPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

export default function HR() {
  const { loading, allowed, signedIn } = useJobAccess();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError("");
    const { error: failure } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setPassword(""); setBusy(false);
    if (failure) setError(failure.message);
  };
  const signOut = async () => {
    const { error: failure } = await supabase.auth.signOut();
    if (failure) setError(failure.message);
  };
  return <div className="min-h-screen bg-background text-foreground">
    <Helmet><title>HR · Job vacancies | Scorpion Express</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <header className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-5 flex flex-wrap items-center justify-between gap-3">
        <Link to="/careers" className="inline-flex items-center gap-2 font-semibold text-primary"><Briefcase className="h-5 w-5" /> Scorpion Express · HR</Link>
        {signedIn ? <Button variant="outline" onClick={signOut}><LogOut /> Sign out</Button> : <Button variant="ghost" asChild><Link to="/careers"><ArrowLeft /> Careers</Link></Button>}
      </div>
    </header>
    {loading ? <div className="flex justify-center py-20"><Loader2 aria-label="Checking access" className="animate-spin" /></div> : allowed ?
      <main className="mx-auto max-w-6xl px-4 py-8"><h1 className="text-3xl mb-6">Job vacancies</h1><JobsPanel /></main> :
      <main className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-3xl mb-6">HR sign in</h1>
        {signedIn ? <p role="alert" className="text-destructive">This account does not have permission to manage vacancies.</p> :
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2"><Label htmlFor="hr-email">Email address</Label><Input id="hr-email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="hr-password">Password</Label><Input id="hr-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></div>
            <Button disabled={busy} type="submit" className="w-full">{busy && <Loader2 className="animate-spin" />} Sign in</Button>
          </form>}
        {error && <p role="alert" className="mt-4 text-destructive">{error}</p>}
      </main>}
  </div>;
}