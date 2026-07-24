
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT,
  year TEXT,
  kind TEXT NOT NULL DEFAULT 'certification',
  logo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.certifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certifications TO authenticated;
GRANT ALL ON public.certifications TO service_role;

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active certifications"
  ON public.certifications FOR SELECT
  USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage certifications"
  ON public.certifications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.certifications (title, issuer, year, kind, display_order) VALUES
  ('ISO 9001:2015', 'Quality Management System', '2019', 'certification', 1),
  ('ISO 14001:2015', 'Environmental Management', '2020', 'certification', 2),
  ('ISO 45001:2018', 'Occupational Health & Safety', '2021', 'certification', 3),
  ('Great Place to Work®', 'GPTW Institute', '2024', 'certification', 4),
  ('GDP Certified', 'Good Distribution Practice - Pharma', '2023', 'certification', 5),
  ('Logistics Excellence Award', 'India Cargo Awards', '2023', 'award', 6),
  ('Best Cold Chain Operator', 'ColdChain India Summit', '2022', 'award', 7),
  ('Fastest Growing 3PL', 'Supply Chain Leadership Forum', '2024', 'award', 8);
