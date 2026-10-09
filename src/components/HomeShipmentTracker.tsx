import { useState } from "react";
import { Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeShipmentTracker = () => {
  const [lr, setLr] = useState("");

  const trackShipment = () => {
    const id = lr.trim();
    if (!id) return;
    window.open(
      `https://dtrack.scorpiongroup.in/?lr=${encodeURIComponent(id)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      className="relative z-20 border-b border-border bg-card"
      aria-labelledby="shipment-tracker-title"
    >
      <div className="container mx-auto px-4 py-5 lg:py-6">
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(220px,0.7fr)_minmax(480px,1.3fr)] lg:gap-10">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live Shipment Tracking
            </div>
            <h2 id="shipment-tracker-title" className="font-display text-2xl uppercase text-foreground sm:text-3xl">
              Where is your shipment?
            </h2>
          </div>

          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                trackShipment();
              }}
              className="flex flex-col gap-2 rounded-sm border-2 border-primary bg-primary/[0.05] p-2.5 shadow-sm shadow-primary/10 sm:flex-row"
            >
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" aria-hidden="true" />
                <input
                  type="text"
                  value={lr}
                  onChange={(event) => setLr(event.target.value)}
                  placeholder="Enter LR / Docket number"
                  aria-label="Shipment tracking number"
                  required
                  className="h-14 w-full rounded-sm border border-primary/30 bg-background pl-12 pr-4 font-mono-tab text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 rounded-sm px-8 font-black uppercase tracking-wider sm:min-w-36">
                Track Now
              </Button>
            </form>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Real-time status and digital proof of delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeShipmentTracker;
