CREATE TABLE public.technology_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  no TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.technology_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.technology_items TO authenticated;
GRANT ALL ON public.technology_items TO service_role;

ALTER TABLE public.technology_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view technology items"
  ON public.technology_items FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage technology items"
  ON public.technology_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_technology_items_updated_at
  BEFORE UPDATE ON public.technology_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.technology_items (no, title, description, image_url, icon, display_order) VALUES
('01','Customer Portal','Self-serve portal for bookings, tracking, invoices and MIS reports — anytime, anywhere.','https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70','Monitor',1),
('02','API-based Booking & Pickup Request','Plug-and-play APIs to push bookings and raise pickup requests directly from your system.','https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=70','PackageSearch',2),
('03','GPS Tracking on Middle Mile','Live GPS visibility on every line-haul vehicle for real-time ETA and exception alerts.','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=70','MapPinned',3),
('04','Salesforce Module','Salesforce-powered CRM driving lead-to-revenue tracking and account management.','https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=70','Cloud',4),
('05','CRM & CSAT Module','Unified CRM with built-in CSAT surveys to capture customer experience after every shipment.','https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=70','HeadphonesIcon',5),
('06','Control Tower','24×7 control tower monitoring transit, hubs and exceptions across the entire network.','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70','Radio',6),
('07','Automated Customer Billing','Rule-based automated billing engine — accurate invoices, faster cycles, zero leakage.','https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70','ReceiptText',7),
('08','Wallet-based Booking','Prepaid wallet for instant bookings without payment friction or credit-limit holds.','https://images.unsplash.com/photo-1580048915913-4f3b1629d8eb?auto=format&fit=crop&w=1200&q=70','Wallet',8),
('09','API-based Booking','High-throughput booking APIs built for e-commerce, D2C and enterprise integrations.','https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70','Plug',9),
('10','PRQ (Price Request Quote)','On-demand pricing engine to generate accurate quotes against lane, weight and service.','https://images.unsplash.com/photo-1556742400-b5b7c5121f6c?auto=format&fit=crop&w=1200&q=70','Tag',10),
('11','Bidding','Digital bidding workflow for spot loads — transparent, competitive and fully auditable.','https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=70','Gavel',11),
('12','Vendor Portal','Dedicated vendor portal for indents, PODs, payments and performance scorecards.','https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70','Users',12);