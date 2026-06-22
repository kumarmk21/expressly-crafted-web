import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, X } from "lucide-react";
import networkMap from "@/assets/scorpion-network-map.jpg.asset.json";

export type BranchLocation = {
  id: string;
  location_code: string;
  location_name: string;
  zone: string;
  address: string | null;
  contact_number: string | null;
  email: string | null;
};

// Approximate lat/lng for every Scorpion branch city
const CITY_COORDS: Record<string, [number, number]> = {
  // Central
  BHOPAL: [23.2599, 77.4126],
  INDORE: [22.7196, 75.8577],
  JABALPUR: [23.1815, 79.9864],
  NAGPUR: [21.1458, 79.0882],
  RAIPUR: [21.2514, 81.6296],
  // East
  CUTTACK: [20.4625, 85.8828],
  GAYA: [24.7914, 85.0002],
  GUWAHATI: [26.1445, 91.7362],
  KOLKATA: [22.5726, 88.3639],
  MUZAFFARPUR: [26.1209, 85.3647],
  PATNA: [25.5941, 85.1376],
  PURNIA: [25.7771, 87.4753],
  RANCHI: [23.3441, 85.3096],
  RAXAUL: [26.9836, 84.8536],
  SIKKIM: [27.5330, 88.5122],
  SILIGURI: [26.7271, 88.3953],
  // North
  ALIPUR: [28.7950, 77.1340],
  AMBALA: [30.3782, 76.7767],
  BADDI: [30.9578, 76.7914],
  DEHRADUN: [30.3165, 78.0322],
  "DERA BASSI": [30.5895, 76.8430],
  GHAZIABAD: [28.6692, 77.4538],
  GURGAON: [28.4595, 77.0266],
  HARIDWAR: [29.9457, 78.1642],
  JAIPUR: [26.9124, 75.7873],
  JALANDHAR: [31.3260, 75.5762],
  JAMMU: [32.7266, 74.8570],
  "KALA AMB": [30.5187, 77.2057],
  KANPUR: [26.4499, 80.3319],
  LUCKNOW: [26.8467, 80.9462],
  LUDHIANA: [30.9010, 75.8573],
  MAHIPALPUR: [28.5466, 77.1217],
  MEERUT: [28.9845, 77.7064],
  MUNDKA: [28.6857, 77.0322],
  NOIDA: [28.5355, 77.3910],
  OKHLA: [28.5355, 77.2730],
  PANIPAT: [29.3909, 76.9635],
  ROORKEE: [29.8543, 77.8880],
  VARANASI: [25.3176, 82.9739],
  ZIRAKPUR: [30.6425, 76.8173],
  // South
  BANGALORE: [12.9716, 77.5946],
  BOMMASANDRA: [12.8125, 77.6986],
  CHENNAI: [13.0827, 80.2707],
  COCHIN: [9.9312, 76.2673],
  COIMBATORE: [11.0168, 76.9558],
  HOSUR: [12.7409, 77.8253],
  HUBLI: [15.3647, 75.1240],
  HYDERABAD: [17.3850, 78.4867],
  MADURAI: [9.9252, 78.1198],
  NACHARAM: [17.4239, 78.5530],
  PUDUCHERRY: [11.9416, 79.8083],
  SALEM: [11.6643, 78.1460],
  SRICITY: [13.5497, 79.9897],
  TIRUPUR: [11.1085, 77.3411],
  VIJAYAWADA: [16.5062, 80.6480],
  VISHAKHAPATNAM: [17.6868, 83.2185],
  // West
  AHMEDABAD: [23.0225, 72.5714],
  ANKLESHWAR: [21.6279, 73.0143],
  AURANGABAD: [19.8762, 75.3433],
  BARODA: [22.3072, 73.1812],
  BHIWANDI: [19.2813, 73.0483],
  CHAKAN: [18.7606, 73.8636],
  DAMAN: [20.3974, 72.8328],
  GOA: [15.2993, 74.1240],
  KOLHAPUR: [16.7050, 74.2433],
  "MUMBAI - ANDHERI": [19.1197, 72.8468],
  "MUMBAI - ELPHINSTONE": [18.9933, 72.8311],
  "MUMBAI - MAHAPE": [19.1136, 73.0169],
  "MUMBAI - VASAI": [19.4259, 72.8225],
  NASHIK: [19.9975, 73.7898],
  PALGHAR: [19.6967, 72.7651],
  "PANVEL - SAMPLE": [18.9894, 73.1175],
  "PUNE - WADKI": [18.4691, 73.9234],
  "PUNE - WAGHOLI": [18.5808, 73.9822],
  RAJKOT: [22.3039, 70.8022],
  SURAT: [21.1702, 72.8311],
};

