import { Lock, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 space-y-12 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
      
      <div className="space-y-4 text-center">
         <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-primary" />
         </div>
         <h1 className="text-4xl md:text-6xl font-black tracking-tight">Privacy Policy</h1>
         <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Last Updated: March 21, 2026</p>
      </div>

      <div className="glass-panel p-10 md:p-16 rounded-3xl border border-white/10 space-y-10 relative z-10 leading-relaxed shadow-glass-elevated">
         <section className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
               <Eye className="w-6 h-6 text-primary" /> 
               1. Information We Collect
            </h2>
            <p className="text-white/70 font-medium">
               We collect information you provide directly to us when you create an account, enroll in a course, or communicate with us. This may include your name, email address, payment information, and course progress data.
            </p>
         </section>

         <section className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
               <CheckCircle2 className="w-6 h-6 text-primary" /> 
               2. How We Use Your Information
            </h2>
            <p className="text-white/70 font-medium">
               Your information is used to provide, maintain, and improve our services, process transactions, and communicate with you about your learning experience.
            </p>
         </section>

         <section className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
               <AlertCircle className="w-6 h-6 text-primary" /> 
               3. Data Security
            </h2>
            <p className="text-white/70 font-medium">
               We use industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
         </section>
      </div>

      <div className="text-center text-sm text-white/30 font-medium">
         Questions about our Privacy Policy? <Link href="mailto:privacy@kodlearn.com" className="text-primary hover:underline">Contact Support</Link>
      </div>
    </div>
  );
}
