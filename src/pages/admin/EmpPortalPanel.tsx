import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil, X, Save } from "lucide-react";

type EmpModule = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  icon: string | null;
  group_name: string;
  active: boolean;
  display_order: number;
};

const GROUPS = ["Operations", "Finance", "Tools", "MIS"] as const;
const ICONS = [
  "ClipboardList","FileText","Users","Truck","MessageSquareWarning",
  "Plane","BarChart3","Calculator","Upload","QrCode","LayoutDashboard","Newspaper",
];

const empty: Omit<EmpModule, "id"> = {
  name: "",
  description: "",
  url: "",
  icon: "LayoutDashboard",
  group_name: "Operations",
  active: true,
  display_order: 0,
};

const EmpPortalPanel = () => {
  const [rows, setRows] = useState<EmpModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...empty });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EmpModule | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("emp_portal_modules" as any)
      .select("*")
      .order("display_order");
    if (error) toast.error(error.message);
    setRows((data as any) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name.trim() || !form.url.trim()) return toast.error("Name and URL are required");
    const { error } = await supabase.from("emp_portal_modules" as any).insert({ ...form });
    if (error) return toast.error(error.message);
    toast.success("Module added");
    setForm({ ...empty });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this module?")) return;
    const { error } = await supabase.from("emp_portal_modules" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const toggleActive = async (r: EmpModule) => {
    const { error } = await supabase.from("emp_portal_modules" as any).update({ active: !r.active }).eq("id", r.id);
    if (error) return toast.error(error.message);
    load();
  };

  const startEdit = (r: EmpModule) => { setEditingId(r.id); setEditForm({ ...r }); };
  const cancelEdit = () => { setEditingId(null); setEditForm(null); };
  const saveEdit = async () => {
    if (!editForm) return;
    const { id, ...patch } = editForm;
    const { error } = await supabase.from("emp_portal_modules" as any).update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Module updated");
    cancelEdit();
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add Employee Portal Module</h3>
        <div className="grid md:grid-cols-2 gap-2">
          <input placeholder="Module name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="URL (https://...)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Description" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="md:col-span-2 px-3 py-2 bg-background border border-border" />
          <select value={form.icon ?? ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <select value={form.group_name} onChange={(e) => setForm({ ...form, group_name: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <input type="number" placeholder="Order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="px-3 py-2 bg-background border border-border" />
          <label className="flex items-center gap-2 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Active
          </label>
        </div>
        <button onClick={add} className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-black uppercase text-xs tracking-wider">
          <Plus className="h-4 w-4" /> Add Module
        </button>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">URL</th>
                <th className="p-3 text-left">Group</th>
                <th className="p-3 text-left">Icon</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isEditing = editingId === r.id && editForm;
                return (
                  <tr key={r.id} className="border-t border-border align-middle">
                    {isEditing ? (
                      <>
                        <td className="p-2"><input value={editForm!.name} onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                        <td className="p-2"><input value={editForm!.description ?? ""} onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                        <td className="p-2"><input value={editForm!.url} onChange={(e) => setEditForm({ ...editForm!, url: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                        <td className="p-2">
                          <select value={editForm!.group_name} onChange={(e) => setEditForm({ ...editForm!, group_name: e.target.value })} className="px-2 py-1 bg-background border border-border">
                            {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </td>
                        <td className="p-2">
                          <select value={editForm!.icon ?? ""} onChange={(e) => setEditForm({ ...editForm!, icon: e.target.value })} className="px-2 py-1 bg-background border border-border">
                            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                          </select>
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
                        <td className="p-2 font-medium">{r.name}</td>
                        <td className="p-2 text-muted-foreground text-xs max-w-[260px] truncate">{r.description}</td>
                        <td className="p-2 text-xs text-muted-foreground max-w-[180px] truncate">{r.url}</td>
                        <td className="p-2 text-xs">{r.group_name}</td>
                        <td className="p-2 text-xs">{r.icon}</td>
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
                <tr><td colSpan={8} className="p-6 text-center text-muted-foreground text-sm">No modules yet. Add one above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Only active modules are shown to employees on the portal dashboard. Use the edit (✎) button to update any field including URL, description and group.
      </p>
    </div>
  );
};

export default EmpPortalPanel;
