import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";

const ICON_OPTIONS = [
  "Monitor", "PackageSearch", "MapPinned", "Cloud", "HeadphonesIcon", "Radio",
  "ReceiptText", "Wallet", "Plug", "Tag", "Gavel", "Users", "Truck", "Package", "Activity",
];

const uploadTechImage = async (file: File): Promise<string | null> => {
  if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return null; }
  if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5 MB"); return null; }
  const ext = file.name.split(".").pop() || "jpg";
  const path = `technology/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true, contentType: file.type });
  if (error) { toast.error(error.message); return null; }
  return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
};

const TechnologyPanel = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageUploading, setNewImageUploading] = useState(false);
  const [form, setForm] = useState({ no: "", title: "", description: "", icon: "Monitor", display_order: 0 });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("technology_items" as any)
      .select("*")
      .order("display_order");
    if (error) toast.error(error.message);
    setRows((data as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.title.trim() || !form.description.trim()) return toast.error("Title and description required");
    const payload = { ...form, no: form.no || String(rows.length + 1).padStart(2, "0"), image_url: newImageUrl || null };
    const { error } = await supabase.from("technology_items" as any).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Technology added");
    setForm({ no: "", title: "", description: "", icon: "Monitor", display_order: 0 });
    setNewImageUrl("");
    load();
  };

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("technology_items" as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this technology item?")) return;
    const { error } = await supabase.from("technology_items" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const replaceImage = async (id: string, file: File) => {
    setUploadingId(id);
    const url = await uploadTechImage(file);
    if (url) { await update(id, { image_url: url }); toast.success("Image updated"); load(); }
    setUploadingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add new technology</h3>
        <div className="grid md:grid-cols-6 gap-2">
          <input placeholder="No (e.g. 13)" value={form.no} onChange={(e) => setForm({ ...form, no: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="md:col-span-2 px-3 py-2 bg-background border border-border" />
          <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <input type="number" placeholder="Order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="px-3 py-2 bg-background border border-border" />
          <button onClick={add} className="inline-flex items-center justify-center gap-2 bg-primary text-white font-black uppercase text-xs tracking-wider"><Plus className="h-4 w-4" /> Add</button>
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="mt-2 w-full px-3 py-2 bg-background border border-border" />
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider cursor-pointer hover:border-primary">
            {newImageUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {newImageUrl ? "Replace background image" : "Upload background image"}
            <input type="file" accept="image/*" className="hidden" disabled={newImageUploading} onChange={async (e) => {
              const f = e.target.files?.[0]; e.target.value = "";
              if (!f) return;
              setNewImageUploading(true);
              const url = await uploadTechImage(f);
              if (url) setNewImageUrl(url);
              setNewImageUploading(false);
            }} />
          </label>
          {newImageUrl && (
            <div className="flex items-center gap-2">
              <img src={newImageUrl} alt="preview" className="h-12 w-20 object-cover border border-border" />
              <button onClick={() => setNewImageUrl("")} className="text-xs text-destructive hover:underline">Clear</button>
            </div>
          )}
        </div>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Icon</th>
                <th className="p-3 text-left">Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-14 w-24 border border-border bg-muted flex items-center justify-center overflow-hidden">
                        {r.image_url ? <img src={r.image_url} alt={r.title} className="h-full w-full object-cover" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <label className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 border border-border cursor-pointer hover:border-primary">
                        {uploadingId === r.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                        {r.image_url ? "Replace" : "Upload"}
                        <input type="file" accept="image/*" className="hidden" disabled={uploadingId === r.id} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) replaceImage(r.id, f); }} />
                      </label>
                    </div>
                  </td>
                  <td className="p-2"><input defaultValue={r.no} onBlur={(e) => e.target.value !== r.no && update(r.id, { no: e.target.value })} className="w-14 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.title} onBlur={(e) => e.target.value !== r.title && update(r.id, { title: e.target.value })} className="w-56 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><textarea defaultValue={r.description} onBlur={(e) => e.target.value !== r.description && update(r.id, { description: e.target.value })} rows={2} className="w-80 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2">
                    <select defaultValue={r.icon ?? "Monitor"} onChange={(e) => update(r.id, { icon: e.target.value })} className="px-2 py-1 bg-background border border-border">
                      {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </td>
                  <td className="p-2"><input type="number" defaultValue={r.display_order} onBlur={(e) => update(r.id, { display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground text-sm">No technology items yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TechnologyPanel;
