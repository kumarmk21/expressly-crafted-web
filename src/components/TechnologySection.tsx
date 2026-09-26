import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor, PackageSearch, MapPinned, Cloud, HeadphonesIcon, Radio,
  ReceiptText, Wallet, Plug, Tag, Gavel, Users, Truck, Package, Activity, Warehouse, Lock, Zap,
  type LucideIcon,
} from "lucide-react";
import digitalLock from "@/assets/custodian/digital-lock.jpg";
import evFleet from "@/assets/technology/ev-fleet-real.jpg.asset.json";
import { supabase } from "@/integrations/supabase/client";

const ICONS: Record<string, LucideIcon> = {
  Monitor, PackageSearch, MapPinned, Cloud, HeadphonesIcon, Radio,
  ReceiptText, Wallet, Plug, Tag, Gavel, Users, Truck, Package, Activity, Warehouse, Lock, Zap,
};

type Tech = {
  id: string;
  no: string;
  title: string;
  description: string;
  image_url: string | null;
  icon: string | null;
  display_order: number;
};

const SALESFORCE_ID = "2928c658-bfb6-46da-8f9f-4e167c586d8a";
const WALLET_ID = "d03f2666-3ee3-4836-b0d7-271b33c244a7";
const PRQ_ID = "fafdb6fc-702f-43e2-8efd-5fcc87e8fa88";
const DIGITAL_LOCK_ID = "7f0c8650-24bf-4f2a-81e9-89bedf4b5cf2";
const EV_FLEET_ID = "9e2a4c17-58d3-4b6e-8f21-3c7d90ab51e4";

const TechnologySection = () => {
  const [items, setItems] = useState<Tech[]>([]);

  useEffect(() => {
    supabase
      .from("technology_items" as any)
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        const raw = ((data as any[]) ?? []) as Tech[];
        setItems(
          raw.map((it) => {
            if (it.id === SALESFORCE_ID) {
              return {
                ...it,
                title: "Integrated DEPS Management Module",
                description:
                  "A real-time Corrective and Preventive Action (CAPA) module for operations teams.",
                image_url:
                  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=70",
                icon: "Warehouse",
              };
            }
            if (it.id === WALLET_ID) {
              return {
                ...it,
                image_url:
                  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=70",
              };
            }
            if (it.id === PRQ_ID) {
              return {
                ...it,
                image_url:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70",
              };
            }
            if (it.id === DIGITAL_LOCK_ID) {
              return {
                ...it,
                image_url: digitalLock,
              };
            }
            if (it.id === EV_FLEET_ID) {
              return {
                ...it,
                image_url: evFleet,
              };
            }
            return it;
          })
        );
      });
  }, []);

  return (
    <section id="technology" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              Technology
            </span>
          </div>
          <h2 className="font-display uppercase text-5xl lg:text-7xl text-foreground leading-[0.9]">
            Tech that runs<span className="text-primary">.</span> the network.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl">
            Purpose-built platforms and integrations that connect customers, vendors and operations
            on a single real-time stack — from booking to billing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {items.map((it, i) => {
            const Icon = (it.icon && ICONS[it.icon]) || Monitor;
            return (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group relative overflow-hidden bg-card min-h-[280px]"
              >
                {it.image_url && (
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${it.image_url})` }}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-background/40 group-hover:from-background/90 group-hover:via-background/70 transition-colors" />

                <div className="relative p-7 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-foreground/70">
                      — {it.no}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display uppercase text-xl text-foreground leading-tight mb-2">
                      {it.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
