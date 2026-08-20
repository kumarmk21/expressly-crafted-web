import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Award, Newspaper, ExternalLink, Sparkles } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import bg from "@/assets/events-news-bg.jpg";

type Item = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  image_url: string | null;
  employee_name: string | null;
  employee_designation: string | null;
  month_year: string | null;
  event_date: string | null;
  link_url: string | null;
  display_order: number;
};

const EventsNews = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("events_news" as any)
      .select("*")
      .eq("active", true)
      .order("display_order")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as any) ?? []);
        setLoading(false);
      });
  }, []);

  const employees = items.filter((i) => i.type === "employee_of_month");
  const news = items.filter((i) => i.type === "news");
  const events = items.filter((i) => i.type === "event");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Events & News | Scorpion Express</title>
        <meta name="description" content="Latest Scorpion news, events, and Employee of the Month celebrations." />
      </Helmet>
      <TopBar />
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={bg} alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                Scorpion Spotlight
              </span>
            </div>
            <h1 className="font-display uppercase text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95]">
              Events <span className="text-primary">&</span> News
            </h1>
            <p className="mt-6 max-w-2xl text-base lg:text-lg text-white/80">
              Celebrating our people, milestones, and the stories that move Scorpion forward.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-14 space-y-20">
        {loading && <p className="text-center text-muted-foreground">Loading…</p>}

        {/* EMPLOYEE OF THE MONTH */}
        {employees.length > 0 && (
          <section>
            <SectionHeader icon={Award} eyebrow="Recognition" title="Employee of the Month" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((e, idx) => (
                <motion.article
                  key={e.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative bg-card border border-border overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-primary text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" /> {e.month_year || "Featured"}
                  </div>
                  <div className="aspect-[3/4] w-full bg-muted overflow-hidden">
                    {e.image_url ? (
                      <img
                        src={e.image_url}
                        alt={e.employee_name || e.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        <Award className="h-20 w-20 opacity-20" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t-2 border-primary">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-1.5">
                      Employee of the Month
                    </div>
                    <h3 className="font-display uppercase text-2xl text-foreground">
                      {e.employee_name || e.title}
                    </h3>
                    {e.employee_designation && (
                      <p className="text-sm text-muted-foreground mt-1">{e.employee_designation}</p>
                    )}
                    {e.description && (
                      <p className="text-sm text-foreground/70 mt-3 line-clamp-3">{e.description}</p>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* EVENTS */}
        {events.length > 0 && (
          <section>
            <SectionHeader icon={Calendar} eyebrow="Happenings" title="Events" />
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((ev) => (
                <NewsCard key={ev.id} item={ev} />
              ))}
            </div>
          </section>
        )}

        {/* NEWS */}
        {news.length > 0 && (
          <section>
            <SectionHeader icon={Newspaper} eyebrow="Latest" title="Scorpion News" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </section>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-20">
            <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No events or news to display yet. Check back soon!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const SectionHeader = ({ icon: Icon, eyebrow, title }: { icon: any; eyebrow: string; title: string }) => (
  <div className="mb-8 flex items-end justify-between flex-wrap gap-3">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</span>
      </div>
      <h2 className="font-display uppercase text-3xl lg:text-4xl text-foreground">{title}</h2>
    </div>
    <div className="h-px flex-1 bg-border min-w-[40px]" />
  </div>
);

const NewsCard = ({ item }: { item: Item }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group bg-card border border-border overflow-hidden hover:border-primary transition-colors flex flex-col"
  >
    {item.image_url && (
      <div className="aspect-[16/9] w-full bg-muted overflow-hidden">
        <img
          src={item.image_url}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    )}
    <div className="p-5 flex-1 flex flex-col">
      {item.event_date && (
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-2">
          {new Date(item.event_date).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </div>
      )}
      <h3 className="font-display uppercase text-xl text-foreground mb-2">{item.title}</h3>
      {item.description && (
        <p className="text-sm text-foreground/70 leading-relaxed flex-1">{item.description}</p>
      )}
      {item.link_url && (
        <a
          href={item.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
        >
          Read more <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  </motion.article>
);

export default EventsNews;
