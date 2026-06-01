import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  LogOut,
  Plus,
  Send,
  Tag as TagIcon,
  Trash2,
  User as UserIcon,
  X,
  Heart,
  Calendar,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import scorpionLogo from "@/assets/scorpion-logo.png";

const SESSION_KEY = "scorpion_emp_session";
const BUCKET = "blog-images";

type BlogPost = {
  id: string;
  author_name: string;
  title: string;
  body: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
};

const postSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(200, "Title is too long"),
  body: z.string().trim().min(1, "Write something").max(50000, "Post is too long"),
  tags: z.array(z.string().trim().min(1).max(30)).max(8, "Max 8 tags"),
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** Render body: plain text with blank-line paragraphs, and `![alt](url)` image lines. */
const RenderedBody = ({ body }: { body: string }) => {
  const blocks = body.split(/\n{2,}/);
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
      {blocks.map((block, i) => {
        const imgMatch = block.match(/^!\[(.*?)\]\((.+?)\)$/);
        if (imgMatch) {
          return (
            <img
              key={i}
              src={imgMatch[2]}
              alt={imgMatch[1] || "post image"}
              className="w-full max-h-[480px] object-cover border border-border"
              loading="lazy"
            />
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {block}
          </p>
        );
      })}
    </div>
  );
};

const uploadImage = async (file: File): Promise<string> => {
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB");
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
};

