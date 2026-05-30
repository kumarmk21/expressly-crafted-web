CREATE TABLE public.network_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  label text NOT NULL,
  value text NOT NULL,
  icon text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_network_stats_cat_order ON public.network_stats(category, display_order);

GRANT SELECT ON public.network_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.network_stats TO authenticated;
GRANT ALL ON public.network_stats TO service_role;

ALTER TABLE public.network_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Network stats viewable by everyone"
  ON public.network_stats FOR SELECT
  USING (true);

CREATE POLICY "Admins manage network stats"
  ON public.network_stats FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_network_stats_updated_at
  BEFORE UPDATE ON public.network_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with current values
INSERT INTO public.network_stats (category, label, value, icon, display_order) VALUES
  ('pin_codes', 'Direct Serviceable PIN Codes', '5,000', 'MapPin', 1),
  ('pin_codes', 'ODA PIN Codes', '11,500', 'MapPin', 2),
  ('pin_codes', 'Need-base Service PIN Codes', '7,500', 'MapPin', 3),
  ('pin_codes', 'Total PIN Codes', '24,000', 'MapPin', 4),
  ('network', 'Branches', '73', 'Building2', 1),
  ('network', 'Franchisees', '105', 'Building2', 2),
  ('network', 'Pick-up & Delivery Associates', '140', 'Truck', 3),
  ('network', 'Hub Centres', '15', 'MapPin', 4),
  ('volume', 'Monthly Tonnage (MT)', '40,000', 'Package', 1),
  ('volume', 'Packages / Month', '24,00,000', 'Package', 2),
  ('volume', 'Total LRs / Month', '65,000', 'Package', 3),
  ('routes', 'Linehaul Routes', '80', 'Route', 1),
  ('routes', 'Feeder Routes', '110', 'Route', 2),
  ('routes', 'Vehicles in Fleet', '550', 'Truck', 3);