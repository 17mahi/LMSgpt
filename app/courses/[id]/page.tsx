import { createSupabaseServerClient } from "@/lib/supabase-server";
import { MOCK_COURSES } from "@/lib/mock-data";
import { 
  Star, 
  PlayCircle, 
  Check, 
  Globe, 
  Award, 
  Users, 
  Clock, 
  MonitorPlay, 
  FileText, 
  Smartphone,
  ChevronDown,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default async function CoursePage({ params }: { params: { id: string } }) {
  let course = MOCK_COURSES.find(c => c.id === params.id) || MOCK_COURSES[0];
  
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("courses")
      .select("*")
      .eq("id", params.id)
      .single();
    if (data) course = { ...course, ...data };
  } catch (e) {
    console.error("Supabase fetch failed, using mock data");
  }

  const sections = [
    { title: "Course Content", items: ["Introduction", "Setting up Environment", "First Steps", "Deep Dive"] },
    { title: "Requirements", items: ["Basic computer knowledge", "Stable internet connection"] },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 
        ==============================
        HERO BANNER
        ==============================
      */}
      <section className="bg-black/90 text-white py-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-8 relative z-10">
          <div className="md:col-span-2 space-y-6">
             <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Link href="/courses">Development</Link>
                <ChevronDown className="w-4 h-4 -rotate-90" />
                <Link href={`/courses?category=${course.category}`}>{course.category}</Link>
             </div>
             
             <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {course.title}
             </h1>
             
             <p className="text-lg md:text-xl text-white/70 max-w-3xl font-medium">
                {course.description}
             </p>
             
             <div className="flex flex-wrap items-center gap-4 text-sm">
                <Badge className="bg-[#eceb98] text-[#3d3c0a] font-black uppercase rounded-sm h-6">Bestseller</Badge>
                <div className="flex items-center gap-1.5 font-bold">
                   <span className="text-amber-400">{course.rating}</span>
                   <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= Math.round(course.rating || 0) ? "fill-amber-400" : ""}`} />)}
                   </div>
                   <span className="text-primary underline">(54,012 ratings)</span>
                </div>
                <span className="text-white/80 font-medium">152,402 students</span>
             </div>
             
             <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-white/40" /> Created by <span className="text-primary underline">{course.instructor}</span></div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-white/40" /> Last updated 10/2024</div>
                <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-white/40" /> English [Auto]</div>
             </div>
          </div>
          
          {/* Floating Purchase Card */}
          <div className="md:col-span-1">
             <div className="glass-card shadow-glass-elevated border-white/10 overflow-hidden sticky top-24">
                <div className="relative aspect-video group cursor-pointer">
                   <Image 
                      src={course.thumbnail || ""} 
                      alt={course.title} 
                      fill 
                      className="object-cover"
                   />
                   <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <PlayCircle className="w-16 h-16 text-white" />
                      <span className="font-bold text-white uppercase tracking-widest text-sm">Preview this course</span>
                   </div>
                </div>
                <div className="p-6 space-y-6">
                   <div className="flex items-center gap-3">
                      <span className="text-3xl font-black tracking-tighter">${course.price}</span>
                      <span className="text-white/40 line-through text-lg">$94.99</span>
                      <span className="text-white/60 text-sm">84% off</span>
                   </div>
                   <div className="flex flex-col gap-2">
                       {/* Mock Enrollment Check */}
                       {course.id === "python-masterclass" ? (
                          <Link href={`/courses/${course.id}/learn`}>
                             <Button className="w-full h-12 bg-primary text-white hover:bg-primary/90 font-black rounded-none shadow-glow transition-all flex gap-2">
                                <PlayCircle className="w-5 h-5" />
                                Go to Course
                             </Button>
                          </Link>
                       ) : (
                          <>
                             <Link href="/cart">
                                <Button className="w-full h-12 bg-white text-black hover:bg-white/90 font-black rounded-none shadow-glow transition-all">Add to cart</Button>
                             </Link>
                             <Link href="/checkout">
                                <Button variant="outline" className="w-full h-12 border-white/20 bg-transparent hover:bg-white/10 font-bold rounded-none">Buy now</Button>
                             </Link>
                          </>
                       )}
                    </div>
                   <p className="text-[10px] text-center text-white/40 font-medium">30-Day Money-Back Guarantee</p>
                   
                   <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60">This course includes:</p>
                      <ul className="text-xs space-y-2.5 text-white/80 font-medium">
                         <li className="flex items-center gap-3"><MonitorPlay className="w-4 h-4 text-white/40" /> 18.5 hours on-demand video</li>
                         <li className="flex items-center gap-3"><FileText className="w-4 h-4 text-white/40" /> 24 articles & 15 resources</li>
                         <li className="flex items-center gap-3"><Users className="w-4 h-4 text-white/40" /> Full lifetime access</li>
                         <li className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-white/40" /> Access on mobile and TV</li>
                         <li className="flex items-center gap-3"><Award className="w-4 h-4 text-white/40" /> Certificate of completion</li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-[1400px] mx-auto px-4 md:px-6 w-full grid md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-12">
            {/* What you'll learn */}
            <div className="border border-white/10 p-8 glass-panel rounded-xl space-y-6">
               <h2 className="text-2xl font-bold">What you&apos;ll learn</h2>
               <div className="grid sm:grid-cols-2 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                     <div key={i} className="flex gap-3 text-sm font-medium text-white/80">
                        <Check className="w-4 h-4 text-white/40 shrink-0" />
                        <span>Master core concepts and advanced patterns used in {course.category}.</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Course Content */}
            <div className="space-y-6">
               <h2 className="text-2xl font-bold">Course Content</h2>
               <div className="border border-white/10 divide-y divide-white/10 rounded-lg overflow-hidden glass-panel">
                  {sections.map((s, i) => (
                     <div key={i} className="p-4 bg-white/5 flex items-center justify-between font-bold text-sm cursor-pointer hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                           <ChevronDown className="w-4 h-4" />
                           {s.title}
                        </div>
                        <span className="text-white/40 font-medium">{s.items.length} lectures • 45m</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
               <h2 className="text-2xl font-bold">Description</h2>
               <div className="text-sm leading-relaxed text-white/70 space-y-4 font-medium">
                  <p>In this comprehensive course, you will dive deep into the world of {course.title}. Starting from the absolute basics, we will build our way up to complex real-world projects.</p>
                  <p>Whether you are a beginner looking to start a new career or an experienced professional wanting to brush up on the latest trends, this course has something for everyone.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
