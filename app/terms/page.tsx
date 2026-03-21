import { Scale, ShieldCheck, Mail, Info } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 space-y-12 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
      
      <div className="space-y-4 text-center">
         <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Scale className="w-8 h-8 text-primary" />
         </div>
         <h1 className="text-4xl md:text-6xl font-black tracking-tight">Terms of Use</h1>
         <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Last Updated: March 21, 2026</p>
      </div>

      <div className="glass-panel p-10 md:p-16 rounded-3xl border border-white/10 space-y-10 relative z-10 leading-relaxed shadow-glass-elevated">
         <section className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
               <Info className="w-6 h-6 text-primary" /> 
               1. Acceptance of Terms
            </h2>
            <p className="text-white/70 font-medium">
               By accessing and using KodLearn, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
         </section>

         <section className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
               <ShieldCheck className="w-6 h-6 text-primary" /> 
               2. Use License
            </h2>
            <p className="text-white/70 font-medium">
               Permission is granted to temporarily download one copy of the materials (information or software) on KodLearn&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
               <li>Modify or copy the materials;</li>
               <li>Use the materials for any commercial purpose;</li>
               <li>Attempt to decompile or reverse engineer any software;</li>
               <li>Remove any copyright or other proprietary notations.</li>
            </ul>
         </section>

         <section className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
               <Mail className="w-6 h-6 text-primary" /> 
               3. Communication
            </h2>
            <p className="text-white/70 font-medium">
               We may send you emails regarding your account, course updates, and newsletters. You can opt-out of promotional emails at any time through your dashboard settings.
            </p>
         </section>
      </div>

      <div className="text-center text-sm text-white/30 font-medium">
         Questions about our Terms? <Link href="mailto:support@lumilearn.com" className="text-primary hover:underline">Contact Support</Link>
      </div>
    </div>
  );
}
