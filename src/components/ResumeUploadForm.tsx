import { useRef, useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Upload, FileText, X, CheckCircle2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const MAX_SIZE_MB = 5;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name too long"),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  role: z.string().trim().min(2, "Role is required").max(80),
  experience: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(800, "Keep under 800 characters").optional().or(z.literal("")),
});

const validateFile = (file: File | null): string | null => {
  if (!file) return "Please attach your resume";
  const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
  const typeOk = ALLOWED_TYPES.includes(file.type) || ALLOWED_EXT.includes(ext);
  if (!typeOk) return "Only PDF, DOC or DOCX files are allowed";
  if (file.size > MAX_SIZE) return `File must be under ${MAX_SIZE_MB} MB`;
  if (file.size === 0) return "File appears to be empty";
  return null;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

interface Props {
  defaultRole?: string;
  jobOpeningId?: string;
  lockRole?: boolean;
  onSubmitted?: () => void;
}

const ResumeUploadForm = ({ defaultRole = "", jobOpeningId, lockRole = false, onSubmitted }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState(defaultRole);

  useEffect(() => { setRole(defaultRole); }, [defaultRole]);

  const handleFile = (f: File | null) => {
    const err = validateFile(f);
    if (err) {
      toast.error(err);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFile(f);
    setErrors((p) => ({ ...p, file: "" }));
    toast.success("Resume attached");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    handleFile(f);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      role: String(form.get("role") || role || ""),
      experience: String(form.get("experience") || ""),
      message: String(form.get("message") || ""),
    };
    const parsed = schema.safeParse(data);
    const newErrors: Record<string, string> = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!newErrors[key]) newErrors[key] = issue.message;
      }
    }
    const fileErr = validateFile(file);
    if (fileErr) newErrors.file = fileErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSubmitting(true);
    try {
      const safeName = (file!.name || "resume").replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, file!, { contentType: file!.type || "application/octet-stream", upsert: false });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("job_applications").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          experience: data.experience || null,
          message: data.message || null,
          resume_url: path,
          resume_file_name: file!.name,
          resume_file_size: file!.size,
          ...(jobOpeningId ? { job_opening_id: jobOpeningId } : {}),
        } as any,
      ]);
      if (insertError) throw insertError;

      // Fire-and-forget email notification (edge function looks up by resume_url)
      supabase.functions.invoke("notify-job-application", {
        body: { resume_url: path },
      }).catch((err) => console.error("notify-job-application error", err));

      toast.success("Application submitted. Our HR team will be in touch.");
      formElement.reset();
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setErrors({});
      onSubmitted?.();
    } catch (err: any) {
      console.error("Resume submit error:", err);
      toast.error(err?.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-card border border-border p-6 md:p-8"
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
            Full Name *
          </label>
          <input name="name" maxLength={80} className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          {errors.name && <p className="text-xs text-primary mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">Email *</label>
          <input name="email" type="email" maxLength={120} className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          {errors.email && <p className="text-xs text-primary mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">Phone *</label>
          <input name="phone" maxLength={20} className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          {errors.phone && <p className="text-xs text-primary mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">Role Applied For *</label>
          <input
            name="role"
            maxLength={80}
            placeholder="e.g. Operations Manager"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            readOnly={lockRole}
            className={`w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary ${lockRole ? "bg-muted/40 cursor-not-allowed" : ""}`}
          />
          {errors.role && <p className="text-xs text-primary mt-1">{errors.role}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">Total Experience</label>
          <input name="experience" maxLength={20} placeholder="e.g. 4 years" className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">Message</label>
          <textarea name="message" rows={4} maxLength={800} placeholder="A short note about yourself" className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-primary resize-y" />
          {errors.message && <p className="text-xs text-primary mt-1">{errors.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
            Resume * <span className="text-muted-foreground font-normal normal-case tracking-normal">(PDF, DOC, DOCX · max {MAX_SIZE_MB} MB)</span>
          </label>

          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer border-2 border-dashed p-6 text-center transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
            >
              <Upload className="h-7 w-7 text-primary mx-auto mb-2" />
              <p className="text-sm font-bold text-foreground">Drop your resume here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC or DOCX up to {MAX_SIZE_MB} MB</p>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 border border-border bg-muted/40 p-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-foreground truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-primary" /> {formatSize(file.size)} · ready to send
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ""; }} className="p-2 text-muted-foreground hover:text-primary" aria-label="Remove file">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          {errors.file && <p className="text-xs text-primary mt-1">{errors.file}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-muted-foreground">Your application and resume are sent securely to our HR team.</p>
        <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-60">
          <Send className="h-4 w-4" /> {submitting ? "Sending..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
};

export default ResumeUploadForm;
