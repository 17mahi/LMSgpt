"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseBrowserClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    // Return a dummy client or handle gracefully
    // Most supabase methods will fail with "fetch" error which we now catch in AuthForm
    return {
      auth: {
        signInWithPassword: async () => ({ error: new Error("Supabase not configured") }),
        signUp: async () => ({ error: new Error("Supabase not configured") }),
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      }
    } as any;
  }
  
  return createBrowserClient(url, key);
};

