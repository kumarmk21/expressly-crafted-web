CREATE TABLE public.blog_post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  visitor_key TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (post_id, visitor_key)
);

GRANT SELECT, INSERT, DELETE ON public.blog_post_likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.blog_post_likes TO authenticated;
GRANT ALL ON public.blog_post_likes TO service_role;

ALTER TABLE public.blog_post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes" ON public.blog_post_likes FOR SELECT USING (true);
CREATE POLICY "Anyone can like" ON public.blog_post_likes FOR INSERT WITH CHECK (char_length(visitor_key) BETWEEN 1 AND 100);
CREATE POLICY "Anyone can unlike own like" ON public.blog_post_likes FOR DELETE USING (true);

CREATE INDEX idx_blog_post_likes_post ON public.blog_post_likes(post_id);

-- Allow anyone (including unauthenticated employees using demo login) to delete posts
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can delete blog posts" ON public.blog_posts FOR DELETE USING (true);