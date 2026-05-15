-- Chat sessions and messages for WhatsApp-style chatbot
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL DEFAULT 'menu',
  direccion TEXT,
  dni TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('bot','user')),
  content TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'text',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_chat_messages_session ON public.chat_messages(session_id, created_at);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Public access (anonymous chatbot, no auth). Matches existing 'leads' table pattern.
CREATE POLICY "Anyone can create a chat session" ON public.chat_sessions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read chat sessions" ON public.chat_sessions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update chat sessions" ON public.chat_sessions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can create chat messages" ON public.chat_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read chat messages" ON public.chat_messages FOR SELECT TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_chat_sessions_updated
BEFORE UPDATE ON public.chat_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();