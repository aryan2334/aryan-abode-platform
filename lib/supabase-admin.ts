import { createClient } from "@supabase/supabase-js";

// Uses the secret service_role key — server-side only, never exposed to the browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
