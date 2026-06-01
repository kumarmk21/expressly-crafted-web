import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience: string;
  description: string;
  is_active: boolean;
  display_order: number;
};

const empty = {
  title: "",
  department: "",
  location: "",
  job_type: "Full-time",
  experience: "",
  description: "",
  display_order: 0,
};

const JobsPanel = () => {
  const [rows, setRows] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("job_openings")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Job[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.title.trim()) return toast.error("Title required");
    setSaving(true);
    const { error } = await (supabase as any).from("job_openings").insert(form);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Job opening added");
    setForm(empty);
    load();
  };
  const update = async (id: string, patch: Partial<Job>) => {
    const { error } = await (supabase as any).from("job_openings").update(patch).eq("id", id);
    if (error) toast.error(error.message); else load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    const { error } = await (supabase as any).from("job_openings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Removed");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add new job opening</h3>
        <div className="grid md:grid-cols-2 gap-2">
          <input placeholder="Title (e.g. Operations Manager)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Type (Full-time / Contract)" value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Experience (e.g. 3-5 yrs)" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input type="number" placeholder="Display order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="px-3 py-2 bg-background border border-border" />
          <textarea placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="md:col-span-2 px-3 py-2 bg-background border border-border resize-y" />
        </div>
        <button onClick={add} disabled={saving} className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-black uppercase text-xs tracking-wider disabled:opacity-50">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add Job
        </button>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Exp.</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-middle">
                  <td className="p-2"><input defaultValue={r.title} onBlur={(e) => e.target.value !== r.title && update(r.id, { title: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.department} onBlur={(e) => update(r.id, { department: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.location} onBlur={(e) => update(r.id, { location: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.job_type} onBlur={(e) => update(r.id, { job_type: e.target.value })} className="w-28 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.experience} onBlur={(e) => update(r.id, { experience: e.target.value })} className="w-24 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input type="number" defaultValue={r.display_order} onBlur={(e) => update(r.id, { display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input type="checkbox" defaultChecked={r.is_active} onChange={(e) => update(r.id, { is_active: e.target.checked })} /></td>
                  <td className="p-2"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={8} className="p-6 text-center text-muted-foreground text-sm">No jobs yet. Add your first opening above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsPanel;
