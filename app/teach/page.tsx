import { Users, BookOpen, DollarSign, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TeachPage() {
  return (
    <div className="min-h-screen">
      <section className="py-24 bg-gradient-to-b from-black to-[#050505] relative overflow-hidden border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">Come Teach <span className="text-primary text-gradient">With Us</span></h1>
              <p className="text-xl md:text-2xl text-white/50 font-medium max-w-xl">
                 Become an instructor and change lives — including your own. Share your knowledge with students worldwide.
              </p>
              <Link href="/auth?mode=signup">
                 <Button className="h-16 px-12 bg-white text-black hover:bg-white/90 font-black text-xl rounded-2xl shadow-glow">Get Started Today</Button>
              </Link>
           </div>
           <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full" />
              <div className="glass-card p-12 aspect-[4/3] flex items-center justify-center border-white/10 shadow-glass-elevated relative z-10 overflow-hidden">
                 <div className="grid grid-cols-2 gap-8 w-full">
                    {[
                       { label: "Students", value: "50M+", icon: Users },
                       { label: "Earnings", value: "$400M+", icon: DollarSign },
                       { label: "Countries", value: "190+", icon: Award },
                       { label: "Enrollments", value: "1B+", icon: BookOpen },
                    ].map((stat, i) => (
                       <div key={i} className="text-center space-y-2 group p-6 rounded-2xl hover:bg-white/5 transition-all">
                          <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                          <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                          <p className="text-xs font-black uppercase tracking-widest text-white/30">{stat.label}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 text-center space-y-12">
         <h2 className="text-4xl font-black tracking-tight">So many reasons to start</h2>
         <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4">
               <h3 className="text-xl font-bold">Teach your way</h3>
               <p className="text-sm text-white/40 font-medium leading-relaxed">Publish the course you want, in the way you want, and always have control of your own content.</p>
            </div>
            <div className="space-y-4">
               <h3 className="text-xl font-bold">Inspire learners</h3>
               <p className="text-sm text-white/40 font-medium leading-relaxed">Teach what you know and help learners explore their interests, gain new skills, and advance their careers.</p>
            </div>
            <div className="space-y-4">
               <h3 className="text-xl font-bold">Get rewarded</h3>
               <p className="text-sm text-white/40 font-medium leading-relaxed">Expand your professional network, build your expertise, and earn money on each paid enrollment.</p>
            </div>
         </div>
      </section>
    </div>
  );
}
