import { createClient } from "@supabase/supabase-js";

// Client-side Supabase instance for Realtime subscriptions.
// Uses NEXT_PUBLIC_ vars so they are available in the browser.
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
