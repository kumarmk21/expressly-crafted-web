import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const sections = [
  {
    title: "1. What Data We Collect",
    intro: "In the course of providing B2B transport, delivery, and billing services, we process limited personal data, including:",
    items: [
      "Business Contacts: Names, official email addresses, and phone numbers of client and vendor representatives.",
      "Operational & Delivery Contacts: Names, phone numbers, and delivery details of consignees, dispatchers, and drivers/fleet personnel required to fulfill shipments.",
      "Portal Users: Login IDs, names, and encrypted credentials of authorized employees and client users accessing our TMS portal.",
    ],
  },
  {
    title: "2. Purpose of Processing",
    intro: "We use this data strictly to:",
    items: [
      "Execute pick-ups, transit tracking, and Proof of Delivery (POD).",
      "Issue invoices, e-way bills, and statutory tax/GST records.",
      "Manage user access, security logs, and customer support.",
      "Comply with applicable Indian transport, tax, and regulatory laws.",
    ],
  },
  {
    title: "3. Data Sharing & Security",
    intro: "We do not sell personal data. Data is shared only with authorized fleet partners, technology/ERP providers, and regulatory authorities as required to complete deliveries or comply with the law. We maintain reasonable security safeguards, including access controls, password hashing, and audit logs, to protect against unauthorized access or breaches.",
  },
  {
    title: "4. Data Retention",
    intro: "We retain operational and billing records only for as long as necessary to fulfill shipment obligations or meet statutory retention periods (such as GST and tax laws), after which personal identifiers are securely deleted or anonymized.",
  },
];

const PrivacyNoticePopup = ({ onClose }: { onClose: () => void }) => (
  <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
    <DialogContent className="flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl flex-col gap-0 overflow-hidden rounded-lg border-t-4 border-t-primary p-0">
      <DialogHeader className="shrink-0 border-b border-border bg-primary/5 p-5 pr-12 text-left sm:p-6 sm:pr-12">
        <div className="mb-3 flex items-center gap-3 text-primary">
          <ShieldCheck className="h-7 w-7 shrink-0" aria-hidden="true" />
          <DialogTitle className="text-2xl leading-tight tracking-normal">DPDP Act, 2023</DialogTitle>
        </div>
        <DialogDescription className="text-base font-semibold text-foreground">Scorpion Express Pvt. Ltd.</DialogDescription>
      </DialogHeader>
      <div className="min-h-0 space-y-6 overflow-y-auto p-5 text-sm leading-relaxed text-foreground sm:p-6 sm:text-base">
        <p>Scorpion Express Pvt Ltd ("we," "us," or "our") provides B2B logistics and supply chain services across India. We respect your privacy and process digital personal data in compliance with India’s Digital Personal Data Protection (DPDP) Act, 2023.</p>
        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h3 className="text-base font-semibold text-primary sm:text-lg">{section.title}</h3>
            <p>{section.intro}</p>
            {section.items && <ul className="list-disc space-y-2 pl-5 marker:text-primary">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-primary sm:text-lg">5. Your Rights & Grievance Redressal</h3>
          <p>Individuals whose personal data we process as a Data Fiduciary may request access, correction, or erasure of their data (subject to legal retention requirements).</p>
          <p>For any questions or grievances, please contact Scorpion Express Pvt. Ltd. through our <a href="/contact" className="font-semibold text-primary underline">Contact page</a>.</p>
          <p><strong>Registered Office:</strong> 404, Shah Nahar Industrial Estate, Dr E Moses Road, Worli, Mumbai 400018, Maharashtra, India</p>
          <p className="text-xs text-muted-foreground">SCORPION EXPRESS PRIVATE LIMITED · GSTIN: 27AAJCS7860C1Z5 · CIN: U51109BR2006PTC012270</p>
        </section>
      </div>
      <div className="flex shrink-0 justify-end border-t border-border bg-background px-5 py-3 sm:px-6">
        <Button onClick={onClose}>Close notice</Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default PrivacyNoticePopup;