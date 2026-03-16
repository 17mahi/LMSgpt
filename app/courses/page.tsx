import { createSupabaseServerClient } from "@/lib/supabase-server";
import { CourseGrid } from "@/components/course/course-grid";

export const revalidate = 30;

export default async function CoursesPage() {
  const supabase = createSupabaseServerClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, description, thumbnail, category")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Browse courses
        </h1>
        <p className="mt-2 text-sm text-white/65">
          Curated playlists of YouTube content turned into structured learning
          paths.
        </p>
      </div>
      <CourseGrid courses={courses ?? []} />
    </div>
  );
}

