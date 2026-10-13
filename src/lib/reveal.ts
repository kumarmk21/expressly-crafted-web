// Site-wide scroll reveal: sections fade/slide in as they enter the viewport.
export function initReveal() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  const scan = () => {
    document.querySelectorAll<HTMLElement>("main section, #root > div > section, footer").forEach((el, i) => {
      if (el.dataset.reveal) return;
      el.dataset.reveal = "1";
      // Skip anything already on screen at load so the top never flashes.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return;
      el.classList.add("reveal");
      io.observe(el);
    });
  };

  scan();
  new MutationObserver(scan).observe(document.getElementById("root")!, { childList: true, subtree: true });
}
