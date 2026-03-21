import Link from "next/link";
import Image from "next/image";
import { CourseGrid } from "@/components/course/course-grid";
import { CategoryTabs } from "@/components/home/category-tabs";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { MOCK_COURSES, MOCK_CATEGORIES } from "@/lib/mock-data";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  Check, 
  Star, 
  MonitorPlay, 
  Code, 
  Palette, 
  Briefcase, 
  Camera, 
  Music,
  TrendingUp,
  Globe,
  Users,
  Award,
  Zap
} from "lucide-react";

export const revalidate = 60;

// Mock categories for the "Top Categories" section
const TOP_CATEGORIES = [
  { name: "Development", icon: <Code className="w-8 h-8" />, count: "3.2M learners" },
  { name: "Business", icon: <Briefcase className="w-8 h-8" />, count: "1.8M learners" },
  { name: "IT & Software", icon: <MonitorPlay className="w-8 h-8" />, count: "2.1M learners" },
  { name: "Design", icon: <Palette className="w-8 h-8" />, count: "1.4M learners" },
  { name: "Photography", icon: <Camera className="w-8 h-8" />, count: "800k learners" },
  { name: "Audio & Music", icon: <Music className="w-8 h-8" />, count: "650k learners" },
];

export default async function LandingPage() {
  let courses = [];
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("courses")
      .select("id, title, description, thumbnail, category")
      .limit(8);
    courses = data || [];
  } catch (e) {
    console.error("Supabase failed, falling back to mock data");
    courses = MOCK_COURSES;
  }
  
  // If data is empty, use mock data
  if (!courses || courses.length === 0) {
    courses = MOCK_COURSES;
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 
        ==============================
        HERO SECTION (Udemy Style Banner)
        ==============================
      */}
      <section className="relative w-full h-[600px] flex items-center overflow-hidden">
        {/* Abstract Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-black to-[#0a0f25] z-0">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay blur-[2px]">
            <Image
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
              alt="Background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] -translate-y-1/2" />
        </div>

        {/* Floating Content Card */}
        <div className="container relative z-10 px-4 md:px-6 max-w-[1400px] mx-auto">
          <div className="glass-card max-w-xl p-8 md:p-10 space-y-6 shadow-glow border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Learning that gets you <span className="text-gradient">closer to your goals</span>.
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium">
              Start, switch, or advance your career with more than 210,000 premium video courses streamed natively.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/courses">
                <button className="h-12 px-8 font-bold text-white bg-gradient-premium rounded-full hover:shadow-glow-strong transition-all active:scale-95 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 font-bold" />
                  Explore Courses
                </button>
              </Link>
              <Link href="/auth?mode=signup">
                <button className="h-12 px-8 font-bold text-foreground bg-white/10 border border-white/20 rounded-full hover:bg-white/20 backdrop-blur-md transition-all active:scale-95">
                  Sign Up For Free
                </button>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10 text-xs text-white/60 font-medium">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Premium Creators</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Real-time Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ==============================
        BROAD SELECTION / TABBED COURSES
        ==============================
      */}
      <section className="py-16 md:py-24 max-w-[1400px] mx-auto px-4 md:px-6 space-y-8 w-full">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A broad selection of courses
          </h2>
          <p className="text-lg text-white/70">
            Choose from 210,000 online video courses with new additions published every month.
          </p>
        </div>

        <CategoryTabs 
          categories={["Python", "Web Development", "Excel", "JavaScript", "Data Science", "AWS Certification"]} 
          allCourses={MOCK_COURSES} 
        />
      </section>

      {/* 
        ==============================
        TOP CATEGORIES (Udemy Style)
        ==============================
      */}
      <section className="py-16 bg-black/40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute pointer-events-none left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full space-y-10 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {MOCK_CATEGORIES.map((cat) => (
              <Link key={cat.name} href={`/courses?category=${cat.name}`}>
                <div className="glass-card hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center justify-center gap-4 text-center h-48 group cursor-pointer border border-white/5 hover:border-primary/50 hover:bg-white/5">
                  <div className="p-4 rounded-full bg-white/5 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                    {(() => {
                      const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.Code;
                      return <Icon className="w-8 h-8" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-xs text-white/50 mt-1 font-medium italic">{cat.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==============================
        TRUST BAR (Fortune 500)
        ==============================
      */}
      <section className="py-12 border-b border-white/5 bg-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 text-center space-y-8">
          <p className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">Trusted by over 15,000 companies and millions of learners worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple text logos for demo realism */}
             <span className="text-2xl font-black italic tracking-tighter">VOLKSWAGEN</span>
             <span className="text-2xl font-bold tracking-widest uppercase">Samsung</span>
             <span className="text-2xl font-serif font-black">Cisco</span>
             <span className="text-2xl font-mono font-bold">AT&T</span>
             <span className="text-2xl font-black italic">PROCTER&GAMBLE</span>
             <span className="text-2xl font-bold uppercase tracking-tight">Hewlett Packard</span>
          </div>
        </div>
      </section>

      {/* 
        ==============================
        STUDENTS ARE VIEWING (Carousel Replacement)
        ==============================
      */}
      <section className="py-16 md:py-24 max-w-[1400px] mx-auto px-4 md:px-6 space-y-8 w-full">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Students are viewing
        </h2>
        <CourseGrid courses={courses ?? []} />
      </section>

    </div>
  );
}
