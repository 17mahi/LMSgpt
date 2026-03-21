import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type Params = { params: { id: string } };

type Lesson = {
  id: string;
  title: string;
  order_number: number;
  youtube_url: string;
  duration: number | null;
};

type SectionRow = {
  id: string;
  title: string;
  order_number: number;
  lessons: Lesson[] | null;
};

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: Params) {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("sections")
      .select(`
        id, title, order_number,
        lessons (
          id, title, order_number, youtube_url, duration
        )
      `)
      .eq("course_id", params.id);

    if (error || !data || data.length === 0) {
      // For demo, we'll return empty or some dummy sections if needed
      // But usually the client handles empty data gracefully
      return NextResponse.json({ sections: [] });
    }

    const sections = ((data ?? []) as unknown as SectionRow[])
      .map((s) => ({
        ...s,
        lessons: [...(s.lessons ?? [])].sort((a, b) => a.order_number - b.order_number)
      }))
      .sort((a, b) => a.order_number - b.order_number);

    return NextResponse.json({ sections });
  } catch (e) {
    return NextResponse.json({ sections: [] });
  }
}

