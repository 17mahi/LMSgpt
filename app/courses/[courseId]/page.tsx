import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSessionUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: { courseId: string };
};

type LessonRow = {
  id: string;
  title: string;
  order_number: number;
  duration: number | null;
};

type SectionRow = {
  id: string;
  title: string;
  order_number: number;
  lessons: LessonRow[] | null;
};

export default async function CourseDetailPage({ params }: Props) {
  const supabase = createSupabaseServerClient();
  const user = await getSessionUser();

  const { data: course } = await supabase
    .from("courses")
    .select(
      `
      id, title, description, thumbnail, category,
      sections (
        id, title, order_number,
        lessons (
          id, title, order_number, duration
        )
      )
    `
    )
    .eq("id", params.courseId)
    .single();

  if (!course) return notFound();

  const sections = ([...(course.sections ?? [])] as unknown as SectionRow[]).sort(
    (a, b) => a.order_number - b.order_number
  );

  const totalLessons = sections.reduce(
    (acc: number, s) => acc + (s.lessons?.length ?? 0),
    0
  );

  async function handleEnroll() {
    "use server";
    if (!user) {
      redirect("/auth?redirect=/courses/" + params.courseId);
    }
    const supa = createSupabaseServerClient();
    await supa.from("enrollments").upsert({
      user_id: user!.id,
      course_id: params.courseId
    });
    redirect(`/courses/${params.courseId}/learn`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <div className="grid gap-10 md:grid-cols-[1.4fr_0.9fr] items-start">
        <div className="space-y-4">
          <div className="glass-card p-5 md:p-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-indigo-200/80">
              <span className="inline-flex h-6 items-center rounded-full bg-indigo-500/20 px-3">
                {course.category || "Premium course"}
              </span>
              <span className="text-white/60">YouTube powered</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {course.title}
            </h1>
            <p className="text-sm text-white/70 leading-relaxed">
              {course.description}
            </p>
            <div className="text-xs text-white/55 flex flex-wrap gap-4 pt-2">
              <span>{totalLessons} lessons</span>
              <span>Self-paced • Lifetime access</span>
            </div>
          </div>

          <div className="glass-card p-5 space-y-3">
            <h2 className="text-sm font-medium flex items-center justify-between">
              Curriculum
              <span className="text-[0.7rem] text-white/60">
                Organized by sections & lessons
              </span>
            </h2>
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 text-sm">
              {sections.map((section) => (
                <div key={section.id} className="space-y-1.5">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                    {section.title}
                  </p>
                  <ul className="space-y-1.5">
                    {section.lessons
                      ?.sort(
                        (a, b) => a.order_number - b.order_number
                      )
                      .map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between text-xs text-white/70"
                        >
                          <span>{lesson.title}</span>
                          {lesson.duration && (
                            <span className="text-white/45">
                              ~{Math.round(lesson.duration / 60)} min
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-5 space-y-4">
          {course.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-40 w-full rounded-xl object-cover"
            />
          ) : (
            <div className="h-40 w-full rounded-xl bg-gradient-glass" />
          )}

          <form action={handleEnroll} className="space-y-3">
            <Button className="w-full text-sm py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-glow">
              Enroll & start learning
            </Button>
            {!user && (
              <p className="text-[0.7rem] text-white/60 text-center">
                You&apos;ll be asked to sign in with Supabase Auth.
              </p>
            )}
          </form>

          <div className="border-t border-white/10 pt-3 text-xs text-white/60">
            <p>Already enrolled?</p>
            <Link
              href={`/courses/${course.id}/learn`}
              className="text-indigo-200 hover:text-indigo-100"
            >
              Continue where you left off →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

