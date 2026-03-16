import Link from "next/link";
import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";
import { CourseGrid } from "@/components/course/course-grid";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const revalidate = 60;

export default async function LandingPage() {
  const supabase = createSupabaseServerClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, description, thumbnail, category")
    .limit(6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-20">
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            Premium learning.{" "}
            <span className="text-indigo-400">Zero friction.</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl">
            LumiLearn is a cloud-native LMS that turns YouTube into a structured
            curriculum with progress tracking, dashboards, and beautiful UX.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/courses">
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white shadow-glow hover:opacity-95 active:scale-[0.99] transition">
                <PlayCircle className="h-4 w-4" />
                Browse premium courses
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:bg-white/10">
                Continue learning
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Deployed on Vercel, backed by Supabase
            </div>
          </div>
        </div>

        <div className="glass-card relative overflow-hidden p-6 flex flex-col justify-between min-h-[260px]">
          <div className="absolute inset-0 bg-gradient-radial opacity-60 pointer-events-none" />
          <div className="relative space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              LIVE PROGRESS
            </p>
            <p className="text-lg font-medium">JavaScript Mastery Path</p>
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400" />
            </div>
            <p className="text-xs text-white/60 mt-1">
              72% complete • 18 / 25 lessons
            </p>
          </div>
        </div>
      </section>

      <section id="featured" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Featured courses
          </h2>
          <Link
            href="/courses"
            className="text-sm text-indigo-300 hover:text-indigo-200"
          >
            View all
          </Link>
        </div>
        <CourseGrid courses={courses ?? []} />
      </section>
    </div>
  );
}

