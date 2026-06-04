import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil, X, Save, Upload, Image as ImageIcon } from "lucide-react";

type Item = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  image_url: string | null;
  employee_name: string | null;
  employee_designation: string | null;
  month_year: string | null;
  event_date: string | null;
  link_url: string | null;
  active: boolean;
  display_order: number;
};

const TYPES = [
  { value: "employee_of_month", label: "Employee of the Month" },
  { value: "news", label: "News" },
  { value: "event", label: "Event" },
];

const empty: Omit<Item, "id"> = {
  type: "employee_of_month",
  title: "",
  description: "",
  image_url: "",
  employee_name: "",
  employee_designation: "",
  month_year: "",
  event_date: "",
  link_url: "",
  active: true,
  display_order: 0,
};

const uploadImage = async (file: File): Promise<string | null> => {
  if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return null; }
  if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5 MB"); return null; }
  const ext = file.name.split(".").pop() || "jpg";
  const path = `events-news/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true, contentType: file.type });
  if (error) { toast.error(error.message); return null; }
  return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
};

const EventsNewsPanel = () => {
  const [rows, setRows] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...empty });
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Item | null>(null);
  const [editUploadingId, setEditUploadingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events_news" as any)
      .select("*")
      .order("display_order")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as any) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.title.trim()) return toast.error("Title is required");
    const payload: any = { ...form };
    if (!payload.event_date) payload.event_date = null;
    if (!payload.image_url) payload.image_url = null;
    const { error } = await supabase.from("events_news" as any).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Item added");
    setForm({ ...empty });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("events_news" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const toggleActive = async (r: Item) => {
    const { error } = await supabase.from("events_news" as any).update({ active: !r.active }).eq("id", r.id);
    if (error) return toast.error(error.message);
    load();
  };

  const startEdit = (r: Item) => { setEditingId(r.id); setEditForm({ ...r }); };
  const cancelEdit = () => { setEditingId(null); setEditForm(null); };
  const saveEdit = async () => {
    if (!editForm) return;
    const { id, ...patch } = editForm;
    const payload: any = { ...patch };
    if (!payload.event_date) payload.event_date = null;
    if (!payload.image_url) payload.image_url = null;
    const { error } = await supabase.from("events_news" as any).update(payload).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Item updated");
    cancelEdit();
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add Event / News / Employee of the Month</h3>
        <div className="grid md:grid-cols-2 gap-2">
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <input type="number" placeholder="Display order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="md:col-span-2 px-3 py-2 bg-background border border-border" />
          <textarea placeholder="Description" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="md:col-span-2 px-3 py-2 bg-background border border-border" />

          {form.type === "employee_of_month" && (
            <>
              <input placeholder="Employee name" value={form.employee_name ?? ""} onChange={(e) => setForm({ ...form, employee_name: e.target.value })} className="px-3 py-2 bg-background border border-border" />
              <input placeholder="Designation" value={form.employee_designation ?? ""} onChange={(e) => setForm({ ...form, employee_designation: e.target.value })} className="px-3 py-2 bg-background border border-border" />
              <input placeholder="Month & Year (e.g. October 2026)" value={form.month_year ?? ""} onChange={(e) => setForm({ ...form, month_year: e.target.value })} className="md:col-span-2 px-3 py-2 bg-background border border-border" />
            </>
          )}

          {(form.type === "news" || form.type === "event") && (
            <>
              <input type="date" placeholder="Date" value={form.event_date ?? ""} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="px-3 py-2 bg-background border border-border" />
              <input placeholder="External link (optional)" value={form.link_url ?? ""} onChange={(e) => setForm({ ...form, link_url: e.target.value })} className="px-3 py-2 bg-background border border-border" />
            </>
          )}

          <label className="flex items-center gap-2 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider md:col-span-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Active (visible on Events & News page)
          </label>
        </div>

        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <label className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider cursor-pointer hover:border-primary">
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {form.image_url ? "Replace image" : "Upload image"}
            <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={async (e) => {
              const f = e.target.files?.[0]; e.target.value = "";
              if (!f) return;
              setUploading(true);
              const url = await uploadImage(f);
              if (url) setForm((p) => ({ ...p, image_url: url }));
              setUploading(false);
            }} />
          </label>
          {form.image_url && (
            <div className="flex items-center gap-2">
              <img src={form.image_url} alt="preview" className="h-12 w-12 object-cover border border-border" />
              <button onClick={() => setForm({ ...form, image_url: "" })} className="text-xs text-destructive hover:underline">Clear</button>
            </div>
          )}
        </div>

        <button onClick={add} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-black uppercase text-xs tracking-wider">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Employee / Date</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isEditing = editingId === r.id && editForm;
                return (
                  <tr key={r.id} className="border-t border-border align-top">
                    {isEditing ? (
                      <>
                        <td className="p-2">
                          <div className="flex items-start gap-2">
                            <div className="h-16 w-16 border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                              {editForm!.image_url
                                ? <img src={editForm!.image_url} alt="" className="h-full w-full object-cover" />
                                : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                            </div>
                            <label className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 border border-border cursor-pointer hover:border-primary">
                              {editUploadingId === r.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                              {editForm!.image_url ? "Replace" : "Upload"}
                              <input type="file" accept="image/*" className="hidden" disabled={editUploadingId === r.id} onChange={async (e) => {
                                const f = e.target.files?.[0]; e.target.value = "";
                                if (!f) return;
                                setEditUploadingId(r.id);
                                const url = await uploadImage(f);
                                if (url) setEditForm({ ...editForm!, image_url: url });
                                setEditUploadingId(null);
                              }} />
                            </label>
                          </div>
                        </td>
                        <td className="p-2">
                          <select value={editForm!.type} onChange={(e) => setEditForm({ ...editForm!, type: e.target.value })} className="px-2 py-1 bg-background border border-border">
                            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                          </select>
                        </td>
                        <td className="p-2 space-y-1">
                          <input value={editForm!.title} onChange={(e) => setEditForm({ ...editForm!, title: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" />
                          <textarea value={editForm!.description ?? ""} onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })} rows={2} className="w-full px-2 py-1 bg-background border border-border text-xs" />
                          <input placeholder="Link (optional)" value={editForm!.link_url ?? ""} onChange={(e) => setEditForm({ ...editForm!, link_url: e.target.value })} className="w-full px-2 py-1 bg-background border border-border text-xs" />
                        </td>
                        <td className="p-2 space-y-1">
                          <input placeholder="Employee name" value={editForm!.employee_name ?? ""} onChange={(e) => setEditForm({ ...editForm!, employee_name: e.target.value })} className="w-full px-2 py-1 bg-background border border-border text-xs" />
                          <input placeholder="Designation" value={editForm!.employee_designation ?? ""} onChange={(e) => setEditForm({ ...editForm!, employee_designation: e.target.value })} className="w-full px-2 py-1 bg-background border border-border text-xs" />
                          <input placeholder="Month/Year" value={editForm!.month_year ?? ""} onChange={(e) => setEditForm({ ...editForm!, month_year: e.target.value })} className="w-full px-2 py-1 bg-background border border-border text-xs" />
                          <input type="date" value={editForm!.event_date ?? ""} onChange={(e) => setEditForm({ ...editForm!, event_date: e.target.value })} className="w-full px-2 py-1 bg-background border border-border text-xs" />
                        </td>
                        <td className="p-2"><input type="number" value={editForm!.display_order} onChange={(e) => setEditForm({ ...editForm!, display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                        <td className="p-2"><input type="checkbox" checked={editForm!.active} onChange={(e) => setEditForm({ ...editForm!, active: e.target.checked })} /></td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <button onClick={saveEdit} className="p-1.5 text-primary hover:bg-primary/10" title="Save"><Save className="h-4 w-4" /></button>
                            <button onClick={cancelEdit} className="p-1.5 text-muted-foreground hover:bg-muted" title="Cancel"><X className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2">
                          <div className="h-16 w-16 border border-border bg-muted flex items-center justify-center overflow-hidden">
                            {r.image_url ? <img src={r.image_url} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </td>
                        <td className="p-2 text-xs">{TYPES.find((t) => t.value === r.type)?.label ?? r.type}</td>
                        <td className="p-2">
                          <div className="font-medium">{r.title}</div>
                          {r.description && <div className="text-xs text-muted-foreground line-clamp-2 max-w-[280px]">{r.description}</div>}
                        </td>
                        <td className="p-2 text-xs text-muted-foreground">
                          {r.employee_name && <div>{r.employee_name}{r.employee_designation && ` · ${r.employee_designation}`}</div>}
                          {r.month_year && <div>{r.month_year}</div>}
                          {r.event_date && <div>{r.event_date}</div>}
                        </td>
                        <td className="p-2 text-xs">{r.display_order}</td>
                        <td className="p-2">
                          <button onClick={() => toggleActive(r)} className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border ${r.active ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                            {r.active ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <button onClick={() => startEdit(r)} className="p-1.5 text-foreground hover:text-primary" title="Edit"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => remove(r.id)} className="p-1.5 text-destructive hover:text-primary" title="Delete"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={7} className="p-6 text-center text-muted-foreground text-sm">No items yet. Add one above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Items appear on the public <strong>/events-news</strong> page, grouped by type. Toggle Active to hide an item without deleting it.
      </p>
    </div>
  );
};

export default EventsNewsPanel;
