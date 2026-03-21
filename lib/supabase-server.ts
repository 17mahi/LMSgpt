import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const createSupabaseServerClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        getUser: async () => ({ data: { user: null } }),
      },
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
          limit: () => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
          single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        }),
      }),
    } as any;
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        try {
          return cookies().getAll();
        } catch (e) {
          return [];
        }
      },
      setAll(cookiesToSet) {
        try {
          const cookieStore = cookies();
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch (e) {
          // Ignore cookie set errors during static build
        }
      }
    }
  });
};

