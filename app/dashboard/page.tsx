import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";

type EnrollmentRow = {
  course_id: string;
  courses: { title: string } | { title: string }[] | null;
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/auth?redirect=/dashboard");
  }
  const supabase = createSupabaseServerClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id, courses (title)")
    .eq("user_id", user.id);

  const { data: progressRows } = await supabase
    .from("progress")
    .select("course_id, status")
    .eq("user_id", user.id);

  const normalizedEnrollments = ((enrollments ?? []) as unknown as EnrollmentRow[]).map(
    (e) => ({
      course_id: e.course_id,
      courses: Array.isArray(e.courses) ? e.courses[0] ?? null : e.courses ?? null
    })
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">My learning</h1>
      <AnalyticsChart
        enrollments={normalizedEnrollments}
        progressRows={progressRows ?? []}
      />
    </div>
  );
}

