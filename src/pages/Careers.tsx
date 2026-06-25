import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase, MapPin, Clock, ArrowUpRight, Search, Users, TrendingUp,
  HeartHandshake, GraduationCap, Mail, Phone, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Seo from "@/components/Seo";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import { supabase } from "@/integrations/supabase/client";

const perks = [
  { icon: TrendingUp, title: "Growth Path", desc: "Clear career progression and internal mobility across functions." },
  { icon: GraduationCap, title: "Learning Budget", desc: "Certifications, workshops and on-the-job mentoring." },
  { icon: HeartHandshake, title: "Health & Wellness", desc: "Medical cover for you and your family." },
  { icon: Users, title: "People First", desc: "A culture built around respect, ownership and craft." },
];

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience: string;
  description: string;
};

const Careers = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  useEffect(() => {
    (supabase as any)
      .from("job_openings")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }: any) => {
        setJobs((data as Job[]) ?? []);
        setLoading(false);
      });
  }, []);

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)))];

  const filtered = jobs.filter((o) => {
    const q = query.toLowerCase();
    const matchQ = o.title.toLowerCase().includes(q) || (o.location || "").toLowerCase().includes(q);
    const matchD = dept === "All" || o.department === dept;
    return matchQ && matchD;
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Careers at Scorpion Express | Join Our Logistics Team"
        description="Explore current openings at Scorpion Express across operations, technology, sales and support. Apply today."
        path="/careers"
      />
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
        <div className="container mx-auto px-4 py-20 lg:py-28 relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] mb-5">
              <span className="h-px w-10 bg-white" /> Careers at Scorpion
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight">
              Build India's most trusted logistics network.
            </h1>
            <p className="mt-5 text-white/85 text-lg max-w-2xl">
              We're hiring across operations, technology, sales and customer success. If you love solving real
              problems on the ground, you'll feel at home here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why join */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Why join us</div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
              A place where ownership is the default.
            </h2>
            <p className="mt-4 text-foreground/75">
              We are a team of operators, engineers and customer-obsessed problem-solvers. We move fast, take
              accountability, and treat every shipment like our own.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="border border-border p-5 bg-card hover:border-primary/40 transition-colors">
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-primary/10 text-primary mb-3">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="font-bold text-foreground">{p.title}</div>
                  <p className="text-sm text-foreground/70 mt-1">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Current Openings</div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">Find your next role</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search role or city" aria-label="Search jobs by role or city" className="w-full pl-10 pr-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
              </div>
              <select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter jobs by department" className="px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary">
                {departments.map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>
            </div>
          </div>

          <div className="grid gap-3">
            {loading && (
              <div className="text-center py-14 border border-dashed border-border bg-card text-foreground/60">Loading openings…</div>
            )}
            {!loading && filtered.map((job) => (
              <div key={job.id} className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card border border-border p-5 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <span className="hidden sm:inline-flex h-11 w-11 items-center justify-center bg-primary/10 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-bold text-foreground text-lg">{job.title}</div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-foreground/70">
                      {job.location && (<span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>)}
                      {job.job_type && (<span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {job.job_type}</span>)}
                      {job.department && (<span className="text-xs font-bold uppercase tracking-wider text-primary">{job.department}</span>)}
                      {job.experience && (<span className="text-xs uppercase tracking-wider text-muted-foreground">{job.experience}</span>)}
                    </div>
                    {job.description && (
                      <p className="text-sm text-foreground/70 mt-2 max-w-2xl whitespace-pre-line">{job.description}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setApplyJob(job)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider bg-primary text-white hover:bg-primary/90 transition-colors self-start md:self-auto"
                >
                  Apply <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ))}
            {!loading && filtered.length === 0 && (
              <div className="text-center py-14 border border-dashed border-border bg-card text-foreground/60">
                {jobs.length === 0 ? "No openings posted right now. Please check back soon." : "No roles match your search."}
              </div>
            )}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="bg-card border border-border p-8 md:p-12 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Don't see your role?</div>
            <h2 className="font-display text-3xl text-foreground leading-tight">Write to us — great people always find a place.</h2>
            <p className="mt-3 text-foreground/70">Send your CV and a short note about what you'd like to build with us.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="tel:+911234567890" className="flex items-center justify-between gap-3 px-5 py-4 border border-border font-bold uppercase tracking-wider text-sm text-foreground hover:border-primary">
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> HR Helpline</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link to="/about" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary mt-1">
              Learn more about Scorpion →
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Apply dialog */}
      {applyJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto p-4" onClick={() => setApplyJob(null)}>
          <div className="bg-background w-full max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-border p-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-1">Apply for</div>
                <h3 className="font-display text-2xl text-foreground">{applyJob.title}</h3>
                <div className="text-xs text-muted-foreground mt-1">
                  {[applyJob.department, applyJob.location, applyJob.job_type].filter(Boolean).join(" · ")}
                </div>
              </div>
              <button onClick={() => setApplyJob(null)} className="p-2 text-muted-foreground hover:text-primary" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <ResumeUploadForm
                defaultRole={applyJob.title}
                jobOpeningId={applyJob.id}
                lockRole
                onSubmitted={() => setApplyJob(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
