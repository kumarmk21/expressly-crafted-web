import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";

const KIND_OPTIONS = [
  { value: "certification", label: "Certification" },
  { value: "award", label: "Award" },
];

const uploadLogo = async (file: File): Promise<string | null> => {
  if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return null; }
  if (file.size > 2 * 1024 * 1024) { toast.error("Logo must be under 2 MB"); return null; }
  const ext = file.name.split(".").pop() || "png";
  const path = `certifications/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true, contentType: file.type });
  if (error) { toast.error(error.message); return null; }
  return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
};

const CertificationsPanel = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [newLogoUploading, setNewLogoUploading] = useState(false);
  const [form, setForm] = useState({ title: "", issuer: "", year: "", kind: "certification", display_order: 0, active: true });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("certifications" as any).select("*").order("display_order");
    if (error) toast.error(error.message);
    setRows((data as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.title.trim()) return toast.error("Title required");
    const { error } = await supabase.from("certifications" as any).insert({ ...form, logo_url: newLogoUrl || null });
    if (error) return toast.error(error.message);
    toast.success("Added");
    setForm({ title: "", issuer: "", year: "", kind: "certification", display_order: 0, active: true });
    setNewLogoUrl("");
    load();
  };

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("certifications" as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from("certifications" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const replaceLogo = async (id: string, file: File) => {
    setUploadingId(id);
    const url = await uploadLogo(file);
    if (url) { await update(id, { logo_url: url }); toast.success("Logo updated"); load(); }
    setUploadingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add new certification / award</h3>
        <div className="grid md:grid-cols-6 gap-2">
          <input placeholder="Title (e.g. ISO 9001:2015)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="md:col-span-2 px-3 py-2 bg-background border border-border" />
          <input placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {KIND_OPTIONS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
          </select>
          <button onClick={add} className="inline-flex items-center justify-center gap-2 bg-primary text-white font-black uppercase text-xs tracking-wider"><Plus className="h-4 w-4" /> Add</button>
        </div>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider cursor-pointer hover:border-primary">
            {newLogoUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {newLogoUrl ? "Replace logo" : "Upload logo (optional)"}
            <input type="file" accept="image/*" className="hidden" disabled={newLogoUploading} onChange={async (e) => {
              const f = e.target.files?.[0]; e.target.value = "";
              if (!f) return;
              setNewLogoUploading(true);
              const url = await uploadLogo(f);
              if (url) setNewLogoUrl(url);
              setNewLogoUploading(false);
            }} />
          </label>
          {newLogoUrl && (
            <div className="flex items-center gap-2">
              <img src={newLogoUrl} alt="preview" className="h-10 w-auto max-w-[80px] object-contain border border-border bg-white p-1" />
              <button onClick={() => setNewLogoUrl("")} className="text-xs text-destructive hover:underline">Clear</button>
            </div>
          )}
          <label className="inline-flex items-center gap-2 text-xs uppercase tracking-wider">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active
          </label>
          <input type="number" placeholder="Order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="w-24 px-3 py-2 bg-background border border-border" />
        </div>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Logo</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Issuer</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Kind</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-middle">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-12 w-16 border border-border bg-white flex items-center justify-center overflow-hidden">
                        {r.logo_url ? <img src={r.logo_url} alt={r.title} className="max-h-full max-w-full object-contain" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <label className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 border border-border cursor-pointer hover:border-primary">
                        {uploadingId === r.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                        {r.logo_url ? "Replace" : "Upload"}
                        <input type="file" accept="image/*" className="hidden" disabled={uploadingId === r.id} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) replaceLogo(r.id, f); }} />
                      </label>
                    </div>
                  </td>
                  <td className="p-2"><input defaultValue={r.title} onBlur={(e) => e.target.value !== r.title && update(r.id, { title: e.target.value })} className="w-56 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.issuer ?? ""} onBlur={(e) => update(r.id, { issuer: e.target.value })} className="w-52 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.year ?? ""} onBlur={(e) => update(r.id, { year: e.target.value })} className="w-20 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2">
                    <select defaultValue={r.kind} onChange={(e) => update(r.id, { kind: e.target.value })} className="px-2 py-1 bg-background border border-border">
                      {KIND_OPTIONS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                    </select>
                  </td>
                  <td className="p-2"><input type="number" defaultValue={r.display_order} onBlur={(e) => update(r.id, { display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2 text-center">
                    <input type="checkbox" defaultChecked={r.active} onChange={(e) => update(r.id, { active: e.target.checked })} />
                  </td>
                  <td className="p-2"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground text-sm">No entries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CertificationsPanel;