const NewPostDialog = ({
  open,
  onOpenChange,
  authorName,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  authorName: string;
  onCreated: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const reset = () => {
    setTitle("");
    setBody("");
    setTagInput("");
    setTags([]);
    setCoverUrl(null);
  };

  const addTagFromInput = () => {
    const t = tagInput.trim().replace(/^#/, "");
    if (!t) return;
    if (tags.includes(t)) return;
    if (tags.length >= 8) {
      toast.error("Max 8 tags");
      return;
    }
    setTags([...tags, t]);
    setTagInput("");
  };

  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setUploadingCover(true);
      const url = await uploadImage(file);
      setCoverUrl(url);
      toast.success("Cover image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleInlineImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setUploadingInline(true);
      const url = await uploadImage(file);
      const snippet = `\n\n![image](${url})\n\n`;
      const ta = bodyRef.current;
      if (ta) {
        const start = ta.selectionStart ?? body.length;
        const end = ta.selectionEnd ?? body.length;
        setBody(body.slice(0, start) + snippet + body.slice(end));
      } else {
        setBody(body + snippet);
      }
      toast.success("Image inserted into post");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingInline(false);
    }
  };

  const handlePublish = async () => {
    const parsed = postSchema.safeParse({ title, body, tags });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setPublishing(true);
    const { error } = await supabase.from("blog_posts").insert({
      author_name: authorName,
      title: parsed.data.title,
      body: parsed.data.body,
      cover_image_url: coverUrl,
      tags: parsed.data.tags,
      is_published: true,
    });
    setPublishing(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Post published");
    reset();
    onOpenChange(false);
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-wide">New Post</DialogTitle>
          <DialogDescription>Share an update with the team. Anyone can read it.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Cover */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider font-bold">Cover image</Label>
            {coverUrl ? (
              <div className="relative group">
                <img src={coverUrl} alt="cover" className="w-full h-48 object-cover border border-border" />
                <button
                  type="button"
                  onClick={() => setCoverUrl(null)}
                  className="absolute top-2 right-2 h-8 w-8 bg-black/70 text-white flex items-center justify-center hover:bg-primary"
                  aria-label="Remove cover"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border hover:border-primary cursor-pointer bg-muted/30 text-muted-foreground hover:text-primary transition-colors">
                {uploadingCover ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ImagePlus className="h-6 w-6 mb-1" />
                    <span className="text-xs uppercase tracking-wider font-bold">Upload cover</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleCover} disabled={uploadingCover} />
              </label>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs uppercase tracking-wider font-bold">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the headline?"
              maxLength={200}
              className="h-11"
            />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="body" className="text-xs uppercase tracking-wider font-bold">
                Post
              </Label>
              <label className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-primary cursor-pointer hover:underline">
                {uploadingInline ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
                Add image in post
                <input type="file" accept="image/*" className="hidden" onChange={handleInlineImage} disabled={uploadingInline} />
              </label>
            </div>
            <Textarea
              id="body"
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post. Use blank lines between paragraphs."
              rows={10}
              maxLength={50000}
              className="resize-y"
            />
            <p className="text-[11px] text-muted-foreground">
              Tip: leave a blank line between paragraphs. Images inserted will appear inline.
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider font-bold">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-2 py-1">
                  #{t}
                  <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} aria-label={`Remove ${t}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTagFromInput();
                  }
                }}
                placeholder="Add a tag and press Enter"
                maxLength={30}
                className="h-10"
              />
              <Button type="button" variant="outline" onClick={addTagFromInput} className="rounded-none">
                Add
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Posting as <strong className="text-foreground">{authorName}</strong>
            </div>
            <Button
              onClick={handlePublish}
              disabled={publishing || uploadingCover || uploadingInline}
              className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider rounded-none"
            >
              {publishing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PostCard = ({
  post,
  likeCount,
  onOpen,
  onDelete,
}: {
  post: BlogPost;
  likeCount: number;
  onOpen: () => void;
  onDelete: () => void;
}) => (
  <article className="group bg-white border border-border hover:border-primary hover:shadow-lg transition-all flex flex-col">
    {post.cover_image_url && (
      <button onClick={onOpen} className="aspect-[16/9] overflow-hidden bg-muted text-left">
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </button>
    )}
    <div className="p-5 flex-1 flex flex-col">
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5">
              #{t}
            </span>
          ))}
        </div>
      )}
      <button onClick={onOpen} className="text-left">
        <h3 className="font-display uppercase text-xl text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
      </button>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">
        {post.body.replace(/!\[.*?\]\(.*?\)/g, "").slice(0, 180)}
      </p>
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground mt-4 pt-3 border-t border-border">
        <span className="inline-flex items-center gap-1">
          <UserIcon className="h-3 w-3" /> {post.author_name}
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {formatDate(post.created_at)}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 border border-border text-foreground">
          <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
          aria-label="Delete post"
        >
          <Trash2 className="h-3.5 w-3.5" /> Remove
        </button>
      </div>
    </div>
  </article>
);

const PostViewDialog = ({ post, onClose }: { post: BlogPost | null; onClose: () => void }) => (
  <Dialog open={!!post} onOpenChange={(v) => !v && onClose()}>
    <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
      {post && (
        <>
          <DialogHeader>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.map((t) => (
                <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5">
                  #{t}
                </span>
              ))}
            </div>
            <DialogTitle className="font-display uppercase text-3xl leading-tight text-left">
              {post.title}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-3 text-xs uppercase tracking-wider pt-1">
              <span className="inline-flex items-center gap-1">
                <UserIcon className="h-3 w-3" /> {post.author_name}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {formatDate(post.created_at)}
              </span>
            </DialogDescription>
          </DialogHeader>
          {post.cover_image_url && (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full max-h-[420px] object-cover border border-border"
            />
          )}
          <RenderedBody body={post.body} />
        </>
      )}
    </DialogContent>
  </Dialog>
);

const EmployeeBlog = () => {
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openNew, setOpenNew] = useState(false);
  const [viewing, setViewing] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) {
        navigate("/employee-login");
        return;
      }
      const parsed = JSON.parse(raw);
      if (!parsed?.userId) {
        navigate("/employee-login");
        return;
      }
      setAuthorName(parsed.userId);
    } catch {
      navigate("/employee-login");
    }
  }, [navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, author_name, title, body, cover_image_url, tags, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    setPosts(data || []);
    const { data: likes } = await supabase.from("blog_post_likes").select("post_id");
    const counts: Record<string, number> = {};
    (likes || []).forEach((l: any) => {
      counts[l.post_id] = (counts[l.post_id] || 0) + 1;
    });
    setLikeCounts(counts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.from("blog_posts").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Post removed");
    setDeleteTarget(null);
    fetchPosts();
  };

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.author_name.toLowerCase().includes(q)
      );
    });
  }, [posts, query, activeTag]);

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    navigate("/employee-login");
  };

  if (!authorName) return null;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/employee-login"
              className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <span className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-white border border-border p-0.5 flex items-center justify-center">
                <img src={scorpionLogo} alt="Scorpion" className="h-full w-full object-contain" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-base text-foreground tracking-wide">
                  SCORPION<span className="text-primary">.</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Team Blog</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <UserIcon className="h-4 w-4 text-primary" />
              <strong className="text-foreground">{authorName}</strong>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-2 border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        {/* Hero strip */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Team Blog</span>
            </div>
            <h1 className="font-display uppercase text-4xl md:text-5xl text-foreground leading-[0.95]">
              What's happening <br className="hidden sm:block" /> at Scorpion.
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Share updates, milestones, and announcements with the team.
            </p>
          </div>
          <Button
            onClick={() => setOpenNew(true)}
            className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider rounded-none h-12 px-6 self-start md:self-auto"
          >
            <Plus className="h-4 w-4 mr-2" /> New Post
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-border p-4 mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              className="pl-9 h-10"
              maxLength={100}
            />
          </div>
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              <TagIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <button
                onClick={() => setActiveTag(null)}
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 border whitespace-nowrap transition-colors ${
                  !activeTag ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t === activeTag ? null : t)}
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 border whitespace-nowrap transition-colors ${
                    activeTag === t ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading posts…
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <div className="text-muted-foreground mb-4">
              {posts.length === 0 ? "No posts yet. Be the first to share an update!" : "No posts matched your filters."}
            </div>
            {posts.length === 0 && (
              <Button onClick={() => setOpenNew(true)} className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider rounded-none">
                <Plus className="h-4 w-4 mr-2" /> Create the first post
              </Button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                likeCount={likeCounts[p.id] || 0}
                onOpen={() => setViewing(p)}
                onDelete={() => setDeleteTarget(p)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-white">
        <div className="container mx-auto px-4 py-5 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Scorpion Express Pvt. Ltd. — Internal team blog.
        </div>
      </footer>

      <NewPostDialog open={openNew} onOpenChange={setOpenNew} authorName={authorName} onCreated={fetchPosts} />
      <PostViewDialog post={viewing} onClose={() => setViewing(null)} />

      <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this post?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.title}" will be permanently deleted along with its likes. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleDelete(); }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeBlog;
