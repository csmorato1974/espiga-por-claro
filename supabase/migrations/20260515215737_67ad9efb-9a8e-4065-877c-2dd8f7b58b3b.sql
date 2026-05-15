-- Tabla de eventos de analítica
CREATE TABLE public.analytics_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name text NOT NULL,
  source text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  session_id uuid,
  path text,
  referrer text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  local text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_events_created_at ON public.analytics_events (created_at DESC);
CREATE INDEX idx_analytics_events_event_name ON public.analytics_events (event_name);
CREATE INDEX idx_analytics_events_source ON public.analytics_events (source);
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events (session_id);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede registrar un evento desde la landing
CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Solo usuarios autenticados pueden leer los eventos
CREATE POLICY "Authenticated users can read analytics events"
  ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Vista resumen de conversiones por día / evento / fuente
CREATE OR REPLACE VIEW public.analytics_conversion_summary AS
SELECT
  date_trunc('day', created_at)::date AS day,
  event_name,
  source,
  count(*) AS total_events,
  count(DISTINCT session_id) AS unique_sessions
FROM public.analytics_events
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC;