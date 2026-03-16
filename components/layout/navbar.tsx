"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlayCircle, LayoutDashboard, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <motion.header
      className="sticky top-0 z-40"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="glass-card flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 flex items-center justify-center shadow-glow">
              <PlayCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">LumiLearn</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="/courses" className="hover:text-white transition">
              Courses
            </Link>
            <Link href="/#categories" className="hover:text-white transition">
              Categories
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={isDashboard ? "/courses" : "/dashboard"}>
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                {isDashboard ? "Browse Courses" : "My Dashboard"}
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border border-white/20 shadow-glow">
                <Sparkles className="mr-2 h-4 w-4" />
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

