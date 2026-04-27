-- Plan enum for interés
CREATE TYPE public.plan_interes AS ENUM ('entrada', 'intensivo', 'completo', 'no_seguro');

CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  celular TEXT NOT NULL,
  distrito TEXT NOT NULL,
  plan_interes public.plan_interes NOT NULL DEFAULT 'no_seguro',
  origen TEXT NOT NULL DEFAULT 'QR Display La Espiga',
  campania TEXT NOT NULL DEFAULT 'La Espiga x Claro',
  estado TEXT NOT NULL DEFAULT 'Nuevo lead',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  local TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public can insert leads (landing pública)
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (future admins) can read/update/delete
CREATE POLICY "Authenticated users can view leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete leads"
  ON public.leads
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_plan ON public.leads (plan_interes);