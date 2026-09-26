import { Phone, MessageCircle } from "lucide-react";

// TODO: replace with the official Scorpion WhatsApp Business number
export const WHATSAPP_NUMBER = "912224978815";
const CALL_NUMBER = "1800221945";

const MobileContactBar = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-border bg-background shadow-lg pb-[env(safe-area-inset-bottom)]">
    <a href={`tel:${CALL_NUMBER}`} className="flex items-center justify-center gap-2 py-3 text-sm font-black uppercase tracking-wider bg-primary text-primary-foreground" aria-label="Call Scorpion Express">
      <Phone className="h-4 w-4" /> Call
    </a>
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Scorpion Express, I need help with a shipment.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 py-3 text-sm font-black uppercase tracking-wider bg-foreground text-background"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" /> WhatsApp
    </a>
  </div>
);

export default MobileContactBar;
