import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const ProgressBody = z.object({
  courseId: z.string().uuid(),
  lessonId: z.string().uuid(),
  status: z.enum(["completed", "in_progress"])
});

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json();
  const parsed = ProgressBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { courseId, lessonId, status } = parsed.data;
  const { error } = await supabase.from("progress").upsert(
    {
      user_id: session.user.id,
      course_id: courseId,
      lesson_id: lessonId,
      status
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

