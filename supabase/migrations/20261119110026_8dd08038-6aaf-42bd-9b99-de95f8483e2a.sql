INSERT INTO public.site_content (key, value)
VALUES ('emp_portal_announcements', '["Appointment Management Provision in the Customer Portal"]'::jsonb)
ON CONFLICT (key) DO NOTHING;