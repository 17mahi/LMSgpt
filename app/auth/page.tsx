import { Suspense } from "react";
import { AuthForm } from "./auth-form";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="glass-card p-6 text-sm text-white/70">
            Loading…
          </div>
        </div>
      }
    >
      <AuthForm />
    </Suspense>
  );
}

