import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — createClient is deferred until first call so it never
// runs during server-side prerendering where NEXT_PUBLIC_ vars are absent.
let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return client;
}
