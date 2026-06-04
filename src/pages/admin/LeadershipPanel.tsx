import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";

const uploadLeaderPhoto = async (file: File): Promise<string | null> => {
  if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return null; }
  if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5 MB"); return null; }
  const ext = file.name.split(".").pop() || "jpg";
  const path = `leadership/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true, contentType: file.type });
  if (error) { toast.error(error.message); return null; }
  return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
};

const LeadershipPanel = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoUploading, setNewPhotoUploading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", display_order: 0 });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leadership_members" as any)
      .select("*")
      .order("display_order");
    if (error) toast.error(error.message);
    setRows((data as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name.trim() || !form.role.trim()) return toast.error("Name and role required");
    const { error } = await supabase.from("leadership_members" as any).insert({ ...form, photo_url: newPhotoUrl || null });
    if (error) return toast.error(error.message);
    toast.success("Leader added");
    setForm({ name: "", role: "", display_order: 0 });
    setNewPhotoUrl("");
    load();
  };

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("leadership_members" as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this leader?")) return;
    const { error } = await supabase.from("leadership_members" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const replacePhoto = async (id: string, file: File) => {
    setUploadingId(id);
    const url = await uploadLeaderPhoto(file);
    if (url) { await update(id, { photo_url: url }); toast.success("Photo updated"); load(); }
    setUploadingId(null);
  };

  const removePhoto = async (id: string) => {
    if (!confirm("Remove this photo?")) return;
    await update(id, { photo_url: null });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add leadership member</h3>
        <div className="grid md:grid-cols-4 gap-2">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Role / Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="md:col-span-2 px-3 py-2 bg-background border border-border" />
          <input type="number" placeholder="Order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="px-3 py-2 bg-background border border-border" />
        </div>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider cursor-pointer hover:border-primary">
            {newPhotoUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {newPhotoUrl ? "Replace photo" : "Upload photo (optional)"}
            <input type="file" accept="image/*" className="hidden" disabled={newPhotoUploading} onChange={async (e) => {
              const f = e.target.files?.[0]; e.target.value = "";
              if (!f) return;
              setNewPhotoUploading(true);
              const url = await uploadLeaderPhoto(f);
              if (url) setNewPhotoUrl(url);
              setNewPhotoUploading(false);
            }} />
          </label>
          {newPhotoUrl && (
            <div className="flex items-center gap-2">
              <img src={newPhotoUrl} alt="preview" className="h-14 w-12 object-cover border border-border" />
              <button onClick={() => setNewPhotoUrl("")} className="text-xs text-destructive hover:underline">Clear</button>
            </div>
          )}
          <button onClick={add} className="ml-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-black uppercase text-xs tracking-wider"><Plus className="h-4 w-4" /> Add</button>
        </div>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Photo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-middle">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-16 w-12 border border-border bg-muted flex items-center justify-center overflow-hidden">
                        {r.photo_url ? <img src={r.photo_url} alt={r.name} className="h-full w-full object-cover object-top" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 border border-border cursor-pointer hover:border-primary">
                          {uploadingId === r.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                          {r.photo_url ? "Replace" : "Upload"}
                          <input type="file" accept="image/*" className="hidden" disabled={uploadingId === r.id} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) replacePhoto(r.id, f); }} />
                        </label>
                        {r.photo_url && (
                          <button onClick={() => removePhoto(r.id)} className="text-[10px] uppercase tracking-wider text-destructive hover:underline text-left">Remove</button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-2"><input defaultValue={r.name} onBlur={(e) => e.target.value !== r.name && update(r.id, { name: e.target.value })} className="w-48 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.role} onBlur={(e) => e.target.value !== r.role && update(r.id, { role: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input type="number" defaultValue={r.display_order} onBlur={(e) => update(r.id, { display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground text-sm">No leadership members yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-muted-foreground">Note: existing seeded leaders without an uploaded photo fall back to the original built-in image (matched by name). Upload a new photo to override.</p>
    </div>
  );
};

export default LeadershipPanel;
