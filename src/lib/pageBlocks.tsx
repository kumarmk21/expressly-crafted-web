import { ReactNode } from "react";

export type BlockType = "hero" | "heading" | "text" | "image" | "image_text" | "cta" | "stats" | "gallery";

export interface BlockDef {
  type: BlockType;
  label: string;
  defaultContent: Record<string, any>;
  fields: { key: string; label: string; type: "text" | "textarea" | "image" | "url" | "repeater"; itemFields?: { key: string; label: string; type: "text" | "image" | "url" }[] }[];
}

export const BLOCK_DEFS: BlockDef[] = [
  {
    type: "hero",
    label: "Hero",
    defaultContent: { eyebrow: "", title: "Your headline", subtitle: "Short supporting line.", image: "", cta_label: "", cta_url: "" },
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "image", label: "Background image", type: "image" },
      { key: "cta_label", label: "CTA label", type: "text" },
      { key: "cta_url", label: "CTA URL", type: "url" },
    ],
  },
  {
    type: "heading",
    label: "Heading",
    defaultContent: { text: "Section heading", eyebrow: "" },
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "text", label: "Heading", type: "text" },
    ],
  },
  {
    type: "text",
    label: "Text block",
    defaultContent: { body: "Write your paragraph here." },
    fields: [{ key: "body", label: "Body", type: "textarea" }],
  },
  {
    type: "image",
    label: "Image",
    defaultContent: { image: "", caption: "" },
    fields: [
      { key: "image", label: "Image", type: "image" },
      { key: "caption", label: "Caption", type: "text" },
    ],
  },
  {
    type: "image_text",
    label: "Image + Text",
    defaultContent: { image: "", title: "Title", body: "Description text.", reverse: "" },
    fields: [
      { key: "image", label: "Image", type: "image" },
      { key: "title", label: "Title", type: "text" },
      { key: "body", label: "Body", type: "textarea" },
      { key: "reverse", label: "Reverse layout? (yes/no)", type: "text" },
    ],
  },
  {
    type: "cta",
    label: "Call to action",
    defaultContent: { title: "Ready to start?", subtitle: "", cta_label: "Get in touch", cta_url: "/contact" },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "cta_label", label: "Button label", type: "text" },
      { key: "cta_url", label: "Button URL", type: "url" },
    ],
  },
  {
    type: "stats",
    label: "Stats grid",
    defaultContent: { items: [{ value: "500+", label: "Cities served" }, { value: "24/7", label: "Operations" }] },
    fields: [
      { key: "items", label: "Stat items", type: "repeater", itemFields: [
        { key: "value", label: "Value", type: "text" },
        { key: "label", label: "Label", type: "text" },
      ] },
    ],
  },
  {
    type: "gallery",
    label: "Gallery",
    defaultContent: { items: [] },
    fields: [
      { key: "items", label: "Images", type: "repeater", itemFields: [
        { key: "image", label: "Image", type: "image" },
        { key: "caption", label: "Caption", type: "text" },
      ] },
    ],
  },
];

export const getBlockDef = (type: string) => BLOCK_DEFS.find((b) => b.type === type);

/* ---------------- Public renderers ---------------- */

export function RenderBlock({ type, content }: { type: string; content: any }): ReactNode {
  const c = content || {};
  switch (type) {
    case "hero":
      return (
        <section className="relative bg-card border-b border-border">
          {c.image && <img src={c.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />}
          <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
            {c.eyebrow && <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{c.eyebrow}</div>}
            <h1 className="font-display uppercase text-4xl md:text-6xl mb-4">{c.title}</h1>
            {c.subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{c.subtitle}</p>}
            {c.cta_label && c.cta_url && (
              <a href={c.cta_url} className="inline-block mt-6 px-6 py-3 bg-primary text-white font-black uppercase text-xs tracking-wider">{c.cta_label}</a>
            )}
          </div>
        </section>
      );
    case "heading":
      return (
        <section className="container mx-auto px-4 py-10">
          {c.eyebrow && <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">{c.eyebrow}</div>}
          <h2 className="font-display uppercase text-3xl md:text-4xl">{c.text}</h2>
        </section>
      );
    case "text":
      return (
        <section className="container mx-auto px-4 py-6 max-w-3xl">
          <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap text-foreground/90">{c.body}</p>
        </section>
      );
    case "image":
      return (
        <section className="container mx-auto px-4 py-6">
          {c.image && <img src={c.image} alt={c.caption || ""} className="w-full h-auto border border-border" />}
          {c.caption && <div className="text-xs text-muted-foreground mt-2 text-center">{c.caption}</div>}
        </section>
      );
    case "image_text": {
      const reverse = String(c.reverse || "").toLowerCase() === "yes";
      return (
        <section className="container mx-auto px-4 py-10">
          <div className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
            {c.image && <img src={c.image} alt={c.title || ""} className="w-full h-auto border border-border" />}
            <div>
              {c.title && <h3 className="font-display uppercase text-2xl md:text-3xl mb-3">{c.title}</h3>}
              {c.body && <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{c.body}</p>}
            </div>
          </div>
        </section>
      );
    }
    case "cta":
      return (
        <section className="bg-primary text-white py-14 my-6">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-display uppercase text-3xl md:text-4xl mb-2">{c.title}</h3>
            {c.subtitle && <p className="opacity-90 mb-5 max-w-xl mx-auto">{c.subtitle}</p>}
            {c.cta_label && c.cta_url && (
              <a href={c.cta_url} className="inline-block px-6 py-3 bg-white text-primary font-black uppercase text-xs tracking-wider">{c.cta_label}</a>
            )}
          </div>
        </section>
      );
    case "stats": {
      const items: any[] = Array.isArray(c.items) ? c.items : [];
      return (
        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((it, i) => (
              <div key={i} className="border border-border bg-card p-6 text-center">
                <div className="font-display text-3xl md:text-4xl text-primary">{it.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{it.label}</div>
              </div>
            ))}
          </div>
        </section>
      );
    }
    case "gallery": {
      const items: any[] = Array.isArray(c.items) ? c.items : [];
      return (
        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((it, i) => it.image && (
              <figure key={i} className="border border-border bg-card">
                <img src={it.image} alt={it.caption || ""} className="w-full h-48 object-cover" />
                {it.caption && <figcaption className="text-xs text-muted-foreground p-2">{it.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      );
    }
    default:
      return <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground">Unknown block: {type}</div>;
  }
}
