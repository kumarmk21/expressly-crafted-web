-- Job applications table for careers form
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  role text NOT NULL,
  experience text,
  message text,
  resume_url text NOT NULL,
  resume_file_name text NOT NULL,
  resume_file_size integer NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
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

CREATE POLICY "Admins read job applications"
ON public.job_applications
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update job applications"
ON public.job_applications
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete job applications"
ON public.job_applications
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket for resumes (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload to resumes (so the public careers form works)
CREATE POLICY "Anyone can upload a resume"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can read resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));
