CREATE TABLE public.events_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'news',
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  employee_name TEXT,
  employee_designation TEXT,
  month_year TEXT,
  event_date DATE,
  link_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.events_news TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events_news TO authenticated;
GRANT ALL ON public.events_news TO service_role;

ALTER TABLE public.events_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active events_news"
  ON public.events_news FOR SELECT
  USING (active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage events_news"
  ON public.events_news FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_events_news_updated_at
  BEFORE UPDATE ON public.events_news
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();