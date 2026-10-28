import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Monitor, PackageSearch, MapPinned, Cloud, HeadphonesIcon, Radio,
  ReceiptText, Wallet, Plug, Tag, Gavel, Users, Truck, Package, Activity, Warehouse, Lock, Zap,
  type LucideIcon,
} from "lucide-react";
import digitalLock from "@/assets/custodian/digital-lock.jpg";
import portalIndia from "@/assets/technology/portal-india.jpg";
import bookingCounterIndia from "@/assets/technology/booking-counter-india.jpg";
import gpsHighwayIndia from "@/assets/technology/gps-highway-india.jpg";
import opsTeamIndia from "@/assets/technology/ops-team-india.jpg";
import supportDeskIndia from "@/assets/technology/support-desk-india.jpg";
import controlTowerIndia from "@/assets/technology/control-tower-india.jpg";
import billingDeskIndia from "@/assets/technology/billing-desk-india.jpg";
import biddingDriverIndia from "@/assets/technology/bidding-driver-india.jpg";
import walletBookingIndia from "@/assets/technology/wallet-booking-india.jpg";
import prqQuoteIndia from "@/assets/technology/prq-quote-india.jpg";
import evFleetAsset from "@/assets/technology/ev-fleet-real.jpg.asset.json";
const evFleet = evFleetAsset.url;
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

// Indian-context photography, keyed by card number ("no" from technology_items).
const LOCAL_IMAGES: Record<string, string> = {
  "01": portalIndia,
  "02": bookingCounterIndia,
  "03": gpsHighwayIndia,
  "04": opsTeamIndia,
  "05": supportDeskIndia,
  "06": controlTowerIndia,
  "07": billingDeskIndia,
  "08": walletBookingIndia,
  "09": prqQuoteIndia,
  "10": biddingDriverIndia,
  "11": opsTeamIndia,
  "12": controlTowerIndia,
};

const TechnologySection = () => {
  const [items, setItems] = useState<Tech[]>([]);
  const reducedMotion = useReducedMotion();

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
    <section id="technology" className="py-9 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-7 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              Technology
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl text-foreground leading-tight">
            Tech that runs the network<span className="text-primary">.</span>
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl">
            Purpose-built platforms and integrations that connect customers, vendors and operations
            on a single real-time stack — from booking to billing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = (it.icon && ICONS[it.icon]) || Monitor;
            return (
              <motion.article
                key={it.id}
                initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reducedMotion ? 0 : Math.min(i, 5) * 0.04, duration: reducedMotion ? 0 : 0.4 }}
                className="group overflow-hidden rounded-md border border-border bg-card hover:border-primary/50 transition-colors flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted border-b border-border">
                  {it.image_url ? <img src={it.image_url} alt={it.title} width={1200} height={675} loading={i < 3 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-primary"><Icon className="h-14 w-14" /></div>}
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-foreground/70">
                      — {it.no}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-xl text-foreground leading-tight mb-2">
                      {it.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
