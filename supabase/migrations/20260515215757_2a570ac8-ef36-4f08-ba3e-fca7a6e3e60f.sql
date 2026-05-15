DROP VIEW IF EXISTS public.analytics_conversion_summary;

CREATE VIEW public.analytics_conversion_summary
WITH (security_invoker = on) AS
SELECT
  date_trunc('day', created_at)::date AS day,
  event_name,
  source,
  count(*) AS total_events,
  count(DISTINCT session_id) AS unique_sessions
FROM public.analytics_events
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC;