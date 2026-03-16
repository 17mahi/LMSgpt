import { createSupabaseServerClient } from "./supabase-server";

export async function getSessionUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session?.user ?? null;
}

