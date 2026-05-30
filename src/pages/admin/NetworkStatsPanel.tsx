import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

const CATEGORIES = [
  { key: "pin_codes", label: "PIN Code Coverage" },
  { key: "network", label: "Branches, Franchisees, Hubs & PDAs" },
  { key: "volume", label: "Monthly Volume" },
  { key: "routes", label: "Routes & Fleet" },
];

const ICON_OPTIONS = ["MapPin", "Building2", "Truck", "Package", "Route", "Activity"];

const NetworkStatsPanel = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ category: "pin_codes", label: "", value: "", icon: "MapPin", display_order: 0 });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("network_stats" as any)
      .select("*")
      .order("category")
      .order("display_order");
    if (error) toast.error(error.message);
    setRows((data as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.label.trim() || !form.value.trim()) return toast.error("Label and value required");
    const { error } = await supabase.from("network_stats" as any).insert({ ...form });
    if (error) return toast.error(error.message);
    toast.success("Stat added");
    setForm({ ...form, label: "", value: "" });
    load();
  };
  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("network_stats" as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this stat?")) return;
    const { error } = await supabase.from("network_stats" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add network stat</h3>
        <div className="grid md:grid-cols-5 gap-2">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <input placeholder="Label (e.g. Branches)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Value (e.g. 73)" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <button onClick={add} className="inline-flex items-center justify-center gap-2 bg-primary text-white font-black uppercase text-xs tracking-wider"><Plus className="h-4 w-4" /> Add</button>
        </div>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="space-y-6">
          {CATEGORIES.map((c) => {
            const items = rows.filter((r) => r.category === c.key);
            return (
              <div key={c.key} className="border border-border bg-card overflow-x-auto">
                <div className="px-4 py-2 bg-muted/40 border-b border-border text-xs font-bold uppercase tracking-wider">{c.label}</div>
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase text-muted-foreground">
                    <tr><th className="p-3 text-left">Value</th><th className="p-3 text-left">Label</th><th className="p-3 text-left">Icon</th><th className="p-3 text-left">Order</th><th></th></tr>
                  </thead>
                  <tbody>
                    {items.map((r) => (
                      <tr key={r.id} className="border-t border-border">
                        <td className="p-2"><input defaultValue={r.value} onBlur={(e) => e.target.value !== r.value && update(r.id, { value: e.target.value })} className="w-28 px-2 py-1 bg-background border border-border font-mono" /></td>
                        <td className="p-2"><input defaultValue={r.label} onBlur={(e) => e.target.value !== r.label && update(r.id, { label: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                        <td className="p-2">
                          <select defaultValue={r.icon ?? ""} onChange={(e) => update(r.id, { icon: e.target.value || null })} className="px-2 py-1 bg-background border border-border">
                            <option value="">—</option>
                            {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                          </select>
                        </td>
                        <td className="p-2"><input type="number" defaultValue={r.display_order} onBlur={(e) => update(r.id, { display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                        <td className="p-2"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                      </tr>
                    ))}
                    {items.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-xs text-muted-foreground">No entries.</td></tr>}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NetworkStatsPanel;
