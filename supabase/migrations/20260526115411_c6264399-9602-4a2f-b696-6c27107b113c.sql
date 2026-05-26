-- 1. Remove public exposure of shipments PII
DROP POLICY IF EXISTS "Shipments are publicly trackable" ON public.shipments;

-- Safe tracking lookup: only returns one shipment when the exact tracking number is supplied.
CREATE OR REPLACE FUNCTION public.track_shipment(p_tracking_number text)
RETURNS TABLE (
  tracking_number text,
  status text,
  origin text,
  destination text,
  estimated_delivery date,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.tracking_number, s.status, s.origin, s.destination, s.estimated_delivery, s.created_at
  FROM public.shipments s
  WHERE s.tracking_number = p_tracking_number
  LIMIT 1;
$$;

REVOKE EXECUTE ON FUNCTION public.track_shipment(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.track_shipment(text) TO anon, authenticated;

-- 2. Drop unused empty "contact enquiry" table (no policies, no usable columns)
DROP TABLE IF EXISTS public."contact enquiry";

-- 3. Restrict direct execution of has_role helper to authenticated users only.
--    RLS policies still evaluate it correctly because policies run as the querying role.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;