import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil, Save, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type Job = { id: string; title: string; department: string; location: string; job_type: string; experience: string; description: string; is_active: boolean; display_order: number };
const empty = { title: "", department: "", location: "", job_type: "Full-time", experience: "", description: "", display_order: 0, is_active: true };
export default function JobsPanel() {
  const [rows, setRows] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("job_openings").select("*").order("display_order").order("created_at", { ascending: false });
    setFailed(Boolean(error));
    if (error) toast.error(error.message); else setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { void load(); }, []);
  const reset = () => { setForm(empty); setEditing(null); };
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return toast.error("Title required");
    setSaving(true);
    const payload = { ...form, title: form.title.trim() };
    const { error } = editing ? await supabase.from("job_openings").update(payload).eq("id", editing) : await supabase.from("job_openings").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Vacancy updated" : "Job opening added"); reset(); void load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    const { error } = await supabase.from("job_openings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    if (editing === id) reset();
    toast.success("Vacancy removed"); void load();
  };
  return <div className="space-y-8">
    <form onSubmit={save} className="space-y-4 border-b border-border pb-8">
      <h2 className="text-xl">{editing ? "Edit vacancy" : "Add new vacancy"}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {([['title', 'Job title'], ['department', 'Department'], ['location', 'Location'], ['job_type', 'Employment type'], ['experience', 'Experience']] as const).map(([key, label]) =>
          <div key={key} className="space-y-2"><Label htmlFor={`job-${key}`}>{label}</Label><Input id={`job-${key}`} required={key === 'title'} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} /></div>)}
        <div className="space-y-2"><Label htmlFor="job-order">Display order</Label><Input id="job-order" type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
        <div className="sm:col-span-2 space-y-2"><Label htmlFor="job-description">Job description</Label><Textarea id="job-description" rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
      </div>
      <div className="flex items-center gap-3"><Switch id="job-published" checked={form.is_active} onCheckedChange={checked => setForm({ ...form, is_active: checked })} /><Label htmlFor="job-published">Published on Careers</Label></div>
      <div className="flex gap-3"><Button type="submit" disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : editing ? <Save /> : <Plus />}{editing ? "Save changes" : "Add job"}</Button>{editing && <Button type="button" variant="outline" onClick={reset}><X /> Cancel</Button>}</div>
    </form>
    <div className="flex items-center justify-between"><h2 className="text-xl">All vacancies</h2><Button variant="outline" size="sm" onClick={load} disabled={loading}><RefreshCw /> Refresh</Button></div>
    {loading ? <Loader2 aria-label="Loading vacancies" className="animate-spin" /> : failed ? <p role="alert" className="text-destructive">Vacancies could not be loaded. Please try again.</p> : rows.length === 0 ? <p className="text-muted-foreground">No vacancies yet.</p> : <div className="grid md:grid-cols-2 gap-4">{rows.map(row => <article key={row.id} className="border border-border rounded-md bg-card p-5">
      <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold break-words">{row.title}</h3><span className={row.is_active ? "text-primary text-sm shrink-0" : "text-muted-foreground text-sm shrink-0"}>{row.is_active ? "Published" : "Closed"}</span></div>
      <p className="text-sm text-muted-foreground mt-2">{[row.department, row.location, row.job_type, row.experience].filter(Boolean).join(" · ")}</p>
      <p className="mt-3 text-sm whitespace-pre-line break-words line-clamp-3">{row.description}</p>
      <div className="mt-4 flex gap-2"><Button variant="outline" size="sm" onClick={() => { const { id, ...values } = row; setEditing(id); setForm(values); }}><Pencil /> Edit</Button><Button variant="ghost" size="sm" aria-label={`Delete ${row.title}`} onClick={() => remove(row.id)}><Trash2 className="text-destructive" /> Delete</Button></div>
    </article>)}</div>}
  </div>;
}
