import { Truck, Plane, Snowflake, Warehouse, Recycle, PackageCheck } from "lucide-react";
import serviceExpress from "@/assets/service-express.jpg";
import serviceAir from "@/assets/service-air.jpg";
import serviceColdchain from "@/assets/service-coldchain.jpg";
import serviceWms from "@/assets/service-wms.jpg";
import serviceCleantech from "@/assets/service-cleantech.jpg";
import serviceFtl from "@/assets/service-ftl.jpg";

export type ServiceItem = {
  no: string;
  slug: string;
  icon: typeof Truck;
  title: string;
  desc: string;
  image: string;
  iconColor: string; // tailwind text class for the icon tile
  tagline: string;
  features: string[];
  industries: string[];
  capabilities: { title: string; desc: string }[];
};

export const services: ServiceItem[] = [
  {
    no: "01",
    slug: "express",
    icon: PackageCheck,
    title: "Express",
    desc: "High-speed, time-definite surface transport designed for critical shipments that simply cannot afford delays.",
    image: serviceExpress,
    iconColor: "red-gradient",
    tagline: "Time-definite surface delivery you can set your watch by.",
    features: [
      "Pan-India next-flight-out & next-day delivery",
      "Real-time GPS + waybill-level tracking",
      "Dedicated express bays at every hub",
      "POD digitization within minutes of delivery",
    ],
    industries: ["BFSI", "Healthcare", "E-commerce", "Manufacturing"],
    capabilities: [
      { title: "Time-Definite SLAs", desc: "Committed delivery windows backed by service guarantees and route redundancy." },
      { title: "Priority Handling", desc: "Express consignments bypass standard queues at sorting and line-haul stages." },
      { title: "Last-Mile Network", desc: "29,000+ pin codes covered through owned & partnered last-mile fleet." },
    ],
  },
  {
    no: "02",
    slug: "air",
    icon: Plane,
    title: "Air",
    desc: "When speed is the ultimate priority. Direct air cargo connecting all major domestic and international hubs.",
    image: serviceAir,
    iconColor: "red-gradient",
    tagline: "Wings for time-critical cargo across India & beyond.",
    features: [
      "Direct uplift on all major carriers",
      "Charter & on-board courier (OBC) options",
      "Cross-border customs facilitation",
      "Door-to-airport-to-door coordination",
    ],
    industries: ["Pharma", "Aerospace", "Auto-spares", "Luxury Goods"],
    capabilities: [
      { title: "Domestic & International", desc: "Daily uplift on every major Indian metro and trade lane connections to APAC, EMEA & Americas." },
      { title: "Charter Solutions", desc: "Full or part-charter capacity for outsize, project, or emergency cargo." },
      { title: "Tarmac-to-Tarmac", desc: "Coordinated airside handling reduces TAT from hours to minutes." },
    ],
  },
  {
    no: "03",
    slug: "cold-chain",
    icon: Snowflake,
    title: "Cold Chain",
    desc: "State-of-the-art temperature-controlled fleet ensuring the absolute integrity of perishables and pharma goods.",
    image: serviceColdchain,
    iconColor: "bg-gradient-to-br from-sky-500 to-blue-700",
    tagline: "Unbroken cold, end-to-end. From dock to doorstep.",
    features: [
      "+25°C to -25°C controlled environments",
      "GDP & WHO-compliant pharma handling",
      "IoT temperature & humidity loggers",
      "Validated packaging & passive containers",
    ],
    industries: ["Pharmaceuticals", "Vaccines", "Dairy & Food", "Specialty Chemicals"],
    capabilities: [
      { title: "Reefer Fleet", desc: "Multi-temperature vehicles with dual-zone capability and 24×7 telemetry." },
      { title: "Cold Storage", desc: "Strategically located cold rooms & freezer farms across the network." },
      { title: "Compliance & Audit", desc: "Full audit trail, deviation alerts, and regulator-ready documentation." },
    ],
  },
  {
    no: "04",
    slug: "wms",
    icon: Warehouse,
    title: "WMS",
    desc: "Strategic, secure storage facilities with advanced WMS for flawless inventory control and distribution.",
    image: serviceWms,
    iconColor: "red-gradient",
    tagline: "Smart warehousing engineered for accuracy, speed and scale.",
    features: [
      "Multi-client & dedicated facilities",
      "Real-time WMS with API integrations",
      "Value-added services: kitting, labelling, QC",
      "Bonded, FTWZ, and GST-compliant warehousing",
    ],
    industries: ["E-commerce", "Retail", "Automotive", "FMCG"],
    capabilities: [
      { title: "Inventory Intelligence", desc: "Cycle counts, ABC analysis & forecasting to keep stock lean and accurate." },
      { title: "Omni-channel Fulfilment", desc: "B2B, B2C and D2C order processing from a single inventory pool." },
      { title: "Tech Stack", desc: "Plug-and-play integration with Shopify, SAP, Oracle, and custom ERPs." },
    ],
  },
  {
    no: "05",
    slug: "cleantech",
    icon: Recycle,
    title: "Cleantech Solutions",
    desc: "Compliant, secure, and environmentally responsible reverse logistics for electronic waste and IT asset disposition.",
    image: serviceCleantech,
    iconColor: "bg-gradient-to-br from-emerald-500 to-green-700",
    tagline: "Responsible reverse logistics for a circular economy.",
    features: [
      "Authorised e-waste collection & transport",
      "ITAD with certified data destruction",
      "EPR (Extended Producer Responsibility) support",
      "Recycle, refurbish & remarketing services",
    ],
    industries: ["IT & ITES", "Telecom", "BFSI", "Manufacturing"],
    capabilities: [
      { title: "Pan-India Pickups", desc: "Door-step pickup from any pin code with sealed, tamper-evident cages." },
      { title: "Data Destruction", desc: "On-site & off-site degaussing, shredding, and NIST-grade wiping with certificates." },
      { title: "Sustainability Reporting", desc: "Carbon-offset & material-recovery dashboards for your ESG reporting." },
    ],
  },
  {
    no: "06",
    slug: "ftl",
    icon: Truck,
    title: "FTL",
    desc: "Dedicated point-to-point heavy haulage offering maximum capacity, uncompromised security, and direct routing.",
    image: serviceFtl,
    iconColor: "red-gradient",
    tagline: "Dedicated trucks. Direct routes. Total control.",
    features: [
      "9MT to 32MT vehicles on-demand",
      "Sealed, single-consignee movements",
      "Multi-axle, container & flatbed options",
      "Live GPS tracking with geo-fenced alerts",
    ],
    industries: ["Manufacturing", "Engineering", "Retail DCs", "Project Cargo"],
    capabilities: [
      { title: "Dedicated Capacity", desc: "Guaranteed truck availability through long-term contracts and spot mode." },
      { title: "Direct Routing", desc: "No transshipment — faster transit and lower damage exposure." },
      { title: "Specialised Equipment", desc: "ODC, low-bed, and high-cube options for any cargo profile." },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
