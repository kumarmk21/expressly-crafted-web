
CREATE TABLE public.emp_portal_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  icon TEXT,
  group_name TEXT NOT NULL DEFAULT 'Operations',
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.emp_portal_modules TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.emp_portal_modules TO authenticated;
GRANT ALL ON public.emp_portal_modules TO service_role;

ALTER TABLE public.emp_portal_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active modules" ON public.emp_portal_modules
  FOR SELECT USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage modules" ON public.emp_portal_modules
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_emp_portal_modules_updated_at
  BEFORE UPDATE ON public.emp_portal_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.emp_portal_modules (name, description, url, icon, group_name, display_order) VALUES
  ('CAPA Module', 'Corrective & preventive action tracker', 'http://103.211.171.59:5000/', 'ClipboardList', 'Operations', 10),
  ('Purchase Order', 'Create, approve and track POs', 'http://103.211.171.59:5029/', 'FileText', 'Finance', 20),
  ('Vendor Portal', 'Vendor onboarding & management', 'http://103.211.171.59:5024/', 'Users', 'Operations', 30),
  ('Shipment Tracking', 'Live consignment tracking', 'http://103.211.171.59:8073/', 'Truck', 'Operations', 40),
  ('Complaint Management', 'Customer complaint tickets & SLA', 'http://103.211.171.59:8000/', 'MessageSquareWarning', 'Operations', 50),
  ('Travel Expense Portal', 'Submit & approve travel claims', 'http://103.211.171.59:8026/', 'Plane', 'Finance', 60),
  ('Customer Shipment Analytics', 'Customer-facing analytics dashboard', 'https://sepltms.scorpiongroup.in/', 'BarChart3', 'MIS', 70),
  ('Rate Finder', 'Lookup live freight rates', 'http://103.211.171.59:5025/', 'Calculator', 'Tools', 80),
  ('LR Uploader', 'Bulk upload Lorry Receipts', 'http://103.211.171.59:5002/', 'Upload', 'Tools', 90),
  ('QR Generator', 'Generate consignment QR labels', 'http://103.211.171.59:5020/', 'QrCode', 'Tools', 100),
  ('MIS Portal', 'Scorpion Group MIS dashboards', 'https://mis.scorpiongroup.in/', 'LayoutDashboard', 'MIS', 110),
  ('SFM Module', 'Scorpion Fleet Management portal', 'https://sfm.scorpiongroup.in/login', 'Truck', 'Operations', 120),
  ('TNS Module', 'Transport Network System dashboard', 'https://sepltms.scorpiongroup.in/', 'LayoutDashboard', 'Operations', 130);
