-- CLIENTS (public roster)
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  services TEXT,
  partner_since TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients are viewable by everyone"
  ON public.clients FOR SELECT USING (true);

-- QUOTE REQUESTS
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  origin TEXT,
  destination TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a quote request"
  ON public.quote_requests FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(phone) BETWEEN 5 AND 30
    AND char_length(service) BETWEEN 1 AND 100
    AND (message IS NULL OR char_length(message) <= 2000)
  );

-- TICKETS
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE DEFAULT ('SC-' || to_char(now(),'YYYYMMDD') || '-' || substr(gen_random_uuid()::text,1,6)),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can open a ticket"
  ON public.tickets FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(subject) BETWEEN 1 AND 200
    AND char_length(description) BETWEEN 1 AND 4000
  );

-- SHIPMENTS
CREATE TABLE public.shipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_number TEXT NOT NULL UNIQUE,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  customer_name TEXT,
  customer_email TEXT,
  estimated_delivery DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Shipments are publicly trackable"
  ON public.shipments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create shipments"
  ON public.shipments FOR INSERT TO authenticated WITH CHECK (true);

-- Seed clients from current site roster
INSERT INTO public.clients (name, industry, services, partner_since, display_order) VALUES
  ('Sush Global','Trading & Distribution','Express, FTL','2024',1),
  ('Havells','Electrical Goods','FTL, Warehousing','2018',2),
  ('Asian Paints','Paints & Coatings','Express, FTL','2016',3),
  ('Marico','FMCG','Cold Chain, Express','2017',4),
  ('Britannia','Food & Beverage','Cold Chain, FTL','2019',5),
  ('Dabur','FMCG / Healthcare','Express, WMS','2015',6),
  ('Pidilite','Adhesives & Chemicals','FTL, Warehousing','2018',7),
  ('Bajaj Electricals','Consumer Durables','Express, FTL','2020',8);