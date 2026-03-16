import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const createSupabaseServerClient = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll();
        },
        setAll(cookiesToSet) {
          const cookieStore = cookies();
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        }
      }
    }
  );

