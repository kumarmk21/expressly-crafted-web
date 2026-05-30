import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { Loader2 } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RenderBlock } from "@/lib/pageBlocks";

const DynamicPage = () => {
  const { slug = "" } = useParams();
  const [page, setPage] = useState<any | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setNotFound(false);
      const { data: p } = await supabase
        .from("pages" as any)
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (cancelled) return;
      if (!p) { setNotFound(true); setLoading(false); return; }
      setPage(p);
      const { data: bs } = await supabase
        .from("page_blocks" as any)
        .select("*")
        .eq("page_id", (p as any).id)
        .order("display_order");
      if (cancelled) return;
      setBlocks((bs as any[]) ?? []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [slug]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Navbar />
      {page && (
        <Helmet>
          <title>{page.title}</title>
          {page.meta_description && <meta name="description" content={page.meta_description} />}
        </Helmet>
      )}
      <main className="flex-1">
        {loading ? (
          <div className="container mx-auto px-4 py-24 flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : notFound ? (
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="font-display uppercase text-3xl mb-3">Page not found</h1>
            <p className="text-muted-foreground">No published page exists at <code>/p/{slug}</code>.</p>
          </div>
        ) : (
          blocks.map((b) => <RenderBlock key={b.id} type={b.block_type} content={b.content} />)
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;
