import { createSupabaseServerClient } from "@/lib/supabase-server";
import { CourseGrid } from "@/components/course/course-grid";
import { Filter, ChevronDown, Star, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES } from "@/lib/mock-data";

export const revalidate = 30;

export default async function CoursesPage() {
  let courses = [];
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("courses")
      .select("id, title, description, thumbnail, category")
      .order("created_at", { ascending: false });
    courses = data || [];
  } catch (e) {
    console.error("Supabase failed, using mock data");
    courses = MOCK_COURSES;
  }
  
  if (!courses || courses.length === 0) {
    courses = MOCK_COURSES;
  }

  // Mock filters for Udemy style
  const ratings = [4.5, 4.0, 3.5, 3.0];
  const videoDurations = ["0-1 Hour", "1-3 Hours", "3-6 Hours", "6-17 Hours", "17+ Hours"];
  const topics = ["Python", "Web Development", "Data Science", "React", "Next.js", "Design"];
  const levels = ["All Levels", "Beginner", "Intermediate", "Expert"];

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-10 space-y-6">
      
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
          Explore Courses
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-white/70 bg-white/5 p-4 rounded-xl glass-panel">
          <Button variant="ghost" className="gap-2 font-bold hover:bg-white/10">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="flex-1 flex justify-center sm:justify-end items-center gap-6">
            <span className="text-sm font-bold tracking-tight">{courses?.length || 0} results</span>
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
               <button className="p-2 bg-white/10 rounded-md text-white"><LayoutGrid className="w-4 h-4" /></button>
               <button className="p-2 hover:bg-white/5 rounded-md text-white/40"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
        
        {/* Left Sidebar Filters (Visible on desktop) */}
        <div className="hidden md:flex flex-col w-64 shrink-0 space-y-4 sticky top-24">
          
          {/* Rating Filter */}
          <div className="border-t border-white/10 py-4">
            <button className="flex items-center justify-between w-full text-lg font-bold">
              Ratings
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className="mt-4 space-y-2">
              {ratings.map(rating => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 bg-black/20 group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <div className="flex items-center text-amber-400 gap-1">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className={`w-3.5 h-3.5 ${star <= rating ? "fill-amber-400" : "fill-transparent border-amber-400 text-amber-400"}`} />
                    ))}
                    <span className="text-white/80 text-sm ml-1">{rating} & up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Video Duration Filter */}
          <div className="border-t border-white/10 py-4">
            <button className="flex items-center justify-between w-full text-lg font-bold">
              Video Duration
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className="mt-4 space-y-2">
              {videoDurations.map(duration => (
                <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 bg-black/20 group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <span className="text-white/80 text-sm">{duration}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div className="border-t border-white/10 py-4">
            <button className="flex items-center justify-between w-full text-lg font-bold">
              Topic
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className="mt-4 space-y-2">
              {topics.map(topic => (
                <label key={topic} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 bg-black/20 group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <span className="text-white/80 text-sm">{topic}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="border-t border-white/10 py-4">
            <button className="flex items-center justify-between w-full text-lg font-bold">
              Level
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className="mt-4 space-y-2">
              {levels.map(lvl => (
                <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 bg-black/20 group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <span className="text-white/80 text-sm">{lvl}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Course Grid Area */}
        <div className="flex-1 w-full min-h-[500px]">
          {/* We reuse CourseGrid, but in a real Udemy clone, this can be toggled to a list view */}
          <CourseGrid courses={courses ?? []} />
        </div>
      </div>
    </div>
  );
}
