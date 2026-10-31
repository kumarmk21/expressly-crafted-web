import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowUpRight, ArrowDown, Search, Users, Truck, ShieldCheck, Upload, FileText, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Seo from "@/components/Seo";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import careersTeam from "@/assets/careers-team.jpg";

const teams = [
  { icon: Truck, title: "Operations & transport", desc: "Keep cargo moving through our branches, hubs and delivery network." },
  { icon: Users, title: "Sales & customer support", desc: "Build business relationships and help customers with their shipments." },
  { icon: ShieldCheck, title: "Technology & support", desc: "Bring problem-solving, coordination and care to everyday logistics." },
];
type Job = { id: string; title: string; department: string; location: string; job_type: string; experience: string; description: string };

const Careers = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [loc, setLoc] = useState("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reload, setReload] = useState(0);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(false);
    (supabase as any).from("job_openings").select("*").eq("is_active", true)
      .order("display_order", { ascending: true }).order("created_at", { ascending: false })
      .then(({ data, error }: any) => {
        if (!active) return;
        setJobs(error ? [] : (data ?? []));
        setLoadError(Boolean(error));
        setLoading(false);
      });
    return () => { active = false; };
  }, [reload]);
  const departments = ["All", ...Array.from(new Set(jobs.map(j => j.department).filter(Boolean)))];
  const locations = ["All", ...Array.from(new Set(jobs.map(j => j.location).filter(Boolean)))];
  const filtered = jobs.filter(j => {
    const q = query.trim().toLowerCase();
    return ((j.title || "").toLowerCase().includes(q) || (j.location || "").toLowerCase().includes(q))
      && (dept === "All" || j.department === dept) && (loc === "All" || j.location === loc);
  });
  const reveal = { initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: reducedMotion ? 0 : 0.45 } };
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Careers at Scorpion Express | Join Our Logistics Team" description="Explore current jobs by location and department at Scorpion Express, or upload your resume directly to our HR team." path="/careers" />
      <TopBar /><Navbar />
      <main>
        <section className="relative overflow-hidden">
          <img src={careersTeam} alt="An illustrative workplace team collaborating in a bright office" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
          <div className="absolute inset-0 people-page-overlay" />
          <div className="container relative mx-auto px-4 py-12 md:py-16">
            <motion.div {...reveal} className="max-w-xl text-foreground">
              <p className="mb-3 text-sm font-semibold text-primary">Careers at Scorpion Express</p>
              <h1 className="text-3xl md:text-5xl leading-tight">Build a career that<br className="hidden sm:block" /> moves India.</h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">Behind every shipment is a team that makes it happen. Bring your ambition, your ideas and your commitment to our next chapter.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild><a href="#openings">Explore jobs <ArrowDown /></a></Button>
                <Button variant="secondary" asChild><a href="#resume"><Upload /> Upload your resume</a></Button>
                <Button variant="outline" asChild><Link to="/hr"><Briefcase /> HR sign in</Link></Button>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary shrink-0" /> Pan-India B2B express cargo and logistics since 2000.</p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-9 md:py-12">
          <motion.div {...reveal} className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div><p className="text-sm text-primary font-semibold mb-2">People behind the network</p><h2 className="text-2xl md:text-3xl">Your work makes a difference.</h2></div>
            <p className="text-sm text-muted-foreground max-w-md">From the first pickup to the final delivery, we take ownership and treat every shipment with care.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {teams.map((team, i) => <motion.div key={team.title} {...reveal} transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : i * 0.08 }} className="rounded-md border border-border bg-card p-5 hover:border-primary/50 transition-colors">
              <team.icon className="h-6 w-6 text-primary mb-4" /><h3 className="text-lg font-semibold">{team.title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{team.desc}</p>
            </motion.div>)}
          </div>
        </section>

        <section id="openings" className="scroll-mt-24 border-y border-border bg-muted/40">
          <div className="container mx-auto px-4 py-9 md:py-12">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-5"><div><p className="text-sm text-primary font-semibold mb-2">Current openings</p><h2 className="text-2xl md:text-3xl">Find your next role</h2></div>{!loading && !loadError && <p className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "open role" : "open roles"}</p>}</div>
            <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 mb-6">
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search role or city" aria-label="Search jobs by role or city" className="w-full rounded-md pl-10 pr-3 py-2.5 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <select value={loc} onChange={e => setLoc(e.target.value)} aria-label="Filter jobs by location" className="min-w-0 rounded-md px-3 py-2.5 border border-input bg-background text-sm">{locations.map(l => <option key={l} value={l}>{l === "All" ? "All locations" : l}</option>)}</select>
              <select value={dept} onChange={e => setDept(e.target.value)} aria-label="Filter jobs by department" className="min-w-0 rounded-md px-3 py-2.5 border border-input bg-background text-sm">{departments.map(d => <option key={d} value={d}>{d === "All" ? "All departments" : d}</option>)}</select>
            </div>
            <div className="grid gap-3" aria-live="polite">
              {loading && <p className="py-8 text-center text-muted-foreground">Loading openings…</p>}
              {!loading && loadError && <div className="text-center py-8"><p className="text-muted-foreground mb-3">We couldn’t load the openings. You can still submit your resume below.</p><Button variant="outline" onClick={() => setReload(n => n + 1)}>Try again</Button></div>}
              {!loading && !loadError && filtered.map(job => <article key={job.id} className="rounded-md bg-card border border-border p-5 hover:border-primary/50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between gap-4"><div className="min-w-0"><h3 className="text-lg font-semibold">{job.title}</h3><div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">{job.location && <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>}{job.job_type && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{job.job_type}</span>}{job.department && <span className="text-primary">{job.department}</span>}{job.experience && <span>{job.experience}</span>}</div></div><Button onClick={() => setApplyJob(job)} className="self-start shrink-0">Apply <ArrowUpRight /></Button></div>
                {job.description && <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{job.description}</p>}
              </article>)}
              {!loading && !loadError && filtered.length === 0 && <div className="py-8 text-center"><Briefcase className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="text-lg font-semibold">{jobs.length === 0 ? "Your next opportunity starts here." : "No matching roles"}</h3><p className="text-sm text-muted-foreground mt-2">{jobs.length === 0 ? "No openings are listed right now. Share your resume with our HR team below." : "Try another city or department, or send us your resume."}</p>{jobs.length > 0 && <Button variant="link" onClick={() => { setQuery(""); setDept("All"); setLoc("All"); }}>Clear filters</Button>}</div>}
            </div>
          </div>
        </section>

        <section id="resume" className="scroll-mt-24 container mx-auto px-4 py-9 md:py-12">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-7 lg:gap-12 items-start">
            <motion.div {...reveal}><p className="text-sm font-semibold text-primary mb-2">Introduce yourself</p><h2 className="text-2xl md:text-3xl">A place for your potential.</h2><p className="mt-3 text-muted-foreground leading-relaxed">Don’t see the right opening? Tell us about your experience and the role you’re interested in. Submit your resume directly to our HR team.</p>
              <div className="mt-6 flex items-start gap-3 border-l-2 border-primary pl-4"><FileText className="h-5 w-5 text-primary shrink-0 mt-1" /><div><h3 className="font-semibold">Your application</h3><p className="text-sm text-muted-foreground mt-1">Include your contact details, preferred role and relevant experience so our team can assess your profile.</p></div></div>
              <div className="mt-6 flex items-start gap-3 bg-muted/60 rounded-md p-4"><AlertCircle className="h-5 w-5 text-primary shrink-0" /><p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Recruitment is always free.</span> Scorpion Express never charges a fee for jobs or asks for payment to personal UPI IDs or bank accounts.</p></div>
              <Button asChild variant="link" className="px-0 mt-4"><Link to="/about">Meet Scorpion Express <ArrowUpRight /></Link></Button>
            </motion.div>
            <ResumeUploadForm />
          </div>
        </section>
      </main>
      <Footer />
      <Dialog open={Boolean(applyJob)} onOpenChange={open => { if (!open) setApplyJob(null); }}>
        <DialogContent className="max-w-2xl w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader><DialogTitle className="pr-6 text-2xl">Apply for {applyJob?.title}</DialogTitle><DialogDescription>{[applyJob?.department, applyJob?.location, applyJob?.job_type].filter(Boolean).join(" · ")}</DialogDescription></DialogHeader>
          {applyJob && <ResumeUploadForm key={applyJob.id} defaultRole={applyJob.title} jobOpeningId={applyJob.id} lockRole onSubmitted={() => setApplyJob(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Careers;
