CREATE TABLE public.leadership_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.leadership_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leadership_members TO authenticated;
GRANT ALL ON public.leadership_members TO service_role;

ALTER TABLE public.leadership_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view leadership"
  ON public.leadership_members FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage leadership"
  ON public.leadership_members FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_leadership_members_updated_at
  BEFORE UPDATE ON public.leadership_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.leadership_members (name, role, photo_url, display_order) VALUES
('J P N Singh','Managing Director — Scorpion Group',NULL,1),
('Shalini Singh','Director — Scorpion Express Pvt. Ltd.',NULL,2),
('Raj Lalan Dwivedi','COO — Scorpion Express Pvt. Ltd.',NULL,3),
('Subrat Rath','CFO — Scorpion Express Pvt. Ltd.',NULL,4),
('Manoj Kumar','CTO — Scorpion Group',NULL,5),
('Mandar Babre','CBO — Scorpion Express Pvt. Ltd.',NULL,6),
('Anil Tiwari','NHO — Scorpion Express Pvt. Ltd.',NULL,7),
('Pooja Patel Kalia','Leadership — Scorpion Express Pvt. Ltd.',NULL,8);