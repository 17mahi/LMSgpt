import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

type EnrollmentRow = {
  course_id: string;
  courses: { title: string } | { title: string }[] | null;
};

export default async function DashboardPage() {
  let user = null;
  let enrollments: any[] = [];
  let progressRows: any[] = [];

  try {
    user = await getSessionUser();
    if (user) {
      const supabase = createSupabaseServerClient();
      const { data: enrollData } = await supabase
        .from("enrollments")
        .select("course_id, courses (title)")
        .eq("user_id", user.id);
      enrollments = enrollData || [];

      const { data: progData } = await supabase
        .from("progress")
        .select("course_id, status")
        .eq("user_id", user.id);
      progressRows = progData || [];
    }
  } catch (e) {
    console.error("Dashboard data fetch failed");
  }

  // Fallback if no user or fetch fails
  if (!user) {
    user = { id: "mock-user", email: "learner@kodlearn.com", user_metadata: { full_name: "Premium Learner" } };
    enrollments = [{ course_id: "python-masterclass", courses: { title: "The Complete Python Bootcamp" } }];
    progressRows = [{ course_id: "python-masterclass", status: "completed" }];
  }

  const normalizedEnrollments = ((enrollments ?? []) as unknown as EnrollmentRow[]).map(
    (e) => ({
      course_id: e.course_id,
      courses: Array.isArray(e.courses) ? e.courses[0] ?? null : e.courses ?? null
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">My Learning</h1>
        <p className="text-white/60 font-medium">Welcome back, <span className="text-primary">{(user as any).user_metadata?.full_name || "Student"}</span>! Track your progress and jump back into your courses.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-glass-elevated">
               <h2 className="text-xl font-bold mb-6">Learning Activity</h2>
               <AnalyticsChart
                 enrollments={normalizedEnrollments}
                 progressRows={progressRows}
               />
            </div>

            <div className="space-y-6">
               <h2 className="text-xl font-bold">My Courses</h2>
               <div className="grid sm:grid-cols-2 gap-4">
                  {normalizedEnrollments.map((e) => (
                     <Link key={e.course_id} href={`/courses/${e.course_id}/learn`}>
                        <div className="glass-card p-5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer flex gap-4 items-center font-bold">
                           <div className="w-16 h-10 bg-white/5 rounded relative overflow-hidden shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">{e.courses?.title || "Course"}</p>
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Status: In Progress</p>
                           </div>
                           <PlayCircle className="w-6 h-6 text-white/20 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
        
        <div className="lg:col-span-1 space-y-6">
           <div className="glass-card p-6 border border-white/10">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Courses</p>
                    <p className="text-2xl font-black">{normalizedEnrollments.length}</p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Completed</p>
                    <p className="text-2xl font-black">{progressRows.filter((p: any) => p.status === "completed").length}</p>
                 </div>
              </div>
           </div>
           
           <div className="glass-card p-6 border border-primary/20 bg-primary/5">
              <h3 className="font-bold text-lg mb-2 text-primary text-gradient">KodLearn Plus Progress</h3>
              <p className="text-sm text-white/70 font-medium leading-relaxed">
                 You&apos;re doing great! Complete 2 more lessons this week to stay on track for your certification.
              </p>
              <Link href="/courses/python-masterclass/learn">
                 <Button className="w-full mt-4 bg-white text-black hover:bg-white/90 font-bold">Resume Learning</Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
