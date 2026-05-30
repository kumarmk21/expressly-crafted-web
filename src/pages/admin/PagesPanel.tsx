import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload, ChevronUp, ChevronDown, ExternalLink, ArrowLeft, Save } from "lucide-react";
import { BLOCK_DEFS, getBlockDef } from "@/lib/pageBlocks";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const uploadImage = async (file: File): Promise<string | null> => {
  if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return null; }
  if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5 MB"); return null; }
  const ext = file.name.split(".").pop() || "jpg";
  const path = `pages/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true, contentType: file.type });
  if (error) { toast.error(error.message); return null; }
  return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
};

const PagesPanel = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "" });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("pages" as any).select("*").order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setPages((data as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.title.trim()) return toast.error("Title required");
    const slug = (form.slug.trim() || slugify(form.title));
    if (!slug) return toast.error("Slug required");
    const { data, error } = await supabase.from("pages" as any).insert({ title: form.title, slug }).select().single();
    if (error) return toast.error(error.message);
    toast.success("Page created");
    setForm({ title: "", slug: "" });
    await load();
    setEditingId((data as any).id);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this page and all its blocks?")) return;
    const { error } = await supabase.from("pages" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  if (editingId) {
    return <PageEditor pageId={editingId} onBack={() => { setEditingId(null); load(); }} />;
  }

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Create new page</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <input
            placeholder="Page title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
            className="px-3 py-2 bg-background border border-border"
          />
          <input
            placeholder="slug (auto)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
            className="px-3 py-2 bg-background border border-border font-mono"
          />
          <button onClick={create} className="inline-flex items-center justify-center gap-2 bg-primary text-white font-black uppercase text-xs tracking-wider px-4 py-2">
            <Plus className="h-4 w-4" /> Create
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Pages are reachable at <code>/p/&lt;slug&gt;</code> once published.</p>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Slug</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3 font-medium">{p.title}</td>
                  <td className="p-3 font-mono text-xs">/p/{p.slug}</td>
                  <td className="p-3">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 ${p.is_published ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{new Date(p.updated_at).toLocaleString()}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    {p.is_published && (
                      <Link to={`/p/${p.slug}`} target="_blank" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mr-3">
                        <ExternalLink className="h-3 w-3" /> View
                      </Link>
                    )}
                    <button onClick={() => setEditingId(p.id)} className="text-xs font-bold uppercase tracking-wider text-primary mr-3">Edit</button>
                    <button onClick={() => remove(p.id)} className="text-destructive hover:text-primary inline-flex"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center text-muted-foreground text-sm">No pages yet. Create your first one above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ---------------- Page Editor ---------------- */
const PageEditor = ({ pageId, onBack }: { pageId: string; onBack: () => void }) => {
  const [page, setPage] = useState<any | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingMeta, setSavingMeta] = useState(false);

  const load = async () => {
    setLoading(true);
    const [{ data: p }, { data: bs }] = await Promise.all([
      supabase.from("pages" as any).select("*").eq("id", pageId).maybeSingle(),
      supabase.from("page_blocks" as any).select("*").eq("page_id", pageId).order("display_order"),
    ]);
    setPage(p);
    setBlocks((bs as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [pageId]);

  const saveMeta = async () => {
    if (!page) return;
    setSavingMeta(true);
    const { error } = await supabase.from("pages" as any).update({
      title: page.title,
      slug: page.slug,
      meta_description: page.meta_description,
      is_published: page.is_published,
    }).eq("id", pageId);
    setSavingMeta(false);
    if (error) return toast.error(error.message);
    toast.success("Page saved");
  };

  const addBlock = async (type: string) => {
    const def = getBlockDef(type);
    if (!def) return;
    const display_order = blocks.length ? Math.max(...blocks.map((b) => b.display_order)) + 1 : 0;
    const { error } = await supabase.from("page_blocks" as any).insert({
      page_id: pageId, block_type: type, content: def.defaultContent, display_order,
    });
    if (error) return toast.error(error.message);
    load();
  };

  const updateBlock = async (id: string, patch: any) => {
    const { error } = await supabase.from("page_blocks" as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const removeBlock = async (id: string) => {
    if (!confirm("Delete this block?")) return;
    const { error } = await supabase.from("page_blocks" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= blocks.length) return;
    const a = blocks[idx], b = blocks[j];
    await Promise.all([
      supabase.from("page_blocks" as any).update({ display_order: b.display_order }).eq("id", a.id),
      supabase.from("page_blocks" as any).update({ display_order: a.display_order }).eq("id", b.id),
    ]);
    load();
  };

  if (loading || !page) return <Loader2 className="h-5 w-5 animate-spin" />;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to pages
      </button>

      <div className="border border-border bg-card p-5 space-y-3">
        <h3 className="font-bold uppercase tracking-wider text-sm">Page settings</h3>
        <div className="grid md:grid-cols-2 gap-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Title</label>
            <input value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} className="w-full px-3 py-2 bg-background border border-border" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Slug</label>
            <input value={page.slug} onChange={(e) => setPage({ ...page, slug: slugify(e.target.value) })} className="w-full px-3 py-2 bg-background border border-border font-mono" />
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Meta description (SEO)</label>
          <textarea value={page.meta_description ?? ""} onChange={(e) => setPage({ ...page, meta_description: e.target.value })} rows={2} className="w-full px-3 py-2 bg-background border border-border" />
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={page.is_published} onChange={(e) => setPage({ ...page, is_published: e.target.checked })} />
            <span className="text-xs uppercase tracking-wider">Published</span>
          </label>
          <div className="flex items-center gap-3">
            {page.is_published && (
              <Link to={`/p/${page.slug}`} target="_blank" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                <ExternalLink className="h-3 w-3" /> View live
              </Link>
            )}
            <button onClick={saveMeta} disabled={savingMeta} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-black uppercase text-xs tracking-wider disabled:opacity-50">
              {savingMeta ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
            </button>
          </div>
        </div>
      </div>

      <div className="border border-border bg-card p-5">
        <h3 className="font-bold uppercase tracking-wider text-sm mb-3">Add block</h3>
        <div className="flex flex-wrap gap-2">
          {BLOCK_DEFS.map((d) => (
            <button key={d.type} onClick={() => addBlock(d.type)} className="inline-flex items-center gap-1 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider hover:border-primary">
              <Plus className="h-3 w-3" /> {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {blocks.map((b, i) => (
          <BlockEditor
            key={b.id}
            block={b}
            index={i}
            total={blocks.length}
            onChange={(content) => { b.content = content; setBlocks([...blocks]); updateBlock(b.id, { content }); }}
            onMove={(dir) => move(i, dir)}
            onRemove={() => removeBlock(b.id)}
          />
        ))}
        {blocks.length === 0 && (
          <div className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No blocks yet. Add one above to start building this page.
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- Block editor ---------------- */
const BlockEditor = ({ block, index, total, onChange, onMove, onRemove }: {
  block: any; index: number; total: number;
  onChange: (content: any) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) => {
  const def = getBlockDef(block.block_type);
  if (!def) return null;
  const c = block.content || {};
  const setField = (key: string, val: any) => onChange({ ...c, [key]: val });

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
        <div className="text-xs uppercase tracking-wider font-bold">
          #{index + 1} · {def.label}
        </div>
        <div className="flex items-center gap-1">
          <button disabled={index === 0} onClick={() => onMove(-1)} className="p-1 disabled:opacity-30 hover:text-primary"><ChevronUp className="h-4 w-4" /></button>
          <button disabled={index === total - 1} onClick={() => onMove(1)} className="p-1 disabled:opacity-30 hover:text-primary"><ChevronDown className="h-4 w-4" /></button>
          <button onClick={onRemove} className="p-1 text-destructive hover:text-primary"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="p-4 grid md:grid-cols-2 gap-3">
        {def.fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" || f.type === "repeater" ? "md:col-span-2" : ""}>
            <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{f.label}</label>
            {f.type === "text" || f.type === "url" ? (
              <input value={c[f.key] ?? ""} onChange={(e) => setField(f.key, e.target.value)} className="w-full px-3 py-2 bg-background border border-border" />
            ) : f.type === "textarea" ? (
              <textarea value={c[f.key] ?? ""} onChange={(e) => setField(f.key, e.target.value)} rows={4} className="w-full px-3 py-2 bg-background border border-border" />
            ) : f.type === "image" ? (
              <ImageField value={c[f.key] ?? ""} onChange={(url) => setField(f.key, url)} />
            ) : f.type === "repeater" ? (
              <RepeaterField items={Array.isArray(c[f.key]) ? c[f.key] : []} itemFields={f.itemFields ?? []} onChange={(items) => setField(f.key, items)} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageField = ({ value, onChange }: { value: string; onChange: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {value ? (
        <img src={value} alt="" className="h-16 w-24 object-cover border border-border" />
      ) : (
        <div className="h-16 w-24 border border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground">No image</div>
      )}
      <label className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider cursor-pointer hover:border-primary">
        {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
        {value ? "Replace" : "Upload"}
        <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={async (e) => {
          const f = e.target.files?.[0]; e.target.value = "";
          if (!f) return;
          setUploading(true);
          const url = await uploadImage(f);
          setUploading(false);
          if (url) onChange(url);
        }} />
      </label>
      {value && <button onClick={() => onChange("")} className="text-xs text-destructive hover:underline">Clear</button>}
    </div>
  );
};

const RepeaterField = ({ items, itemFields, onChange }: { items: any[]; itemFields: { key: string; label: string; type: string }[]; onChange: (items: any[]) => void }) => {
  const add = () => onChange([...items, Object.fromEntries(itemFields.map((f) => [f.key, ""]))]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, key: string, val: any) => onChange(items.map((it, idx) => idx === i ? { ...it, [key]: val } : it));
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="border border-border p-3 bg-background">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Item {i + 1}</span>
            <button onClick={() => remove(i)} className="text-destructive hover:text-primary"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {itemFields.map((f) => (
              <div key={f.key}>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{f.label}</label>
                {f.type === "image" ? (
                  <ImageField value={it[f.key] ?? ""} onChange={(url) => update(i, f.key, url)} />
                ) : (
                  <input value={it[f.key] ?? ""} onChange={(e) => update(i, f.key, e.target.value)} className="w-full px-2 py-1 bg-card border border-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={add} className="inline-flex items-center gap-1 px-3 py-2 border border-border bg-background text-xs uppercase tracking-wider hover:border-primary">
        <Plus className="h-3 w-3" /> Add item
      </button>
    </div>
  );
};

export default PagesPanel;
