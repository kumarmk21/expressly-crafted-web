UPDATE public.clients
SET logo_url = 'https://expressly-crafted-web.lovable.app' || logo_url
WHERE logo_url LIKE '/__l5e/assets-v1/%';