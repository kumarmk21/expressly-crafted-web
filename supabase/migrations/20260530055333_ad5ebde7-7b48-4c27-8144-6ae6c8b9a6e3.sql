
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.get_vms_role()
RETURNS app_role_vms
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.app_users WHERE auth_user_id = auth.uid() LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_vms_official_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT official_id FROM public.app_users WHERE auth_user_id = auth.uid() LIMIT 1
$$;

-- Make visitor-photos bucket private
UPDATE storage.buckets SET public = false WHERE id = 'visitor-photos';

-- Storage policies for visitor-photos: only receptionist/admin
DROP POLICY IF EXISTS "Receptionists and admins can view visitor photos" ON storage.objects;
CREATE POLICY "Receptionists and admins can view visitor photos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'visitor-photos' AND get_vms_role() = ANY (ARRAY['receptionist'::app_role_vms, 'admin'::app_role_vms]));

DROP POLICY IF EXISTS "Receptionists and admins can upload visitor photos" ON storage.objects;
CREATE POLICY "Receptionists and admins can upload visitor photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'visitor-photos' AND get_vms_role() = ANY (ARRAY['receptionist'::app_role_vms, 'admin'::app_role_vms]));

DROP POLICY IF EXISTS "Receptionists and admins can update visitor photos" ON storage.objects;
CREATE POLICY "Receptionists and admins can update visitor photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'visitor-photos' AND get_vms_role() = ANY (ARRAY['receptionist'::app_role_vms, 'admin'::app_role_vms]));

DROP POLICY IF EXISTS "Admins can delete visitor photos" ON storage.objects;
CREATE POLICY "Admins can delete visitor photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'visitor-photos' AND get_vms_role() = 'admin'::app_role_vms);

-- Restrict resumes bucket upload (size + mime via bucket config) and add update/delete admin-only
UPDATE storage.buckets
SET file_size_limit = 5242880,
    allowed_mime_types = ARRAY['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
WHERE id = 'resumes';

DROP POLICY IF EXISTS "Anyone can upload a resume" ON storage.objects;
CREATE POLICY "Anyone can upload a resume"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'resumes'
  AND (octet_length(COALESCE(name, '')) BETWEEN 1 AND 255)
);

DROP POLICY IF EXISTS "Admins can update resumes" ON storage.objects;
CREATE POLICY "Admins can update resumes"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can delete resumes" ON storage.objects;
CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));