// India outline image bounding-box inside the JPG (normalized 0..1)
const MAP_BOUNDS = { left: 0.165, right: 0.86, top: 0.10, bottom: 0.91 };
// Geographic bounds for projection
const GEO = { latTop: 37, latBottom: 8, lngLeft: 68, lngRight: 97 };

const project = (lat: number, lng: number) => {
  const xNorm = (lng - GEO.lngLeft) / (GEO.lngRight - GEO.lngLeft);
  const yNorm = (GEO.latTop - lat) / (GEO.latTop - GEO.latBottom);
  const x = MAP_BOUNDS.left + xNorm * (MAP_BOUNDS.right - MAP_BOUNDS.left);
  const y = MAP_BOUNDS.top + yNorm * (MAP_BOUNDS.bottom - MAP_BOUNDS.top);
  return { x: x * 100, y: y * 100 };
};

const ZONE_COLORS: Record<string, string> = {
  North: "hsl(var(--primary))",
  South: "hsl(var(--primary))",
  East: "hsl(var(--primary))",
  West: "hsl(var(--primary))",
  Central: "hsl(var(--primary))",
};

const ZONE_FILTERS = ["All", "North", "South", "East", "West", "Central"];

const BranchMap = ({ branches }: { branches: BranchLocation[] }) => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<BranchLocation | null>(null);

  const pins = useMemo(() => {
    return branches
      .filter((b) => filter === "All" || b.zone === filter)
      .map((b) => {
        const coords = CITY_COORDS[b.location_name.toUpperCase()];
        if (!coords) return null;
        const pos = project(coords[0], coords[1]);
        return { branch: b, pos };
      })
      .filter(Boolean) as { branch: BranchLocation; pos: { x: number; y: number } }[];
  }, [branches, filter]);

  return (
    <div>
      {/* Zone filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ZONE_FILTERS.map((z) => {
          const isActive = filter === z;
          const count = z === "All" ? branches.length : branches.filter((b) => b.zone === z).length;
          return (
            <button
              key={z}
              onClick={() => {
                setFilter(z);
                setActive(null);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] border transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary"
              }`}
            >
              {z} <span className="ml-1 opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="relative w-full bg-[#FFD700] border border-border overflow-hidden rounded-sm">
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          <img
            src={networkMap.url}
            alt="Scorpion Express pan-India delivery network"
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />

          {/* Pins */}
          {pins.map(({ branch, pos }) => (
            <button
              key={branch.id}
              onClick={() => setActive(branch)}
              className="absolute -translate-x-1/2 -translate-y-full group"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={branch.location_name}
              aria-label={`${branch.location_name} branch`}
            >
              <span className="relative flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ width: 14, height: 14, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                <MapPin
                  className={`h-6 w-6 md:h-7 md:w-7 transition-all drop-shadow-md ${
                    active?.id === branch.id ? "text-primary scale-125" : "text-primary group-hover:scale-125"
                  }`}
                  fill="currentColor"
                  strokeWidth={1.5}
                  stroke="white"
                />
              </span>
              <span className="absolute left-1/2 -translate-x-1/2 mt-0.5 px-1.5 py-0.5 bg-foreground text-white text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none rounded-sm">
                {branch.location_name}
              </span>
            </button>
          ))}

          {/* Address popover */}
          {active && (
            <div
              className="absolute z-20 max-w-xs w-[88vw] sm:w-80 bg-card border border-primary shadow-2xl p-4 rounded-md"
              style={{
                left: `${Math.min(Math.max(pins.find((p) => p.branch.id === active.id)?.pos.x ?? 50, 18), 82)}%`,
                top: `${Math.min((pins.find((p) => p.branch.id === active.id)?.pos.y ?? 50) + 2, 80)}%`,
                transform: "translate(-50%, 0)",
              }}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center hover:bg-muted rounded-full"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-start justify-between gap-2 mb-1 pr-6">
                <h4 className="font-display uppercase text-base leading-tight text-foreground">
                  {active.location_name}
                </h4>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-muted text-muted-foreground tracking-wider rounded border border-border">
                  {active.location_code}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                  {active.zone} Zone
                </span>
              </div>
              {active.address && (
                <p className="flex items-start gap-2 text-xs text-foreground/85 mb-2 leading-relaxed">
                  <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <span>{active.address}</span>
                </p>
              )}
              {active.contact_number && (
                <p className="flex items-start gap-2 text-xs mb-1.5">
                  <Phone className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <a href={`tel:${active.contact_number.split("/")[0].trim()}`} className="hover:text-primary">
                    {active.contact_number}
                  </a>
                </p>
              )}
              {active.email && (
                <p className="flex items-start gap-2 text-xs">
                  <Mail className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <a href={`mailto:${active.email}`} className="hover:text-primary break-all">
                    {active.email}
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        Click any pin on the map to view that branch's address and contact details.
        <span className="ml-auto font-mono">{pins.length} of {branches.length} mapped</span>
      </p>
    </div>
  );
};

export default BranchMap;
