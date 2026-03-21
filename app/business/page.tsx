import { Briefcase, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BusinessPage() {
  return (
    <div className="min-h-screen">
      <section className="py-24 bg-black/90 relative overflow-hidden text-center border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
             <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">KodLearn <span className="text-primary">for Business</span></h1>
          <p className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto">
             Empower your team with access to over 25,000 top courses. Anytime, anywhere.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
             <Link href="/auth?mode=signup">
                <Button className="h-16 px-10 bg-white text-black hover:bg-white/90 font-black text-xl rounded-2xl shadow-glow">Get Started</Button>
             </Link>
             <Button variant="outline" className="h-16 px-10 border-white/10 hover:bg-white/5 font-black text-xl rounded-2xl">Contact Sales</Button>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-6">
         <div className="grid md:grid-cols-3 gap-12">
            {[1,2,3].map(i => (
               <div key={i} className="glass-card p-10 space-y-6 border-white/5 hover:border-primary/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                     <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black">Upskill your entire workforce</h3>
                  <p className="text-white/50 font-medium leading-relaxed">
                  KodLearn for Business is a subscription-based platform that offers the best courses for companies of all sizes.
                  </p>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
