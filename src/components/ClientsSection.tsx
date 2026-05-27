type ClientRow = { name: string; industry: string | null; services: string | null; partner_since: string | null };

const FALLBACK_ROSTER: ClientRow[] = [
  { name: "Sush Global", industry: "Trading & Distribution", services: "Express, FTL", partner_since: "2024" },
  { name: "Havells", industry: "Electrical Goods", services: "FTL, Warehousing", partner_since: "2018" },
  { name: "Asian Paints", industry: "Paints & Coatings", services: "Express, FTL", partner_since: "2016" },
  { name: "Marico", industry: "FMCG", services: "Cold Chain, Express", partner_since: "2017" },
  { name: "Britannia", industry: "Food & Beverage", services: "Cold Chain, FTL", partner_since: "2019" },
  { name: "Dabur", industry: "FMCG / Healthcare", services: "Express, WMS", partner_since: "2015" },
  { name: "Pidilite", industry: "Adhesives & Chemicals", services: "FTL, Warehousing", partner_since: "2018" },
  { name: "Bajaj Electricals", industry: "Consumer Durables", services: "Express, FTL", partner_since: "2020" },
];

const clientLogos = [
  "https://static.wixstatic.com/media/41fb73_37e1b5f7817f4733b586d2a7deeabb8d~mv2.png/v1/fill/w_120,h_80,al_c,lg_1,q_85,enc_avif,quality_auto/Picture1.png",
  "https://static.wixstatic.com/media/41fb73_53df2bf1f48f4e21abaa921ea0ffd527~mv2.jpg/v1/fill/w_120,h_80,al_c,q_80,enc_avif,quality_auto/Picture4.jpg",
  "https://static.wixstatic.com/media/41fb73_54a08d9da79544c8a65543fe8ea53a36~mv2.png/v1/fill/w_151,h_60,al_c,lg_1,q_85,enc_avif,quality_auto/Picture2.png",
  "https://static.wixstatic.com/media/41fb73_92ecf1bef94e4cd6bdb660407c5026dd~mv2.png/v1/fill/w_121,h_80,al_c,q_85,enc_avif,quality_auto/Picture3.png",
  "https://static.wixstatic.com/media/41fb73_03fea5d414c440ec9aaf13dec572652d~mv2.png/v1/fill/w_151,h_60,al_c,q_85,enc_avif,quality_auto/Picture5.png",
  "https://static.wixstatic.com/media/41fb73_cde150ed639d4168998000583a5edad0~mv2.jpg/v1/fill/w_120,h_80,al_c,q_80,enc_avif,quality_auto/Picture6.jpg",
  "https://static.wixstatic.com/media/41fb73_5a3538d8004546a6a53271a23c0a52a8~mv2.jpg/v1/fill/w_151,h_50,al_c,q_80,enc_avif,quality_auto/Picture7.jpg",
  "https://static.wixstatic.com/media/41fb73_10649ff6e4774a86a8a3319e24540d35~mv2.png/v1/fill/w_151,h_60,al_c,lg_1,q_85,enc_avif,quality_auto/Picture8.png",
  "https://static.wixstatic.com/media/41fb73_55172b512cc940559254fd4d11c4b928~mv2.jpg/v1/fill/w_151,h_60,al_c,q_80,enc_avif,quality_auto/Picture9.jpg",
  "https://static.wixstatic.com/media/41fb73_c060c5fa35c44984bd9e3f12ca0b9d70~mv2.png/v1/fill/w_130,h_80,al_c,q_85,enc_avif,quality_auto/Picture10.png",
  "https://static.wixstatic.com/media/41fb73_260e2d1614fb4743ab01bc54f19e46f5~mv2.png/v1/fill/w_151,h_50,al_c,q_85,enc_avif,quality_auto/Picture11.png",
  "https://static.wixstatic.com/media/41fb73_d482be1637c84b8481baf0506e96d2ba~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_avif,quality_auto/Picture12.png",
  "https://static.wixstatic.com/media/41fb73_5d420ade471f4a61b220d0376127a2c9~mv2.png/v1/fill/w_146,h_60,al_c,lg_1,q_85,enc_avif,quality_auto/Picture13.png",
  "https://static.wixstatic.com/media/41fb73_af5f7eee067c4632bf7002e35f7a7032~mv2.png/v1/fill/w_151,h_60,al_c,q_85,enc_avif,quality_auto/Picture14.png",
  "https://static.wixstatic.com/media/41fb73_9254b38829704fa8bb3f1a703be7d96a~mv2.png/v1/fill/w_120,h_80,al_c,q_85,enc_avif,quality_auto/Havells_Logo_svg.png",
];

const ClientsSection = () => {
  const [roster, setRoster] = useState<ClientRow[]>(FALLBACK_ROSTER);

  useEffect(() => {
    supabase.from("clients").select("name, industry, services, partner_since").order("display_order").then(({ data }) => {
      if (data && data.length) setRoster(data as ClientRow[]);
    });
  }, []);

  return (
    <section className="py-20 lg:py-24 bg-background overflow-hidden border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-10 bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Trusted Partners</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <h2 className="font-display uppercase text-4xl lg:text-6xl text-foreground leading-[0.9]">
            Trusted by India<span className="text-primary">.</span> One promise.
          </h2>
          <p className="text-muted-foreground max-w-md">Every client is a long-term partner. From category leaders to emerging brands.</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 flex items-center justify-center h-20 w-40 bg-white border border-border grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img src={logo} alt="" className="max-h-12 max-w-[80%] object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ClientsSection;
