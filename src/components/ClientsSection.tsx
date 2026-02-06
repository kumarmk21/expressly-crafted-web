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
  "https://static.wixstatic.com/media/41fb73_76eaa07d4cdc487191df61c3783842be~mv2.png/v1/fill/w_151,h_50,al_c,lg_1,q_85,enc_avif,quality_auto/Picture15.png",
  "https://static.wixstatic.com/media/41fb73_cdd3ad10ef98443186219146c3261078~mv2.png/v1/fill/w_127,h_80,al_c,q_85,enc_avif,quality_auto/Picture16.png",
  "https://static.wixstatic.com/media/41fb73_7841cf7c2b104ed9a0d052095281eb67~mv2.jpg/v1/fill/w_120,h_80,al_c,q_80,enc_avif,quality_auto/Picture17.jpg",
  "https://static.wixstatic.com/media/41fb73_c4ae90555ddc49288c24f3b6b156f268~mv2.png/v1/fill/w_149,h_80,al_c,lg_1,q_85,enc_avif,quality_auto/Picture20.png",
  "https://static.wixstatic.com/media/41fb73_ebc11f7ace1e49259a2c4bcd895a2fc4~mv2.jpg/v1/fill/w_100,h_80,al_c,q_80,enc_avif,quality_auto/Picture18.jpg",
  "https://static.wixstatic.com/media/41fb73_da889ddad8f4430b80443ed968d4b141~mv2.png/v1/fill/w_151,h_60,al_c,q_85,enc_avif,quality_auto/Picture19.png",
  "https://static.wixstatic.com/media/41fb73_d71cf3d4def54b72a72b402e4d80de12~mv2.png/v1/fill/w_148,h_80,al_c,lg_1,q_85,enc_avif,quality_auto/Picture21.png",
  "https://static.wixstatic.com/media/41fb73_72d9489cb7de4a86900ca5cbfd75cf26~mv2.jpg/v1/fill/w_117,h_80,al_c,lg_1,q_80,enc_avif,quality_auto/Picture22.jpg",
  "https://static.wixstatic.com/media/41fb73_6b971d4d0c304bc79b4c53d251b88621~mv2.png/v1/fill/w_144,h_80,al_c,lg_1,q_85,enc_avif,quality_auto/Picture23.png",
  "https://static.wixstatic.com/media/41fb73_9254b38829704fa8bb3f1a703be7d96a~mv2.png/v1/fill/w_120,h_80,al_c,q_85,enc_avif,quality_auto/Havells_Logo_svg.png",
  "https://static.wixstatic.com/media/41fb73_f5bc2bc6fdb94549a21a28aff505d5a2~mv2.png/v1/fill/w_151,h_40,al_c,lg_1,q_85,enc_avif,quality_auto/LOGO1.png",
  "https://static.wixstatic.com/media/41fb73_6c089e2d70f546c497340741b73d10a1~mv2.png/v1/crop/x_6,y_0,w_98,h_43/fill/w_137,h_60,al_c,lg_1,q_85,enc_avif,quality_auto/Picture33.png",
  "https://static.wixstatic.com/media/41fb73_ac35631132a644b6881af8e9596693cf~mv2.png/v1/fill/w_143,h_60,al_c,lg_1,q_85,enc_avif,quality_auto/Picture35.png",
];

const ClientsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <span className="text-sm font-bold text-primary uppercase tracking-widest">Trusted Partners</span>
        <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-4">
          14,000+ Clients Across India
        </h2>
        <p className="text-muted-foreground">
          We believe every client is a valuable long-term partner.
        </p>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-6 flex items-center justify-center h-20 w-36 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo}
                alt={`Client ${(i % clientLogos.length) + 1}`}
                className="max-h-14 max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
