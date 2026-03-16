import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, thumbnail, category, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ courses: data });
}

