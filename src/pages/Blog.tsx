import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Calendar, Copy, Facebook, Heart, Linkedin, Loader2, Mail, MessageCircle, Search, Share2, Tag as TagIcon, Twitter, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const VISITOR_KEY_STORAGE = "scorpion_blog_visitor";

type BlogPost = {
  id: string;
  author_name: string;
  title: string;
  body: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const getVisitorKey = () => {
  let v = localStorage.getItem(VISITOR_KEY_STORAGE);
  if (!v) {
    v = `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(VISITOR_KEY_STORAGE, v);
  }
  return v;
};

const RenderedBody = ({ body }: { body: string }) => {
  const blocks = body.split(/\n{2,}/);
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
      {blocks.map((block, i) => {
        const m = block.match(/^!\[(.*?)\]\((.+?)\)$/);
        if (m) {
          return <img key={i} src={m[2]} alt={m[1] || "post image"} className="w-full max-h-[480px] object-cover border border-border" loading="lazy" />;
        }
        return <p key={i} className="whitespace-pre-wrap">{block}</p>;
      })}
    </div>
  );
};

const sharePost = async (post: BlogPost) => {
  const url = `${window.location.origin}/blog?post=${post.id}`;
  const shareData = { title: post.title, text: `${post.title} — Scorpion Team Blog`, url };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
  } catch {/* user cancelled */ return;}
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  } catch {
    toast.error("Couldn't copy link");
  }
};

const SharePostButtons = ({ post }: { post: BlogPost }) => {
  const url = `${window.location.origin}/blog?post=${post.id}`;
  const text = `${post.title} — Scorpion Team Blog`;
  const enc = encodeURIComponent;

  const links: { label: string; href?: string; onClick?: () => void; icon: typeof Facebook; className: string }[] = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: Facebook,
      className: "bg-[#1877F2] hover:bg-[#1877F2]/90 text-white",
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(text)}`,
      icon: Twitter,
      className: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      icon: Linkedin,
      className: "bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${enc(text + " " + url)}`,
      icon: MessageCircle,
      className: "bg-[#25D366] hover:bg-[#25D366]/90 text-white",
    },
    {
      label: "Email",
      href: `mailto:?subject=${enc(post.title)}&body=${enc(text + "\n\n" + url)}`,
      icon: Mail,
      className: "bg-muted-foreground hover:bg-muted-foreground/90 text-white",
    },
    {
      label: "Copy",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(url);
          toast.success("Link copied to clipboard");
        } catch {
          toast.error("Couldn't copy link");
        }
      },
      icon: Copy,
      className: "bg-primary hover:bg-primary/90 text-white",
    },
  ];

  return (
    <div className="pt-5 border-t border-border">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <Share2 className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Share This Post</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {links.map(({ label, href, onClick, icon: Icon, className }) =>
          href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${className}`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </a>
          ) : (
            <button
              key={label}
              onClick={onClick}
              className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${className}`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          )
        )}
      </div>
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [likedByMe, setLikedByMe] = useState<Record<string, string>>({}); // postId -> likeRowId
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewing, setViewing] = useState<BlogPost | null>(null);
  const visitorKey = useMemo(() => getVisitorKey(), []);

  const fetchAll = async () => {
    setLoading(true);
    const { data: postsData, error } = await supabase
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
    setPosts(postsData || []);

    const { data: likes } = await supabase
      .from("blog_post_likes")
      .select("id, post_id, visitor_key");
    const counts: Record<string, number> = {};
    const mine: Record<string, string> = {};
    (likes || []).forEach((l: any) => {
      counts[l.post_id] = (counts[l.post_id] || 0) + 1;
      if (l.visitor_key === visitorKey) mine[l.post_id] = l.id;
    });
    setLikeCounts(counts);
    setLikedByMe(mine);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
    // Deep link
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("post");
    if (pid) {
      // Wait until posts loaded
      const interval = setInterval(() => {
        setPosts((cur) => {
          const found = cur.find((p) => p.id === pid);
          if (found) {
            setViewing(found);
            clearInterval(interval);
          }
          return cur;
        });
      }, 300);
      setTimeout(() => clearInterval(interval), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLike = async (post: BlogPost) => {
    const existingId = likedByMe[post.id];
    if (existingId) {
      // optimistic
      setLikedByMe((m) => { const c = { ...m }; delete c[post.id]; return c; });
      setLikeCounts((c) => ({ ...c, [post.id]: Math.max(0, (c[post.id] || 1) - 1) }));
      const { error } = await supabase.from("blog_post_likes").delete().eq("id", existingId);
      if (error) {
        toast.error("Couldn't remove like");
        fetchAll();
      }
    } else {
      setLikedByMe((m) => ({ ...m, [post.id]: "pending" }));
      setLikeCounts((c) => ({ ...c, [post.id]: (c[post.id] || 0) + 1 }));
      const { data, error } = await supabase
        .from("blog_post_likes")
        .insert({ post_id: post.id, visitor_key: visitorKey })
        .select("id")
        .single();
      if (error || !data) {
        toast.error("Couldn't like post");
        fetchAll();
      } else {
        setLikedByMe((m) => ({ ...m, [post.id]: data.id }));
      }
    }
  };

  const allTags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
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

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Helmet>
        <title>Blog — Scorpion Express</title>
        <meta name="description" content="Updates, milestones, and stories from the Scorpion Express team." />
      </Helmet>
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10 lg:py-14">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Scorpion Blog</span>
          </div>
          <h1 className="font-display uppercase text-4xl md:text-5xl text-foreground leading-[0.95]">
            Stories from the road.
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl">
            Announcements, milestones, and stories from the Scorpion Express team.
          </p>
        </div>

        <div className="bg-white border border-border p-4 mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts…" className="pl-9 h-10" maxLength={100} />
          </div>
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              <TagIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <button
                onClick={() => setActiveTag(null)}
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 border whitespace-nowrap transition-colors ${!activeTag ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
              >All</button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t === activeTag ? null : t)}
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 border whitespace-nowrap transition-colors ${activeTag === t ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
                >#{t}</button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading posts…
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center text-muted-foreground">
            {posts.length === 0 ? "No posts yet." : "No posts matched your filters."}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => {
              const liked = !!likedByMe[post.id];
              const count = likeCounts[post.id] || 0;
              return (
                <article key={post.id} className="group bg-white border border-border hover:border-primary hover:shadow-lg transition-all flex flex-col">
                  {post.cover_image_url && (
                    <button onClick={() => setViewing(post)} className="aspect-[16/9] overflow-hidden bg-muted text-left">
                      <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </button>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5">#{t}</span>
                        ))}
                      </div>
                    )}
                    <button onClick={() => setViewing(post)} className="text-left">
                      <h3 className="font-display uppercase text-xl text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </button>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">
                      {post.body.replace(/!\[.*?\]\(.*?\)/g, "").slice(0, 180)}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground mt-4 pt-3 border-t border-border">
                      <span className="inline-flex items-center gap-1"><UserIcon className="h-3 w-3" /> {post.author_name}</span>
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <button
                        onClick={() => toggleLike(post)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 border transition-colors ${liked ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${liked ? "fill-primary" : ""}`} /> {count}
                      </button>
                      <button
                        onClick={() => sharePost(post)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <Share2 className="h-3.5 w-3.5" /> Share
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
          {viewing && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {viewing.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5">#{t}</span>
                  ))}
                </div>
                <DialogTitle className="font-display uppercase text-3xl leading-tight text-left">{viewing.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-3 text-xs uppercase tracking-wider pt-1">
                  <span className="inline-flex items-center gap-1"><UserIcon className="h-3 w-3" /> {viewing.author_name}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(viewing.created_at)}</span>
                </DialogDescription>
              </DialogHeader>
              {viewing.cover_image_url && (
                <img src={viewing.cover_image_url} alt={viewing.title} className="w-full max-h-[420px] object-cover border border-border" />
              )}
              <RenderedBody body={viewing.body} />
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <button
                  onClick={() => toggleLike(viewing)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-2 border transition-colors ${likedByMe[viewing.id] ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
                >
                  <Heart className={`h-3.5 w-3.5 ${likedByMe[viewing.id] ? "fill-primary" : ""}`} /> {likeCounts[viewing.id] || 0} Likes
                </button>
                <Link to="/employee-login" className="ml-auto text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary">
                  Employee? Sign in to post →
                </Link>
              </div>
              <SharePostButtons post={viewing} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
