import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSessionUser } from "@/lib/auth";
import { LessonPlayer } from "@/components/course/lesson-player";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { CourseProgress } from "@/components/course/course-progress";

type Lesson = {
  id: string;
  title: string;
  order_number: number;
  youtube_url: string;
};

type SectionRow = {
  id: string;
  title: string;
  order_number: number;
  lessons: Lesson[] | null;
};

type ProgressRow = {
  lesson_id: string;
  status: "completed" | "in_progress";
};

type Props = {
  params: { id: string };
  searchParams: { lessonId?: string };
};

export default async function LearnPage({ params, searchParams }: Props) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/auth?redirect=/courses/" + params.id + "/learn");
  }

  const supabase = createSupabaseServerClient();

  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", params.id)
    .maybeSingle();

  if (!enrollment) {
    redirect(`/courses/${params.id}`);
  }

  const { data: sectionsRaw } = await supabase
    .from("sections")
    .select(
      `
      id, title, order_number,
      lessons (
        id, title, order_number, youtube_url
      )
    `
    )
    .eq("course_id", params.id);

  const sections = ((sectionsRaw ?? []) as unknown as SectionRow[])
    .map((s) => ({
      ...s,
      lessons: [...(s.lessons ?? [])].sort((a, b) => a.order_number - b.order_number)
    }))
    .sort((a, b) => a.order_number - b.order_number);

  const flatLessons = sections.flatMap((s) => s.lessons);
  if (flatLessons.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="glass-card p-6 text-sm text-white/70">
          No lessons yet in this course.
        </div>
      </div>
    );
  }

  const { data: progressRows } = await supabase
    .from("progress")
    .select("lesson_id, status")
    .eq("user_id", user.id)
    .eq("course_id", params.id);

  const progressMap = new Map(
    ((progressRows ?? []) as unknown as ProgressRow[]).map((p) => [
      p.lesson_id,
      p.status
    ])
  );

  const completedLessons = flatLessons.filter(
    (l) => progressMap.get(l.id) === "completed"
  ).length;

  let activeLesson = flatLessons[0];
  if (searchParams.lessonId) {
    const found = flatLessons.find((l) => l.id === searchParams.lessonId);
    if (found) activeLesson = found;
  } else {
    const inProgress = flatLessons.find(
      (l) => progressMap.get(l.id) === "in_progress"
    );
    const completedLatest = [...flatLessons]
      .reverse()
      .find((l) => progressMap.get(l.id) === "completed");
    activeLesson = inProgress ?? completedLatest ?? activeLesson;
  }

  const totalLessons = flatLessons.length;

  const sidebarSections = sections.map((s) => ({
    id: s.id,
    title: s.title,
    lessons: s.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      status: (progressMap.get(l.id) as "completed" | "in_progress" | null) ?? null
    }))
  }));

  const nextLesson =
    flatLessons[flatLessons.findIndex((l) => l.id === activeLesson.id) + 1] ??
    null;
  const prevLesson =
    flatLessons[flatLessons.findIndex((l) => l.id === activeLesson.id) - 1] ??
    null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 h-[calc(100vh-4rem)] flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)] flex-1">
        <div className="flex flex-col gap-4">
          <LessonPlayer youtubeUrl={activeLesson.youtube_url} />
          <div className="glass-card flex items-center justify-between px-4 py-3 text-xs">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/55">
                Now playing
              </p>
              <p className="text-sm font-medium text-white">
                {activeLesson.title}
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                const supa = createSupabaseServerClient();
                await supa.from("progress").upsert(
                  {
                    user_id: user.id,
                    course_id: params.id,
                    lesson_id: activeLesson.id,
                    status: "completed"
                  },
                  { onConflict: "user_id,lesson_id" }
                );
                if (nextLesson) {
                  redirect(
                    `/courses/${params.id}/learn?lessonId=${nextLesson.id}`
                  );
                } else {
                  redirect(`/courses/${params.id}/learn`);
                }
              }}
            >
              <button className="rounded-full bg-indigo-500/80 px-4 py-2 text-xs font-medium text-white shadow-glow hover:bg-indigo-500">
                Mark complete & next
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <CourseProgress
            completedLessons={completedLessons}
            totalLessons={totalLessons}
          />
          <CourseSidebar
            sections={sidebarSections}
            activeLessonId={activeLesson.id}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex gap-2">
          {prevLesson && (
            <a
              href={`/courses/${params.id}/learn?lessonId=${prevLesson.id}`}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-white/80 hover:bg-white/10"
            >
              ← Previous lesson
            </a>
          )}
        </div>
        <div className="flex gap-2">
          {nextLesson && (
            <a
              href={`/courses/${params.id}/learn?lessonId=${nextLesson.id}`}
              className="rounded-full bg-indigo-500/80 px-4 py-1.5 text-white shadow-glow hover:bg-indigo-500"
            >
              Next lesson →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
