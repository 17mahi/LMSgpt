"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const search = useSearchParams();
  const redirectTo = search.get("redirect") || "/dashboard";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();

    const authFn =
      mode === "signin"
        ? supabase.auth.signInWithPassword
        : supabase.auth.signUp;

    const { error } = await authFn({ email, password });
    setPending(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(redirectTo);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-md p-6 space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-xs text-white/65">
            Sign in to access your dashboard and continue learning.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3 text-sm">
          <div className="space-y-1">
            <label className="text-xs text-white/70">Email</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/20 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-white/70">Password</label>
            <Input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/20 text-sm"
            />
          </div>
          {error && (
            <p className="text-xs text-red-300 bg-red-500/20 rounded-md px-2 py-1">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-sm shadow-glow"
          >
            {pending
              ? "Please wait..."
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-[0.7rem] text-white/60"
        >
          {mode === "signin"
            ? "New to LumiLearn? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

