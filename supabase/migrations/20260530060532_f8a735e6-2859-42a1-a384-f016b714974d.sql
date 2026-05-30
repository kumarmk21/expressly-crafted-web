
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_code TEXT NOT NULL UNIQUE,
  location_name TEXT NOT NULL,
  hierarchy TEXT NOT NULL DEFAULT 'Branch Office',
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  contact_number TEXT,
  email TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.locations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.locations TO authenticated;
GRANT ALL ON public.locations TO service_role;

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Locations are viewable by everyone"
ON public.locations FOR SELECT
USING (true);

CREATE POLICY "Admins manage locations"
ON public.locations FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON public.locations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
