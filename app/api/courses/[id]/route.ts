import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      id, title, description, thumbnail, category, created_at,
      sections (
        id, title, order_number,
        lessons (
          id, title, order_number, youtube_url, duration
        )
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ course: data });
}

