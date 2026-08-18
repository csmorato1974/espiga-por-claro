
-- 1. Remove permissive anon/authenticated policies on chat tables
DROP POLICY IF EXISTS "Anyone can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anyone can read chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anyone can create a chat session" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can create chat messages" ON public.chat_messages;

REVOKE ALL ON public.chat_sessions FROM anon, authenticated;
REVOKE ALL ON public.chat_messages FROM anon, authenticated;
GRANT ALL ON public.chat_sessions TO service_role;
GRANT ALL ON public.chat_messages TO service_role;

-- 2. Security definer RPCs scoped by the private client_id capability token
CREATE OR REPLACE FUNCTION public.chat_get_or_create_session(p_client_id text)
RETURNS public.chat_sessions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_session public.chat_sessions;
BEGIN
  IF p_client_id IS NULL OR length(p_client_id) < 20 OR length(p_client_id) > 100 THEN
    RAISE EXCEPTION 'invalid client id';
  END IF;

  SELECT * INTO v_session FROM public.chat_sessions WHERE client_id = p_client_id LIMIT 1;
  IF NOT FOUND THEN
    INSERT INTO public.chat_sessions (client_id, state) VALUES (p_client_id, 'menu')
    RETURNING * INTO v_session;
  END IF;
  RETURN v_session;
END;
$$;

CREATE OR REPLACE FUNCTION public.chat_get_messages(p_client_id text)
RETURNS SETOF public.chat_messages
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_session_id uuid;
BEGIN
  IF p_client_id IS NULL OR length(p_client_id) < 20 THEN
    RAISE EXCEPTION 'invalid client id';
  END IF;
  SELECT id INTO v_session_id FROM public.chat_sessions WHERE client_id = p_client_id LIMIT 1;
  IF v_session_id IS NULL THEN
    RETURN;
  END IF;
  RETURN QUERY
    SELECT * FROM public.chat_messages
    WHERE session_id = v_session_id
    ORDER BY created_at ASC;
END;
$$;

CREATE OR REPLACE FUNCTION public.chat_add_message(
  p_client_id text,
  p_role text,
  p_content text,
  p_kind text DEFAULT 'text'
)
RETURNS public.chat_messages
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_session_id uuid;
  v_msg public.chat_messages;
BEGIN
  IF p_client_id IS NULL OR length(p_client_id) < 20 THEN
    RAISE EXCEPTION 'invalid client id';
  END IF;
  IF p_role NOT IN ('bot','user') THEN
    RAISE EXCEPTION 'invalid role';
  END IF;
  IF p_content IS NULL OR length(p_content) = 0 OR length(p_content) > 2000 THEN
    RAISE EXCEPTION 'invalid content';
  END IF;
  IF p_kind IS NULL OR length(p_kind) > 40 THEN
    RAISE EXCEPTION 'invalid kind';
  END IF;

  SELECT id INTO v_session_id FROM public.chat_sessions WHERE client_id = p_client_id LIMIT 1;
  IF v_session_id IS NULL THEN
    RAISE EXCEPTION 'session not found';
  END IF;

  INSERT INTO public.chat_messages (session_id, role, content, kind)
  VALUES (v_session_id, p_role, p_content, p_kind)
  RETURNING * INTO v_msg;
  RETURN v_msg;
END;
$$;

CREATE OR REPLACE FUNCTION public.chat_update_session(
  p_client_id text,
  p_state text,
  p_direccion text DEFAULT NULL,
  p_dni text DEFAULT NULL
)
RETURNS public.chat_sessions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_session public.chat_sessions;
BEGIN
  IF p_client_id IS NULL OR length(p_client_id) < 20 THEN
    RAISE EXCEPTION 'invalid client id';
  END IF;
  IF p_state IS NULL OR length(p_state) > 60 THEN
    RAISE EXCEPTION 'invalid state';
  END IF;
  IF p_direccion IS NOT NULL AND length(p_direccion) > 300 THEN
    RAISE EXCEPTION 'invalid address';
  END IF;
  IF p_dni IS NOT NULL AND p_dni !~ '^[0-9]{8}$' THEN
    RAISE EXCEPTION 'invalid dni';
  END IF;

  UPDATE public.chat_sessions
  SET state = p_state,
      direccion = COALESCE(p_direccion, direccion),
      dni = COALESCE(p_dni, dni),
      updated_at = now()
  WHERE client_id = p_client_id
  RETURNING * INTO v_session;

  IF v_session IS NULL THEN
    RAISE EXCEPTION 'session not found';
  END IF;
  RETURN v_session;
END;
$$;

REVOKE ALL ON FUNCTION public.chat_get_or_create_session(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.chat_get_messages(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.chat_add_message(text, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.chat_update_session(text, text, text, text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.chat_get_or_create_session(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.chat_get_messages(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.chat_add_message(text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.chat_update_session(text, text, text, text) TO anon, authenticated;
