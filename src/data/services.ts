import { Truck, Plane, Snowflake, Warehouse, Recycle, PackageCheck, Stethoscope } from "lucide-react";
import serviceExpress from "@/assets/services/express.jpg";
import serviceAir from "@/assets/services/air.jpg";
import serviceColdchain from "@/assets/services/coldchain.jpg";
import serviceWms from "@/assets/services/wms.jpg";
import serviceCleantech from "@/assets/services/cleantech.jpg";
import serviceFtl from "@/assets/services/ftl.jpg";
import serviceMrConnect from "@/assets/services/mrconnect.jpg";

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
      "Assured domestic air uplift across major Indian cities",
      "Priority handling for urgent and time-sensitive shipments",
      "Real-time shipment visibility with milestone-based tracking",
      "Integrated airport-to-door coordination for faster turnaround",
    ],
    industries: ["Pharma", "Aerospace", "Auto-spares", "Luxury Goods"],
    capabilities: [
      { title: "Nationwide Air Connectivity", desc: "Daily air express movement across major Indian metros and commercial hubs." },
      { title: "Priority Cargo Handling", desc: "Fast-track processing for urgent, high-value and time-sensitive shipments." },
      { title: "Rapid Airport Coordination", desc: "Integrated airport handling and synchronized first-mile to last-mile movement for reduced turnaround times." },
    ],
  },
  {
    no: "03",
    slug: "mrconnect",
    icon: Stethoscope,
    title: "MRConnect",
    desc: "Seamless last-mile delivery of pharma samples from company warehouses to MRs nationwide.",
    image: serviceMrConnect,
    iconColor: "red-gradient",
    tagline: "Seamless last-mile delivery of pharma samples from company warehouses to MRs nationwide.",
    content: [
      "MRConnect is Scorpion Express's purpose-built service for the pharmaceutical field force — connecting Medical Representatives (MRs), Area Business Managers, stockists, distributors and CFAs through a single, technology-enabled logistics platform.",
      "From physician samples and promotional literature to urgent product top-ups and replacement stock, every consignment is moved through a controlled, monitored and audit-ready network designed specifically for the pharma industry.",
      "MRs can raise pickup and delivery requests directly through the platform, track every shipment in real time, and access digital PODs the moment delivery is completed — eliminating manual follow-ups and accelerating field productivity.",
      "Backed by our nationwide express network, temperature-aware handling, dedicated pharma operations team and a dedicated MRConnect operations team, MRConnect ensures that the right product reaches the right doctor, chemist or distributor at the right time — every time.",
    ],
    features: [
      "Dedicated platform for MRs, stockists and distributors",
      "On-demand pickup & delivery for samples and product top-ups",
      "Real-time shipment tracking with instant digital POD",
      "Pharma-grade handling",
    ],
    industries: ["Pharmaceuticals", "Healthcare", "Medical Devices", "Nutraceuticals"],
    capabilities: [
      { title: "Field-Force Enablement", desc: "Self-serve pickup booking and live visibility for MRs and field teams across India." },
      { title: "Pharma-Specific Network", desc: "Integrated express and cold-chain capability tuned to pharma compliance needs." },
      { title: "Digital Documentation", desc: "Instant ePOD, consignment history and reconciliation reports for HQ and stockists." },
    ],
  },
  {
    no: "04",
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
    no: "05",
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
    no: "06",
    slug: "cleantech",
    icon: Recycle,
    title: "Cleantech Solutions",
    desc: "Compliant, secure and environmentally responsible disposal solutions for expired pharmaceutical products, food inventory and regulated commercial waste.",
    image: serviceCleantech,
    iconColor: "bg-gradient-to-br from-emerald-500 to-green-700",
    tagline: "Safe, compliant disposal solutions for expired pharmaceutical and food products.",
    content: [
      "Our Cleantech Solutions division helps pharmaceutical, FMCG and food businesses manage end-of-life and expired inventory through a fully controlled, transparent and regulation-compliant disposal ecosystem. From batch-level pickups to large-scale destruction programmes, every movement is documented, monitored and reconciled to ensure complete accountability.",
      "Products are handled through authorised destruction and disposal processes aligned with environmental and regulatory standards, helping organisations mitigate compliance risk, brand exposure and unsafe secondary market leakage.",
      "Our controlled reverse logistics framework ensures secure collection, sealed transportation, verified destruction and complete audit trails across every stage of the process. Detailed documentation and disposal certification provide businesses with the operational transparency required for internal governance, regulatory compliance and customer assurance.",
      "Through sustainable disposal practices and responsible waste management, we also support ESG and environmental objectives by reducing landfill impact and promoting safer material handling across the supply chain.",
    ],
    features: [
      "Secure disposal solutions for expired pharma and food products",
      "Controlled reverse logistics with sealed transportation",
      "Compliant destruction processes with complete audit trails",
      "Environmentally responsible waste handling aligned with ESG goals",
    ],
    industries: ["IT & ITES", "Telecom", "Manufacturing"],
    capabilities: [
      { title: "Secure Reverse Logistics", desc: "Controlled pickup and transportation of expired and regulated products across the supply chain." },
      { title: "Verified Disposal Processes", desc: "Authorised destruction and compliant disposal with complete audit trails and certification." },
      { title: "Sustainability & Compliance Support", desc: "Environmentally responsible waste handling aligned with ESG, regulatory and corporate governance requirements." },
    ],
  },
  {
    no: "07",
    slug: "ftl",
    icon: Truck,
    title: "FTL",
    desc: "Dedicated point-to-point heavy haulage offering maximum capacity, uncompromised security, and direct routing.",
    image: serviceFtl,
    iconColor: "red-gradient",
    tagline: "Dedicated trucks. Direct routes. Total control.",
    content: [
      "Dedicated Full-Truck-Load (FTL) transportation solutions designed for businesses that require exclusive vehicle movement, higher carrying capacity and direct point-to-point delivery without intermediate handling.",
      "Our FTL operations are built for customers moving high-value cargo, bulk commercial shipments, project materials and time-sensitive industrial goods across India. Whether it is a dedicated plant-to-warehouse movement, factory-to-distribution-centre supply or specialised project cargo, we deploy the right vehicle configuration from a fleet ranging from 9 MT to 32 MT capacities — including multi-axle trucks, containers, flatbeds, trailers and low-bed vehicles.",
      "Every vehicle is assigned exclusively to a single customer shipment, ensuring faster transit, reduced handling risk and improved cargo security. Shipments are monitored through real-time GPS tracking with geo-fencing, route monitoring, live status visibility and proactive exception alerts.",
      "Our centralized operations control team monitors active vehicle movement round the clock to ensure timely coordination, rapid issue resolution and consistent delivery performance across every route.",
      "For customers with recurring transportation requirements, we provide dedicated contract vehicles and assured fleet availability to protect against market fluctuations and seasonal capacity shortages. Our on-demand vehicle network also enables quick deployment for urgent and surge-load requirements without compromising compliance, safety or operational visibility.",
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
