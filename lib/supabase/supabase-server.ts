import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPERBASE_API_KEY!,
  {
    auth: { persistSession: false },
  },
);
