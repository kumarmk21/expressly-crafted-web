import coldchain from "@/assets/services/coldchain.jpg";
import wms from "@/assets/services/wms.jpg";
import autoParts from "@/assets/industries/auto-parts.jpg";
import electronics from "@/assets/industries/electronics.jpg";
import ecommerce from "@/assets/industries/ecommerce.jpg";

export type Industry = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  intro: string;
  challenges: string[];
  howWeHandle: string[];
  example: { title: string; situation: string; approach: string[]; outcome: string };
  services: { label: string; to: string }[];
};

export const industries: Industry[] = [
  {
    slug: "pharma",
    name: "Pharma & Healthcare",
    tagline: "Temperature-safe, compliant movement of medicines and samples.",
    image: coldchain,
    intro:
      "Medicines, vaccines and diagnostic samples need controlled temperatures, clean handling and full paperwork. We move them across India with cold-chain vehicles, validated packaging and live monitoring.",
    challenges: [
      "Strict 2–8°C and 15–25°C temperature bands",
      "Batch, expiry and drug-licence documentation",
      "No mixing with food, chemicals or odorous goods",
    ],
    howWeHandle: [
      "Validated insulated boxes and gel packs checked at pickup",
      "Separate compartments for pharma consignments",
      "Temperature loggers with alerts to the control tower",
      "Proof of delivery with condition photographs",
    ],
    example: {
      title: "Weekly vaccine replenishment, Mumbai to Tier-2 distributors",
      situation:
        "A pharma distributor needed weekly 2–8°C shipments from its Bhiwandi warehouse to stockists in Nashik, Aurangabad and Nagpur, with zero temperature excursions.",
      approach: [
        "Pre-conditioned packaging inspected and sealed at the warehouse dock",
        "Dedicated cold-chain vehicle with digital lock and live temperature feed",
        "Control tower alerts if temperature drifts beyond the band",
      ],
      outcome: "Every consignment delivered within the temperature band, with logger data shared with the customer on delivery.",
    },
    services: [
      { label: "Cold Chain", to: "/services/cold-chain" },
      { label: "MRConnect", to: "/services/mrconnect" },
    ],
  },
  {
    slug: "auto-parts",
    name: "Auto Parts",
    tagline: "Heavy, high-value spares delivered to plants and dealers on time.",
    image: autoParts,
    intro:
      "Spare parts are heavy, oddly shaped and often needed urgently at a dealer or assembly line. We move them in crates and pallets with part-level tracking so nothing is short or damaged.",
    challenges: [
      "Heavy, sharp and oily components",
      "Line-side delivery windows at plants",
      "High part counts per consignment",
    ],
    howWeHandle: [
      "Wooden crates and palletisation for heavy parts",
      "Part-count and weight check against invoice at pickup",
      "Part Load (LTL) for dealers, Full Truck Load (FTL) for plant supply",
      "Scheduled delivery slots for plants",
    ],
    example: {
      title: "Dealer spare-parts supply, Pune hub to Western India",
      situation:
        "An auto-component maker needed daily part-load dispatches of brake discs, filters and gears to around 40 dealers across Maharashtra and Gujarat.",
      approach: [
        "Crated and palletised cargo, counted and weighed at pickup",
        "Consolidated Part Load (LTL) routes through our Pune hub",
        "Barcode scan at every hand-off so shortages are traced to one leg",
      ],
      outcome: "Dealers receive complete, counted consignments on a fixed schedule, with shortages identified to the exact leg.",
    },
    services: [
      { label: "Part Load (LTL)", to: "/services/ltl" },
      { label: "Full Truck Load (FTL)", to: "/services/ftl" },
    ],
  },
  {
    slug: "electronics",
    name: "Electronics",
    tagline: "Secure, shock-safe transport for high-value devices.",
    image: electronics,
    intro:
      "Laptops, phones and appliances are fragile and a target for theft. We combine protective packing, sealed vehicles and CCTV so devices arrive intact and untouched.",
    challenges: [
      "High theft risk and value per carton",
      "Damage from shocks and stacking",
      "Serial-number level accountability",
    ],
    howWeHandle: [
      "Packing check with foam, corner guards and shrink-wrap",
      "Digital locks with unique seal numbers",
      "In-vehicle CCTV and GPS route monitoring",
      "Serial and carton count verified at delivery",
    ],
    example: {
      title: "Laptop shipments, Bengaluru warehouse to North India",
      situation:
        "An electronics brand moved monthly laptop stock from Bengaluru to distributors in Delhi NCR and Lucknow and needed tamper-proof delivery.",
      approach: [
        "Cartons inspected, shrink-wrapped and palletised before loading",
        "Vehicle sealed with a digital lock, opened only at destination",
        "CCTV and GPS monitored by the control tower throughout the route",
      ],
      outcome: "Seal numbers matched at every delivery, with carton counts and photographs shared on proof of delivery.",
    },
    services: [
      { label: "Express", to: "/services/express" },
      { label: "Air Express", to: "/services/air" },
    ],
  },
  {
    slug: "fmcg",
    name: "FMCG",
    tagline: "High-volume, fast-turn distribution to depots and retailers.",
    image: wms,
    intro:
      "Consumer goods move in large volumes with tight replenishment cycles. We connect factories, warehouses and distributors with scheduled routes and warehousing support.",
    challenges: [
      "Large volumes and many drop points",
      "Short shelf-life products",
      "Seasonal peaks around festivals",
    ],
    howWeHandle: [
      "Warehousing with FIFO / FEFO stock rotation",
      "Scheduled milk-run routes to distributors",
      "Extra capacity planned before festive peaks",
      "Separation of food items from non-food cargo",
    ],
    example: {
      title: "Festive-season replenishment, Delhi warehouse to UP distributors",
      situation:
        "An FMCG company needed to double dispatches to distributors across Uttar Pradesh in the four weeks before Diwali.",
      approach: [
        "Stock staged in our warehouse with FEFO picking",
        "Additional vehicles added to scheduled routes in advance",
        "Daily dispatch and delivery reports to the customer's sales team",
      ],
      outcome: "Distributors were replenished on schedule through the peak without stock-outs caused by transport.",
    },
    services: [
      { label: "Warehousing", to: "/services/wms" },
      { label: "Part Load (LTL)", to: "/services/ltl" },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    tagline: "Fast line-haul and returns for online sellers and marketplaces.",
    image: ecommerce,
    intro:
      "Online orders need speed, visibility and smooth returns. We provide line-haul between fulfilment centres, bulk seller pickups and reverse logistics with LR-level tracking.",
    challenges: [
      "Tight delivery promises to end customers",
      "High return volumes",
      "Need for real-time tracking",
    ],
    howWeHandle: [
      "Express line-haul between fulfilment centres",
      "Bulk pickups from seller warehouses",
      "Reverse logistics for returns",
      "Live tracking on every LR number",
    ],
    example: {
      title: "Fulfilment-centre line-haul, Mumbai to Kolkata",
      situation:
        "An online seller needed overnight-to-two-day movement of bulk stock between its Mumbai and Kolkata fulfilment centres, with returns sent back weekly.",
      approach: [
        "Scheduled express departures matched to the seller's cut-off times",
        "Every bag and carton scanned in and out at each hub",
        "Weekly consolidated returns on the same lane",
      ],
      outcome: "Stock reached the destination centre within the agreed window, with full scan history visible on the tracker.",
    },
    services: [
      { label: "Express", to: "/services/express" },
      { label: "Air Express", to: "/services/air" },
    ],
  },
];

export const getIndustryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
