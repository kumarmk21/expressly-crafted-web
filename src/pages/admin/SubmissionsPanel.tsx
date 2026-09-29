import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Download, FileText, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Col = { key: string; label: string };
type Source = { id: string; label: string; table: string; cols: Col[]; resume?: boolean };

const SOURCES: Source[] = [
  {
    id: "quotes", label: "Get a Quote", table: "quote_requests",
    cols: [
      { key: "name", label: "Name" }, { key: "company", label: "Company" }, { key: "email", label: "Email" },
      { key: "phone", label: "Phone" }, { key: "service", label: "Service" }, { key: "origin", label: "From" },
      { key: "destination", label: "To" }, { key: "message", label: "Message" },
    ],
  },
  {
    id: "enquiries", label: "Business & Franchisee", table: "contact_submissions",
    cols: [
      { key: "form_type", label: "Form" }, { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" },
      { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "company_name", label: "Company" },
      { key: "business_type", label: "Business Type" }, { key: "service_interested", label: "Service" },
      { key: "location", label: "Location" }, { key: "worked_as_franchisee", label: "Worked as Franchisee" },
      { key: "owns_vehicle", label: "Owns Vehicle" }, { key: "message", label: "Message" },
    ],
  },
  {
    id: "resumes", label: "Resumes / Job Applications", table: "job_applications", resume: true,
    cols: [
      { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
      { key: "role", label: "Role" }, { key: "experience", label: "Experience" }, { key: "message", label: "Message" },
      { key: "resume_file_name", label: "Resume File" },
    ],
  },
  {
    id: "messages", label: "Other Messages", table: "contact_inquiries",
    cols: [
      { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
      { key: "company", label: "Company" }, { key: "subject", label: "Subject" }, { key: "message", label: "Message" },
    ],
  },
];

const fmt = (v: unknown) => (v === true ? "Yes" : v === false ? "No" : v == null ? "" : String(v));
const dateStr = (d: string) => new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

const SubmissionsPanel = () => {
  const [active, setActive] = useState(SOURCES[0]);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(active.table as any).select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [active.id]);

  const download = async () => {
    if (!rows.length) return toast.error("Nothing to download yet.");
    let links: Record<string, string> = {};
    if (active.resume) {
      const { data } = await supabase.storage.from("resumes").createSignedUrls(rows.map((r) => r.resume_url), 60 * 60 * 24 * 7);
      (data ?? []).forEach((d) => { if (d.path && d.signedUrl) links[d.path] = d.signedUrl; });
    }
    const sheet = rows.map((r, i) => {
      const o: Record<string, string | number> = { "S.No": i + 1, "Date & Time": dateStr(r.created_at) };
      active.cols.forEach((c) => (o[c.label] = fmt(r[c.key])));
      if (active.resume) o["Resume Link (valid 7 days)"] = links[r.resume_url] ?? "";
      return o;
    });
    const ws = XLSX.utils.json_to_sheet(sheet);
    ws["!cols"] = Object.keys(sheet[0]).map((k) => ({ wch: Math.min(60, Math.max(k.length + 2, ...sheet.map((s) => String(s[k]).length + 2))) }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, active.label.slice(0, 31).replace(/[\\/?*[\]]/g, "-"));
    XLSX.writeFile(wb, `Scorpion-${active.id}-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const openResume = async (path: string) => {
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(path, 600);
    if (error || !data) return toast.error("Could not open resume.");
    window.open(data.signedUrl, "_blank", "noopener");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from(active.table as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {SOURCES.map((s) => (
          <button key={s.id} onClick={() => setActive(s)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm ${active.id === s.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{loading ? "Loading…" : `${rows.length} entries`}</p>
        <button onClick={download} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-primary/90">
          <Download className="h-4 w-4" /> Download Excel
        </button>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : !rows.length ? (
        <p className="text-sm text-muted-foreground">No entries yet.</p>
      ) : (
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-2 text-xs uppercase whitespace-nowrap">Date</th>
                {active.cols.map((c) => <th key={c.key} className="p-2 text-xs uppercase whitespace-nowrap">{c.label}</th>)}
                <th className="p-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="p-2 whitespace-nowrap text-xs text-muted-foreground">{dateStr(r.created_at)}</td>
                  {active.cols.map((c) => (
                    <td key={c.key} className="p-2 max-w-xs break-words">
                      {active.resume && c.key === "resume_file_name" ? (
                        <button onClick={() => openResume(r.resume_url)} className="inline-flex items-center gap-1 text-primary hover:underline">
                          <FileText className="h-3.5 w-3.5" /> {fmt(r[c.key])}
                        </button>
                      ) : fmt(r[c.key])}
                    </td>
                  ))}
                  <td className="p-2">
                    <button onClick={() => remove(r.id)} className="text-destructive hover:text-primary" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionsPanel;
