import { Truck, Plane, Snowflake, Warehouse, Recycle, PackageCheck } from "lucide-react";
import serviceExpress from "@/assets/services/express.jpg";
import serviceAir from "@/assets/services/air.jpg";
import serviceColdchain from "@/assets/services/coldchain.jpg";
import serviceWms from "@/assets/services/wms.jpg";
import serviceCleantech from "@/assets/services/cleantech.jpg";
import serviceFtl from "@/assets/services/ftl.jpg";

export type ServiceItem = {
  no: string;
  slug: string;
  icon: typeof Truck;
  title: string;
  desc: string;
  image: string;
  iconColor: string; // tailwind text class for the icon tile
  tagline: string;
  content: string[]; // long-form paragraphs shown on the service detail page
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
    desc: "High-speed, time-definite surface transportation engineered for mission-critical shipments where delays are simply not an option.",
    image: serviceExpress,
    iconColor: "red-gradient",
    tagline: "Time-definite surface delivery you can set your watch by.",
    content: [
      "Scorpion Express operates one of India's most disciplined and expansive surface express networks — purpose-built for industries where delivery precision directly impacts business continuity. From FMCG distribution and pharmaceutical movements to high-value electronics, retail replenishment and critical spare parts, every shipment moves on a committed, time-definite schedule with complete end-to-end visibility.",
      "Our scheduled line-haul network connects metros, tier-2 and tier-3 markets through strategically integrated hubs and automated sortation centres. Dedicated express handling lanes help bypass conventional mixed-cargo bottlenecks, ensuring faster turnaround and operational consistency across the network.",
      "Built with multi-route redundancy, intelligent re-routing protocols and proactive exception management, our operations are designed to protect delivery commitments even during disruptions upstream.",
      "Every shipment is monitored at waybill level through real-time GPS tracking, milestone-based status alerts and instant digital PODs — enabling operations teams, customer support and end clients to work from a single, transparent source of truth from pickup through final delivery.",
    ],
    features: [
      "Time-definite surface express network across India",
      "Real-time GPS visibility with waybill-level tracking",
      "Dedicated express handling lanes for faster movement",
      "Instant digital POD with milestone-based shipment alerts",
    ],
    industries: ["Healthcare", "E-commerce", "Manufacturing"],
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
    content: [
      "When speed becomes mission-critical, Scorpion Express delivers through a dedicated domestic air express network connecting India's major commercial and industrial hubs.",
      "Designed for urgent, high-priority shipments, our domestic air services provide rapid movement between metros, tier-1 and key tier-2 cities with assured uplift capacity through strategic partnerships with leading domestic airlines. From critical spare parts and pharmaceuticals to electronics, retail replenishment and time-sensitive documents, every shipment moves with precision, visibility and accountability.",
      "Beyond standard air cargo movement, we provide priority uplift handling, airport-to-airport coordination and rapid first-mile and last-mile integration to reduce overall transit time at every stage of the journey.",
      "Our dedicated airport operations teams ensure faster cargo processing, streamlined handovers and proactive exception management — helping businesses maintain continuity even under tight delivery windows.",
      "Every shipment is supported by real-time tracking, milestone-based status updates and instant digital PODs, providing complete transparency from pickup to final delivery.",
    ],
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
    content: [
      "Our cold chain division is purpose-built for the products where temperature is non-negotiable — vaccines, biologics, specialty chemicals, dairy, frozen foods and high-value perishables. From +25°C ambient to deep-frozen -25°C, every link of the chain is validated, monitored and audit-ready.",
      "A modern fleet of reefer trucks with dual-zone capability, qualified passive containers, validated cold rooms and freezer farms across the country form the physical backbone. On top sits a digital layer of IoT temperature and humidity loggers, geo-fenced alerts and live dashboards that flag any deviation in real time.",
      "Our operations are aligned to GDP, WHO and applicable regulatory frameworks — with full documentation, deviation reports and a regulator-ready audit trail for every shipment we move.",
    ],
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
    title: "Warehousing",
    desc: "Strategic, secure storage facilities with advanced WMS for flawless inventory control and distribution.",
    image: serviceWms,
    iconColor: "red-gradient",
    tagline: "Smart warehousing engineered for accuracy, speed and scale.",
    content: [
      "Scorpion's warehousing footprint spans multi-client and dedicated facilities at every key consumption and manufacturing cluster in India — built to handle everything from fast-moving e-commerce SKUs to bulk industrial inventory. Each site is designed around our customer's flow: receiving, put-away, picking, packing, value-add and dispatch are mapped to your SLAs, not ours.",
      "Our cloud-based Warehouse Management System (WMS) integrates with Shopify, SAP, Oracle and custom ERPs out of the box — giving you live inventory, order status and exception alerts on a single dashboard. Cycle counts, ABC analysis and demand-based slotting keep stock lean, accurate and ready to ship.",
      "Beyond storage, we run a full menu of value-added services — kitting, labelling, bundling, quality checks, returns processing and bonded / FTWZ warehousing — so that your warehouse stops being a cost centre and starts being a competitive advantage.",
    ],
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
    content: [
      "Our cleantech division gives enterprises a single, compliant partner for end-of-life electronics, IT assets and e-waste. From a single laptop pickup to nationwide data-centre decommissioning, every movement is sealed, tracked and reconciled against your asset register.",
      "Certified data destruction — degaussing, shredding and NIST-grade software wiping — is performed on-site or at our secure facilities, with auditable certificates issued for every serialised asset. Recovered material is then routed through authorised recyclers and refurbishers under India's EPR framework, with full chain-of-custody documentation.",
      "ESG and sustainability dashboards quantify the carbon and material recovery from your programme, giving your sustainability and compliance teams the evidence they need for board, regulator and customer reporting.",
    ],
    features: [
      "Authorised e-waste collection & transport",
      "ITAD with certified data destruction",
      "EPR (Extended Producer Responsibility) support",
      "Recycle, refurbish & remarketing services",
    ],
    industries: ["IT & ITES", "Telecom", "Manufacturing"],
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
    content: [
      "Our Full-Truck-Load (FTL) service is built for shippers who need an entire vehicle moving point-to-point, on their schedule, without transshipment. Whether it's a single high-value consignment, a sensitive project cargo or a high-frequency plant-to-DC lane, we deploy the right vehicle from a fleet ranging 9MT to 32MT — multi-axle, container, flatbed, ODC and low-bed included.",
      "Every truck is sealed at origin, locked to a single consignee and tracked live via GPS with geo-fenced alerts, route deviation warnings and ETA recalculation. A dedicated control tower monitors every active movement 24×7, so any exception is acted on before it becomes a delay.",
      "Long-term contract capacity protects you from spot-market volatility, while our spot mode gives you instant access to vetted vehicles for surge demand — without sacrificing safety, compliance or visibility.",
    ],
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
