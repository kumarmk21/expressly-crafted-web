import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { toast } from "sonner";
import { Loader2, LogOut, Trash2, Plus, Save, Upload, Image as ImageIcon } from "lucide-react";

type Tab = "content" | "images" | "clients" | "locations" | "quotes" | "tickets" | "inquiries" | "shipments";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdmin();
  const [tab, setTab] = useState<Tab>("content");

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) navigate("/admin/login", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  if (loading || !session) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center border border-border bg-card p-8">
          <h1 className="font-display uppercase text-2xl mb-2">Not authorised</h1>
          <p className="text-sm text-muted-foreground mb-4">You're signed in as <strong>{session.user.email}</strong> but don't have admin role yet.</p>
          <p className="text-xs text-muted-foreground mb-6">An existing admin must add you to the <code>user_roles</code> table. The first admin can be added directly in the Supabase dashboard.</p>
          <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 border border-border text-sm uppercase tracking-wider">Sign out</button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "content", label: "Site Content" },
    { id: "images", label: "Images" },
    { id: "clients", label: "Clients" },
    { id: "locations", label: "Locations" },
    { id: "quotes", label: "Quote Requests" },
    { id: "tickets", label: "Tickets" },
    { id: "inquiries", label: "Inquiries" },
    { id: "shipments", label: "Shipments" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display uppercase text-xl">Scorpion<span className="text-primary">.</span> Admin</Link>
            <span className="text-xs text-muted-foreground">{session.user.email}</span>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
        <div className="container mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {tab === "content" && <SiteContentPanel />}
        {tab === "images" && <ImagesPanel />}
        {tab === "clients" && <ClientsPanel />}
        {tab === "locations" && <LocationsPanel />}
        {tab === "quotes" && <QuotesPanel />}
        {tab === "tickets" && <TicketsPanel />}
        {tab === "inquiries" && <InquiriesPanel />}
        {tab === "shipments" && <ShipmentsPanel />}
      </main>
    </div>
  );
};

/* ---------------- Site Content ---------------- */
const HERO_DEFAULT = {
  eyebrow: "Custodian First · Carrier Later",
  headline_line1: "We move",
  headline_line2: "India",
  headline_tail: "Reliably.",
  subtext: "India's premier freight & logistics partner — express cargo, cold chain, air, FTL and warehousing engineered with absolute custodial discipline.",
};

