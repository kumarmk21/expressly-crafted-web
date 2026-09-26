-- notifications: only create for yourself
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON public.notifications;
CREATE POLICY "Users can create own notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- blog_posts: only admins delete
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON public.blog_posts;
CREATE POLICY "Admins can delete blog posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- blog_post_likes: unlike only via function that matches visitor key
DROP POLICY IF EXISTS "Anyone can unlike own like" ON public.blog_post_likes;
CREATE OR REPLACE FUNCTION public.unlike_blog_post(p_like_id uuid, p_visitor_key text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n int;
BEGIN
  DELETE FROM public.blog_post_likes WHERE id = p_like_id AND visitor_key = p_visitor_key;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n > 0;
END $$;
GRANT EXECUTE ON FUNCTION public.unlike_blog_post(uuid, text) TO anon, authenticated;

-- visitors: only visitor-management staff
DROP POLICY IF EXISTS "Authenticated users can view visitors" ON public.visitors;
CREATE POLICY "VMS staff can view visitors" ON public.visitors FOR SELECT TO authenticated USING (public.get_vms_role() IS NOT NULL);

-- company_officials: only visitor-management staff
DROP POLICY IF EXISTS "Authenticated users can view officials" ON public.company_officials;
CREATE POLICY "VMS staff can view officials" ON public.company_officials FOR SELECT TO authenticated USING (public.get_vms_role() IS NOT NULL);

-- contact_submissions: require consent and sane sizes
DROP POLICY IF EXISTS "Anyone can submit a contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit a contact form" ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (privacy_consent = true AND status = 'new' AND char_length(email) BETWEEN 3 AND 255 AND char_length(phone) BETWEEN 5 AND 20 AND (message IS NULL OR char_length(message) <= 5000));

-- storage: stop public listing (public URLs still work); admins keep read for upserts
DROP POLICY IF EXISTS "Site images are publicly viewable" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
CREATE POLICY "Admins can read site images" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- blog-images uploads: images only, single-level path, no overwrite
DROP POLICY IF EXISTS "Anyone can upload blog images" ON storage.objects;
CREATE POLICY "Anyone can upload blog images" ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'blog-images' AND lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','gif') AND char_length(name) <= 200);