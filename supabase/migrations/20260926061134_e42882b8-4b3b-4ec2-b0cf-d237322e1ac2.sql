ALTER TABLE public.contact_submissions
  ADD COLUMN privacy_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN consented_at timestamp with time zone;

ALTER TABLE public.quote_requests
  ADD COLUMN privacy_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN consented_at timestamp with time zone;

CREATE OR REPLACE FUNCTION public.validate_public_enquiry()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.privacy_consent IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'Privacy consent is required';
  END IF;

  IF NEW.consented_at IS NULL THEN
    NEW.consented_at := now();
  END IF;

  IF TG_TABLE_NAME = 'contact_submissions' THEN
    IF NEW.email IS NULL OR char_length(btrim(NEW.email)) < 3 OR char_length(NEW.email) > 255 THEN
      RAISE EXCEPTION 'A valid email is required';
    END IF;
    IF NEW.phone IS NULL OR char_length(btrim(NEW.phone)) < 5 OR char_length(NEW.phone) > 20 THEN
      RAISE EXCEPTION 'A valid phone number is required';
    END IF;
    IF NEW.first_name IS NOT NULL AND char_length(NEW.first_name) > 60 THEN RAISE EXCEPTION 'First name is too long'; END IF;
    IF NEW.last_name IS NOT NULL AND char_length(NEW.last_name) > 60 THEN RAISE EXCEPTION 'Last name is too long'; END IF;
    IF NEW.company_name IS NOT NULL AND char_length(NEW.company_name) > 120 THEN RAISE EXCEPTION 'Company name is too long'; END IF;
    IF NEW.location IS NOT NULL AND char_length(NEW.location) > 120 THEN RAISE EXCEPTION 'Location is too long'; END IF;
    IF NEW.message IS NOT NULL AND char_length(NEW.message) > 2000 THEN RAISE EXCEPTION 'Message is too long'; END IF;
  ELSIF TG_TABLE_NAME = 'quote_requests' THEN
    IF NEW.name IS NULL OR char_length(btrim(NEW.name)) < 1 OR char_length(NEW.name) > 100 THEN RAISE EXCEPTION 'A valid name is required'; END IF;
    IF NEW.phone IS NULL OR char_length(btrim(NEW.phone)) < 5 OR char_length(NEW.phone) > 30 THEN RAISE EXCEPTION 'A valid phone number is required'; END IF;
    IF NEW.service IS NULL OR char_length(btrim(NEW.service)) < 1 OR char_length(NEW.service) > 100 THEN RAISE EXCEPTION 'A service is required'; END IF;
    IF NEW.email IS NOT NULL AND char_length(NEW.email) > 255 THEN RAISE EXCEPTION 'Email is too long'; END IF;
    IF NEW.company IS NOT NULL AND char_length(NEW.company) > 120 THEN RAISE EXCEPTION 'Company name is too long'; END IF;
    IF NEW.origin IS NOT NULL AND char_length(NEW.origin) > 120 THEN RAISE EXCEPTION 'Origin is too long'; END IF;
    IF NEW.destination IS NOT NULL AND char_length(NEW.destination) > 120 THEN RAISE EXCEPTION 'Destination is too long'; END IF;
    IF NEW.message IS NOT NULL AND char_length(NEW.message) > 2000 THEN RAISE EXCEPTION 'Message is too long'; END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_contact_submission
BEFORE INSERT ON public.contact_submissions
FOR EACH ROW EXECUTE FUNCTION public.validate_public_enquiry();

CREATE TRIGGER validate_quote_request
BEFORE INSERT ON public.quote_requests
FOR EACH ROW EXECUTE FUNCTION public.validate_public_enquiry();