const SiteContentPanel = () => {
  const [hero, setHero] = useState(HERO_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "hero").maybeSingle().then(({ data }) => {
      if (data?.value) setHero({ ...HERO_DEFAULT, ...(data.value as any) });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({ key: "hero", value: hero, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Hero content saved");
  };

  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="font-display uppercase text-2xl">Hero Section</h2>
      {(Object.keys(hero) as (keyof typeof hero)[]).map((k) => (
        <div key={k}>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{k.replace(/_/g, " ")}</label>
          {k === "subtext" ? (
            <textarea value={hero[k]} onChange={(e) => setHero({ ...hero, [k]: e.target.value })} rows={3} className="w-full px-3 py-2 bg-card border border-border focus:outline-none focus:border-primary" />
          ) : (
            <input value={hero[k]} onChange={(e) => setHero({ ...hero, [k]: e.target.value })} className="w-full px-3 py-2 bg-card border border-border focus:outline-none focus:border-primary" />
          )}
        </div>
      ))}
      <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-black uppercase text-xs tracking-wider disabled:opacity-50">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
      </button>
    </div>
  );
};

/* ---------------- Clients ---------------- */
const ClientsPanel = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", industry: "", services: "", partner_since: "", display_order: 0 });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("clients").select("*").order("display_order");
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name.trim()) return toast.error("Name required");
    const { error } = await supabase.from("clients").insert(form);
    if (error) return toast.error(error.message);
    toast.success("Client added");
    setForm({ name: "", industry: "", services: "", partner_since: "", display_order: 0 });
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("clients").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add new client</h3>
        <div className="grid md:grid-cols-5 gap-2">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Services" value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Partner since" value={form.partner_since} onChange={(e) => setForm({ ...form, partner_since: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <button onClick={add} className="inline-flex items-center justify-center gap-2 bg-primary text-white font-black uppercase text-xs tracking-wider"><Plus className="h-4 w-4" /> Add</button>
        </div>
      </div>
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Industry</th><th className="p-3 text-left">Services</th><th className="p-3 text-left">Since</th><th className="p-3 text-left">Order</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="p-2"><input defaultValue={r.name} onBlur={(e) => e.target.value !== r.name && update(r.id, { name: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.industry ?? ""} onBlur={(e) => update(r.id, { industry: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.services ?? ""} onBlur={(e) => update(r.id, { services: e.target.value })} className="w-full px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.partner_since ?? ""} onBlur={(e) => update(r.id, { partner_since: e.target.value })} className="w-20 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input type="number" defaultValue={r.display_order} onBlur={(e) => update(r.id, { display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ---------------- Generic submission lists ---------------- */
const SubmissionList = ({ table, columns, allowStatus }: { table: "quote_requests" | "tickets" | "contact_inquiries"; columns: string[]; allowStatus?: boolean }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("tickets").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else load();
  };
  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;
  if (!rows.length) return <p className="text-muted-foreground text-sm">No entries yet.</p>;
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.id} className="border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</div>
            <div className="flex items-center gap-2">
              {allowStatus && (
                <select defaultValue={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="text-xs px-2 py-1 bg-background border border-border">
                  <option value="open">open</option><option value="in_progress">in_progress</option><option value="resolved">resolved</option><option value="closed">closed</option>
                </select>
              )}
              <button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {columns.map((c) => r[c] != null && (
              <div key={c}><span className="text-xs uppercase tracking-wider text-muted-foreground mr-2">{c.replace(/_/g, " ")}:</span>{String(r[c])}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const QuotesPanel = () => <SubmissionList table="quote_requests" columns={["name", "company", "email", "phone", "service", "origin", "destination", "message"]} />;
const TicketsPanel = () => <SubmissionList table="tickets" columns={["ticket_number", "name", "email", "phone", "subject", "description", "status"]} allowStatus />;
const InquiriesPanel = () => <SubmissionList table="contact_inquiries" columns={["name", "email", "company", "phone", "subject", "message"]} />;

/* ---------------- Shipments ---------------- */
const ShipmentsPanel = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ tracking_number: "", origin: "", destination: "", status: "pending", customer_name: "", customer_email: "", estimated_delivery: "" });
  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("shipments").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  const add = async () => {
    if (!form.tracking_number || !form.origin || !form.destination) return toast.error("Tracking number, origin, destination required");
    const payload: any = { ...form, estimated_delivery: form.estimated_delivery || null };
    const { error } = await supabase.from("shipments").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Shipment added");
    setForm({ tracking_number: "", origin: "", destination: "", status: "pending", customer_name: "", customer_email: "", estimated_delivery: "" });
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete shipment?")) return;
    const { error } = await supabase.from("shipments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("shipments").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else load();
  };
  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add shipment</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <input placeholder="Tracking #" value={form.tracking_number} onChange={(e) => setForm({ ...form, tracking_number: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Origin" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Customer name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Customer email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input type="date" value={form.estimated_delivery} onChange={(e) => setForm({ ...form, estimated_delivery: e.target.value })} className="px-3 py-2 bg-background border border-border" />
        </div>
        <button onClick={add} className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-black uppercase text-xs tracking-wider"><Plus className="h-4 w-4" /> Add shipment</button>
      </div>
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr><th className="p-3 text-left">Tracking</th><th className="p-3 text-left">Route</th><th className="p-3 text-left">Customer</th><th className="p-3 text-left">ETA</th><th className="p-3 text-left">Status</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="p-3 font-mono">{r.tracking_number}</td>
                  <td className="p-3">{r.origin} → {r.destination}</td>
                  <td className="p-3">{r.customer_name}<br/><span className="text-xs text-muted-foreground">{r.customer_email}</span></td>
                  <td className="p-3">{r.estimated_delivery ?? "—"}</td>
                  <td className="p-3">
                    <select defaultValue={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="text-xs px-2 py-1 bg-background border border-border">
                      <option value="pending">pending</option><option value="in_transit">in_transit</option><option value="out_for_delivery">out_for_delivery</option><option value="delivered">delivered</option><option value="exception">exception</option>
                    </select>
                  </td>
                  <td className="p-3"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ---------------- Locations ---------------- */
const HIERARCHIES = ["Corporate Office", "Regional Office", "Branch Office", "Franchisee Office", "Warehouse"];
const ZONES = ["East", "West", "North", "South", "Central"];

const LocationsPanel = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");
  const blankForm = { location_code: "", location_name: "", hierarchy: "Branch Office", zone: "East", address: "", city: "", state: "", pincode: "", contact_number: "", email: "", is_active: true, display_order: 0 };
  const [form, setForm] = useState(blankForm);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("locations" as any).select("*").order("display_order").order("location_code");
    if (error) toast.error(error.message);
    setRows((data as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.location_code.trim() || !form.location_name.trim()) return toast.error("Code and name required");
    const { error } = await supabase.from("locations" as any).insert({ ...form, location_code: form.location_code.toUpperCase().trim() });
    if (error) return toast.error(error.message);
    toast.success("Location added");
    setForm(blankForm);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    const { error } = await supabase.from("locations" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };
  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("locations" as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const filtered = rows.filter((r) => {
    if (zoneFilter && r.zone !== zoneFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return [r.location_code, r.location_name, r.hierarchy, r.city, r.state, r.zone].some((v) => String(v ?? "").toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Add new location</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <input placeholder="Location Code (e.g. ZKP)" value={form.location_code} onChange={(e) => setForm({ ...form, location_code: e.target.value })} className="px-3 py-2 bg-background border border-border uppercase" />
          <input placeholder="Location Name" value={form.location_name} onChange={(e) => setForm({ ...form, location_name: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <select value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} className="px-3 py-2 bg-background border border-border">
            {ZONES.map((z) => <option key={z} value={z}>{z} Zone</option>)}
          </select>
          <select value={form.hierarchy} onChange={(e) => setForm({ ...form, hierarchy: e.target.value })} className="px-3 py-2 bg-background border border-border md:col-span-1">
            {HIERARCHIES.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
          <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="md:col-span-3 px-3 py-2 bg-background border border-border" />
          <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Contact Number" value={form.contact_number} onChange={(e) => setForm({ ...form, contact_number: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-3 py-2 bg-background border border-border" />
          <input type="number" placeholder="Display order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="px-3 py-2 bg-background border border-border" />
          <label className="flex items-center gap-2 px-3 py-2 border border-border bg-background">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
            <span className="text-xs uppercase tracking-wider">Active</span>
          </label>
          <button onClick={add} className="inline-flex items-center justify-center gap-2 bg-primary text-white font-black uppercase text-xs tracking-wider px-4 py-2"><Plus className="h-4 w-4" /> Add Location</button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <input placeholder="Search code, name, city…" value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 bg-background border border-border w-72 max-w-full" />
          <select value={zoneFilter} onChange={(e) => setZoneFilter(e.target.value)} className="px-3 py-2 bg-background border border-border">
            <option value="">All zones</option>
            {ZONES.map((z) => <option key={z} value={z}>{z} Zone</option>)}
          </select>
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} of {rows.length}</span>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Zone</th>
                <th className="p-3 text-left">Hierarchy</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left">State</th>
                <th className="p-3 text-left">Pincode</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="p-2"><input defaultValue={r.location_code} onBlur={(e) => e.target.value !== r.location_code && update(r.id, { location_code: e.target.value.toUpperCase() })} className="w-24 px-2 py-1 bg-background border border-border uppercase font-mono" /></td>
                  <td className="p-2"><input defaultValue={r.location_name} onBlur={(e) => e.target.value !== r.location_name && update(r.id, { location_name: e.target.value })} className="w-40 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2">
                    <select defaultValue={r.zone ?? "East"} onChange={(e) => update(r.id, { zone: e.target.value })} className="px-2 py-1 bg-background border border-border">
                      {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <select defaultValue={r.hierarchy} onChange={(e) => update(r.id, { hierarchy: e.target.value })} className="px-2 py-1 bg-background border border-border">
                      {HIERARCHIES.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </td>
                  <td className="p-2"><input defaultValue={r.address ?? ""} onBlur={(e) => update(r.id, { address: e.target.value })} className="w-56 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.city ?? ""} onBlur={(e) => update(r.id, { city: e.target.value })} className="w-28 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.state ?? ""} onBlur={(e) => update(r.id, { state: e.target.value })} className="w-28 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.pincode ?? ""} onBlur={(e) => update(r.id, { pincode: e.target.value })} className="w-20 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.contact_number ?? ""} onBlur={(e) => update(r.id, { contact_number: e.target.value })} className="w-32 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input defaultValue={r.email ?? ""} onBlur={(e) => update(r.id, { email: e.target.value })} className="w-40 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2"><input type="number" defaultValue={r.display_order} onBlur={(e) => update(r.id, { display_order: Number(e.target.value) })} className="w-16 px-2 py-1 bg-background border border-border" /></td>
                  <td className="p-2">
                    <select defaultValue={String(r.is_active)} onChange={(e) => update(r.id, { is_active: e.target.value === "true" })} className={`px-2 py-1 border border-border text-xs font-bold ${r.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                  <td className="p-2"><button onClick={() => remove(r.id)} className="text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={13} className="p-6 text-center text-muted-foreground text-sm">No locations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ---------------- Images ---------------- */
const IMAGE_SLOTS: { key: string; label: string; description: string; aspect: string }[] = [
  { key: "leadership_photo", label: "Leadership Photo", description: "Shown in the 'Driven by Vision' section on the home page.", aspect: "aspect-[4/5]" },
  { key: "hero_image", label: "Hero Background", description: "Optional hero/banner image.", aspect: "aspect-video" },
  { key: "about_image", label: "About Section Image", description: "Image used in the About section.", aspect: "aspect-video" },
];

const ImagesPanel = () => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_content").select("key,value").in("key", IMAGE_SLOTS.map((s) => s.key));
    const map: Record<string, string> = {};
    (data ?? []).forEach((r: any) => { if (r.value?.url) map[r.key] = r.value.url; });
    setUrls(map);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const upload = async (slotKey: string, file: File) => {
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5 MB");
    setUploading(slotKey);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${slotKey}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("site-images").upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) { setUploading(null); return toast.error(upErr.message); }
    const { data: pub } = supabase.storage.from("site-images").getPublicUrl(path);
    const url = pub.publicUrl;
    const { error } = await supabase.from("site_content").upsert({ key: slotKey, value: { url, updated: new Date().toISOString() }, updated_at: new Date().toISOString() });
    setUploading(null);
    if (error) return toast.error(error.message);
    toast.success("Image updated");
    setUrls((u) => ({ ...u, [slotKey]: url }));
  };

  const clear = async (slotKey: string) => {
    if (!confirm("Remove this image and revert to default?")) return;
    const { error } = await supabase.from("site_content").delete().eq("key", slotKey);
    if (error) return toast.error(error.message);
    setUrls((u) => { const n = { ...u }; delete n[slotKey]; return n; });
    toast.success("Reverted to default");
  };

  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="font-display uppercase text-2xl mb-1">Site Images</h2>
        <p className="text-sm text-muted-foreground">Upload images to replace what's shown on the live website. Recommended max 5 MB. Best results: JPG or PNG.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {IMAGE_SLOTS.map((slot) => (
          <div key={slot.key} className="border border-border bg-card p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <ImageIcon className="h-4 w-4 text-primary" />
              <h3 className="font-bold uppercase tracking-wider text-sm">{slot.label}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{slot.description}</p>
            <div className={`${slot.aspect} w-full bg-muted border border-border mb-3 overflow-hidden flex items-center justify-center`}>
              {urls[slot.key] ? (
                <img src={urls[slot.key]} alt={slot.label} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Default image</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <label className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white font-black uppercase text-xs tracking-wider cursor-pointer hover:bg-primary/90">
                {uploading === slot.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading === slot.key ? "Uploading…" : urls[slot.key] ? "Replace" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(slot.key, f); e.target.value = ""; }}
                  disabled={uploading === slot.key}
                />
              </label>
              {urls[slot.key] && (
                <button onClick={() => clear(slot.key)} className="px-3 py-2 border border-border text-destructive hover:bg-destructive hover:text-white text-xs uppercase tracking-wider">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
