DROP POLICY IF EXISTS "Anyone can submit an application" ON public.job_applications;
CREATE POLICY "Public can submit job applications"
ON public.job_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(phone) BETWEEN 5 AND 30
  AND char_length(role) BETWEEN 1 AND 100
  AND (message IS NULL OR char_length(message) <= 2000)
);