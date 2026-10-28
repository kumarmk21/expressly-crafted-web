import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Download, FileText, Loader2, Trash2, Eye, Copy, Mail, MessageSquare, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { submissionDetails, submissionShareLinks } from "@/lib/submissionSharing";

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
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const details = selected ? submissionDetails(active.label, active.cols, selected) : "";
  const shareLinks = submissionShareLinks(active.label, details);
  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(details);
      toast.success("Details copied.");
    } catch {
      toast.error("Could not copy. Select and copy the details below.");
    }
  };

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
          <Button variant="outline" key={s.id} onClick={() => { setSelected(null); setActive(s); }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm ${active.id === s.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>
            {s.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{loading ? "Loading…" : `${rows.length} entries`}</p>
        <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={load} disabled={loading} aria-label="Refresh entries" title="Refresh entries"><RefreshCw className="h-4 w-4" /></Button>
        <Button onClick={download} disabled={loading || !rows.length}>
          <Download className="h-4 w-4" /> Download Excel
        </Button>
        </div>
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
                <th className="p-2 sticky right-0 bg-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="p-2 whitespace-nowrap text-xs text-muted-foreground">{dateStr(r.created_at)}</td>
                  {active.cols.map((c) => (
                    <td key={c.key} className="p-2 max-w-xs break-words">
                      {active.resume && c.key === "resume_file_name" ? (
                        <Button variant="link" onClick={() => openResume(r.resume_url)} className="h-auto p-0 text-left whitespace-normal">
                          <FileText className="h-3.5 w-3.5" /> {fmt(r[c.key])}
                        </Button>
                      ) : fmt(r[c.key])}
                    </td>
                  ))}
                  <td className="p-2 sticky right-0 bg-card">
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" onClick={() => setSelected(r)} aria-label="View and share entry" title="View and share entry"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(r.id)} className="text-destructive" aria-label="Delete" title="Delete entry"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }}>
        <DialogContent className="max-w-2xl max-h-[90dvh] overflow-y-auto">
          <DialogHeader><DialogTitle>{active.label} details</DialogTitle><DialogDescription>Share only with the person who needs this customer’s information.</DialogDescription></DialogHeader>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={copyDetails}><Copy className="h-4 w-4" /> Copy details</Button>
            <Button variant="outline" asChild><a href={shareLinks.email}><Mail className="h-4 w-4" /> Email</a></Button>
            <Button variant="outline" asChild><a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer"><MessageSquare className="h-4 w-4" /> WhatsApp</a></Button>
          </div>
          <div className="whitespace-pre-wrap break-words select-text rounded-md border border-border bg-muted/40 p-4 text-sm leading-relaxed">{details}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionsPanel;
