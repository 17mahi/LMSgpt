import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { MOCK_COURSES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select(`
        id, title, description, thumbnail, category, created_at,
        sections (
          id, title, order_number,
          lessons (
            id, title, order_number, youtube_url, duration
          )
        )
      `)
      .eq("id", params.id)
      .single();

    if (error || !data) {
      const mockCourse = MOCK_COURSES.find(c => c.id === params.id);
      if (mockCourse) {
        return NextResponse.json({ course: mockCourse });
      }
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    return NextResponse.json({ course: data });
  } catch (e) {
    const mockCourse = MOCK_COURSES.find(c => c.id === params.id);
    if (mockCourse) {
       return NextResponse.json({ course: mockCourse });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

