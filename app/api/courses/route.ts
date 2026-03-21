import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { MOCK_COURSES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, description, thumbnail, category, created_at")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Supabase failed or empty, using mock data for /api/courses");
      return NextResponse.json({ courses: MOCK_COURSES });
    }
    
    return NextResponse.json({ courses: data });
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ courses: MOCK_COURSES });
  }
}

